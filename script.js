document.addEventListener('DOMContentLoaded', function() {

    // --- КОНФИГУРАЦИЯ ЯЗЫКОВ ---
    const languages = {
        'en': { name: 'English', flag: '🇬🇧' },
        'ru': { name: 'Русский', flag: '🇷🇺' },
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

    // --- ЛОГИКА ГЕНЕРАЦИИ ОГЛАВЛЕНИЯ (ToC) ---
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = ''; 
        const headings = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
        const mainList = document.createElement('ul');
        let currentSubList = null;
        let h1Counter = 0;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Counter++;
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
                
                // Сворачиваем все разделы, кроме первого
                li.classList.toggle('is-collapsed', h1Counter > 1);

                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
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

    // --- ИЗМЕНЕНО: Глобальный поиск по контенту ---
    const initGlobalSearch = () => {
        tocSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const allHeadings = document.querySelectorAll('.main-content h1[id], .main-content h2[id]');
            
            // Создаем карту для быстрого доступа к элементам ToC по ID заголовка
            const tocLinks = new Map();
            tocContainer.querySelectorAll('a[href]').forEach(a => {
                tocLinks.set(a.getAttribute('href').substring(1), a.parentElement);
            });
    
            allHeadings.forEach(heading => {
                // Собираем весь контент секции: заголовок + все последующие элементы до следующего заголовка
                let contentBlock = [heading];
                let current = heading;
                while (current.nextElementSibling && !['H1', 'H2'].includes(current.nextElementSibling.tagName)) {
                    contentBlock.push(current.nextElementSibling);
                    current = current.nextElementSibling;
                }
    
                // Проверяем наличие поискового запроса в тексте секции
                const blockText = contentBlock.map(el => el.textContent).join(' ').toLowerCase();
                const matches = blockText.includes(searchTerm);
    
                // Показываем или скрываем всю секцию в основном контенте
                contentBlock.forEach(el => {
                    el.style.display = matches ? '' : 'none';
                });
                
                // Показываем или скрываем соответствующий пункт в оглавлении
                const tocLi = tocLinks.get(heading.id);
                if (tocLi) {
                    tocLi.style.display = matches ? '' : 'none';
                }
            });
    
            // Обновляем состояние родительских H1 в оглавлении
            tocContainer.querySelectorAll('.toc-h1').forEach(h1 => {
                const h1LinkVisible = h1.querySelector('a').parentElement.style.display !== 'none';
                const visibleChildren = h1.querySelectorAll('.toc-h2:not([style*="display: none"])').length > 0;
    
                if (visibleChildren && !h1LinkVisible) {
                    h1.style.display = ''; // Показываем родителя, если видны дочерние элементы
                }
    
                if (searchTerm && (h1LinkVisible || visibleChildren)) {
                    h1.classList.remove('is-collapsed'); // Разворачиваем, если есть совпадения
                }
            });
        });
    };

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

    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---
    const populateLangOptions = () => {
        langOptionsContainer.innerHTML = '';
        for (const langCode in languages) {
            const option = document.createElement('button');
            option.dataset.lang = langCode;
            option.innerHTML = `<span class="flag">${languages[langCode].flag}</span><span>${languages[langCode].name}</span>`;
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                applyLanguage(langCode);
                langOptionsContainer.classList.remove('show');
            });
            langOptionsContainer.appendChild(option);
        }
    };
    
    const applyLanguage = (lang) => {
        if (!languages[lang]) lang = 'en'; // Безопасность

        document.documentElement.lang = lang;
        currentLangFlag.textContent = languages[lang].flag;
        
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            // Улучшенный поиск перевода: текущий язык -> английский (fallback) -> русский (крайний случай)
            const translation = translations[lang]?.[key] || translations['en']?.[key] || translations['ru']?.[key];
            
            if (key === 'toc_search_placeholder' && elem.tagName === 'INPUT') {
                 if (translation) elem.placeholder = translation;
            } else if (translation !== undefined) {
                elem.innerHTML = translation;
            }
        });

        localStorage.setItem('language', lang);
    };
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    generateCollapsibleTOC();
    initGlobalSearch(); // Используем новую функцию поиска
    initCopyCodeButtons();
    populateLangOptions();
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // ИЗМЕНЕНО: Язык по умолчанию теперь английский
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
        const offset = 80; // Смещение для более точной активации

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
    handleScroll(); // Вызываем один раз при загрузке для инициализации

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
