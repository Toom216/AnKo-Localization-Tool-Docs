import { DOM } from './dom.js';

export const ModeManager = {
    init() {
        this.modeToggleBtn = document.getElementById('mode-toggle');
        this.body = document.body;
        
        // Check for saved mode preference
        const savedMode = localStorage.getItem('viewMode');
        
        // Check hash for direct link to patch notes
        if (window.location.hash === '#patch-notes') {
            this.enablePatchNotesMode();
        } else if (savedMode === 'patch-notes') {
            this.enablePatchNotesMode();
        } else {
            this.enableDocsMode();
        }

        if (this.modeToggleBtn) {
            this.modeToggleBtn.addEventListener('click', () => {
                this.toggleMode();
            });
        }

        const logoLink = document.getElementById('logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                // If we are in patch notes mode, switch to docs mode
                if (this.body.classList.contains('mode-patch-notes')) {
                    e.preventDefault(); // Prevent default navigation to avoid reload if we just want to switch mode
                    this.enableDocsMode();
                }
                // If we are already in docs mode, the default link behavior (reload/navigate to index.html) will happen
                // which is fine.
            });
        }
    },

    toggleMode() {
        if (this.body.classList.contains('mode-patch-notes')) {
            this.enableDocsMode();
        } else {
            this.enablePatchNotesMode();
        }
    },

    // Variable to store scroll position
    lastDocsScrollPosition: 0,

    enableDocsMode() {
        this.body.classList.remove('mode-patch-notes');
        this.body.classList.add('mode-docs');
        localStorage.setItem('viewMode', 'docs');
        this.updateButtonState('docs');

        // Restore scroll position
        if (this.lastDocsScrollPosition > 0) {
            window.scrollTo(0, this.lastDocsScrollPosition);
        }
    },

    enablePatchNotesMode() {
        // Save scroll position before switching
        this.lastDocsScrollPosition = window.scrollY;

        this.body.classList.remove('mode-docs');
        this.body.classList.add('mode-patch-notes');
        localStorage.setItem('viewMode', 'patch-notes');
        this.updateButtonState('patch-notes');

        // Scroll to top for patch notes
        window.scrollTo(0, 0);
    },

    updateButtonState(mode) {
        if (!this.modeToggleBtn) return;
        
        // If we are in docs mode, button should offer to switch to history (clock icon)
        // If we are in history mode, button should offer to switch to docs (book/article icon)
        
        if (mode === 'docs') {
            this.modeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
            `;
            this.modeToggleBtn.setAttribute('title', 'Show Version History');
            this.modeToggleBtn.setAttribute('aria-label', 'Show Version History');
        } else {
            this.modeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                </svg>
            `;
            this.modeToggleBtn.setAttribute('title', 'Show Documentation');
            this.modeToggleBtn.setAttribute('aria-label', 'Show Documentation');
        }
    }
};
