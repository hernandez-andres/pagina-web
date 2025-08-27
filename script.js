document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del modo oscuro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar el tema guardado en localStorage
    if (localStorage.getItem('theme') === 'dark-mode') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // --- Lógica del menú de navegación (resaltado de página activa) ---
    const navLinks = document.querySelectorAll('.liquid-glass-menu a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Efecto Liquid Glass en proyectos (si aplica) ---
    const projectItems = document.querySelectorAll('.liquid-project-hover');
    projectItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Carrusel de proyectos (si aplica) ---
    const projectCarousels = document.querySelectorAll('.project-carousel-container');
    projectCarousels.forEach(container => {
        const carousel = container.querySelector('.project-carousel');
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');
        let currentIndex = 0;

        if (carousel && prevBtn && nextBtn) {
            const items = carousel.children;
            const totalItems = items.length;

            if (totalItems <= 1) { // Si hay 0 o 1 elemento, oculta los botones
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return; // No se necesita funcionalidad de carrusel
            }

            const updateCarousel = () => {
                const itemWidth = carousel.clientWidth; // Ancho del contenedor visible
                carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            };

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
                updateCarousel();
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });

            // Ajustar el carrusel cuando la ventana cambia de tamaño
            window.addEventListener('resize', updateCarousel);
            updateCarousel(); // Inicializar la posición del carrusel
        }
    });

    // --- Lógica de las secciones desplegables (Acerca de mí) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');

            // Cierra todos los demás acordeones
            accordionHeaders.forEach(otherHeader => {
                const otherAccordionItem = otherHeader.closest('.accordion-item');
                const otherAccordionContent = otherAccordionItem.querySelector('.accordion-content');
                if (otherHeader !== header && otherAccordionContent.classList.contains('show')) {
                    otherAccordionContent.classList.remove('show');
                    otherHeader.classList.remove('active');
                }
            });

            // Abre o cierra el acordeón clickeado
            accordionContent.classList.toggle('show');
            header.classList.toggle('active');
        });
    });

    // --- Animación de desplazamiento (fade-in) ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Elemento visible un 10%
        rootMargin: "0px 0px -50px 0px" // Inicia la animación 50px antes de llegar al final
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Generador de estrellas animadas ---
    const starBackground = document.getElementById('star-background');
    if (starBackground) {
        const numStars = 15; // Número de estrellas (menos para que sean más notorias)
        const colors = ['color-1', 'color-2', 'color-3', 'color-4'];

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.classList.add(colors[Math.floor(Math.random() * colors.length)]); // Asigna un color aleatorio

            const size = Math.random() * 10 + 5; // Tamaño entre 5px y 15px (mucho más grandes)
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.top = `${Math.random() * 100}vh`; // Posición vertical aleatoria
            star.style.left = `${Math.random() * 100}vw`; // Posición inicial horizontal aleatoria

            const animationDuration = Math.random() * 20 + 10; // Duración de 10s a 30s
            star.style.animationDuration = `${animationDuration}s`;

            const animationDelay = Math.random() * -animationDuration; // Retraso negativo para que algunas empiecen antes
            star.style.animationDelay = `${animationDelay}s`;

            starBackground.appendChild(star);
        }
    }
});