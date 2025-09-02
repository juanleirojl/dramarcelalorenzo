// ========== UTILITY FUNCTIONS ==========
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========== HEADER FUNCTIONALITY ==========
class HeaderManager {
  constructor() {
    this.header = $('#header');
    this.navToggle = $('#nav-toggle');
    this.navClose = $('#nav-close');
    this.navMenu = $('#nav-menu');
    this.navLinks = $$('.nav__link');
    
    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveNavigation();
  }

  setupScrollEffect() {
    const handleScroll = throttle(() => {
      if (window.scrollY >= 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }

  setupMobileMenu() {
    this.navToggle?.addEventListener('click', () => {
      this.navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    this.navClose?.addEventListener('click', () => {
      this.navMenu.classList.remove('show');
      document.body.style.overflow = '';
    });

    // Close menu when clicking on nav link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('show');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
        this.navMenu.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = $(targetId);
        
        if (targetElement) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupActiveNavigation() {
    const sections = $$('section[id]');
    
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + this.header.offsetHeight + 50;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }
}

// ========== HERO SECTION ANIMATIONS ==========
class HeroAnimations {
  constructor() {
    this.heroDecorations = $$('.hero__decoration');
    this.heroStats = $$('.stat__number');
    
    this.init();
  }

  init() {
    this.setupFloatingAnimations();
    this.setupCounterAnimation();
  }

  setupFloatingAnimations() {
    this.heroDecorations.forEach((decoration, index) => {
      const duration = 6000 + (index * 1000);
      const delay = index * 2000;
      
      decoration.style.animationDuration = `${duration}ms`;
      decoration.style.animationDelay = `${delay}ms`;
    });
  }

  setupCounterAnimation() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.disconnect();
        }
      });
    }, observerOptions);

    const heroSection = $('#home');
    if (heroSection) {
      observer.observe(heroSection);
    }
  }

  animateCounters() {
    this.heroStats.forEach(stat => {
      const finalValue = parseInt(stat.textContent);
      const duration = 2000;
      const increment = finalValue / (duration / 16);
      let currentValue = 0;

      const updateCounter = () => {
        currentValue += increment;
        if (currentValue < finalValue) {
          stat.textContent = Math.floor(currentValue);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
        }
      };

      updateCounter();
    });
  }
}

// ========== TESTIMONIALS SLIDER ==========
class TestimonialsSlider {
  constructor() {
    this.testimonials = $$('.testimonial__item');
    this.navButtons = $$('.testimonial__btn');
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    
    this.init();
  }

  init() {
    if (this.testimonials.length === 0) return;
    
    this.setupNavigation();
    this.startAutoPlay();
    this.setupHoverPause();
  }

  setupNavigation() {
    this.navButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  goToSlide(slideIndex) {
    // Remove active class from current slide and button
    this.testimonials[this.currentSlide]?.classList.remove('active');
    this.navButtons[this.currentSlide]?.classList.remove('active');
    
    // Update current slide
    this.currentSlide = slideIndex;
    
    // Add active class to new slide and button
    this.testimonials[this.currentSlide]?.classList.add('active');
    this.navButtons[this.currentSlide]?.classList.add('active');
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.testimonials.length;
    this.goToSlide(nextIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  setupHoverPause() {
    const slider = $('.testimonials__slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => {
        this.pauseAutoPlay();
      });

      slider.addEventListener('mouseleave', () => {
        this.startAutoPlay();
      });
    }
  }
}

// ========== FORM HANDLING ==========
class ContactForm {
  constructor() {
    this.form = $('.contact__form');
    this.inputs = $$('.form__input');
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.setupFormValidation();
    this.setupFormSubmission();
    this.setupInputAnimations();
  }

  setupFormValidation() {
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });

      input.addEventListener('input', () => {
        this.clearInputError(input);
      });
    });
  }

  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.hasAttribute('required');
    
    this.clearInputError(input);
    
    if (required && !value) {
      this.showInputError(input, 'Este campo é obrigatório');
      return false;
    }
    
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showInputError(input, 'Digite um e-mail válido');
        return false;
      }
    }
    
    if (type === 'tel' && value) {
      const phoneRegex = /^[\(\)\s\-\+\d]+$/;
      if (!phoneRegex.test(value)) {
        this.showInputError(input, 'Digite um telefone válido');
        return false;
      }
    }
    
    return true;
  }

  showInputError(input, message) {
    input.style.borderColor = '#e74c3c';
    
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        display: block;
      `;
      input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearInputError(input) {
    input.style.borderColor = '';
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  async handleFormSubmit() {
    let isValid = true;
    
    // Validate all inputs
    this.inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      this.showMessage('Por favor, corrija os erros antes de enviar.', 'error');
      return;
    }
    
    // Show loading state
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    try {
      // Simulate API call
      await this.simulateFormSubmission();
      
      this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      this.form.reset();
      this.clearAllErrors();
      
    } catch (error) {
      this.showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato por WhatsApp.', 'error');
    } finally {
      // Restore button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  async simulateFormSubmission() {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
  }

  showMessage(message, type) {
    // Remove existing message
    const existingMessage = $('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.style.cssText = `
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: 500;
      ${type === 'success' 
        ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
        : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;
    messageElement.textContent = message;
    
    this.form.insertBefore(messageElement, this.form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  clearAllErrors() {
    this.inputs.forEach(input => {
      this.clearInputError(input);
    });
  }

  setupInputAnimations() {
    this.inputs.forEach(input => {
      // Handle floating labels
      const handleInput = () => {
        const label = input.nextElementSibling;
        if (label && label.classList.contains('form__label')) {
          if (input.value.trim() !== '') {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        }
      };

      input.addEventListener('input', handleInput);
      input.addEventListener('blur', handleInput);
      
      // Initial check
      handleInput();
    });
  }
}

// ========== SCROLL ANIMATIONS ==========
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffect();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, this.observerOptions);

    // Observe elements that need animation
    const animatedElements = $$(`
      .service__card,
      .highlight-item,
      .certification__item,
      .timeline__item,
      .topic__item,
      .contact__method
    `);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  setupParallaxEffect() {
    const handleScroll = throttle(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = $$('.hero__decoration');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }
}

// ========== BACK TO TOP BUTTON ==========
class BackToTop {
  constructor() {
    this.button = $('#back-to-top');
    this.init();
  }

  init() {
    if (!this.button) return;
    
    this.setupScrollToggle();
    this.setupClickHandler();
  }

  setupScrollToggle() {
    const handleScroll = throttle(() => {
      if (window.scrollY > 300) {
        this.button.classList.add('show');
      } else {
        this.button.classList.remove('show');
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }

  setupClickHandler() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ========== LOADING SCREEN ==========
class LoadingScreen {
  constructor() {
    this.init();
  }

  init() {
    this.createLoadingScreen();
    this.hideLoadingScreen();
  }

  createLoadingScreen() {
    const loadingHTML = `
      <div id="loading-screen" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6EC1E4 0%, #A8E063 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
      ">
        <div style="
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 2rem;
        "></div>
        <h2 style="
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        ">Dra. Marcela Lorenzo</h2>
        <p style="
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        ">Carregando...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', loadingHTML);
  }

  hideLoadingScreen() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadingScreen = $('#loading-screen');
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          loadingScreen.style.visibility = 'hidden';
          
          setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }
      }, 1000);
    });
  }
}

// ========== PERFORMANCE OPTIMIZATION ==========
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.setupLazyLoading();
  }

  optimizeImages() {
    const images = $$('img');
    
    images.forEach(img => {
      // Add loading="lazy" to images not above the fold
      if (!img.closest('.hero')) {
        img.loading = 'lazy';
      }
      
      // Add error handling
      img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn(`Failed to load image: ${img.src}`);
      });
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              lazyImageObserver.unobserve(img);
            }
          }
        });
      });

      const lazyImages = $$('img[data-src]');
      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    }
  }
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupAriaLabels();
    this.setupReducedMotion();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes mobile menu
      if (e.key === 'Escape') {
        const navMenu = $('#nav-menu');
        if (navMenu?.classList.contains('show')) {
          navMenu.classList.remove('show');
          document.body.style.overflow = '';
          $('#nav-toggle')?.focus();
        }
      }
    });
  }

  setupFocusManagement() {
    // Focus trap for mobile menu
    const navMenu = $('#nav-menu');
    const navToggle = $('#nav-toggle');
    const navClose = $('#nav-close');
    
    if (navMenu && navToggle && navClose) {
      const focusableElements = navMenu.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      
      navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('show')) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }

  setupAriaLabels() {
    // Add aria-labels where needed
    const navToggle = $('#nav-toggle');
    const navClose = $('#nav-close');
    const backToTop = $('#back-to-top');
    
    if (navToggle) navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    if (navClose) navClose.setAttribute('aria-label', 'Fechar menu de navegação');
    if (backToTop) backToTop.setAttribute('aria-label', 'Voltar ao topo da página');
  }

  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-medium', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
    }
  }
}

// ========== ANALYTICS & TRACKING ==========
class AnalyticsManager {
  constructor() {
    this.init();
  }

  init() {
    this.trackUserInteractions();
    this.trackFormSubmissions();
    this.trackScrollDepth();
  }

  trackUserInteractions() {
    // Track button clicks
    const buttons = $$('button, .btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.trackEvent('button_click', {
          button_text: button.textContent.trim(),
          button_location: this.getElementLocation(button)
        });
      });
    });

    // Track external links
    const externalLinks = $$('a[href^="http"], a[href^="mailto"], a[href^="tel"]');
    externalLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('external_link_click', {
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });
  }

  trackFormSubmissions() {
    const form = $('.contact__form');
    if (form) {
      form.addEventListener('submit', () => {
        this.trackEvent('form_submission', {
          form_type: 'contact_form'
        });
      });
    }
  }

  trackScrollDepth() {
    let maxScrollDepth = 0;
    const trackingPoints = [25, 50, 75, 100];
    
    const handleScroll = throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentDepth = Math.round((window.scrollY / scrollHeight) * 100);
      
      if (currentDepth > maxScrollDepth) {
        maxScrollDepth = currentDepth;
        
        trackingPoints.forEach(point => {
          if (currentDepth >= point && maxScrollDepth < point) {
            this.trackEvent('scroll_depth', {
              depth_percentage: point
            });
          }
        });
      }
    }, 250);

    window.addEventListener('scroll', handleScroll);
  }

  trackEvent(eventName, parameters = {}) {
    // Console log for development (replace with actual analytics in production)
    console.log('Analytics Event:', eventName, parameters);
    
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, parameters);
    // }
    
    // Example: Facebook Pixel
    // if (typeof fbq !== 'undefined') {
    //   fbq('track', eventName, parameters);
    // }
  }

  getElementLocation(element) {
    const section = element.closest('section');
    return section ? section.id || section.className : 'unknown';
  }
}

// ========== MAIN APPLICATION INITIALIZATION ==========
class DrMarcelaApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      new LoadingScreen();
      new HeaderManager();
      new HeroAnimations();
      new TestimonialsSlider();
      new ContactForm();
      new ScrollAnimations();
      new BackToTop();
      new PerformanceOptimizer();
      new AccessibilityManager();
      new AnalyticsManager();

      // Initialize AOS (Animate On Scroll) library
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          offset: 100
        });
      }

      // Add smooth scrolling for browsers that don't support it natively
      this.polyfillSmoothScroll();

      console.log('Dra. Marcela Lorenzo website initialized successfully!');
      
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }

  polyfillSmoothScroll() {
    // Check if smooth scroll is supported
    if (!('scrollBehavior' in document.documentElement.style)) {
      // Load smooth scroll polyfill for older browsers
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
      script.onload = () => {
        window.__forceSmoothScrollPolyfill__ = true;
        window.smoothScrollPolyfill.polyfill();
      };
      document.head.appendChild(script);
    }
  }
}

// ========== INITIALIZE APPLICATION ==========
new DrMarcelaApp();

// ========== EXPORT FOR TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HeaderManager,
    HeroAnimations,
    TestimonialsSlider,
    ContactForm,
    ScrollAnimations,
    BackToTop,
    PerformanceOptimizer,
    AccessibilityManager,
    AnalyticsManager,
    DrMarcelaApp
  };
}
