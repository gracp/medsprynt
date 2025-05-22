// Import Alpine.js
import Alpine from 'alpinejs';

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Main JS file for Med Sprynt site

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Med Sprynt website initialized');
  
  // Initialize any non-Alpine components
  initScrollEffects();
  initAnalytics();
});

// Scroll behavior
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Mobile menu toggle functionality is handled by Alpine.js
  // See the x-data directives in the header.njk file
  
  // Analytics placeholder - replace with your actual tracking code
  console.log('Med Sprynt site loaded');
});

// Scroll to section functionality for navigation links
document.addEventListener('DOMContentLoaded', () => {
  const scrollLinks = document.querySelectorAll('a[href^="/#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only apply to same-page links
      if (window.location.pathname === '/' || window.location.pathname === '') {
        const targetId = link.getAttribute('href').replace('/', '');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (window.innerWidth < 768) {
            const mobileMenuBtn = document.querySelector('[x-data]');
            if (mobileMenuBtn && mobileMenuBtn.__x) {
              mobileMenuBtn.__x.$data.mobileMenuOpen = false;
            }
          }
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      if (!contactForm.checkValidity()) {
        return; // Let the browser handle invalid forms
      }
      
      // For non-Netlify deployments, handle form submission
      if (!contactForm.getAttribute('data-netlify')) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            // Show success message
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
              <div class="text-center py-12">
                <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 class="text-2xl font-bold mb-2">Message Received!</h3>
                <p class="text-gray-600 mb-6">Thank you for reaching out. We'll be in touch within 24 hours to schedule your strategy call.</p>
                <a href="/" class="inline-block px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors duration-300">
                  Return to Home
                </a>
              </div>
            `;
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          
          // Show error message
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          submitBtn.innerHTML = 'Try Again';
          
          const errorMsg = document.createElement('p');
          errorMsg.className = 'text-red-600 text-sm mt-2';
          errorMsg.textContent = 'There was a problem submitting your message. Please try again.';
          
          submitBtn.parentElement.appendChild(errorMsg);
        }
      }
    });
  }
});

// Testimonial Slider Auto-rotation
window.initTestimonialSlider = function() {
  return {
    currentSlide: 0,
    totalSlides: 5, // Update this based on actual number of testimonials
    autoplayInterval: null,
    
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    },
    
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    },
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    },
    
    setSlide(index) {
      if (index >= 0 && index < this.totalSlides) {
        this.currentSlide = index;
      }
    },
    
    init() {
      this.startAutoplay();
      
      // Pause autoplay when user interacts with slider
      const sliderElement = document.querySelector('[x-data="initTestimonialSlider()"]');
      if (sliderElement) {
        sliderElement.addEventListener('mouseenter', () => this.stopAutoplay());
        sliderElement.addEventListener('mouseleave', () => this.startAutoplay());
      }
    }
  };
};

// Alpine.js component: Mobile Menu
document.addEventListener('alpine:init', () => {
  Alpine.data('mobileMenu', () => ({
    open: false,
    
    toggle() {
      this.open = !this.open;
      
      // Prevent body scrolling when menu is open
      if (this.open) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    },
    
    close() {
      this.open = false;
      document.body.classList.remove('overflow-hidden');
    }
  }));
  
  // Alpine.js component: Contact Form
  Alpine.data('contactForm', () => ({
    name: '',
    email: '',
    company: '',
    message: '',
    loading: false,
    success: false,
    error: null,
    
    async submitForm() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('/netlify/functions/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            company: this.company,
            message: this.message
          })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Something went wrong. Please try again.');
        }
        
        // Success
        this.success = true;
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
        
        // Track conversion
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'form_submission', {
            'event_category': 'contact',
            'event_label': 'contact_form'
          });
        }
        
      } catch (err) {
        console.error('Contact form error:', err);
        this.error = err.message || 'Something went wrong. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }));
  
  // Alpine.js component: Newsletter Form
  Alpine.data('newsletterForm', () => ({
    email: '',
    name: '',
    loading: false,
    success: false,
    error: null,
    
    async submitForm() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('/netlify/functions/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            name: this.name
          })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Something went wrong. Please try again.');
        }
        
        // Success
        this.success = true;
        this.email = '';
        this.name = '';
        
        // Track conversion
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'form_submission', {
            'event_category': 'newsletter',
            'event_label': 'newsletter_signup'
          });
        }
        
      } catch (err) {
        console.error('Newsletter form error:', err);
        this.error = err.message || 'Something went wrong. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }));
  
  // Alpine.js component: Testimonial Slider
  Alpine.data('testimonialSlider', () => ({
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    
    init() {
      this.totalSlides = this.$el.querySelectorAll('.testimonial-slide').length;
      this.startAutoplay();
      
      // Pause autoplay on hover
      this.$el.addEventListener('mouseenter', () => this.stopAutoplay());
      this.$el.addEventListener('mouseleave', () => this.startAutoplay());
    },
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    },
    
    goToSlide(index) {
      this.currentSlide = index;
    },
    
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    }
  }));
  
  // Alpine.js component: FAQ Accordion
  Alpine.data('faqAccordion', () => ({
    activeItem: null,
    
    toggleItem(index) {
      this.activeItem = this.activeItem === index ? null : index;
    },
    
    isOpen(index) {
      return this.activeItem === index;
    }
  }));
});

// Scroll animation effects
function initScrollEffects() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Analytics initialization and custom events
function initAnalytics() {
  // Only in production environment
  if (window.location.hostname !== 'localhost') {
    // Track outbound links
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      
      if (link && link.href && link.hostname !== window.location.hostname) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            'event_category': 'outbound',
            'event_label': link.href
          });
        }
      }
    });
    
    // Track scroll depth
    let scrollDepthTriggered = {
      25: false,
      50: false,
      75: false,
      100: false
    };
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      
      [25, 50, 75, 100].forEach(depth => {
        if (scrollPercentage >= depth && !scrollDepthTriggered[depth]) {
          scrollDepthTriggered[depth] = true;
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', {
              'event_category': 'engagement',
              'event_label': `${depth}%`
            });
          }
        }
      });
    });
  }
} 