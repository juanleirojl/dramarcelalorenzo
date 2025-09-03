// Mentoria Script - Funcionalidades interativas
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initNavigation();
    initCounters();
    initScrollEffects();
    initBackToTop();
    initAOS();
    initPlanCards();
    initCTA();
    initNotifications();
});

// Loading Screen
function initLoader() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// Navigation
function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navClose = document.querySelector('.nav__close');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-card__number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace(/\D/g, ''));
                const suffix = counter.innerText.replace(/\d/g, '');
                
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        // Store original value
        if (!counter.hasAttribute('data-target')) {
            counter.setAttribute('data-target', counter.innerText.replace(/\D/g, ''));
        }
        observer.observe(counter);
    });
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = target + suffix;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Scroll Effects
function initScrollEffects() {
    // Parallax for hero section
    const hero = document.querySelector('.hero-mentoria');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
            
            // Animate floating elements
            floatingElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // Reveal animations for cards
    const cards = document.querySelectorAll('.especializacao-card, .step-card, .plano-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// Plan Cards Interactions
function initPlanCards() {
    const planCards = document.querySelectorAll('.plano-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 25px 70px rgba(110, 193, 228, 0.3)';
            
            // Scale other cards down slightly
            planCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset all cards
            planCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
                otherCard.style.boxShadow = '';
            });
        });
    });
}

// CTA Interactions
function initCTA() {
    const ctaButtons = document.querySelectorAll('.btn--primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRipple(e, this);
            
            // Track click (you can integrate with analytics here)
            trackCTAClick(this);
        });
        
        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

function createRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const buttonPosition = getComputedStyle(button).position;
    if (buttonPosition === 'static') {
        button.style.position = 'relative';
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function trackCTAClick(button) {
    const buttonText = button.textContent.trim();
    const buttonLocation = button.closest('section')?.className || 'unknown';
    
    // You can integrate with Google Analytics, Facebook Pixel, etc.
    console.log(`CTA Clicked: ${buttonText} in ${buttonLocation}`);
    
    // Example: Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'CTA',
            event_label: buttonText,
            event_location: buttonLocation
        });
    }
}

// Notifications System
function initNotifications() {
    // Show social proof notifications
    showSocialProofNotifications();
    
    // Show urgency notifications
    showUrgencyNotifications();
}

function showSocialProofNotifications() {
    const notifications = [
        "🎉 Ana Paula acabou de se inscrever na Mentoria Premium!",
        "✨ Carlos Eduardo escolheu o Plano VIP há 5 minutos",
        "🌟 Mariana Silva conseguiu 90% de melhora com a mentoria",
        "🚀 José Roberto recomenda: 'Mudou minha prática profissional'",
        "💪 Fernanda Costa: 'Melhor investimento da minha carreira'"
    ];
    
    let notificationIndex = 0;
    
    function showNotification() {
        if (Math.random() > 0.7) { // 30% chance to show
            const notification = createNotification(notifications[notificationIndex]);
            notificationIndex = (notificationIndex + 1) % notifications.length;
            
            setTimeout(() => {
                notification.remove();
            }, 6000);
        }
    }
    
    // Show first notification after 10 seconds
    setTimeout(showNotification, 10000);
    
    // Then show every 20-40 seconds
    setInterval(() => {
        showNotification();
    }, Math.random() * 20000 + 20000);
}

function showUrgencyNotifications() {
    const urgencyMessages = [
        "⏰ Últimas vagas para este mês!",
        "🔥 Oferta especial termina em breve",
        "⚡ Apenas 3 vagas restantes no VIP"
    ];
    
    setTimeout(() => {
        if (Math.random() > 0.6) { // 40% chance
            const message = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
            const notification = createNotification(message, 'urgency');
            
            setTimeout(() => {
                notification.remove();
            }, 8000);
        }
    }, 30000); // Show after 30 seconds
}

function createNotification(message, type = 'social') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" aria-label="Fechar notificação">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                border-left: 4px solid var(--color-secondary);
                z-index: 10000;
                max-width: 350px;
                animation: slideInUp 0.5s ease-out;
                font-size: 14px;
                font-weight: 500;
            }
            
            .notification--urgency {
                border-left-color: #ff6b6b;
                background: linear-gradient(135deg, #fff5f5, #ffffff);
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
            }
            
            .notification__message {
                color: var(--color-text);
                line-height: 1.4;
            }
            
            .notification__close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.2s ease;
                flex-shrink: 0;
            }
            
            .notification__close:hover {
                background: #f0f0f0;
                color: #666;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add click handler for close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.style.animation = 'slideInUp 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-hide on click
    notification.addEventListener('click', (e) => {
        if (!e.target.closest('.notification__close')) {
            notification.style.animation = 'slideInUp 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    });
    
    document.body.appendChild(notification);
    return notification;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Form Validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// WhatsApp Integration
function openWhatsApp(planType = '') {
    const phone = '5511999999999'; // Replace with actual phone
    let message = 'Olá! Gostaria de saber mais sobre a mentoria da Dra. Marcela Lorenzo.';
    
    if (planType) {
        message += ` Tenho interesse no plano ${planType}.`;
    }
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Expose functions globally for HTML onclick handlers
window.openWhatsApp = openWhatsApp;

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Service Worker registration (optional, for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
