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

// Image Carousel
function initImageCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    if (images.length === 0) return;

    let currentIndex = 0;

    function showNextImage() {
        if (images.length === 0) return;
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    initImageCarousel();
    console.log('Mineral Gemstones website loaded successfully!');
});
