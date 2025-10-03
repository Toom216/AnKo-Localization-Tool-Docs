import { DOM } from './dom.js';

/**
 * A class for displaying images in a full-screen overlay (lightbox).
 * Supports zooming with the mouse wheel and panning dragged images.
 */
export class Lightbox {
    constructor() {
        this.createDOM();
        this.bindEvents();
        this.scale = 1;
        this.isPanning = false;
        this.start = { x: 0, y: 0 };
        this.transform = { x: 0, y: 0 };
    }

    createDOM() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';
        this.overlay.innerHTML = `
            <div class="lightbox-content">
                <img id="lightbox-image" alt="Enlarged view" data-key="lightbox_image_alt">
            </div>
            <button class="lightbox-close" aria-label="Close image viewer" data-key="lightbox_aria_close">&times;</button>
        `;
        document.body.appendChild(this.overlay);
        this.image = document.getElementById('lightbox-image');
        this.content = this.overlay.querySelector('.lightbox-content');
        this.closeBtn = this.overlay.querySelector('.lightbox-close');
    }


    bindEvents() {
        DOM.mainContent.addEventListener('click', e => this.onContentClick(e));
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', e => this.onOverlayClick(e));
        this.content.addEventListener('wheel', e => this.onWheel(e), { passive: false });
        this.image.addEventListener('mousedown', e => this.onMouseDown(e));
        this.content.addEventListener('dblclick', e => this.onDoubleClick(e));
        window.addEventListener('mousemove', e => this.onMouseMove(e));
        window.addEventListener('mouseup', () => this.onMouseUp());
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    onContentClick(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.content-wrapper')) {
            e.preventDefault();
            this.open(e.target.src);
        }
    }

    onOverlayClick(e) {
        if (e.target === this.overlay || e.target === this.content) {
            this.close();
        }
    }

    open(src) {
        this.image.src = src;
        this.overlay.classList.add('show');
        document.body.classList.add('lightbox-active');
        this.resetTransform();
        document.addEventListener('keydown', this.handleKeyDown);
        this.lastFocusedElement = document.activeElement;
        setTimeout(() => this.closeBtn.focus(), 50);
    }

    close() {
        this.overlay.classList.remove('show');
        document.body.classList.remove('lightbox-active');
        document.removeEventListener('keydown', this.handleKeyDown);
        if (this.lastFocusedElement) this.lastFocusedElement.focus();
    }

    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
            return;
        }

        // ИЗМЕНЕНО: Реализация "захвата фокуса"
        if (e.key === 'Tab') {
            const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const focusableElements = Array.from(this.overlay.querySelectorAll(focusableElementsSelector));

            if (focusableElements.length === 0) {
                e.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const currentIndex = focusableElements.indexOf(document.activeElement);

            e.preventDefault(); // Предотвращаем стандартное поведение Tab, чтобы "запереть" фокус

            if (e.shiftKey) {
                // Двигаемся назад (Shift + Tab)
                if (currentIndex === 0 || currentIndex === -1) {
                    lastElement.focus(); // С первого элемента переходим на последний
                } else {
                    focusableElements[currentIndex - 1].focus();
                }
            } else {
                // Двигаемся вперед (Tab)
                if (currentIndex === focusableElements.length - 1 || currentIndex === -1) {
                    firstElement.focus(); // С последнего элемента переходим на первый
                } else {
                    focusableElements[currentIndex + 1].focus();
                }
            }
        }
    }

    applyTransform() {
        this.image.style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.scale})`;
    }

    resetTransform() {
        this.scale = 1; this.transform.x = 0; this.transform.y = 0;
        this.image.style.transition = 'transform 0.3s ease';
        this.applyTransform();
        this.image.classList.remove('is-zoomed');
        this.image.style.cursor = 'grab';
    }

    onWheel(e) {
        e.preventDefault();
        const rect = this.image.getBoundingClientRect();
        const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(1, Math.min(8, this.scale * delta));
        if (newScale === this.scale) return;

        this.transform.x = mouse.x - (mouse.x - this.transform.x) * (newScale / this.scale);
        this.transform.y = mouse.y - (mouse.y - this.transform.y) * (newScale / this.scale);
        this.scale = newScale;

        this.image.style.transition = 'none';
        this.image.classList.toggle('is-zoomed', this.scale > 1);
        this.image.style.cursor = this.scale > 1 ? 'grab' : 'default';
        this.applyTransform();
    }

    onMouseDown(e) {
        if (this.scale > 1) {
            e.preventDefault();
            this.isPanning = true;
            this.start.x = e.clientX - this.transform.x;
            this.start.y = e.clientY - this.transform.y;
            this.image.style.cursor = 'grabbing';
            this.image.style.transition = 'none';
        }
    }

    onMouseMove(e) {
        if (this.isPanning) {
            this.transform.x = e.clientX - this.start.x;
            this.transform.y = e.clientY - this.start.y;
            this.applyTransform();
        }
    }

    onMouseUp() {
        if (this.isPanning) {
            this.isPanning = false;
            this.image.style.cursor = 'grab';
        }
    }

    onDoubleClick(e) {
        if (e.target !== this.image) return;
        if (this.scale > 1) {
            this.resetTransform();
        } else {
            const rect = this.image.getBoundingClientRect();
            this.scale = 2.5;
            this.transform.x = -((e.clientX - rect.left) * (this.scale - 1));
            this.transform.y = -((e.clientY - rect.top) * (this.scale - 1));
            this.image.style.transition = 'transform 0.3s ease';
            this.image.classList.add('is-zoomed');
            this.image.style.cursor = 'grab';
            this.applyTransform();
        }
    }
}
