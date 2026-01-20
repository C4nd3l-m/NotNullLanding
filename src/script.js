// NOT NULL - Interactive Behaviors

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Vanta Waves Background
    if (typeof VANTA !== 'undefined') {
        const vantaEffect = VANTA.WAVES({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0d1a1a, // A deep emerald-tinted grey
            shininess: 50.00,
            waveHeight: 20.00,
            waveSpeed: 0.80,
            zoom: 0.90
        });
    }

    // 1. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    };
    window.addEventListener('scroll', updateProgress);

    // 2. Parallax Orbs (Motion tracking via CSS variables)
    const orbs = document.querySelectorAll('.orb');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            orb.style.setProperty('--tx', `${xOffset}px`);
            orb.style.setProperty('--ty', `${yOffset}px`);
        });
    });

    // 3. Robust Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.service-card, .hero h1, .hero p, .hero-cta, .feature-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.setProperty('--delay', `${index * 0.1}s`);
        observer.observe(el);
    });

    // 4. Smooth Scroll for internally linked anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Card Spotlight Effect
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Modal logic (Legacy support)
    window.openContactModal = function () {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const firstFocusable = modal.querySelector('.modal-close');
            if (firstFocusable) firstFocusable.focus();
        }
    };

    window.closeContactModal = function () {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeContactModal();
    });
});
