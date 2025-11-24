import { DOM } from './dom.js';

/**
 * Manages language loading, applying translations, and building a
 * cross-language search index.
 */
export const LanguageHandler = {
    languages: {
        'en': { name: 'English', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ec-1f1e7.svg' },
        'uk': { name: 'Українська', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1e6.svg' },
        'pl': { name: 'Polski', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f5-1f1f1.svg' },
        'de': { name: 'Deutsch', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e9-1f1ea.svg' },
        'es': { name: 'Español', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ea-1f1f8.svg' },
        'fr': { name: 'Français', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1eb-1f1f7.svg' },
        'pt': { name: 'Português', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e7-1f1f7.svg' },
        'ja': { name: '日本語', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ef-1f1f5.svg' },
        'ko': { name: '한국어', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f0-1f1f7.svg' },
        'zh': { name: '中文', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e8-1f1f3.svg' },
        'ru': { name: 'Русский', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f7-1f1fa.svg' },
        'hi': { name: 'हिन्दी', flag: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1ee-1f1f3.svg' }
    },
    translationsCache: {},
    searchIndex: [],
    isSearchReady: false,

    async init() {
        this.populateOptions();
        DOM.currentLangBtn.addEventListener('click', (e) => this.toggleLanguageDropdown(e));
        window.addEventListener('click', () => {
            if (DOM.langOptionsContainer.classList.contains('show')) {
                DOM.langOptionsContainer.classList.remove('show');
            }
        });

        this.prepareSearchIndex();

        const savedLang = localStorage.getItem('language') || 'en';
        await this.apply(savedLang);
    },

    /**
     * Manages the language dropdown and its adaptive display.
     */
    toggleLanguageDropdown(e) {
        e.stopPropagation();
        const container = DOM.langOptionsContainer;
        const isOpening = !container.classList.contains('show');

        // Always remove adaptive first to re-calculate
        container.classList.remove('adaptive');

        container.classList.toggle('show', isOpening);

        if (isOpening) {
            requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const sidebarRect = DOM.sidebar.getBoundingClientRect();
                const isMobile = window.innerWidth <= 900;

                // MODIFIED: Enhanced condition for adding 'adaptive' class.
                // On mobile, always add it to apply mobile-specific compact styles.
                // On desktop, add it if it overflows the window or sidebar.
                if (isMobile || rect.bottom > window.innerHeight || rect.right > sidebarRect.right) {
                    container.classList.add('adaptive');
                }
            });
        }
    },

    async prepareSearchIndex() {
        await this.loadAllTranslations();
        this.buildSearchIndex();
    },

    async loadAllTranslations() {
        const langPromises = Object.keys(this.languages).map(lang => this.loadFile(lang));
        try {
            await Promise.all(langPromises);
        } catch (error) {
            console.error("Failed to load one or more language files for search index.", error);
        }
    },

    buildSearchIndex() {
        const allKeys = new Set();
        Object.values(this.translationsCache).forEach(translation => {
            Object.keys(translation).forEach(key => allKeys.add(key));
        });

        this.searchIndex = [];
        allKeys.forEach(key => {
            let allText = '';
            for (const lang in this.languages) {
                if (this.translationsCache[lang]?.[key]) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = DOMPurify.sanitize(this.translationsCache[lang][key]);
                    allText += (tempDiv.textContent || tempDiv.innerText || '') + ' ';
                }
            }
            this.searchIndex.push({ key, allText: allText.trim().toLowerCase() });
        });
        this.isSearchReady = true;
        console.log(`Search index built with ${this.searchIndex.length} keys.`);
    },

    async loadFile(lang) {
        if (this.translationsCache[lang]) return this.translationsCache[lang];
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const translations = await response.json();
            this.translationsCache[lang] = translations;
            return translations;
        } catch (error) {
            console.error(`Could not load translation file for: ${lang}`, error);
            throw error;
        }
    },

    async apply(lang) {
        const validLang = this.languages[lang] ? lang : 'en';
        try {
            // MODIFIED: Fallback strategy.
            // Ensure we load the requested language.
            // If the requested language is NOT English, allow loading English as well to ensure fallback availability.
            const promises = [this.loadFile(validLang)];

            if (validLang !== 'en') {
                promises.push(this.loadFile('en'));
            }

            await Promise.all(promises);

            document.documentElement.lang = validLang;
            DOM.currentLangFlag.innerHTML = `<img src="${this.languages[validLang].flag}" class="flag-img" alt="${validLang}">`;
            await this.applyTranslationsToContainer(document.body, validLang);
            localStorage.setItem('language', validLang);
        } catch (error) {
            console.error(`Failed to apply language ${validLang}:`, error);
            if (validLang !== 'en') {
                localStorage.setItem('language', 'en');
                location.reload();
            } else {
                DOM.mainContent.innerHTML = `
                    <h1 data-key="error_loading_title">Loading Error</h1>
                    <p data-key="error_loading_message">Please check your connection and refresh.</p>
                `;
            }
        }
    },

    async applyTranslationsToContainer(container, lang) {
        // Ensure DOMPurify is available before proceeding.
        if (typeof DOMPurify === 'undefined') {
            console.error('DOMPurify is not loaded. Cannot apply translations securely.');
            return;
        }

        const translations = this.translationsCache[lang];
        // MODIFIED: Get fallback translations (English)
        const fallbackTranslations = this.translationsCache['en'];

        if (!translations) return;

        container.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            let translation = translations[key];

            // MODIFIED: Fallback logic. 
            // If translation is missing in current lang, and we are not in EN, try EN.
            if (translation === undefined && lang !== 'en' && fallbackTranslations) {
                translation = fallbackTranslations[key];
            }

            if (translation === undefined) return;

            // Use textContent for code blocks to prevent HTML injection and fix highlight.js warnings.
            // For all other elements, sanitize the translation with DOMPurify before setting innerHTML
            // to support formatting tags like <strong> while preventing XSS.
            if (elem.tagName === 'CODE') {
                elem.textContent = translation;
            } else if (elem.matches('input[placeholder]')) {
                elem.placeholder = translation;
            } else if (elem.matches('[title]')) {
                elem.title = translation;
            } else {
                elem.innerHTML = DOMPurify.sanitize(translation);
            }
        });
    },

    populateOptions() {
        DOM.langOptionsContainer.innerHTML = '';
        for (const [langCode, langData] of Object.entries(this.languages)) {
            const option = document.createElement('button');
            option.dataset.lang = langCode;
            option.innerHTML = DOMPurify.sanitize(`<img src="${langData.flag}" class="flag-img" alt="${langCode}"><span>${langData.name}</span>`);
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                if (langCode !== (localStorage.getItem('language') || 'en')) {
                    localStorage.setItem('language', langCode);
                    location.reload();
                }
                DOM.langOptionsContainer.classList.remove('show');
            });
            DOM.langOptionsContainer.appendChild(option);
        }
    }
};
