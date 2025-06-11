// main.js - Código profissional e organizado para site de produtos

window.addEventListener('DOMContentLoaded', () => {
    // --- Seletores Globais ---
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const productCards = document.querySelectorAll('.product-card');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const backToTopBtn = document.getElementById('backToTop');
    const testimonialContainer = document.getElementById('testimonialContainer');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    // --- Filtro de Produtos ---
    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'todos' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }, 300);
            }
        });
        filterTabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`[data-filter="${category}"]`);
        if (activeTab && activeTab.classList.contains('filter-tab')) {
            activeTab.classList.add('active');
        }
    }

    // Clique nas abas de filtro (acima dos produtos)
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-filter');
            filterProducts(category);
        });
    });

    // Clique nos botões de categorias (ex: dentro de cards de categoria)
    document.querySelectorAll('.category-card .btn[data-filter]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-filter');
            const productsSection = document.getElementById('featured');
            if (productsSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    filterProducts(category);
                }, 800);
            }
        });
    });

    // --- Menu Mobile ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // --- Efeito Scroll no Header ---
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Scroll suave para links de navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Slider de Depoimentos ---
    let currentTestimonial = 0;
    function showTestimonial(index) {
        if (testimonialContainer) {
            testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
        }
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
        currentTestimonial = index;
    }
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    if (testimonialDots.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // --- Botão Voltar ao Topo ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Animação ao Scroll ---
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.section-title, .category-card, .product-card, .about-content, .about-image, .testimonial-slider, .contact-info, .contact-map'
        );
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    document.querySelectorAll(
        '.section-title, .category-card, .product-card, .about-content, .about-image, .testimonial-slider, .contact-info, .contact-map'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // --- Pré-carregamento de Imagens ---
    const imageUrls = [
        '/placeholder.svg?height=600&width=600',
        '/placeholder.svg?height=200&width=300',
        '/placeholder.svg?height=250&width=300',
        '/placeholder.svg?height=500&width=500',
        '/placeholder.svg?height=200&width=200'
    ];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});