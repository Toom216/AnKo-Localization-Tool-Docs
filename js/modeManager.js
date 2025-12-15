import { DOM } from './dom.js';
import { TOC } from './toc.js';
import { ScrollSpy } from './scrollSpy.js';
import { LanguageHandler } from './languageHandler.js';

/**
 * Handles mode switching (simple/advanced) and persists the choice
 * in localStorage. Also updates the UI and regenerates the TOC.
 */
export const ModeManager = {
    init() {
        const savedMode = localStorage.getItem('mode') || 'advanced';
        this.apply(savedMode);
        DOM.modeToggle.addEventListener('click', () => this.toggle());
    },

    async apply(mode) {
        // Update body classes
        document.body.classList.remove('mode-simple', 'mode-advanced');
        document.body.classList.add(`mode-${mode}`);
        
        // Update button icon and title based on current mode
        const bookIcon = `<img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4d6.svg" class="theme-icon" alt="Simple mode">`;
        const graduationCapIcon = `<img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f393.svg" class="theme-icon" alt="Advanced mode">`;
        
        if (mode === 'simple') {
            DOM.modeToggle.innerHTML = graduationCapIcon;
            DOM.modeToggle.title = 'Switch to Advanced Mode';
        } else {
            DOM.modeToggle.innerHTML = bookIcon;
            DOM.modeToggle.title = 'Switch to Simple Mode';
        }
        
        // Save mode to localStorage
        localStorage.setItem('mode', mode);
        
        // Regenerate TOC based on the current mode
        TOC.generate();
        
        // Apply translations to the newly created TOC elements
        const savedLang = localStorage.getItem('language') || 'en';
        await LanguageHandler.applyTranslationsToContainer(DOM.tocContainer, savedLang);
        
        // Re-initialize ScrollSpy
        ScrollSpy.init();
    },

    async toggle() {
        const currentMode = document.body.classList.contains('mode-simple') ? 'simple' : 'advanced';
        const newMode = currentMode === 'simple' ? 'advanced' : 'simple';
        await this.apply(newMode);
    }
};