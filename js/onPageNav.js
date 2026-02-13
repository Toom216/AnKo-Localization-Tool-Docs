import { DOM } from './dom.js';
import { LanguageHandler } from './languageHandler.js';
import { ScrollManager } from './scrollManager.js';

/**
 * Manages the "On This Page" navigation component. It subscribes to the
 * ScrollManager to rebuild its content when the main section changes and to
 * highlight the active sub-heading.
 */
export const OnPageNav = {
    tocContainer: document.getElementById('on-page-toc'),
    currentActiveLink: null,
    currentSectionH1: null,

    init() {
        if (!this.tocContainer) return;
        ScrollManager.subscribe(this.handleScrollUpdate.bind(this));

        // NEW: Add click listener to force update on navigation
        this.tocContainer.addEventListener('click', e => {
            if (e.target.closest('a[href^="#"]')) {
                ScrollManager.forceUpdate();
            }
        });
    },

    /**
     * Handles updates from ScrollManager.
     * @param {object} activeState - The current active heading state.
     */
    handleScrollUpdate({ currentH1, currentHeading }) {
        // Rebuild the nav only when the main H1 section changes
        if (currentH1 && currentH1 !== this.currentSectionH1) {
            this.currentSectionH1 = currentH1;
            this.buildNavForSection(currentH1);
        }

        // Update the active link highlighting
        this.updateActiveLink(currentHeading);
    },

    async buildNavForSection(h1) {
        this.tocContainer.innerHTML = '';

        // 1. Calculate the H1 index relative to its container (Simple or Advanced view)
        // This ensures the numbering matches the main content numbering (e.g. "4. Tool Window")
        const sectionContainer = h1.closest('.view-section');
        const allH1s = sectionContainer ? Array.from(sectionContainer.querySelectorAll('h1[id]')) : [];
        const h1Index = allH1s.indexOf(h1) + 1; // 1-based index (e.g., 4)

        // 2. Collect all relevant sub-headings for this section
        const headingsInSection = [h1];
        let nextEl = h1.nextElementSibling;
        while (nextEl && nextEl.tagName !== 'H1') {
            if ((nextEl.tagName === 'H2' || nextEl.tagName === 'H3') && nextEl.id) {
                headingsInSection.push(nextEl);
            }
            // Support for grouped FAQs inside details
            if (nextEl.classList.contains('faq-section')) {
                nextEl.querySelectorAll('h2[id], h3[id]').forEach(h => headingsInSection.push(h));
            }
            nextEl = nextEl.nextElementSibling;
        }

        // 3. Build the list with numbering
        const list = document.createElement('ul');

        let h2Count = 0;
        let h3Count = 0;

        headingsInSection.forEach(heading => {
            const keySourceElement = heading.querySelector('[data-key]') || heading;
            const originalKey = keySourceElement.dataset.key;

            if (!originalKey) return;

            let navKey = originalKey;
            if (heading.tagName === 'H1' || heading.tagName === 'H2') {
                navKey = originalKey.replace(/^(h[1-2]_)/, 'nav_');
            }

            // Calculate the number string (e.g. "4.1.")
            let numberString = '';
            if (heading.tagName === 'H1') {
                numberString = `${h1Index}.`;
                // Reset sub-counters for new H1 (though logically we only process one H1 here)
                h2Count = 0;
            } else if (heading.tagName === 'H2') {
                h2Count++;
                h3Count = 0; // Reset H3 counter when new H2 starts
                numberString = `${h1Index}.${h2Count}.`;
            } else if (heading.tagName === 'H3') {
                h3Count++;
                // Handle edge case where H3 appears without H2 (fallback to 0)
                numberString = `${h1Index}.${h2Count > 0 ? h2Count : 1}.${h3Count}.`;
            }

            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.dataset.key = navKey;
            a.dataset.fallbackKey = originalKey;

            // Store the calculated number in a data attribute for CSS to display
            if (numberString) {
                a.dataset.number = numberString;
            }

            a.className = `toc-level-${heading.tagName.charAt(1)}`;

            const li = document.createElement('li');
            li.appendChild(a);
            list.appendChild(li);
        });

        this.tocContainer.appendChild(list);

        const savedLang = localStorage.getItem('language') || 'en';
        await LanguageHandler.applyTranslationsToContainer(this.tocContainer, savedLang);

        // After building, immediately update active link
        this.updateActiveLink(ScrollManager.activeState.currentHeading);
    },

    updateActiveLink(activeHeading) {
        const currentActiveId = this.currentActiveLink ? this.currentActiveLink.hash.substring(1) : null;

        if (activeHeading && activeHeading.id !== currentActiveId) {
            this.currentActiveLink?.classList.remove('active');
            const newActiveLink = this.tocContainer.querySelector(`a[href="#${activeHeading.id}"]`);
            if (newActiveLink) {
                newActiveLink.classList.add('active');
                this.currentActiveLink = newActiveLink;
            }
        } else if (!activeHeading && this.currentActiveLink) {
            this.currentActiveLink.classList.remove('active');
            this.currentActiveLink = null;
        }
    }
};