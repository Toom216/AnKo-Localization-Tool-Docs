document.addEventListener('DOMContentLoaded', function() {

    // --- КОНФИГУРАЦИЯ ЯЗЫКОВ ---
    const languages = {
        'en': { name: 'English', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ec-1f1e7.svg' },
        'ru': { name: 'Русский', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f7-1f1fa.svg' },
        'de': { name: 'Deutsch', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e9-1f1ea.svg' },
        'es': { name: 'Español', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ea-1f1f8.svg' },
        'zh': { name: '中文', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e8-1f1f3.svg' },
        'hi': { name: 'हिन्दी', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ee-1f1f3.svg' },
    };

    // --- ПОИСК ЭЛЕМЕНТОВ DOM ---
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
    
    // ИЗМЕНЕНИЕ: Элементы для навигации по поиску
    const searchNavControls = document.getElementById('search-nav-controls');
    const searchResultsCount = document.getElementById('search-results-count');
    const searchPrevBtn = document.getElementById('search-prev');
    const searchNextBtn = document.getElementById('search-next');

    let originalMainContentHTML = mainContent.innerHTML;
    // ИЗМЕНЕНИЕ: Переменные для состояния поиска
    let searchMatches = [];
    let currentMatchIndex = -1;


    // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ ---
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // --- ЛОГИКА ГЕНЕРАЦИИ ОГЛАВЛЕНИЯ (ToC) ---
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
            if (subMenu && subMenu.children.length > 0) {
                 const toggle = document.createElement('span');
                 toggle.classList.add('toc-toggle');
                 
                 const headerDiv = h1li.querySelector('.toc-h1-header');
                 headerDiv.prepend(toggle);

                 toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    h1li.classList.toggle('is-collapsed');
                });
            } else {
                 const headerDiv = h1li.querySelector('.toc-h1-header');
                 if(headerDiv) {
                    headerDiv.classList.add('no-children');
                 }
            }
        });

        tocContainer.appendChild(mainList);
    };
    
    // --- ИЗМЕНЕНИЕ: ЛОГИКА ПОИСКА И НАВИГАЦИИ ПО НЕМУ ---
    const updateSearchFocus = () => {
        searchMatches.forEach(match => match.classList.remove('current-match'));
        if (currentMatchIndex >= 0 && currentMatchIndex < searchMatches.length) {
            const currentEl = searchMatches[currentMatchIndex];
            currentEl.classList.add('current-match');
            currentEl.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            searchResultsCount.textContent = `${currentMatchIndex + 1} / ${searchMatches.length}`;
        }
    };

    const performSearch = (searchTerm) => {
        // Сброс состояния перед новым поиском
        mainContent.innerHTML = originalMainContentHTML;
        searchMatches = [];
        currentMatchIndex = -1;
        searchNavControls.style.display = 'none';

        const sections = mainContent.querySelectorAll('h1[id]');
        const tocLinks = new Map();
        tocContainer.querySelectorAll('.toc-h1').forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                tocLinks.set(link.getAttribute('href').substring(1), li);
            }
        });

        if (!searchTerm) {
            sections.forEach(h1 => {
                let current = h1;
                current.style.display = '';
                while (current.nextElementSibling && current.nextElementSibling.tagName !== 'H1') {
                    current.nextElementSibling.style.display = '';
                    current = current.nextElementSibling;
                }
            });
            tocLinks.forEach(li => li.style.display = '');
            return;
        }
        
        const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        let hasMatches = false;
        
        sections.forEach(h1 => {
            let contentBlock = [h1];
            let current = h1;
            while (current.nextElementSibling && current.nextElementSibling.tagName !== 'H1') {
                contentBlock.push(current.nextElementSibling);
                current = current.nextElementSibling;
            }
            
            const blockText = contentBlock.map(el => el.textContent).join(' ').toLowerCase();
            const matchesInSection = blockText.includes(searchTerm);
            if (matchesInSection) hasMatches = true;
            
            contentBlock.forEach(el => el.style.display = matchesInSection ? '' : 'none');
            
            const tocLi = tocLinks.get(h1.id);
            if (tocLi) {
                tocLi.style.display = matchesInSection ? '' : 'none';
            }
        });

        if(hasMatches) {
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
        }
        
        searchMatches = Array.from(mainContent.querySelectorAll('mark'));
        if (searchMatches.length > 0) {
            currentMatchIndex = 0;
            searchNavControls.style.display = 'flex';
            updateSearchFocus();
        }
    };
    
    tocSearch.addEventListener('input', (e) => {
        performSearch(e.target.value.toLowerCase().trim());
    });

    searchNextBtn.addEventListener('click', () => {
        currentMatchIndex = (currentMatchIndex + 1) % searchMatches.length;
        updateSearchFocus();
    });

    searchPrevBtn.addEventListener('click', () => {
        currentMatchIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
        updateSearchFocus();
    });


    // --- КНОПКИ КОПИРОВАНИЯ КОДА ---
    const initCopyCodeButtons = () => { /* ... (без изменений) ... */ };

    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---
    const populateLangOptions = () => { /* ... (без изменений) ... */ };
    const applyLanguage = (lang) => {
        if (!languages[lang]) lang = 'en';

        document.documentElement.lang = lang;
        currentLangFlag.innerHTML = `<img src="${languages[lang].flag}" class="flag-img" alt="${lang}">`;
        
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            const translation = translations[lang]?.[key] || translations['en']?.[key] || translations['ru']?.[key];
            
            if (key === 'toc_search_placeholder' && elem.tagName === 'INPUT') {
                 if (translation) elem.placeholder = translation;
            } else if (translation !== undefined) {
                elem.innerHTML = translation;
            }
        });
        
        originalMainContentHTML = mainContent.innerHTML;
        localStorage.setItem('language', lang);
    };

    // --- ИЗМЕНЕНИЕ: ЛОГИКА ПОДСВЕТКИ ОГЛАВЛЕНИЯ ПРИ ПРОКРУТКЕ (SCROLL SPY) ---
    const initScrollSpy = () => {
        const headings = mainContent.querySelectorAll('h1[id], h2[id]');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const link = tocContainer.querySelector(`a[href="#${id}"]`);
                if (link) {
                    if (entry.isIntersecting && entry.intersectionRatio > 0) {
                        // Сначала убираем active со всех
                        tocContainer.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                        // Затем добавляем к текущему
                        link.classList.add('active');
                        // Раскрываем родительский H1, если он свернут
                        const parentH1 = link.closest('.toc-h1');
                        if (parentH1 && parentH1.classList.contains('is-collapsed')) {
                            parentH1.classList.remove('is-collapsed');
                        }
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        }, {
            rootMargin: '0px 0px -80% 0px', // Срабатывает, когда заголовок в верхних 20% экрана
            threshold: 0
        });

        headings.forEach(heading => observer.observe(heading));
    };
    
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const savedLang = localStorage.getItem('language') || 'en';

    initCopyCodeButtons();
    populateLangOptions();
    applyTheme(savedTheme);
    generateCollapsibleTOC();
    applyLanguage(savedLang);
    initScrollSpy(); // Запускаем слежение за прокруткой

    originalMainContentHTML = mainContent.innerHTML;


    // --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ЯЗЫКА ---
    currentLangBtn.addEventListener('click', (event) => { /* ... (без изменений) ... */ });
    window.addEventListener('click', () => { /* ... (без изменений) ... */ });

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---
    const handleScroll = () => { scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    if (mobileNavToggle) { /* ... (без изменений) ... */ }
    tocContainer.addEventListener('click', (e) => { /* ... (без изменений) ... */ });


    // --- Переопределение функций для демонстрации ---
    const initCopyCodeButtons_stub = () => {
        document.querySelectorAll('pre').forEach(block => {
            if (block.querySelector('code')) {
                const button = document.createElement('button');
                button.classList.add('copy-code-btn');
                button.innerText = 'Copy';
                button.addEventListener('click', () => {
                    const code = block.querySelector('code').innerText;
                    navigator.clipboard.writeText(code).then(() => {
                        button.innerText = 'Copied!';
                        button.classList.add('copied');
                        setTimeout(() => {
                            button.innerText = 'Copy';
                            button.classList.remove('copied');
                        }, 2000);
                    });
                });
                block.appendChild(button);
            }
        });
    };
    initCopyCodeButtons_stub();

    const populateLangOptions_stub = () => {
        langOptionsContainer.innerHTML = '';
        for (const langCode in languages) {
            const option = document.createElement('button');
            option.dataset.lang = langCode;
            option.innerHTML = `<img src="${languages[langCode].flag}" class="flag-img" alt="${langCode}"><span>${languages[langCode].name}</span>`;
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                applyLanguage(langCode);
                langOptionsContainer.classList.remove('show');
            });
            langOptionsContainer.appendChild(option);
        }
    };
    populateLangOptions_stub();
    
    currentLangBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        langOptionsContainer.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        if (langOptionsContainer.classList.contains('show')) {
            langOptionsContainer.classList.remove('show');
        }
    });
    
     if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => sidebar.classList.toggle('is-open'));
    }
    
    tocContainer.addEventListener('click', (e) => {
        if(e.target.closest('a') && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
        }
    });

});

