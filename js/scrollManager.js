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
        // Handle scroll restoration manually to prevent jumping due to dynamic content loading
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        // Restore saved position if available
        // We do this immediately in case the layout is already mostly stable
        this.restoreState();

        // Also restore after window load to account for images/resources
        window.addEventListener('load', () => {
            this.restoreState();
        });

        // Save position on page unload
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });

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
     * Saves the current scroll position and state (open details, active heading anchor)
     */
    saveState() {
        const state = {
            scrollY: window.scrollY,
            openDetails: [],
            anchor: null
        };

        // 1. Save open details (using summary data-key as identifier)
        document.querySelectorAll('details[open]').forEach(detail => {
            const summary = detail.querySelector('summary');
            if (summary && summary.dataset.key) {
                state.openDetails.push(summary.dataset.key);
            }
        });

        // 2. Save anchor element (current active heading) to handle layout shifts
        // We use the current active heading from our tracker, or find the top-most element
        if (this.activeState.currentHeading) {
            const heading = this.activeState.currentHeading;
            const rect = heading.getBoundingClientRect();
            // Offset is how far down the heading is from the top of the viewport
            // We want to restore: scrollTo(heading.offsetTop - offset)
            // Wait, rect.top is distance from viewport top.
            // If heading is at top of viewport, rect.top is ~0.
            // If heading is scrolled past (above viewport), rect.top is negative.
            state.anchor = {
                id: heading.id,
                offset: rect.top // This is relative to viewport top
            };
        }

        localStorage.setItem('pageState', JSON.stringify(state));
    },

    /**
     * Restores the scroll position and state
     */
    restoreState() {
        try {
            const stateJSON = localStorage.getItem('pageState');
            if (!stateJSON) return;

            const state = JSON.parse(stateJSON);

            // 1. Restore open details
            if (state.openDetails && Array.isArray(state.openDetails)) {
                let layoutChanged = false;
                state.openDetails.forEach(key => {
                    const summary = document.querySelector(`summary[data-key="${key}"]`);
                    if (summary) {
                        const detail = summary.parentElement;
                        if (detail && !detail.open) {
                            detail.open = true;
                            layoutChanged = true;
                        }
                    }
                });
            }

            // 2. Restore scroll position
            // Strategy: Use anchor if valid, fallback to absolute scrollY
            let targetScrollY = state.scrollY;

            if (state.anchor && state.anchor.id) {
                const heading = document.getElementById(state.anchor.id);
                if (heading) {
                    // Calculate absolute position:
                    // heading.offsetTop gives position relative to offsetParent (usually body/main)
                    // We want: heading's new screen position to match old screen position (state.anchor.offset)
                    // new_screen_y = heading.getBoundingClientRect().top
                    // We want new_screen_y to be state.anchor.offset.
                    // scrollY = heading_absolute_top - state.anchor.offset
                    
                    // Note: offsetTop is not always absolute if parents are positioned. 
                    // Better to use window.scrollY + heading.getBoundingClientRect().top to get absolute page pos.
                    // But we can't trust getBoundingClientRect() before scrolling... 
                    // Actually, window.scrollY + rect.top IS the absolute page coordinate.
                    // So: targetScrollY = (heading absolute position) - state.anchor.offset
                    
                    const headingTop = heading.getBoundingClientRect().top + window.scrollY;
                    targetScrollY = headingTop - state.anchor.offset;
                }
            }

            if (targetScrollY !== undefined && targetScrollY !== null) {
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'auto'
                });
            }

        } catch (e) {
            console.error('Failed to restore state:', e);
        }
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

