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
    
    let originalMainContentHTML = mainContent.innerHTML;

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

    // --- ИЗМЕНЕНО: ЛОГИКА ГЕНЕРАЦИИ ОГЛАВЛЕНИЯ (ToC) ---
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
                
                // ИСПРАВЛЕНИЕ 2: Создаем div-обертку для заголовка (toggle + link)
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
                 
                 // ИСПРАВЛЕНИЕ 2: Вставляем переключатель в новую div-обертку
                 const headerDiv = h1li.querySelector('.toc-h1-header');
                 headerDiv.prepend(toggle);

                 toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    h1li.classList.toggle('is-collapsed');
                });
            } else {
                 // ИСПРАВЛЕНИЕ 2: Добавляем класс к обертке, если нет дочерних элементов
                 const headerDiv = h1li.querySelector('.toc-h1-header');
                 if(headerDiv) {
                    headerDiv.classList.add('no-children');
                 }
            }
        });

        tocContainer.appendChild(mainList);
    };
    
    // --- Поиск с фильтрацией и подсветкой ---
    const performSearch = (searchTerm) => {
        mainContent.innerHTML = originalMainContentHTML; // Восстанавливаем исходный HTML

        const sections = mainContent.querySelectorAll('h1[id]');
        const tocLinks = new Map();
        tocContainer.querySelectorAll('.toc-h1').forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                tocLinks.set(link.getAttribute('href').substring(1), li);
            }
        });

        if (!searchTerm) {
            // Если поиск пуст, показываем все
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
        
        sections.forEach(h1 => {
            let contentBlock = [h1];
            let current = h1;
            while (current.nextElementSibling && current.nextElementSibling.tagName !== 'H1') {
                contentBlock.push(current.nextElementSibling);
                current = current.nextElementSibling;
            }
            
            const blockText = contentBlock.map(el => el.textContent).join(' ').toLowerCase();
            const matches = blockText.includes(searchTerm);
            
            contentBlock.forEach(el => el.style.display = matches ? '' : 'none');
            
            const tocLi = tocLinks.get(h1.id);
            if (tocLi) {
                tocLi.style.display = matches ? '' : 'none';
            }
        });

        // Подсветка только в видимых элементах
        const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.parentElement.offsetParent === null) continue; // Пропускаем скрытые элементы

            const matches = node.nodeValue.match(regex);
            if (matches) {
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
    };
    
    tocSearch.addEventListener('input', (e) => {
        performSearch(e.target.value.toLowerCase().trim());
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
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    initCopyCodeButtons();
    populateLangOptions();
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    
    const savedLang = localStorage.getItem('language') || 'en';
    
    // ИСПРАВЛЕНИЕ 1: Сначала генерируем структуру оглавления, потом применяем язык ко всей странице
    generateCollapsibleTOC();
    applyLanguage(savedLang);

    originalMainContentHTML = mainContent.innerHTML; // Сохраняем HTML после всех инициализаций


    // --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ЯЗЫКА ---
    currentLangBtn.addEventListener('click', (event) => { /* ... (без изменений) ... */ });
    window.addEventListener('click', () => { /* ... (без изменений) ... */ });

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---
    const handleScroll = () => { /* ... (без изменений) ... */ };
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
