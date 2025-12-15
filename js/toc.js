import { DOM } from './dom.js';

/**
 * Handles the dynamic generation of the Table of Contents (TOC)
 * based on h1 and h2 tags in the main content.
 */
export const TOC = {
    generate(rootElement = null) {
        DOM.tocContainer.innerHTML = '';
        
        // Determine which view is currently visible if no rootElement is provided
        if (!rootElement) {
            if (document.body.classList.contains('mode-simple') && DOM.viewSimple) {
                rootElement = DOM.viewSimple;
            } else if (DOM.viewAdvanced) {
                rootElement = DOM.viewAdvanced;
            } else {
                rootElement = DOM.mainContent;
            }
        }
        
        const headings = rootElement.querySelectorAll('h1[id], h2[id]');
        const mainList = document.createElement('ul');
        let currentH1LI = null;
        let h1Counter = 0;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Counter++;
                currentH1LI = this.createH1Entry(heading);
                if (currentH1LI) {
                    mainList.appendChild(currentH1LI);
                    // Start with all sections collapsed except the first one
                    currentH1LI.classList.toggle('is-collapsed', h1Counter > 1);
                }
            } else if (heading.tagName === 'H2' && currentH1LI) {
                const h2li = this.createH2Entry(heading);
                if (h2li) {
                    const submenu = currentH1LI.querySelector('.toc-submenu');
                    if (submenu) submenu.appendChild(h2li);
                }
            }
        });

        // Add interactive toggles to H1 list items
        mainList.querySelectorAll('.toc-h1').forEach(h1li => this.addToggle(h1li));
        DOM.tocContainer.appendChild(mainList);
    },

    createH1Entry(heading) {
        const keySource = heading.querySelector('[data-key]') || heading;
        const originalKey = keySource.dataset.key;
        if (!originalKey) return null;

        const navKey = originalKey.replace(/^h1_/, 'nav_');
        const li = document.createElement('li');
        li.className = 'toc-h1';
        // CORRECTED: The <a> tag now wraps the text span for a larger clickable area.
        // A separate button is used for the toggle functionality.
        li.innerHTML = `
            <div class="toc-h1-header">
                <button class="toc-toggle" aria-label="Toggle submenu"></button>
                <a href="#${heading.id}" data-key="${navKey}"></a>
            </div>
            <ul class="toc-submenu"></ul>
        `;
        return li;
    },

    createH2Entry(heading) {
        const keySource = heading.querySelector('[data-key]') || heading;
        const originalKey = keySource.dataset.key;
        if (!originalKey) return null;

        const navKey = originalKey.replace(/^h2_/, 'nav_');
        const li = document.createElement('li');
        li.className = 'toc-h2';
        li.innerHTML = `<a href="#${heading.id}" data-key="${navKey}"></a>`;
        return li;
    },

    // CORRECTED: Event listener is now more specific and robust.
    addToggle(h1li) {
        const subMenu = h1li.querySelector('.toc-submenu');
        const toggleBtn = h1li.querySelector('.toc-toggle');

        if (subMenu?.children.length > 0 && toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent any other listeners from firing
                h1li.classList.toggle('is-collapsed');
            });
        } else if (toggleBtn) {
            toggleBtn.classList.add('is-placeholder');
            toggleBtn.disabled = true; // Disable the button if there's no submenu
        }
    }
};