document.addEventListener("DOMContentLoaded", () => {
    const langButtons = document.querySelectorAll(".lang-btn");
    const elementsToTranslate = document.querySelectorAll("[data-en], [data-pt], [data-es]");
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    let currentLang = "en"; // Default language

    // Function to set language
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem("currentLang", lang);

        elementsToTranslate.forEach(element => {
            if (element.dataset[lang]) {
                element.textContent = element.dataset[lang];
            }
        });

        langButtons.forEach(button => {
            button.classList.remove("active");
            if (button.dataset.lang === lang) {
                button.classList.add("active");
            }
        });
    };

    // Load language from localStorage or set default
    const savedLang = localStorage.getItem("currentLang");
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(currentLang);
    }

    // Language button event listeners
    langButtons.forEach(button => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.lang);
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for fixed header
                        behavior: "smooth"
                    });
                }
                // Close mobile menu after clicking a link
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.classList.remove("active");
                }
            }
        });
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    // Hero Image Carousel
    const heroCarouselImages = document.querySelectorAll(".hero-image .carousel-image");
    let currentHeroImageIndex = 0;

    const showNextHeroImage = () => {
        heroCarouselImages[currentHeroImageIndex].classList.remove("active");
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroCarouselImages.length;
        heroCarouselImages[currentHeroImageIndex].classList.add("active");
    };

    if (heroCarouselImages.length > 0) {
        heroCarouselImages[0].classList.add("active"); // Show first image initially
        setInterval(showNextHeroImage, 5000); // Change image every 5 seconds
    }

    // Blog Carousel (Dynamic Content & Functionality)
    const blogCarouselTrack = document.querySelector(".blog-carousel .carousel-track");
    const blogCarouselPrevBtn = document.querySelector(".blog-carousel .carousel-button.prev");
    const blogCarouselNextBtn = document.querySelector(".blog-carousel .carousel-button.next");

    const blogArticles = [
        {
            id: "diamond-formation-journey",
            title: {
                en: "The Incredible Journey of Diamond Formation",
                pt: "A Incrível Jornada da Formação do Diamante",
                es: "El Increíble Viaje de la Formación del Diamante"
            },
            image: "/images/blog/diamond-formation.jpg",
            excerpt: {
                en: "Explore the geological processes that transform carbon into the world's most coveted gemstone.",
                pt: "Explore os processos geológicos que transformam carbono na gema mais cobiçada do mundo.",
                es: "Explore los procesos geológicos que transforman el carbono en la gema más codiciada del mundo."
            },
            link: "/pages/blog/diamond-formation-journey.html"
        },
        {
            id: "emerald-quality-factors",
            title: {
                en: "Understanding Emerald Quality: Beyond the 4Cs",
                pt: "Entendendo a Qualidade da Esmeralda: Além dos 4Cs",
                es: "Entendiendo la Calidad de la Esmeralda: Más Allá de las 4Cs"
            },
            image: "/images/blog/emerald-quality.jpg",
            excerpt: {
                en: "Delve into the unique characteristics that define the beauty and value of emeralds.",
                pt: "Aprofunde-se nas características únicas que definem a beleza e o valor das esmeraldas.",
                es: "Profundice en las características únicas que definen la belleza y el valor de las esmeraldas."
            },
            link: "/pages/blog/emerald-quality-factors.html"
        },
        {
            id: "synthetic-vs-natural-gems",
            title: {
                en: "Synthetic vs Natural Gemstones: A Professional Analysis",
                pt: "Gemas Sintéticas vs Naturais: Uma Análise Profissional",
                es: "Gemas Sintéticas vs Naturales: Un Análisis Profesional"
            },
            image: "/images/blog/synthetic-natural.jpg",
            excerpt: {
                en: "A comprehensive look at the differences between lab-grown and natural gemstones from a gemologist's perspective.",
                pt: "Uma análise abrangente das diferenças entre gemas cultivadas em laboratório e naturais sob a perspectiva de um gemólogo.",
                es: "Una mirada completa a las diferencias entre las gemas cultivadas en laboratorio y las naturales desde la perspectiva de un gemólogo."
            },
            link: "/pages/blog/synthetic-vs-natural-gems.html"
        },
        {
            id: "sapphire-color-origins",
            title: {
                en: "The Spectrum of Sapphire: Understanding Color Origins",
                pt: "O Espectro da Safira: Entendendo as Origens da Cor",
                es: "El Espectro del Zafiro: Comprendiendo los Orígenes del Color"
            },
            image: "/images/blog/sapphire-color.jpg",
            excerpt: {
                en: "Explore how trace elements and geological conditions create the vast array of sapphire colors.",
                pt: "Explore como elementos traço e condições geológicas criam a vasta gama de cores da safira.",
                es: "Explore cómo los elementos traza y las condiciones geológicas crean la amplia gama de colores del zafiro."
            },
            link: "/pages/blog/sapphire-color-origins.html"
        },
        {
            id: "pearl-appraisal-guide",
            title: {
                en: "Pearl Appraisal Guide: Valuing Nature's Organic Gems",
                pt: "Guia de Avaliação de Pérolas: Valorizando as Gemas Orgânicas da Natureza",
                es: "Guía de Tasación de Perlas: Valorando las Gemas Orgánicas de la Naturaleza"
            },
            image: "/images/blog/pearl-appraisal.jpg",
            excerpt: {
                en: "Learn the factors that determine the quality and value of pearls, from luster to surface.",
                pt: "Aprenda os fatores que determinam a qualidade e o valor das pérolas, do brilho à superfície.",
                es: "Aprenda los factores que determinan la calidad y el valor de las perlas, desde el brillo hasta la superficie."
            },
            link: "/pages/blog/pearl-appraisal-guide.html"
        },
        {
            id: "responsible-gem-sourcing",
            title: {
                en: "Responsible Gem Sourcing: Ethical Practices in the Gemstone Industry",
                pt: "Obtenção Responsável de Gemas: Práticas Éticas na Indústria de Gemas",
                es: "Abastecimiento Responsable de Gemas: Prácticas Éticas en la Industria de las Piedras Preciosas"
            },
            image: "/images/blog/responsible-sourcing.jpg",
            excerpt: {
                en: "Discover the importance of ethical sourcing and its impact on communities and the environment.",
                pt: "Descubra a importância da obtenção ética e seu impacto nas comunidades e no meio ambiente.",
                es: "Descubra la importancia del abastecimiento ético y su impacto en las comunidades y el medio ambiente."
            },
            link: "/pages/blog/responsible-gem-sourcing.html"
        }
    ];

    const createBlogCard = (article) => {
        const card = document.createElement("a");
        card.href = article.link;
        card.classList.add("blog-card");
        card.innerHTML = `
            <img src="${article.image}" alt="${article.title.en}">
            <div class="blog-card-content">
                <h3 data-en="${article.title.en}" data-pt="${article.title.pt}" data-es="${article.title.es}">${article.title[currentLang]}</h3>
                <p data-en="${article.excerpt.en}" data-pt="${article.excerpt.pt}" data-es="${article.excerpt.es}">${article.excerpt[currentLang]}</p>
                <span class="read-more" data-en="Read More" data-pt="Leia Mais" data-es="Leer Más">Read More</span>
            </div>
        `;
        return card;
    };

    // Populate blog carousel
    if (blogCarouselTrack) {
        blogArticles.forEach(article => {
            blogCarouselTrack.appendChild(createBlogCard(article));
        });

        // Update language for dynamically created blog cards
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const elements = node.querySelectorAll("[data-en], [data-pt], [data-es]");
                            elements.forEach(element => {
                                if (element.dataset[currentLang]) {
                                    element.textContent = element.dataset[currentLang];
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(blogCarouselTrack, { childList: true, subtree: true });

        // Carousel functionality
        let currentIndex = 0;
        const cardsPerView = 3; // Number of cards visible at once

        const updateCarousel = () => {
            const cardWidth = blogCarouselTrack.children[0].offsetWidth + 30; // Card width + margin
            blogCarouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        };

        blogCarouselNextBtn.addEventListener("click", () => {
            if (currentIndex < blogArticles.length - cardsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        });

        blogCarouselPrevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = blogArticles.length - cardsPerView; // Loop to end
            }
            updateCarousel();
        });

        // Adjust carousel on resize
        window.addEventListener("resize", updateCarousel);
        updateCarousel(); // Initial update
    }
});
