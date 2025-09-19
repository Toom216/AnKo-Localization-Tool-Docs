document.addEventListener('DOMContentLoaded', function() {

    // --- CONFIGURATION ---
    const languages = {
        'en': { name: 'English', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ec-1f1e7.svg' },
        'ru': { name: 'Русский', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f7-1f1fa.svg' },
        'de': { name: 'Deutsch', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e9-1f1ea.svg' },
        'es': { name: 'Español', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ea-1f1f8.svg' },
        'zh': { name: '中文', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e8-1f1f3.svg' },
        'hi': { name: 'हिन्दी', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ee-1f1f3.svg' },
    };

    // --- DOM ELEMENT CACHE ---
    const mainContent = document.querySelector('.main-content .content-wrapper');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const themeToggle = document.getElementById('theme-toggle');
    const tocContainer = document.getElementById('table-of-contents');
    const tocSearch = document.getElementById('toc-search');
    const currentLangBtn = document.getElementById('current-lang-btn');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const langOptionsContainer = document.getElementById('lang-options');
    const searchNavControls = document.getElementById('search-nav-controls');
    const searchResultsCount = document.getElementById('search-results-count');
    const searchPrevBtn = document.getElementById('search-prev');
    const searchNextBtn = document.getElementById('search-next');

    // --- STATE VARIABLES ---
    let originalMainContentHTML = '';
    let searchMatches = [];
    let currentMatchIndex = -1;
    let headingPositions = []; // For scroll spy

    // --- THEME SWITCHER ---
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    // --- TOC GENERATION ---
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = ''; 
        const headings = mainContent.querySelectorAll('h1[id], h2[id]');
        const mainList = document.createElement('ul');
        let currentH1LI = null;
        let h1Counter = 0;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Counter++;
                currentH1LI = document.createElement('li');
                currentH1LI.classList.add('toc-h1');
                
                const headerDiv = document.createElement('div');
                headerDiv.classList.add('toc-h1-header');

                const linkWrapper = document.createElement('div');
                linkWrapper.classList.add('toc-link-wrapper');
                
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h1_/, 'nav_');
                
                linkWrapper.appendChild(a);
                headerDiv.appendChild(linkWrapper);
                currentH1LI.appendChild(headerDiv);
                
                const subList = document.createElement('ul');
                subList.classList.add('toc-submenu');
                currentH1LI.appendChild(subList);
                
                mainList.appendChild(currentH1LI);
                currentH1LI.classList.toggle('is-collapsed', h1Counter > 1);

            } else if (heading.tagName === 'H2' && currentH1LI) {
                const li = document.createElement('li');
                li.classList.add('toc-h2');
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h2_/, 'nav_');
                li.appendChild(a);
                currentH1LI.querySelector('.toc-submenu').appendChild(li);
            }
        });
        
        mainList.querySelectorAll('.toc-h1').forEach(h1li => {
            const subMenu = h1li.querySelector('.toc-submenu');
            const headerDiv = h1li.querySelector('.toc-h1-header');
            
            const toggle = document.createElement('span');
            toggle.classList.add('toc-toggle');
            headerDiv.prepend(toggle);

            if (subMenu && subMenu.children.length > 0) {
                 toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    h1li.classList.toggle('is-collapsed');
                });
            } else {
                 toggle.classList.add('is-placeholder');
            }
        });

        tocContainer.appendChild(mainList);
    };
    
    // --- SEARCH LOGIC ---
    const updateSearchFocus = () => {
        searchMatches.forEach(match => match.classList.remove('current-match'));
        if (currentMatchIndex >= 0 && currentMatchIndex < searchMatches.length) {
            const currentEl = searchMatches[currentMatchIndex];
            currentEl.classList.add('current-match');
            currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            searchResultsCount.textContent = `${currentMatchIndex + 1} / ${searchMatches.length}`;
        }
    };

    const performSearch = (searchTerm) => {
        mainContent.innerHTML = originalMainContentHTML;
        searchMatches = [];
        currentMatchIndex = -1;
        searchNavControls.style.display = 'none';

        if (!searchTerm) {
             mainContent.querySelectorAll('[data-filtered]').forEach(el => el.style.display = '');
             tocContainer.querySelectorAll('[data-filtered]').forEach(el => el.style.display = '');
             return;
        }
        
        const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        
        const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.parentElement.offsetParent === null) continue;
            if (node.nodeValue.match(regex)) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                node.nodeValue.replace(regex, (match, offset) => {
                    const textBefore = node.nodeValue.slice(lastIndex, offset);
                    if(textBefore) fragment.appendChild(document.createTextNode(textBefore));
                    
                    const mark = document.createElement('mark');
                    mark.textContent = match;
                    fragment.appendChild(mark);
                    lastIndex = offset + match.length;
                });
                const textAfter = node.nodeValue.slice(lastIndex);
                if(textAfter) fragment.appendChild(document.createTextNode(textAfter));
                node.parentNode.replaceChild(fragment, node);
            }
        }
        
        searchMatches = Array.from(mainContent.querySelectorAll('mark'));
        if (searchMatches.length > 0) {
            currentMatchIndex = 0;
            searchNavControls.style.display = 'flex';
            updateSearchFocus();
        }
    };
    
    // --- LOCALIZATION ---
    const applyLanguage = (lang) => {
        if (!languages[lang]) lang = 'en';

        document.documentElement.lang = lang;
        currentLangFlag.innerHTML = `<img src="${languages[lang].flag}" class="flag-img" alt="${lang}">`;
        
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            const translation = window.translations[lang]?.[key] || window.translations['en']?.[key] || '';
            
            if (key === 'toc_search_placeholder' && elem.tagName === 'INPUT') {
                 if (translation) elem.placeholder = translation;
            } else if (translation !== undefined) {
                elem.innerHTML = translation;
            }
        });
        
        originalMainContentHTML = mainContent.innerHTML;
        localStorage.setItem('language', lang);
    };

    // --- REVISED SCROLL SPY LOGIC ---
    const cacheHeadingPositions = () => {
        headingPositions = Array.from(mainContent.querySelectorAll('h1[id], h2[id]')).map(h => ({
            id: h.id,
            top: h.offsetTop
        }));
    };

    const updateScrollSpy = () => {
        const scrollPosition = window.scrollY + 100; // Offset to activate a bit earlier
        let currentId = null;

        for (const heading of headingPositions) {
            if (scrollPosition >= heading.top) {
                currentId = heading.id;
            } else {
                break;
            }
        }

        tocContainer.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
        if (currentId) {
            const activeLink = tocContainer.querySelector(`a[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                const parentH1 = activeLink.closest('.toc-h1');
                if (parentH1 && parentH1.classList.contains('is-collapsed')) {
                     parentH1.classList.remove('is-collapsed');
                }
            }
        }
    };

    // --- INITIALIZATION ---
    const init = () => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const savedLang = localStorage.getItem('language') || 'en';

        applyTheme(savedTheme);
        generateCollapsibleTOC();
        applyLanguage(savedLang);
        cacheHeadingPositions(); // Cache positions after content is loaded
        updateScrollSpy(); // Initial check
        
        // --- EVENT LISTENERS ---
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
        
        tocSearch.addEventListener('input', (e) => performSearch(e.target.value.toLowerCase().trim()));
        searchNextBtn.addEventListener('click', () => {
            currentMatchIndex = (currentMatchIndex + 1) % searchMatches.length;
            updateSearchFocus();
        });
        searchPrevBtn.addEventListener('click', () => {
            currentMatchIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
            updateSearchFocus();
        });

        currentLangBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langOptionsContainer.classList.toggle('show');
        });

        langOptionsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-lang]');
            if (button) {
                e.stopPropagation();
                applyLanguage(button.dataset.lang);
                generateCollapsibleTOC(); // Re-generate TOC for new text
                applyLanguage(button.dataset.lang); // Re-apply language to new TOC
                cacheHeadingPositions(); // Re-cache positions
                langOptionsContainer.classList.remove('show');
            }
        });

        window.addEventListener('click', () => {
            if (langOptionsContainer.classList.contains('show')) {
                langOptionsContainer.classList.remove('show');
            }
        });
        
        window.addEventListener('scroll', updateScrollSpy);

        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', () => sidebar.classList.toggle('is-open'));
        }
        
        tocContainer.addEventListener('click', (e) => {
            if(e.target.closest('a') && sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
            }
        });
    };

    // Run initialization
    init();
});

