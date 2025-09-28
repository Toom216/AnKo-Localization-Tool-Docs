import { DOM } from './dom.js';
import { ScrollManager } from './scrollManager.js';

/**
 * Highlights the current section in the main Table of Contents (in the sidebar)
 * by subscribing to updates from the central ScrollManager.
 */
export const ScrollSpy = {
    currentActiveLink: null,

    init() {
        ScrollManager.subscribe(this.handleScrollUpdate.bind(this));
    },

    /**
     * Receives updates from ScrollManager and highlights the appropriate
     * link in the main TOC.
     * @param {object} activeState - The current active heading state.
     */
    handleScrollUpdate({ currentH2, currentH1 }) {
        // Prioritize H2 for highlighting, fall back to H1
        const targetHeading = currentH2 || currentH1;

        if (!targetHeading) {
            this.currentActiveLink?.classList.remove('active');
            this.currentActiveLink = null;
            return;
        }

        const id = targetHeading.getAttribute('id');
        const link = DOM.tocContainer.querySelector(`a[href="#${id}"]`);

        if (link && link !== this.currentActiveLink) {
            this.currentActiveLink?.classList.remove('active');
            link.classList.add('active');
            this.currentActiveLink = link;

            // Expand parent H1 section in TOC if it's collapsed
            const parentH1 = link.closest('.toc-h1');
            if (parentH1?.classList.contains('is-collapsed')) {
                parentH1.classList.remove('is-collapsed');
            }
        }
    }
};
