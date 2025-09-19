document.addEventListener('DOMContentLoaded', function() {

    // --- КОНФИГУРАЦИЯ ЯЗЫКОВ ---
    const languages = {
        'ru': { name: 'Русский', flag: '🇷🇺' },
        'en': { name: 'English', flag: '🇬🇧' },
        'de': { name: 'Deutsch', flag: '🇩🇪' },
        'es': { name: 'Español', flag: '🇪🇸' },
        'zh': { name: '中文', flag: '🇨🇳' },
        'hi': { name: 'हिन्दी', flag: '🇮🇳' },
    };

    // --- ПОИСК ЭЛЕМЕНТОВ DOM ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const themeToggle = document.getElementById('theme-toggle');
    const tocContainer = document.getElementById('table-of-contents');
    const tocSearch = document.getElementById('toc-search');
    const currentLangBtn = document.getElementById('current-lang-btn');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const langOptionsContainer = document.getElementById('lang-options');
    
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

    // --- ИСПРАВЛЕННАЯ ЛОГИКА ГЕНЕРАЦИИ ОГЛАВЛЕНИЯ (ToC) ---
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = ''; 
        const headings = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
        const mainList = document.createElement('ul');
        let currentSubList = null;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                const li = document.createElement('li');
                li.classList.add('toc-h1');
                
                const toggle = document.createElement('span');
                toggle.classList.add('toc-toggle');
                
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h1_/, 'nav_');
                
                li.appendChild(toggle);
                li.appendChild(a);
                
                mainList.appendChild(li);
                
                currentSubList = document.createElement('ul');
                currentSubList.classList.add('toc-submenu');
                li.appendChild(currentSubList);
                
                li.classList.toggle('is-collapsed', mainList.children.length > 1);

                // Вешаем обработчик именно на иконку-стрелку
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation(); // Предотвращаем "всплытие" события
                    li.classList.toggle('is-collapsed');
                });

            } else if (heading.tagName === 'H2' && currentSubList) {
                const li = document.createElement('li');
                li.classList.add('toc-h2');
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h2_/, 'nav_');
                li.appendChild(a);
                currentSubList.appendChild(li);
            }
        });

        tocContainer.appendChild(mainList);
    };

    // --- ФИЛЬТРАЦИЯ ОГЛАВЛЕНИЯ ---
    const initTocSearch = () => {
        tocSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allLinks = tocContainer.querySelectorAll('li.toc-h1, li.toc-h2');

            allLinks.forEach(li => {
                const linkText = li.querySelector('a').textContent.toLowerCase();
                const matches = linkText.includes(searchTerm);
                li.style.display = matches ? '' : 'none';
            });
            
            if(searchTerm){
                tocContainer.querySelectorAll('.toc-h1').forEach(h1 => {
                    const visibleChildren = h1.querySelectorAll('.toc-h2:not([style*="display: none"])');
                    // Если сам H1 не виден, но есть видимые дочерние H2, показываем H1
                    if (h1.style.display === 'none' && visibleChildren.length > 0) {
                        h1.style.display = '';
                    }
                    // Если есть видимые дети, разворачиваем родителя
                    if (visibleChildren.length > 0) {
                        h1.classList.remove('is-collapsed');
                    }
                });
            } else {
                tocContainer.querySelectorAll('.toc-h1').forEach((li, index) => {
                    li.classList.toggle('is-collapsed', index > 0);
                });
            }
        });
    };

    // --- КНОПКИ КОПИРОВАНИЯ КОДА ---
    const initCopyCodeButtons = () => {
        document.querySelectorAll('pre').forEach(block => {
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
        });
    };

    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---
    const populateLangOptions = (currentLang) => {
        langOptionsContainer.innerHTML = '';
        for (const langCode in languages) {
            if (langCode !== currentLang) {
                const option = document.createElement('button');
                option.dataset.lang = langCode;
                option.innerHTML = `<span class="flag">${languages[langCode].flag}</span><span>${languages[langCode].name}</span>`;
                option.addEventListener('click', () => {
                    applyLanguage(langCode);
                    langOptionsContainer.classList.remove('show');
                });
                langOptionsContainer.appendChild(option);
            }
        }
    };
    
    const applyLanguage = (lang) => {
        document.documentElement.lang = lang;
        currentLangFlag.textContent = languages[lang].flag;
        if(translations[lang]?.['toc_search_placeholder']) {
             tocSearch.placeholder = translations[lang]['toc_search_placeholder'];
        } else {
            tocSearch.placeholder = "Search..."; // Fallback
        }

        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            const translation = translations[lang]?.[key] || translations['en']?.[key] || translations['ru'][key];
             if (translation !== undefined) {
                elem.innerHTML = translation;
            }
        });

        localStorage.setItem('language', lang);
        populateLangOptions(lang);
    };
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    generateCollapsibleTOC();
    initTocSearch();
    initCopyCodeButtons();
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    const savedLang = localStorage.getItem('language') || 'ru';
    applyLanguage(savedLang);

    // --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ЯЗЫКА ---
    currentLangBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        langOptionsContainer.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        langOptionsContainer.classList.remove('show');
    });

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---
    const handleScroll = () => {
        scrollTopBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";

        let currentSectionId = '';
        const sections = document.querySelectorAll('h1[id], h2[id]');
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 80) { 
                currentSectionId = section.getAttribute('id');
            }
        });
        
        const navLinks = tocContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
                const parentLi = link.closest('.toc-h1');
                if (parentLi && parentLi.classList.contains('is-collapsed')) {
                    parentLi.classList.remove('is-collapsed');
                }
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => sidebar.classList.toggle('is-open'));
    }
    
    tocContainer.addEventListener('click', (e) => {
        if(e.target.tagName === 'A' && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
        }
    });
});

