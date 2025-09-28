import { DOM } from './dom.js';

/**
 * A centralized manager for tracking the user's scroll position relative to headings.
 * It uses a single IntersectionObserver for performance and notifies subscriber
 * modules of the current active heading state.
 */
export const ScrollManager = {
    headings: [],
    subscribers: [],
    activeState: {
        currentH1: null,
        currentH2: null,
        currentHeading: null, // The most specific active heading (h1, h2, or h3)
    },
    observer: null,

    /**
     * Initializes the manager by finding all trackable headings and setting up
     * the single IntersectionObserver.
     */
    init() {
        this.headings = Array.from(DOM.mainContent.querySelectorAll('h1[id], h2[id], h3[id]'));
        if (this.headings.length === 0) return;

        const options = {
            rootMargin: `-100px 0px -80% 0px`,
            threshold: 0,
        };
        this.observer = new IntersectionObserver(this.updateActiveState.bind(this), options);
        this.headings.forEach(h => this.observer.observe(h));
    },

    /**
     * Allows other modules to subscribe to scroll position updates.
     * @param {Function} callback - The function to call when the active heading changes.
     */
    subscribe(callback) {
        if (typeof callback === 'function') {
            this.subscribers.push(callback);
        }
    },

    /**
     * Notifies all subscribed modules of the latest active heading state.
     */
    notify() {
        this.subscribers.forEach(callback => callback(this.activeState));
    },

    /**
     * The callback for the IntersectionObserver. Determines the most relevant
     * active headings and notifies subscribers if the state has changed.
     */
    updateActiveState() {
        const triggerMargin = window.innerHeight * 0.2;
        let newCurrentHeading = null;
        let newCurrentH1 = null;
        let newCurrentH2 = null;

        // Find the last heading that has scrolled past the trigger margin
        for (const heading of this.headings) {
            if (heading.getBoundingClientRect().top < triggerMargin) {
                newCurrentHeading = heading;
            } else {
                break;
            }
        }

        if (newCurrentHeading) {
            const currentIndex = this.headings.indexOf(newCurrentHeading);

            // Find the parent H1 for the currently active heading
            for (let i = currentIndex; i >= 0; i--) {
                const h = this.headings[i];
                if (h.tagName === 'H1') {
                    newCurrentH1 = h;
                    break;
                }
            }

            // CORRECTED: Determine the active H2 based on the active heading.
            // This logic ensures H2 is cleared when a new H1 section is entered.
            if (newCurrentHeading.tagName === 'H1') {
                newCurrentH2 = null; // We are at the start of an H1 section, so no H2 is active.
            } else if (newCurrentHeading.tagName === 'H2') {
                newCurrentH2 = newCurrentHeading;
            } else if (newCurrentHeading.tagName === 'H3') {
                // For an H3, find its immediate parent H2 within the same section.
                for (let i = currentIndex - 1; i >= 0; i--) {
                    const h = this.headings[i];
                    if (h.tagName === 'H2') {
                        newCurrentH2 = h;
                        break;
                    }
                    if (h.tagName === 'H1') { // Stop if we hit the section boundary
                        break;
                    }
                }
            }
        }

        // Only notify if the active state has meaningfully changed
        if (newCurrentH1 !== this.activeState.currentH1 || newCurrentH2 !== this.activeState.currentH2 || newCurrentHeading !== this.activeState.currentHeading) {
            this.activeState.currentH1 = newCurrentH1;
            this.activeState.currentH2 = newCurrentH2;
            this.activeState.currentHeading = newCurrentHeading;
            this.notify();
        }
    },

    /**
     * Forces an immediate recalculation of the active state.
     * Useful after click events on navigation links.
     */
    forceUpdate() {
        // We use a short timeout to allow the browser's native scroll-to-anchor
        // behavior to complete before we recalculate the active headings.
        setTimeout(() => this.updateActiveState(), 100);
    }
};

