// Ждем, пока весь HTML-документ будет загружен и готов к работе
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

    // Элементы переключателя языка
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

    // --- НОВАЯ ФУНКЦИЯ: ГЕНЕРАЦИЯ СВОРАЧИВАЕМОГО ОГЛАВЛЕНИЯ (ToC) ---
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = ''; // Очищаем контейнер
        const headings = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
        
        const mainList = document.createElement('ul');
        let currentSubList = null;
        let currentParentLi = null;

        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = '#' + heading.id;
            // Превращаем data-key заголовка (h1_.../h2_...) в ключ для навигации (nav_...)
            a.dataset.key = heading.dataset.key.replace(/^(h1|h2)_/, 'nav_');
            
            li.appendChild(a);

            if (heading.tagName === 'H1') {
                li.classList.add('toc-h1');
                
                // Создаем иконку для сворачивания/разворачивания
                const toggle = document.createElement('span');
                toggle.classList.add('toc-toggle');
                // Вставляем иконку перед ссылкой
                a.before(toggle);
                
                mainList.appendChild(li);
                currentSubList = document.createElement('ul');
                currentSubList.classList.add('toc-submenu');
                li.appendChild(currentSubList);
                
                // Закрываем по умолчанию все, кроме первого раздела
                li.classList.toggle('is-collapsed', mainList.children.length > 1);
                
                // Добавляем обработчик клика на весь элемент `li` для удобства
                li.addEventListener('click', (e) => {
                    // Предотвращаем переход по ссылке, если клик был не по ней
                    if (e.target.tagName !== 'A') {
                       li.classList.toggle('is-collapsed');
                    }
                });

            } else if (heading.tagName === 'H2' && currentSubList) {
                li.classList.add('toc-h2');
                currentSubList.appendChild(li);
            }
        });

        tocContainer.appendChild(mainList);
    };

    // --- НОВАЯ ФУНКЦИЯ: ФИЛЬТРАЦИЯ ОГЛАВЛЕНИЯ ---
    const initTocSearch = () => {
        tocSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allLinks = tocContainer.querySelectorAll('li');

            allLinks.forEach(li => {
                const linkText = li.querySelector('a').textContent.toLowerCase();
                const matches = linkText.includes(searchTerm);
                li.style.display = matches ? '' : 'none';
            });
            
            // Показываем родительские элементы, если дочерний элемент соответствует поиску
            if(searchTerm){
                const visibleSubItems = tocContainer.querySelectorAll('.toc-h2');
                visibleSubItems.forEach(subItem => {
                    if(subItem.style.display !== 'none'){
                        const parent = subItem.closest('.toc-h1');
                        if(parent) {
                            parent.style.display = '';
                            parent.classList.remove('is-collapsed'); // Разворачиваем родителя
                        }
                    }
                });
            } else {
                 // Сворачиваем все, кроме первого, когда поиск очищен
                tocContainer.querySelectorAll('.toc-h1').forEach((li, index) => {
                    li.classList.toggle('is-collapsed', index > 0);
                });
            }
        });
    };

    // --- НОВАЯ ФУНКЦИЯ: ДОБАВЛЕНИЕ КНОПОК КОПИРОВАНИЯ КОДА ---
    const initCopyCodeButtons = () => {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
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

    window.addEventListener('click', (event) => {
        if (!currentLangBtn.contains(event.target)) {
            langOptionsContainer.classList.remove('show');
        }
    });

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---
    const handleScroll = () => {
        scrollTopBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";

        // Подсветка меню по текущему разделу
        let currentSectionId = '';
        const sections = document.querySelectorAll('h1[id], h2[id]');
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 80) { // -80px offset for better accuracy
                currentSectionId = section.getAttribute('id');
            }
        });
        
        const navLinks = tocContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
                // Разворачиваем родителя активного элемента
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
    
    // Закрываем мобильное меню при клике на ссылку в нем
    tocContainer.addEventListener('click', (e) => {
        if(e.target.tagName === 'A' && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
        }
    });
});
