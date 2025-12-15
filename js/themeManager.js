import { DOM } from './dom.js';

/**
 * Handles theme switching (light/dark) and persists the choice
 * in localStorage. Also updates syntax highlighting theme.
 */
export const ThemeManager = {
    // Define available themes
    themes: {
        'light': { 
            name: 'Light', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2600.svg' 
        },
        'dark': { 
            name: 'Dark', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f319.svg' 
        },
        'high-contrast': { 
            name: 'High Contrast', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f506.svg' // 🔆 High Brightness
        },
        'blue': { 
            name: 'Blue', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f499.svg' // 💙 Blue Heart
        },
        'green': { 
            name: 'Green', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f49a.svg' // 💚 Green Heart
        },
        'purple': { 
            name: 'Purple', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f49c.svg' // 💜 Purple Heart
        },
        'orange': { 
            name: 'Orange', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9e1.svg' // 🧡 Orange Heart
        },
        'pink': { 
            name: 'Pink', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f497.svg' // 💗 Growing Heart
        },
        'teal': { 
            name: 'Teal', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9ca.svg' // 🧊 Ice Cube (Substitute for Teal Heart)
        },
        'light-neutral': { 
            name: 'Light Neutral', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/26aa.svg' // ⚪ White Circle
        },
        'dark-deep': { 
            name: 'Deep Dark', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/26ab.svg' // ⚫ Black Circle
        },
        'gray': { 
            name: 'Gray', 
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f5a4.svg' // 🖤 Black Heart
        }
    },
    currentTheme: 'light',

    init() {
        this.populateOptions();
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.apply(savedTheme);
        
        DOM.themeToggle.addEventListener('click', (e) => this.toggleThemeDropdown(e));
    },
    
    /**
     * Manages the theme dropdown and its adaptive display.
     */
    toggleThemeDropdown(e) {
        e.stopPropagation(); // Stops event from reaching document listener
        const container = DOM.themeOptionsContainer; // Use explicit container reference
        
        // 2. При открытии другой менюшки, пока активна предыдущая - нужно закрывать предыдущую
        // Close language dropdown if it's open
        if (DOM.langOptionsContainer.classList.contains('show')) {
            DOM.langOptionsContainer.classList.remove('show');
            DOM.langOptionsContainer.classList.remove('adaptive');
        }

        const isOpening = !container.classList.contains('show');

        // Always remove adaptive first to re-calculate
        container.classList.remove('adaptive');

        // Close other dropdowns if opening this one
        if (isOpening) {
            document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
                if (dropdown !== container) {
                    dropdown.classList.remove('show');
                    dropdown.classList.remove('adaptive');
                }
            });
        }

        container.classList.toggle('show', isOpening);

        if (isOpening) {
            requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const sidebarRect = DOM.sidebar.getBoundingClientRect();
                const isMobile = window.innerWidth <= 900;

                // Enhanced condition for adding 'adaptive' class.
                if (isMobile || rect.bottom > window.innerHeight || rect.right > sidebarRect.right) {
                    container.classList.add('adaptive');
                }
            });
        }
    },
    apply(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        localStorage.setItem('theme', theme);

        const hljsTheme = document.getElementById('hljs-theme');
        if (hljsTheme) {
            let themeUrl;
            switch(theme) {
                case 'dark':
                case 'high-contrast':
                case 'blue':
                case 'green':
                case 'purple':
                case 'orange':
                case 'pink':
                case 'teal':
                case 'dark-deep':
                case 'gray':
                    themeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
                    break;
                case 'light':
                case 'light-neutral':
                default:
                    themeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
                    break;
            }
            hljsTheme.href = themeUrl;
        }
        
        // Update theme toggle button icon
        const themeData = this.themes[theme];
        if (themeData) {
            if (themeData.icon.includes('.svg')) {
                DOM.themeToggle.innerHTML = `<span class="theme-icon"><img src="${themeData.icon}" class="flag-img" alt="${themeData.name}"></span>`;
            } else {
                DOM.themeToggle.innerHTML = `<span class="theme-icon">${themeData.icon}</span>`;
            }
        }
        
        // Update active state in dropdown
        const dropdown = DOM.themeOptionsContainer; // Use explicit container
        if (dropdown) {
            const buttons = dropdown.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.dataset.theme === theme) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    },

    populateOptions() {
        const container = DOM.themeOptionsContainer; // Use explicit container
        if (!container) return;
        
        container.innerHTML = '';
        for (const [themeKey, themeData] of Object.entries(this.themes)) {
            const option = document.createElement('button');
            option.dataset.theme = themeKey;
            
            if (themeData.icon.includes('.svg')) {
                option.innerHTML = `<img src="${themeData.icon}" class="flag-img" alt="${themeKey}"><span>${themeData.name}</span>`;
            } else {
                option.innerHTML = `<span class="theme-icon">${themeData.icon}</span><span>${themeData.name}</span>`;
            }
            
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation
                this.apply(themeKey);
                
                // 3. при выборе темы менюшка выбора темы должна закрыться
                container.classList.remove('show');
                container.classList.remove('adaptive');
            });
            
            container.appendChild(option);
        }
    }
};