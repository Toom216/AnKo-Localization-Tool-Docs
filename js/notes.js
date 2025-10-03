import { DOM } from './dom.js';
import { debounce } from './utils.js';
import { LanguageHandler } from './languageHandler.js';


/**
 * Manages the creation, display, and saving of user's personal notes.
 * Notes are attached to specific content elements (paragraphs, lists)
 * and are stored locally in the browser.
 */
export const NotesManager = {
    notes: {}, // { elementId: "note text", ... }
    notesPanel: null,
    addNoteHoverBtn: null,
    notePopup: null,
    activePopupTarget: null,
    currentTargetElement: null,
    noteIdCounter: 0,
    isPanelOpen: false,
    hideButtonTimeout: null, // Property to store the timer ID

    /**
     * Initializes the module: creates UI elements, binds events, and loads saved notes.
     */
    init() {
        if (typeof DOMPurify === 'undefined') {
            console.error('DOMPurify is not loaded. NotesManager will not initialize for security reasons.');
            return;
        }
        this.createUI();
        // Bind `this` to handlers for correct listener management
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handlePopupOutsideClick = this.handlePopupOutsideClick.bind(this);
        this.handlePopupEscapeKey = this.handlePopupEscapeKey.bind(this);

        this.bindEvents();
        this.loadNotes();
        const panelState = localStorage.getItem('notes_panel_open') === 'true';
        this.togglePanel(panelState, true);
    },

    /**
     * Creates the necessary DOM elements for the functionality.
     */
    createUI() {
        this.notesPanel = document.createElement('aside');
        this.notesPanel.id = 'notes-panel';
        this.notesPanel.className = 'notes-panel';
        document.body.appendChild(this.notesPanel);

        this.addNoteHoverBtn = document.createElement('button');
        this.addNoteHoverBtn.id = 'add-note-hover-btn';
        this.addNoteHoverBtn.className = 'add-note-hover-btn';
        this.addNoteHoverBtn.setAttribute('data-key', 'notes_add_title');
        this.addNoteHoverBtn.setAttribute('title', 'Add a note to this block');
        this.addNoteHoverBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M17,11h-4v4h-2v-4H7V9h4V5h2v4h4V11z"/></svg>`;
        document.body.appendChild(this.addNoteHoverBtn);

        this.notePopup = document.createElement('div');
        this.notePopup.id = 'note-popup';
        this.notePopup.className = 'note-popup';
        this.notePopup.innerHTML = `
            <div class="note-popup-content">
                <textarea data-key="notes_placeholder" placeholder="Your note..."></textarea>
            </div>
            <button class="note-popup-close-btn" data-key="notes_close_title" title="Close">&times;</button>
        `;
        document.body.appendChild(this.notePopup);
    },

    /**
     * Binds events to control buttons and elements.
     */
    bindEvents() {
        DOM.toggleNotesBtn.addEventListener('click', () => {
            if (DOM.sidebar.classList.contains('is-open')) {
                DOM.sidebar.classList.remove('is-open');
                document.body.classList.remove('sidebar-is-open');
            }
            this.togglePanel();
        });

        // OPTIMIZED: Use mouseover for better performance than mousemove.
        DOM.mainContent.addEventListener('mouseover', e => this.handleContentMouseOver(e));
        DOM.mainContent.addEventListener('mouseleave', () => this.scheduleButtonHide());

        this.addNoteHoverBtn.addEventListener('mouseenter', () => this.cancelButtonHide());
        this.addNoteHoverBtn.addEventListener('mouseleave', () => this.scheduleButtonHide());
        this.addNoteHoverBtn.addEventListener('click', () => this.handleAddNoteClick());

        DOM.mainContent.addEventListener('click', e => {
            const target = e.target.closest('.has-note');
            if (target && !this.notePopup.contains(e.target)) {
                e.preventDefault();
                this.showNotePopup(target);
            }
        });

        this.notePopup.querySelector('.note-popup-close-btn').addEventListener('click', () => this.hideNotePopup());
        const popupTextarea = this.notePopup.querySelector('textarea');
        popupTextarea.addEventListener('input', debounce(() => {
            if (this.activePopupTarget) {
                const elementId = this.activePopupTarget.id;
                const sanitizedText = DOMPurify.sanitize(popupTextarea.value);
                this.notes[elementId] = sanitizedText;
                this.saveNotes();
                this.updateNoteCard(elementId);
            }
        }, 300));
    },

    /**
     * Schedules hiding the button after a short delay.
     */
    scheduleButtonHide() {
        this.cancelButtonHide();
        this.hideButtonTimeout = setTimeout(() => {
            this.addNoteHoverBtn.classList.remove('visible');
        }, 300);
    },

    /**
     * Cancels the scheduled button hiding.
     */
    cancelButtonHide() {
        if (this.hideButtonTimeout) {
            clearTimeout(this.hideButtonTimeout);
            this.hideButtonTimeout = null;
        }
    },

    /**
     * Toggles the visibility of the notes panel.
     */
    async togglePanel(forceState, isInitial = false) {
        this.isPanelOpen = typeof forceState === 'boolean' ? forceState : !this.isPanelOpen;
        this.notesPanel.classList.toggle('is-open', this.isPanelOpen);
        document.body.classList.toggle('notes-panel-open', this.isPanelOpen);
        DOM.toggleNotesBtn.classList.toggle('active', this.isPanelOpen);
        localStorage.setItem('notes_panel_open', this.isPanelOpen);

        if (this.isPanelOpen) {
            document.addEventListener('click', this.handleOutsideClick);
            document.addEventListener('keydown', this.handleEscapeKey);
        } else {
            document.removeEventListener('click', this.handleOutsideClick);
            document.removeEventListener('keydown', this.handleEscapeKey);
        }

        if (!isInitial) {
            await this.renderNotesPanel();
        }
    },

    handleOutsideClick(e) {
        if (this.isPanelOpen && !this.notesPanel.contains(e.target) && !DOM.toggleNotesBtn.contains(e.target)) {
            if (this.addNoteHoverBtn.contains(e.target)) return;
            this.togglePanel(false);
        }
    },

    handleEscapeKey(e) {
        if (e.key === 'Escape' && this.isPanelOpen) {
            this.togglePanel(false);
        }
    },

    async loadNotes() {
        try {
            const savedNotes = localStorage.getItem('user_doc_notes');
            this.notes = savedNotes ? JSON.parse(savedNotes) : {};
        } catch (e) {
            console.error('Error loading notes from localStorage:', e);
            this.notes = {};
        }

        Object.keys(this.notes).forEach(elementId => {
            let element;
            if (elementId.startsWith('note-target-media-')) {
                const sanitizedSrc = elementId.replace('note-target-media-', '');
                element = document.querySelector(`.doc-image[src*="${sanitizedSrc.replace(/-/g, '/')}"]`)
                    || document.querySelector(`.doc-image[src*="${sanitizedSrc.replace(/-/g, '_')}"]`);
            } else {
                const key = elementId.replace(/^note-target-/, '');
                const keySource = document.querySelector(`[data-key="${key}"]`);
                element = keySource?.closest('p, li, h1, h2, h3, blockquote, pre, .doc-image');
            }

            if (element) {
                element.id = elementId;
                element.classList.add('has-note');
            }
        });
        await this.renderNotesPanel();
    },

    saveNotes() {
        try {
            localStorage.setItem('user_doc_notes', JSON.stringify(this.notes));
        } catch (e) {
            console.error('Error saving notes to localStorage:', e);
        }
    },

    /**
     * OPTIMIZED: Handles mouse entering a potential note target to show the button.
     */
    handleContentMouseOver(e) {
        if (this.notePopup.classList.contains('visible')) {
            this.addNoteHoverBtn.classList.remove('visible');
            return;
        }
        const targetElement = e.target.closest('p, li, h1, h2, h3, blockquote, pre, .doc-image');

        if (targetElement && DOM.mainContent.contains(targetElement)) {
            this.cancelButtonHide(); // Cancel any pending hide operation
            this.currentTargetElement = targetElement;
            const rect = targetElement.getBoundingClientRect();
            this.addNoteHoverBtn.style.left = `${window.scrollX + rect.left - 35}px`;
            this.addNoteHoverBtn.style.top = `${window.scrollY + rect.top}px`;
            this.addNoteHoverBtn.classList.add('visible');
        }
    },

    handleAddNoteClick() {
        if (!this.currentTargetElement) return;
        this.createNoteForElement(this.currentTargetElement);
        this.addNoteHoverBtn.classList.remove('visible');
    },

    async createNoteForElement(element) {
        if (element.classList.contains('has-note')) {
            this.showNotePopup(element);
            return;
        }
        const elementId = this.getOrCreateElementId(element);
        if (!elementId) return;

        element.classList.add('has-note');
        this.notes[elementId] = '';
        this.saveNotes();
        await this.renderNotesPanel();
        this.showNotePopup(element);
    },

    getOrCreateElementId(element) {
        if (element.id && element.id.startsWith('note-target-')) {
            return element.id;
        }

        const keySource = element.querySelector('[data-key]') || element;
        if (keySource && keySource.dataset.key) {
            const stableId = `note-target-${keySource.dataset.key}`;
            element.id = stableId;
            return stableId;
        }

        if (element.matches('.doc-image') && element.src) {
            const sanitizedSrc = element.src.split('/').pop().replace(/[^a-zA-Z0-9_.-]/g, '-');
            const stableId = `note-target-media-${sanitizedSrc}`;
            element.id = stableId;
            return stableId;
        }

        console.warn('Could not create a stable ID for note on element:', element);
        return null;
    },

    async showNotePopup(element) {
        if (this.activePopupTarget) {
            this.hideNotePopup();
        }
        this.activePopupTarget = element;
        const elementId = this.getOrCreateElementId(element);
        const noteText = this.notes[elementId] || '';

        const textarea = this.notePopup.querySelector('textarea');
        textarea.value = noteText;

        const savedLang = localStorage.getItem('language') || 'en';
        await LanguageHandler.applyTranslationsToContainer(this.notePopup, savedLang);

        const rect = element.getBoundingClientRect();
        const popup = this.notePopup;

        const isMobile = window.innerWidth <= 992;

        popup.classList.add('visible');

        if (isMobile) {
            popup.style.top = '';
            popup.style.left = '';
            popup.style.transform = '';
        } else {
            const popupRect = popup.getBoundingClientRect();
            let top = window.scrollY + rect.top;
            let left = window.scrollX + rect.right + 15;

            if (left + popupRect.width > window.innerWidth) {
                left = window.scrollX + rect.left - popupRect.width - 15;
            }
            if (left < window.scrollX) {
                left = window.scrollX + 10;
            }

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
        }


        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;

        setTimeout(() => {
            document.addEventListener('click', this.handlePopupOutsideClick, true);
            document.addEventListener('keydown', this.handlePopupEscapeKey);
        }, 0);
    },

    hideNotePopup() {
        const activeTarget = this.activePopupTarget;
        if (!activeTarget) return;

        const elementId = activeTarget.id;
        const textarea = this.notePopup.querySelector('textarea');
        const finalNoteText = DOMPurify.sanitize(textarea.value);

        this.notePopup.classList.remove('visible');
        document.removeEventListener('click', this.handlePopupOutsideClick, true);
        document.removeEventListener('keydown', this.handlePopupEscapeKey);
        this.activePopupTarget = null;

        if (finalNoteText.trim() === '') {
            if (this.notes.hasOwnProperty(elementId)) {
                setTimeout(() => this.deleteNote(elementId), 50);
            }
        } else {
            this.notes[elementId] = finalNoteText;
            this.saveNotes();
            this.updateNoteCard(elementId);
        }
    },

    handlePopupOutsideClick(e) {
        if (this.activePopupTarget) {
            if (!this.notePopup.contains(e.target) && !this.activePopupTarget.contains(e.target)) {
                if (this.addNoteHoverBtn.contains(e.target)) return;
                this.hideNotePopup();
            }
        }
    },

    handlePopupEscapeKey(e) {
        if (e.key === 'Escape') {
            this.hideNotePopup();
        }
    },

    updateNoteCard(elementId) {
        const card = this.notesPanel.querySelector(`.note-card[data-note-id="${elementId}"]`);
        if (!card) {
            this.renderNotesPanel();
            return;
        }

        const preview = card.querySelector('.note-preview');
        if (preview) {
            const noteText = this.notes[elementId] || '';
            preview.textContent = noteText.substring(0, 100).replace(/\n/g, ' ') + (noteText.length > 100 ? '...' : '');
        }
    },

    async renderNotesPanel() {
        const sortedNoteIds = Object.keys(this.notes)
            .map(id => ({ id, element: document.getElementById(id) }))
            .filter(item => item.element)
            .sort((a, b) => a.element.offsetTop - b.element.offsetTop)
            .map(item => item.id);

        this.notesPanel.innerHTML = `<div class="notes-panel-header"><h4 data-key="my_notes_title">My Notes</h4></div><div class="notes-list"></div>`;
        const notesListContainer = this.notesPanel.querySelector('.notes-list');

        if (sortedNoteIds.length === 0) {
            notesListContainer.innerHTML = `<p class="no-notes-message" data-key="no_notes_message_new">Hover over the text to add a note.</p>`;
        } else {
            sortedNoteIds.forEach(elementId => {
                const noteText = this.notes[elementId];
                const sourceElement = document.getElementById(elementId);
                if (!sourceElement) return;

                const card = document.createElement('div');
                card.className = 'note-card';
                card.dataset.noteId = elementId;

                let contextText;
                if (sourceElement.matches('img.doc-image') && sourceElement.alt) {
                    contextText = `Image: "${sourceElement.alt.substring(0, 70).trim()}"`;
                } else if (sourceElement.matches('video.doc-image')) {
                    contextText = `Video: ${sourceElement.src.split('/').pop()}`;
                } else {
                    contextText = sourceElement.textContent.trim().substring(0, 80) + '...';
                }

                const contextDiv = document.createElement('div');
                contextDiv.className = 'note-context';
                contextDiv.setAttribute('data-key', 'notes_goto_title');
                contextDiv.setAttribute('title', 'Go to text');
                contextDiv.textContent = contextText;

                const previewP = document.createElement('p');
                previewP.className = 'note-preview';
                const previewText = noteText.substring(0, 100).replace(/\n/g, ' ') + (noteText.length > 100 ? '...' : '');
                previewP.textContent = previewText;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'note-card-actions';
                actionsDiv.innerHTML = `
                    <button class="edit-note-btn" data-key="notes_edit_title" title="Edit note"><span data-key="notes_edit_text">Edit</span></button>
                    <button class="delete-note-btn" data-key="notes_delete_title" title="Delete note">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19,6.41L17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12,19,6.41Z"/></svg>
                    </button>`;

                card.appendChild(contextDiv);
                card.appendChild(previewP);
                card.appendChild(actionsDiv);

                const goToText = () => {
                    sourceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    sourceElement.classList.add('note-highlight');
                    setTimeout(() => sourceElement.classList.remove('note-highlight'), 1500);
                };

                card.querySelector('.note-context').addEventListener('click', goToText);

                card.querySelector('.edit-note-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.isPanelOpen && document.body.clientWidth < 900) {
                        this.togglePanel(false);
                    }
                    goToText();
                    this.showNotePopup(sourceElement);
                });

                card.querySelector('.delete-note-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteNote(elementId);
                });

                notesListContainer.appendChild(card);
            });
        }

        const savedLang = localStorage.getItem('language') || 'en';
        await LanguageHandler.applyTranslationsToContainer(this.notesPanel, savedLang);
    },

    async deleteNote(elementId) {
        if (this.activePopupTarget && this.activePopupTarget.id === elementId) {
            this.notePopup.classList.remove('visible');
            this.activePopupTarget = null;
            document.removeEventListener('click', this.handlePopupOutsideClick, true);
            document.removeEventListener('keydown', this.handlePopupEscapeKey);
        }
        delete this.notes[elementId];
        this.saveNotes();

        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('has-note');
        }

        await this.renderNotesPanel();
    }
};

