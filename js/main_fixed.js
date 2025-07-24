
// Language System
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        this.setupLanguageButtons();
        this.loadLanguage(this.currentLanguage);
    }

    setupLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
                this.updateActiveButton(btn);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        this.loadLanguage(lang);
    }

    loadLanguage(lang) {
        const elements = document.querySelectorAll(`[data-${lang}]`);
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        this.updateFormElements(lang);
    }

    updateFormElements(lang) {
        const formLabels = document.querySelectorAll('label[data-' + lang + ']');
        formLabels.forEach(label => {
            const text = label.getAttribute('data-' + lang);
            if (text) {
                label.textContent = text;
            }
        });

        const selectOptions = document.querySelectorAll('option[data-' + lang + ']');
        selectOptions.forEach(option => {
            const text = option.getAttribute('data-' + lang);
            if (text) {
                option.textContent = text;
            }
        });
    }

    updateActiveButton(activeBtn) {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Carousel Fix
function initImageCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;

    let currentIndex = 0;

    function showNextImage() {
        if (!images[currentIndex]) return;
        if (images[currentIndex].classList) {
            images[currentIndex].classList.remove('active');
        }
        currentIndex = (currentIndex + 1) % images.length;
        if (images[currentIndex] && images[currentIndex].classList) {
            images[currentIndex].classList.add('active');
        }
    }

    setInterval(showNextImage, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new MobileNavigation();
    new SmoothScroll();
    initImageCarousel();
    console.log('Mineral Gemstones website loaded successfully!');
});

// Service Worker REMOVED to fix 404 error
