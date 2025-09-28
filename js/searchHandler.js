import { DOM } from './dom.js';
import { debounce } from './utils.js';
import { LanguageHandler } from './languageHandler.js';

/**
 * Manages all search functionality, including cross-language search,
 * highlighting results with mark.js, and filtering the TOC.
 */
export const SearchHandler = {
    matches: [],
    currentIndex: -1,
    marker: null,

    init() {
        this.marker = new Mark(DOM.mainContent);
        const debouncedSearch = debounce(this.perform.bind(this), 300);
        DOM.tocSearch.addEventListener('input', e => debouncedSearch(e.target.value));
        DOM.searchNextBtn.addEventListener('click', () => this.navigate(1));
        DOM.searchPrevBtn.addEventListener('click', () => this.navigate(-1));
    },

    reset() {
        this.marker.unmark();
        document.querySelectorAll('.cross-language-match').forEach(el => el.classList.remove('cross-language-match'));
        this.matches = [];
        this.currentIndex = -1;
        DOM.searchNavControls.style.display = 'none';
        DOM.searchResultsCount.textContent = '';
        DOM.tocContainer.querySelectorAll('.toc-h1').forEach(li => li.style.display = '');
        DOM.tocContainer.querySelectorAll('.toc-h1').forEach((li, index) => li.classList.toggle('is-collapsed', index > 0));
        DOM.mainContent.querySelectorAll('details').forEach(d => d.open = false);
    },

    perform(term) {
        this.reset();
        const searchTerm = term.trim();
        if (searchTerm.length < 2) {
            this.updateFocus();
            return;
        };
        if (!LanguageHandler.isSearchReady) return;

        const searchTermLower = searchTerm.toLowerCase();
        const searchWords = searchTermLower.split(/\s+/).filter(Boolean);

        const matchingKeys = LanguageHandler.searchIndex
            .filter(item => searchWords.every(word => item.allText.includes(word)))
            .map(item => item.key);

        if (matchingKeys.length === 0) {
            this.updateFocus();
            return;
        }

        const keySelector = matchingKeys.map(key => `[data-key="${key}"]`).join(',');
        const matchedElements = Array.from(DOM.mainContent.querySelectorAll(keySelector));

        const finalizeSearch = () => {
            matchedElements.forEach(el => {
                if (!el.querySelector('mark')) {
                    el.classList.add('cross-language-match');
                    this.matches.push(el);
                }
            });

            this.matches.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

            this.filterTOC();
            if (this.matches.length > 0) {
                this.currentIndex = 0;
                DOM.searchNavControls.style.display = 'flex';
                this.matches.forEach(match => match.closest('details')?.setAttribute('open', ''));
            }
            this.updateFocus();
        };

        const markIndividualWords = () => {
            this.marker.mark(searchWords, {
                include: matchedElements,
                accuracy: "partially",
                each: (element) => this.matches.push(element),
                done: finalizeSearch
            });
        };

        const escapeRegExp = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        if (searchWords.length > 1) {
            const phraseRegex = new RegExp('\\b' + searchWords.map(escapeRegExp).join('\\w*\\s+\\b') + '\\w*', 'i');
            this.marker.markRegExp(phraseRegex, {
                include: matchedElements,
                each: (element) => this.matches.push(element),
                done: (counter) => counter > 0 ? finalizeSearch() : markIndividualWords()
            });
        } else {
            markIndividualWords();
        }
    },

    filterTOC() {
        if (this.matches.length === 0 && DOM.tocSearch.value.trim()) {
            DOM.tocContainer.querySelectorAll('.toc-h1').forEach(li => li.style.display = 'none');
            return;
        }

        const sectionHeaders = Array.from(DOM.mainContent.querySelectorAll('h1[id]'));
        const matchedTocLIs = new Set();

        this.matches.forEach(match => {
            const parentH1 = sectionHeaders.slice().reverse().find(header =>
                (header.compareDocumentPosition(match) & Node.DOCUMENT_POSITION_FOLLOWING)
            );
            if (parentH1) {
                const tocLI = DOM.tocContainer.querySelector(`a[href="#${parentH1.id}"]`)?.closest('.toc-h1');
                if (tocLI) {
                    matchedTocLIs.add(tocLI);
                    tocLI.classList.remove('is-collapsed');
                }
            }
        });

        DOM.tocContainer.querySelectorAll('.toc-h1').forEach(li => {
            li.style.display = matchedTocLIs.has(li) ? '' : 'none';
        });
    },

    updateFocus() {
        document.querySelectorAll('.current-match').forEach(el => el.classList.remove('current-match'));

        if (this.matches.length > 0 && this.currentIndex >= 0) {
            const currentEl = this.matches[this.currentIndex];
            currentEl.classList.add('current-match');
            currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        DOM.searchResultsCount.textContent = `${this.matches.length > 0 ? this.currentIndex + 1 : 0} / ${this.matches.length}`;
    },

    navigate(direction) {
        if (this.matches.length === 0) return;
        this.currentIndex = (this.currentIndex + direction + this.matches.length) % this.matches.length;
        this.updateFocus();
    }
};
