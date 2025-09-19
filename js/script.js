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
    const sections = document.querySelectorAll('h1[id], h2[id]');
    const navLinks = document.querySelectorAll('#table-of-contents a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const themeToggle = document.getElementById('theme-toggle');

    // Элементы нового переключателя языка
    const currentLangBtn = document.getElementById('current-lang-btn');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const currentLangCode = document.getElementById('current-lang-code');
    const langOptionsContainer = document.getElementById('lang-options');
    
    // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ ---
    
    /**
     * Применяет выбранную тему (light/dark) к сайту и сохраняет выбор.
     * @param {string} theme - Название темы ('light' или 'dark').
     */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---

    /**
     * Заполняет выпадающий список языков, исключая текущий выбранный язык.
     * @param {string} currentLang - Код текущего языка.
     */
    const populateLangOptions = (currentLang) => {
        langOptionsContainer.innerHTML = ''; // Очищаем список
        for (const langCode in languages) {
            if (langCode !== currentLang) {
                const option = document.createElement('button');
                option.dataset.lang = langCode;
                option.innerHTML = `
                    <span class="flag">${languages[langCode].flag}</span>
                    <span>${languages[langCode].name}</span>
                `;
                option.addEventListener('click', () => {
                    applyLanguage(langCode);
                    langOptionsContainer.classList.remove('show');
                });
                langOptionsContainer.appendChild(option);
            }
        }
    };
    
    /**
     * Применяет выбранный язык ко всем элементам с атрибутом data-key.
     * @param {string} lang - Код языка.
     */
    const applyLanguage = (lang) => {
        // Устанавливаем атрибут lang для всего документа
        document.documentElement.lang = lang;
        
        // Обновляем главную кнопку
        currentLangFlag.textContent = languages[lang].flag;
        currentLangCode.textContent = lang.toUpperCase();

        // Проходим по всем элементам для перевода
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            // Используем английский как запасной, если для выбранного языка нет перевода
            const translation = translations[lang]?.[key] || translations['en']?.[key] || translations['ru'][key];
             if (translation !== undefined) {
                elem.innerHTML = translation;
            }
        });

        localStorage.setItem('language', lang);
        populateLangOptions(lang); // Обновляем список в дропдауне
    };
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    const savedLang = localStorage.getItem('language') || 'ru';
    applyLanguage(savedLang);

    // --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ЯЗЫКА ---
    currentLangBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        langOptionsContainer.classList.toggle('show');
    });

    // Закрываем меню, если клик был вне его
    window.addEventListener('click', (event) => {
        if (!currentLangBtn.contains(event.target)) {
            langOptionsContainer.classList.remove('show');
        }
    });


    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---

    const handleScroll = () => {
        // Кнопка "Наверх"
        scrollTopBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";

        // Подсветка меню
        let currentSectionId = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 60) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSectionId);
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызов при загрузке

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
            }
        });
    });
});
