document.addEventListener('DOMContentLoaded', function() {

    // --- КОНФИГУРАЦИЯ ЯЗЫКОВ ---
    // ИЗМЕНЕНО: Добавлены ссылки на SVG-изображения флагов
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
    // Теперь стрелки добавляются только при наличии подпунктов
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = ''; 
        const headings = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
        const mainList = document.createElement('ul');
        let currentH1LI = null;
        let h1Counter = 0;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Counter++;
                currentH1LI = document.createElement('li');
                currentH1LI.classList.add('toc-h1');
                
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h1_/, 'nav_');
                
                currentH1LI.appendChild(a);
                
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
        
        // Проходимся по всем H1 и добавляем стрелку, только если есть H2
        mainList.querySelectorAll('.toc-h1').forEach(h1li => {
            const subMenu = h1li.querySelector('.toc-submenu');
            if (subMenu && subMenu.children.length > 0) {
                 const toggle = document.createElement('span');
                 toggle.classList.add('toc-toggle');
                 h1li.prepend(toggle); // Вставляем стрелку в начало LI
                 toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    h1li.classList.toggle('is-collapsed');
                });
            } else {
                 h1li.classList.add('no-children'); // Добавляем класс для стилизации
            }
        });

        tocContainer.appendChild(mainList);
    };
    
    // --- ИЗМЕНЕНО: Поиск с подсветкой ---
    let originalHTML = mainContent.innerHTML; // Сохраняем исходный HTML
    
    const highlightText = (searchTerm) => {
        // Восстанавливаем исходный HTML перед новым поиском
        mainContent.innerHTML = originalHTML;

        if (!searchTerm) return; // Если поиск пуст, ничего не делаем

        const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        
        const textNodes = [];
        const walk = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walk.nextNode()) {
            // Исключаем скрипты, стили и текст внутри тега <mark>
            if(node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE' && node.parentElement.tagName !== 'MARK') {
                 textNodes.push(node);
            }
        }

        textNodes.forEach(node => {
            const matches = node.nodeValue.match(regex);
            if (matches) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                node.nodeValue.replace(regex, (match, offset) => {
                    const textBefore = document.createTextNode(node.nodeValue.slice(lastIndex, offset));
                    const mark = document.createElement('mark');
                    mark.textContent = match;
                    fragment.appendChild(textBefore);
                    fragment.appendChild(mark);
                    lastIndex = offset + match.length;
                });
                const textAfter = document.createTextNode(node.nodeValue.slice(lastIndex));
                fragment.appendChild(textAfter);
                node.parentNode.replaceChild(fragment, node);
            }
        });
    };
    
    tocSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        highlightText(searchTerm); // Вызываем функцию подсветки
    });
    
    // --- КНОПКИ КОПИРОВАНИЯ КОДА ---
    const initCopyCodeButtons = () => {
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

    // --- ИЗМЕНЕНО: ЛОГИКА ЛОКАЛИЗАЦИИ c SVG-флагами ---
    const populateLangOptions = () => {
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
        
        originalHTML = mainContent.innerHTML; // Обновляем сохраненный HTML после смены языка
        localStorage.setItem('language', lang);
    };
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    generateCollapsibleTOC();
    initCopyCodeButtons();
    populateLangOptions();
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    
    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);

    // --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ЯЗЫКА ---
    currentLangBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        langOptionsContainer.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        if (langOptionsContainer.classList.contains('show')) {
            langOptionsContainer.classList.remove('show');
        }
    });

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---
    const handleScroll = () => {
        scrollTopBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";

        let currentSectionId = '';
        const sections = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
        const offset = 80;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (window.scrollY >= section.offsetTop - offset) {
                currentSectionId = section.getAttribute('id');
                break;
            }
        }
        
        const navLinks = tocContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
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

