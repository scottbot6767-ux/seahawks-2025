/* SEAHAWKS 2025 — Interactive Features */

// 12th Man Meter - fills as you scroll
function updateCrowdMeter() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    
    const meter = document.getElementById('crowdMeter');
    if (meter) {
        meter.style.height = scrollPercent + '%';
        
        // Add glow intensity based on scroll
        if (scrollPercent > 80) {
            meter.style.boxShadow = '0 0 40px var(--action-green), 0 0 80px var(--action-green)';
        } else if (scrollPercent > 50) {
            meter.style.boxShadow = '0 0 30px var(--action-green)';
        } else {
            meter.style.boxShadow = '0 0 20px var(--action-green)';
        }
    }
}

// Staggered reveal on scroll
function createObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((card, i) => {
        card.dataset.delay = i * 100;
        card.classList.add('reveal-target');
        observer.observe(card);
    });

    // Observe player cards
    document.querySelectorAll('.player-card').forEach((card, i) => {
        card.dataset.delay = i * 80;
        card.classList.add('reveal-target');
        observer.observe(card);
    });

    // Observe playoff games
    document.querySelectorAll('.playoff-game').forEach((game, i) => {
        game.dataset.delay = i * 150;
        game.classList.add('reveal-target');
        observer.observe(game);
    });

    // Observe schedule cards
    document.querySelectorAll('.game-card').forEach((card, i) => {
        card.dataset.delay = Math.floor(i / 6) * 50 + (i % 6) * 30;
        card.classList.add('reveal-target');
        observer.observe(card);
    });
}

// Add reveal CSS dynamically
function injectRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal-target {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reveal-target.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-card.reveal-target {
            transform: translateY(40px) skewX(-2deg);
        }
        
        .stat-card.revealed {
            transform: translateY(0) skewX(-2deg);
        }
        
        .playoff-game.reveal-target {
            transform: translateY(30px) skewX(-2deg);
        }
        
        .playoff-game.revealed {
            transform: translateY(0) skewX(-2deg);
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for nav links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Number counter animation for stats
function animateNumbers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
                const suffix = el.textContent.replace(/[0-9,]/g, '');
                const duration = 1500;
                const start = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);
                    
                    el.textContent = current.toLocaleString() + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target.toLocaleString() + suffix;
                    }
                };
                
                animate();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    // Observe hero stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    // Observe stat values
    document.querySelectorAll('.stat-value').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero background
function setupParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        heroBg.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
}

// Nav background on scroll
function setupNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 8, 16, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.borderBottom = '1px solid rgba(105, 190, 40, 0.2)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.borderBottom = 'none';
        }
    }, { passive: true });
}

// Player card hover sound effect (optional visual feedback)
function setupCardHovers() {
    document.querySelectorAll('.player-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Could add sound here if desired
            card.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.willChange = 'auto';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    injectRevealStyles();
    createObserver();
    setupSmoothScroll();
    animateNumbers();
    setupParallax();
    setupNavScroll();
    setupCardHovers();
});

// Update crowd meter on scroll
window.addEventListener('scroll', updateCrowdMeter, { passive: true });

// Initial meter update
updateCrowdMeter();

// Console easter egg
console.log('%c🦅 GO HAWKS! 🏆', 'color: #69BE28; font-size: 24px; font-weight: bold;');
console.log('%c2025 SUPER BOWL CHAMPIONS', 'color: #D4AF37; font-size: 14px;');
