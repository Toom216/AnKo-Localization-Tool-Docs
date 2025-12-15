/**
 * A centralized object for caching frequently accessed DOM elements.
 * This improves performance by reducing the number of DOM queries.
 */
export const DOM = {
    mainContent: document.querySelector('.main-content .content-wrapper'),
    scrollTopBtn: document.getElementById('scrollTopBtn'),
    mobileNavToggle: document.querySelector('.mobile-nav-toggle'),
    sidebar: document.querySelector('.sidebar'),
    themeToggle: document.getElementById('theme-toggle'),
    // NEW: Added explicit reference to theme options container
    themeOptionsContainer: document.getElementById('theme-options'),
    toggleNotesBtn: document.getElementById('toggle-notes-btn'),
    tocContainer: document.getElementById('table-of-contents'),
    tocSearch: document.getElementById('toc-search'),
    currentLangBtn: document.getElementById('current-lang-btn'),
    currentLangFlag: document.getElementById('current-lang-flag'),
    langOptionsContainer: document.getElementById('lang-options'),
    searchNavControls: document.getElementById('search-nav-controls'),
    searchResultsCount: document.getElementById('search-results-count'),
    searchPrevBtn: document.getElementById('search-prev'),
    searchNextBtn: document.getElementById('search-next'),
    mindmapToggle: document.getElementById('mindmap-toggle'),
    mindmapOverlay: document.getElementById('mindmap-overlay'),
    mindmapContainer: document.getElementById('mindmap-container'),
    mindmapClose: document.getElementById('mindmap-close'),
    modeToggle: document.getElementById('mode-toggle'),
    viewSimple: document.getElementById('view-simple'),
    viewAdvanced: document.getElementById('view-advanced')
};