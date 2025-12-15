import { DOM } from './dom.js';
import { ThemeManager } from './themeManager.js';
import { LanguageHandler } from './languageHandler.js';
import { TOC } from './toc.js';
import { SearchHandler } from './searchHandler.js';
import { Lightbox } from './lightbox.js';
import { MindMap } from './mindmap.js';
import { ScrollManager } from './scrollManager.js';
import { ScrollSpy } from './scrollSpy.js';
import { OnPageNav } from './onPageNav.js';
import { NotesManager } from './notes.js';

/**
 * The main App object that orchestrates the initialization and
 * interaction of all other modules.
 */
export const App = {
    async init() {
        // Initialize modules that don't depend on language content first
        ThemeManager.init();
        SearchHandler.init();
        new Lightbox();
        MindMap.init();
        NotesManager.init();

        // Initialize the language handler, which will also handle the initial language application
        await LanguageHandler.init();

        // Generate the Table of Contents after the main content has been translated
        TOC.generate();

        // Apply translations to the newly created TOC elements
        const savedLang = localStorage.getItem('language') || 'en';
        await LanguageHandler.applyTranslationsToContainer(DOM.tocContainer, savedLang);
        // Also apply translations to the notes panel if it already contains text
        const notesPanel = document.getElementById('notes-panel');
        if (notesPanel) {
            await LanguageHandler.applyTranslationsToContainer(notesPanel, savedLang);
        }

        // Initialize modules that depend on the final DOM structure
        ScrollManager.init(); // Manager must be initialized first
        ScrollSpy.init();
        OnPageNav.init();

        // Setup listeners and dynamic elements that are not language-dependent
        this.setupStaticListeners();
        this.setupCodeBlocks();
        this.setupBannerToggle(); // Add banner toggle functionality
    },

    /**
     * Sets up the notification banner toggle functionality
     */
    setupBannerToggle() {
        const banner = document.getElementById('notificationBanner');
        const toggleButton = document.getElementById('bannerToggle');
        const mainContent = document.querySelector('.main-content');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        
        if (banner && toggleButton && mainContent) {
            toggleButton.addEventListener('click', () => {
                banner.classList.toggle('collapsed');
                mainContent.classList.toggle('with-collapsed-banner', banner.classList.contains('collapsed'));
                
                // Adjust mobile toggle position if it exists
                if (mobileToggle) {
                    mobileToggle.classList.toggle('with-collapsed-banner', banner.classList.contains('collapsed'));
                }
            });
        }
    },

    /**
     * Sets up event listeners for static UI elements like the scroll-to-top button
     * and mobile navigation toggle.
     */
    setupStaticListeners() {
        window.addEventListener('scroll', () => {
            DOM.scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        DOM.scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        DOM.mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = DOM.sidebar.classList.toggle('is-open');
            document.body.classList.toggle('sidebar-is-open', isOpen);
        });

        // MODIFIED: Enhanced TOC click listener
        DOM.tocContainer.addEventListener('click', e => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                // Close mobile nav if it's open
                if (DOM.sidebar.classList.contains('is-open')) {
                    DOM.sidebar.classList.remove('is-open');
                    document.body.classList.remove('sidebar-is-open');
                }
                // NEW: Force scroll manager to update after the click-scroll
                ScrollManager.forceUpdate();
            }
        });

        document.addEventListener('click', (e) => {
            const sidebarIsOpen = DOM.sidebar.classList.contains('is-open');
            if (sidebarIsOpen && !DOM.sidebar.contains(e.target) && !DOM.mobileNavToggle.contains(e.target)) {
                DOM.sidebar.classList.remove('is-open');
                document.body.classList.remove('sidebar-is-open');
            }
        });
    },

    /**
     * Copies text to the clipboard, using a fallback for non-secure contexts.
     * @param {string} text - The text to copy.
     * @returns {Promise<void>} A promise that resolves when copying is successful and rejects on failure.
     */
    copyTextToClipboard(text) {
        // Try to use the modern Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers or non-secure contexts
            return new Promise((resolve, reject) => {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'absolute';
                textArea.style.left = '-9999px';
                document.body.prepend(textArea);
                textArea.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        resolve();
                    } else {
                        reject(new Error('Fallback: Unable to copy text to clipboard'));
                    }
                } catch (err) {
                    reject(err);
                } finally {
                    textArea.remove();
                }
            });
        }
    },


    /**
     * Finds all <pre><code> blocks, initializes syntax highlighting,
     * and adds a "Copy" button to each.
     */
    setupCodeBlocks() {
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }

        document.querySelectorAll('pre').forEach(preElement => {
            if (preElement.querySelector('.copy-code-btn')) return;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            
            const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};
            const copyText = translations['copy_code_copy'] || 'Copy';
            const copiedText = translations['copy_code_copied'] || 'Copied!';
            const errorText = translations['copy_code_error'] || 'Error';

            copyBtn.textContent = copyText;
            copyBtn.setAttribute('title', copyText);

            preElement.prepend(copyBtn);

            copyBtn.addEventListener('click', () => {
                const code = preElement.querySelector('code');
                if (code) {
                    this.copyTextToClipboard(code.textContent).then(() => {
                        copyBtn.textContent = copiedText;
                        copyBtn.classList.add('copied');
                        setTimeout(() => {
                            copyBtn.textContent = copyText;
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                        copyBtn.textContent = errorText;
                    });
                }
            });
        });
    }
};
