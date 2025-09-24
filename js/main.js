document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn");
  const elementsToTranslate = document.querySelectorAll("[data-en], [data-pt], [data-es], [data-en-html], [data-pt-html], [data-es-html]");
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  let currentLang = "en"; // default

  // --- Language switcher (supports textContent, placeholders and HTML) ---
  const setLanguage = (lang) => {
    currentLang = lang;
    try { localStorage.setItem("currentLang", lang); } catch {}

    elementsToTranslate.forEach((el) => {
      // Prefer HTML if provided: data-en-html / data-pt-html / data-es-html
      const htmlKey = `${lang}Html`;      // maps to data-en-html -> dataset.enHtml
      const textKey = lang;               // maps to data-en -> dataset.en

      if (el.dataset && el.dataset[htmlKey]) {
        el.innerHTML = el.dataset[htmlKey];
        return;
      }

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.dataset && el.dataset[textKey]) el.setAttribute("placeholder", el.dataset[textKey]);
      } else {
        if (el.dataset && el.dataset[textKey]) el.textContent = el.dataset[textKey];
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    // Atualiza cards/blog criados dinamicamente
    document.dispatchEvent(new CustomEvent("language:changed", { detail: { lang } }));
  };

  // Load language
  const savedLang = (() => { try { return localStorage.getItem("currentLang"); } catch { return null; } })();
  setLanguage(savedLang || currentLang);

  // Buttons
  langButtons.forEach((btn) => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));

  // Smooth scroll (index)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger && hamburger.classList.remove("active");
      }
    });
  });

  // Mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // --- Hero carousel (index) ---
  const heroCarouselImages = document.querySelectorAll(".hero-image .carousel-image");
  let currentHeroImageIndex = 0;
  const showNextHeroImage = () => {
    if (!heroCarouselImages.length) return;
    heroCarouselImages[currentHeroImageIndex].classList.remove("active");
    currentHeroImageIndex = (currentHeroImageIndex + 1) % heroCarouselImages.length;
    heroCarouselImages[currentHeroImageIndex].classList.add("active");
  };
  if (heroCarouselImages.length > 0) {
    heroCarouselImages[0].classList.add("active");
    setInterval(showNextHeroImage, 5000);
  }

  // --- Blog carousel (index) ---
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

  const createBlogCard = (article, lang) => {
    const card = document.createElement("a");
    card.href = article.link;
    card.classList.add("blog-card");
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title.en}">
      <div class="blog-card-content">
        <h3 data-en="${article.title.en}" data-pt="${article.title.pt}" data-es="${article.title.es}">${article.title[lang]}</h3>
        <p data-en="${article.excerpt.en}" data-pt="${article.excerpt.pt}" data-es="${article.excerpt.es}">${article.excerpt[lang]}</p>
        <span class="read-more" data-en="Read More" data-pt="Leia Mais" data-es="Leer Más">${lang==='pt'?'Leia Mais':lang==='es'?'Leer Más':'Read More'}</span>
      </div>`;
    return card;
  };

  const blogInit = () => {
    if (!blogCarouselTrack) return;
    blogCarouselTrack.innerHTML = "";
    blogArticles.forEach(a => blogCarouselTrack.appendChild(createBlogCard(a, currentLang)));

    let currentIndex = 0;
    const cardsPerView = 3;
    const updateCarousel = () => {
      if (!blogCarouselTrack.children.length) return;
      const cardWidth = blogCarouselTrack.children[0].offsetWidth + 30;
      blogCarouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    };

    blogCarouselNextBtn && blogCarouselNextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex < blogArticles.length - cardsPerView) ? currentIndex + 1 : 0;
      updateCarousel();
    });
    blogCarouselPrevBtn && blogCarouselPrevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : Math.max(blogArticles.length - cardsPerView, 0);
      updateCarousel();
    });
    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  };

  blogInit();

  // Re-render cards when language changes
  document.addEventListener("language:changed", (e) => {
    blogInit();
  });
});
