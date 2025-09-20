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
    
    const searchNavControls = document.getElementById('search-nav-controls');
    const searchResultsCount = document.getElementById('search-results-count');
    const searchPrevBtn = document.getElementById('search-prev');
    const searchNextBtn = document.getElementById('search-next');

    let originalMainContentHTML = mainContent.innerHTML;
    let searchMatches = [];
    let currentMatchIndex = -1;
    const sectionHeaders = Array.from(mainContent.querySelectorAll('h1[id]'));


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

    // --- ИЗМЕНЕНИЕ: Полностью переработанная логика генерации оглавления ---
    const generateCollapsibleTOC = () => {
        tocContainer.innerHTML = '';
        const headings = mainContent.querySelectorAll('h1[id], h2[id]');
        const mainList = document.createElement('ul');
        let currentH1LI = null;
        let h1Counter = 0;

        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Counter++;
                // Создаем основной элемент списка для H1
                currentH1LI = document.createElement('li');
                currentH1LI.classList.add('toc-h1');

                // Создаем контейнер для кликабельной части (стрелка + ссылка)
                const headerDiv = document.createElement('div');
                headerDiv.classList.add('toc-h1-header');

                // Создаем ссылку H1
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h1_/, 'nav_');
                
                // Добавляем ссылку в контейнер
                headerDiv.appendChild(a);
                // Добавляем контейнер в li
                currentH1LI.appendChild(headerDiv);

                // Создаем список для подпунктов (H2)
                const subList = document.createElement('ul');
                subList.classList.add('toc-submenu');
                // ВАЖНО: Вкладываем список подпунктов ПРЯМО В LI основного пункта
                currentH1LI.appendChild(subList);
                
                mainList.appendChild(currentH1LI);
                // Сворачиваем все, кроме первого
                currentH1LI.classList.toggle('is-collapsed', h1Counter > 1);

            } else if (heading.tagName === 'H2' && currentH1LI) {
                // Если это H2, добавляем его в список подпунктов текущего H1
                const li = document.createElement('li');
                li.classList.add('toc-h2');
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.dataset.key = heading.dataset.key.replace(/^h2_/, 'nav_');
                li.appendChild(a);
                // Находим список подпунктов и добавляем элемент
                currentH1LI.querySelector('.toc-submenu').appendChild(li);
            }
        });
        
        // Добавляем стрелки/плейсхолдеры
        mainList.querySelectorAll('.toc-h1').forEach(h1li => {
            const subMenu = h1li.querySelector('.toc-submenu');
            const headerDiv = h1li.querySelector('.toc-h1-header');
            
            const toggle = document.createElement('span');
            toggle.classList.add('toc-toggle');
            // Вставляем стрелку/плейсхолдер в самое начало кликабельного контейнера
            headerDiv.prepend(toggle);

            if (subMenu && subMenu.children.length > 0) {
                 // Если есть подпункты, делаем стрелку кликабельной
                 toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    h1li.classList.toggle('is-collapsed');
                });
            } else {
                 // Иначе это просто плейсхолдер для выравнивания
                 toggle.classList.add('is-placeholder');
            }
        });

        tocContainer.appendChild(mainList);
    };
    
    // --- ЛОГИКА ПОИСКА (без изменений) ---
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
        mainContent.innerHTML = originalMainContentHTML;
        searchMatches = [];
        currentMatchIndex = -1;
        searchNavControls.style.display = 'none';
    
        const allTocH1s = tocContainer.querySelectorAll('.toc-h1');
        allTocH1s.forEach(li => {
            li.style.display = '';
            if (!searchTerm) {
                 li.classList.remove('is-collapsed');
            }
        });
    
        if (!searchTerm) {
            return;
        }
    
        const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        const matchedTocLIs = new Set();
        
        const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
        const nodesToReplace = [];
        let node;
        while(node = walker.nextNode()) {
            if (node.parentElement.tagName !== 'SCRIPT' && node.nodeValue.match(regex)) {
                 nodesToReplace.push(node);
            }
        }
    
        nodesToReplace.forEach(node => {
            const nodePosition = node.parentElement.getBoundingClientRect().top + window.scrollY;
            let parentH1 = null;
            for (let i = sectionHeaders.length - 1; i >= 0; i--) {
                const headerPosition = sectionHeaders[i].getBoundingClientRect().top + window.scrollY;
                if (nodePosition >= headerPosition) {
                    parentH1 = sectionHeaders[i];
                    break;
                }
            }
    
            if (parentH1 && parentH1.id) {
                const tocLink = tocContainer.querySelector(`a[href="#${parentH1.id}"]`);
                if (tocLink) {
                    const tocLI = tocLink.closest('.toc-h1');
                    if (tocLI) {
                        matchedTocLIs.add(tocLI);
                        tocLI.classList.remove('is-collapsed');
                    }
                }
            }
    
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
            if (node.parentNode) {
            const parent = node.parentNode; // Сначала сохраняем родительский элемент
            parent.replaceChild(fragment, node); // Затем производим замену текста
            
            // И теперь, если совпадение оказалось внутри <details>, открываем его
            const detailsParent = parent.closest('details');
            if (detailsParent && !detailsParent.open) {
                detailsParent.open = true;
            }
        }
        });
        
        allTocH1s.forEach(li => {
            if (!matchedTocLIs.has(li)) {
                li.style.display = 'none';
            }
        });
    
        searchMatches = Array.from(mainContent.querySelectorAll('mark'));
        if (searchMatches.length > 0) {
            currentMatchIndex = 0;
            searchNavControls.style.display = 'flex';
            updateSearchFocus();
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedSearch = debounce((term) => {
        performSearch(term);
    }, 300);

    tocSearch.addEventListener('input', (e) => {
        debouncedSearch(e.target.value.toLowerCase().trim());
    });

    searchNextBtn.addEventListener('click', () => {
        if (searchMatches.length === 0) return;
        currentMatchIndex = (currentMatchIndex + 1) % searchMatches.length;
        updateSearchFocus();
    });

    searchPrevBtn.addEventListener('click', () => {
        if (searchMatches.length === 0) return;
        currentMatchIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
        updateSearchFocus();
    });


    // --- ЛОГИКА ЛОКАЛИЗАЦИИ ---
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

    // --- ЛОГИКА ПОДСВЕТКИ ОГЛАВЛЕНИЯ ПРИ ПРОКРУТКЕ (SCROLL SPY) ---
    const initScrollSpy = () => {
        let currentActiveLink = null;
        const headings = mainContent.querySelectorAll('h1[id], h2[id]');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const link = tocContainer.querySelector(`a[href="#${id}"]`);
                    
                    if (link && link !== currentActiveLink) {
                        if (currentActiveLink) {
                            currentActiveLink.classList.remove('active');
                        }
                        link.classList.add('active');
                        currentActiveLink = link;
                        
                        const parentH1 = link.closest('.toc-h1');
                        if (parentH1 && parentH1.classList.contains('is-collapsed')) {
                            parentH1.classList.remove('is-collapsed');
                        }
                    }
                }
            });
        }, {
            rootMargin: '0px 0px -80% 0px',
            threshold: 0
        });

        headings.forEach(heading => observer.observe(heading));
    };
    
    // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const savedLang = localStorage.getItem('language') || 'en';

    generateCollapsibleTOC();
    applyTheme(savedTheme);
    applyLanguage(savedLang);
    initScrollSpy();

    originalMainContentHTML = mainContent.innerHTML;

    // --- ОСТАЛЬНАЯ ЛОГИКА (без изменений) ---
    const handleScroll = () => { scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    const initCopyCodeButtons_stub = () => {
        document.querySelectorAll('pre').forEach(block => {
            if (block.querySelector('code')) {
                const button = document.createElement('button');
                button.classList.add('copy-code-btn');
                button.innerText = 'Copy';
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

    // --- НОВАЯ ЛОГИКА: LIGHTBOX ДЛЯ ИЗОБРАЖЕНИЙ ---
    const initLightbox = () => {
        // Создаем элементы lightbox один раз и добавляем их в body
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.classList.add('lightbox-overlay');

        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('lightbox-content');
        
        const lightboxImage = document.createElement('img');
        lightboxImage.id = 'lightbox-image';
        
        const lightboxClose = document.createElement('span');
        lightboxClose.classList.add('lightbox-close');
        lightboxClose.innerHTML = '&times;';

        lightboxContent.appendChild(lightboxImage);
        lightboxOverlay.appendChild(lightboxContent);
        lightboxOverlay.appendChild(lightboxClose);
        document.body.appendChild(lightboxOverlay);

        // Переменные для управления состоянием зума и панорамирования
        let currentScale = 1;
        let isPanning = false;
        let startX, startY, transformX = 0, transformY = 0;

        // Функция для сброса трансформаций
        const resetTransform = () => {
            currentScale = 1;
            transformX = 0;
            transformY = 0;
            lightboxImage.style.transition = 'transform 0.3s ease';
            lightboxImage.style.transform = 'translate(0px, 0px) scale(1)';
            lightboxImage.classList.remove('is-zoomed');
            lightboxImage.style.cursor = 'grab';
        };
        
        // Функция для применения трансформаций
        const applyTransform = () => {
            lightboxImage.style.transform = `translate(${transformX}px, ${transformY}px) scale(${currentScale})`;
        };

        const openLightbox = (src) => {
            lightboxImage.src = src;
            lightboxOverlay.classList.add('show');
            document.body.classList.add('lightbox-active');
            // Сбрасываем зум и позицию при открытии нового изображения
            setTimeout(resetTransform, 50); // Небольшая задержка для CSS-анимации
        };

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('show');
            document.body.classList.remove('lightbox-active');
        };

        // Делегирование событий: слушаем клики в основном контенте
        document.querySelector('.main-content').addEventListener('click', (e) => {
            if (e.target.classList.contains('doc-image')) {
                e.preventDefault();
                openLightbox(e.target.src);
            }
        });

        // Обработчики закрытия
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxOverlay.addEventListener('click', (e) => {
            // Закрываем, если клик был по самому фону (overlay) 
            // или по его дочернему контейнеру (content), но не по картинке.
            if (e.target === lightboxOverlay || e.target === lightboxContent) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('show')) {
                closeLightbox();
            }
        });

        // --- Логика зума и панорамирования ---
        
        // Зум по колесику мыши
        lightboxContent.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const rect = lightboxImage.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = Math.max(1, Math.min(8, currentScale * delta));
            
            if (newScale === currentScale) return;

            transformX = mouseX - (mouseX - transformX) * (newScale / currentScale);
            transformY = mouseY - (mouseY - transformY) * (newScale / currentScale);
            currentScale = newScale;

            lightboxImage.style.transition = 'none';
            lightboxImage.classList.toggle('is-zoomed', currentScale > 1);
            lightboxImage.style.cursor = currentScale > 1 ? 'grab' : 'default';

            applyTransform();
        }, { passive: false });
        
        // Панорамирование (перетаскивание)
        lightboxImage.addEventListener('mousedown', (e) => {
            if (currentScale > 1) {
                e.preventDefault();
                isPanning = true;
                startX = e.clientX - transformX;
                startY = e.clientY - transformY;
                lightboxImage.style.cursor = 'grabbing';
                lightboxImage.style.transition = 'none';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (isPanning) {
                transformX = e.clientX - startX;
                transformY = e.clientY - startY;
                applyTransform();
            }
        });

        window.addEventListener('mouseup', () => {
            if (isPanning) {
                isPanning = false;
                lightboxImage.style.cursor = 'grab';
            }
        });
        
        // Двойной клик для зума/сброса
        lightboxContent.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('lightbox-close')) return;
            
            if (currentScale > 1) {
                resetTransform();
            } else {
                const rect = lightboxImage.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                currentScale = 2.5;
                
                transformX = -(mouseX * (currentScale - 1));
                transformY = -(mouseY * (currentScale - 1));
                
                lightboxImage.style.transition = 'transform 0.3s ease';
                lightboxImage.classList.add('is-zoomed');
                lightboxImage.style.cursor = 'grab';
                applyTransform();
            }
        });
    };

    // Инициализируем Lightbox
    initLightbox();
});
