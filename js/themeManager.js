import { DOM } from './dom.js';

/**
 * Handles theme switching (light/dark) and persists the choice
 * in localStorage. Also updates syntax highlighting theme.
 */
export const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.apply(savedTheme);
        DOM.themeToggle.addEventListener('click', () => this.toggle());
    },

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        const sunIcon = `<img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2600.svg" class="theme-icon" alt="Light mode">`;
        const moonIcon = `<img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f319.svg" class="theme-icon" alt="Dark mode">`;
        DOM.themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;

        localStorage.setItem('theme', theme);

        const hljsTheme = document.getElementById('hljs-theme');
        if (hljsTheme) {
            const themeUrl = theme === 'dark'
                ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
                : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
            hljsTheme.href = themeUrl;
        }
    },

    toggle() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        this.apply(newTheme);
    }
};
