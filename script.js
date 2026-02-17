// Seahawks 2025 Championship Site - Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate stat numbers
                if (entry.target.classList.contains('stat-value') || 
                    entry.target.classList.contains('pstat-value') ||
                    entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.stat-card, .player-card, .playoff-game, .game-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Number animation
    function animateNumber(element) {
        const text = element.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (isNaN(num)) return;
        
        const suffix = text.replace(/[0-9.,]/g, '');
        const hasDecimal = text.includes('.');
        const duration = 1500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = num * easeOut;
            
            if (hasDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text; // Reset to original
            }
        }
        
        requestAnimationFrame(update);
    }

    // Smooth scroll for nav links
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

    // Parallax effect on hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        const trophy = document.querySelector('.trophy-glow');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        if (trophy && scrolled < window.innerHeight) {
            trophy.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        }
    });

    // Add hover sound effect to game cards (visual feedback)
    document.querySelectorAll('.game-card.win').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 30px rgba(105, 190, 40, 0.4)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });

    // Trophy confetti effect on Super Bowl card hover
    const superbowlCard = document.querySelector('.playoff-game.superbowl');
    if (superbowlCard) {
        superbowlCard.addEventListener('mouseenter', () => {
            createConfetti(superbowlCard);
        });
    }

    function createConfetti(container) {
        const colors = ['#69BE28', '#FFD700', '#FFFFFF', '#002244'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                pointer-events: none;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confetti-fall ${1 + Math.random()}s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
            `;
            container.style.position = 'relative';
            container.style.overflow = 'visible';
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 1500);
        }
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x, 100px), var(--y, 100px)) rotate(720deg);
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Console easter egg
    console.log('%c🏆 GO HAWKS! 🦅', 'font-size: 24px; color: #69BE28; background: #002244; padding: 10px;');
    console.log('%c2025 SUPER BOWL CHAMPIONS', 'font-size: 14px; color: #FFD700;');
});
