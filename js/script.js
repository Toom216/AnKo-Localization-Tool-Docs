// Ждем, пока весь HTML-документ будет загружен и готов к работе
document.addEventListener('DOMContentLoaded', function() {

    // --- ПОИСК ЭЛЕМЕНТОВ DOM ---
    // Собираем все необходимые элементы в константы для быстрого доступа
    const sections = document.querySelectorAll('h1[id], h2[id]');
    const navLinks = document.querySelectorAll('#table-of-contents a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const themeToggle = document.getElementById('theme-toggle');
    const langButtons = {
        ru: document.getElementById('lang-ru'),
        en: document.getElementById('lang-en')
    };
    
    // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ ---
    
    /**
     * Применяет выбранную тему (light/dark) к сайту и сохраняет выбор.
     * @param {string} theme - Название темы ('light' или 'dark').
     */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        // Сохраняем выбор темы в localStorage, чтобы он сохранился при перезагрузке
        localStorage.setItem('theme', theme);
    };

    // Вешаем обработчик клика на кнопку смены темы
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---

    /**
     * Применяет выбранный язык ко всем элементам с атрибутом data-key.
     * @param {string} lang - Код языка ('ru' или 'en').
     */
    const applyLanguage = (lang) => {
        // Устанавливаем атрибут lang для всего документа (важно для доступности и SEO)
        document.documentElement.lang = lang;
        
        // Проходим по всем элементам, которые нужно перевести
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            // Проверяем, существует ли перевод для данного ключа и языка
            if (translations[lang] && translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            } else if (translations['ru'][key]) {
                // Если перевода нет, используем русский как запасной вариант
                elem.innerHTML = translations['ru'][key];
            }
        });

        // Обновляем стиль активной кнопки языка
        for (const key in langButtons) {
            langButtons[key].classList.toggle('active', key === lang);
        }
        // Сохраняем выбор языка в localStorage
        localStorage.setItem('language', lang);
    };

    // Добавляем обработчики кликов на кнопки выбора языка
    Object.keys(langButtons).forEach(lang => {
        langButtons[lang].addEventListener('click', () => applyLanguage(lang));
    });
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    
    // 1. Устанавливаем тему: берем сохраненную, или системную, или светлую по умолчанию
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // 2. Устанавливаем язык: берем сохраненный или русский по умолчанию
    const savedLang = localStorage.getItem('language') || 'ru';
    applyLanguage(savedLang);

    // --- ЛОГИКА СКРОЛЛА И МОБИЛЬНОЙ НАВИГАЦИИ ---

    /**
     * Обработчик события прокрутки страницы.
     * Показывает/скрывает кнопку "Наверх" и подсвечивает активный пункт меню.
     */
    const handleScroll = () => {
        // Кнопка "Наверх"
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }

        // Подсветка меню (Scroll Spy)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) { // Смещение в 60px для точности
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    // Вешаем обработчик прокрутки на окно
    window.addEventListener('scroll', handleScroll);
    // Вызываем один раз при загрузке, чтобы установить начальное состояние
    handleScroll();

    // Обработчик клика по кнопке "Наверх"
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Обработчик для кнопки мобильного меню
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
    }

    // Закрываем мобильное меню при клике на любую ссылку в нем
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
            }
        });
    });
});
