/**
* Snehal Majhi - Java Full Stack Developer Portfolio
* Main JavaScript Controller with Top Navbar
*/
(function() {
  "use strict";

  /**
   * Helper selector functions
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Header scrolled class for sticky top navbar
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 40) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Navbar links active state on scroll (Scrollspy)
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 120;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Smooth scroll to element with top navbar offset
   */
  const scrollto = (el) => {
    let target = select(el);
    if (!target) return;
    let header = select('#header');
    let offset = header ? header.offsetHeight : 70;
    let elementPos = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPos - offset + 2,
      behavior: 'smooth'
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 200) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
    
    backtotop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Mobile navigation drawer control
   */
  const openMobileNav = () => {
    let navbar = select('#navbar');
    if (navbar) {
      navbar.classList.add('navbar-mobile');
      document.body.classList.add('mobile-nav-active');
    }
  };

  const closeMobileNav = () => {
    let navbar = select('#navbar');
    if (navbar && navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      document.body.classList.remove('mobile-nav-active');
    }
  };

  const toggleMobileNav = () => {
    let navbar = select('#navbar');
    if (navbar && navbar.classList.contains('navbar-mobile')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  };

  // Close mobile nav automatically when resizing back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
      closeMobileNav();
    }
  });

  /**
   * Hero Typed.js Effect
   */
  const typed = select('.typed');
  if (typed && typeof Typed !== 'undefined') {
    let typed_strings = typed.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',').map(s => s.trim());
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2200,
        smartBackspace: true
      });
    }
  }

  /**
   * Animated Skill Progress Bars via Waypoint
   */
  let skillsContent = select('.skills');
  if (skillsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(direction) {
        let progressBars = select('.skills .progress-bar', true);
        progressBars.forEach((el) => {
          let targetVal = el.getAttribute('aria-valuenow') || '0';
          el.style.width = targetVal + '%';
        });
      }
    });
  }

  /**
   * Portfolio Isotope Layout & Category Filters
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

        portfolioIsotope.on('arrangeComplete', function() {
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      }, true);
    }
  });

  /**
   * Portfolio GLightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /**
   * Testimonials Swiper Slider
   */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }

  /**
   * PureCounter Initialization
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * AOS Scroll Animations
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

  /**
   * Project Details Modal Data & Controller
   */
  const projectData = {
    rental: {
      title: "Smart Rental & Property Management System",
      category: "Java Enterprise Full-Stack Web Application",
      image: "assets/img/portfolio/rental-system.jpg",
      tags: ["Java", "Spring Boot", "Hibernate JPA", "MySQL", "Bootstrap 5", "REST API"],
      description: "A centralized, multi-tenant property management platform designed to streamline room discovery, verified landlord onboarding, automated billing cycles, and lease agreement management.",
      features: [
        "User & Landlord role-based access control with encrypted authentication.",
        "Dynamic property listings with location filtering, room pricing, and availability states.",
        "Automated monthly rent invoice generation and transaction ledger tracking.",
        "Optimized MySQL relational schema handling tenant records, reviews, and lease histories.",
        "Responsive glassmorphism dashboard for real-time occupancy and revenue analytics."
      ],
      github: "https://github.com/Snehalmajhi20"
    },
    microservices: {
      title: "Enterprise Spring Boot Microservices Platform",
      category: "Distributed Backend & API Architecture",
      image: "assets/img/portfolio/spring-microservices.jpg",
      tags: ["Java 21", "Spring Boot 3", "Spring Cloud", "Eureka", "Kafka", "Docker", "JWT"],
      description: "A high-throughput distributed microservices architecture engineered to decouple business services, ensure fault tolerance with circuit breakers, and provide centralized API routing and asynchronous messaging.",
      features: [
        "Spring Cloud Eureka Service Discovery for automated service registration and health checks.",
        "Spring Cloud API Gateway implementing rate limiting, CORS management, and JWT token authentication.",
        "Apache Kafka event streams decoupling core microservices for asynchronous messaging.",
        "Centralized configuration management with Spring Cloud Config.",
        "Comprehensive Swagger / OpenAPI v3 documentation for all REST endpoints.",
        "Dockerized microservice containers ready for cloud and Kubernetes deployments."
      ],
      github: "https://github.com/Snehalmajhi20"
    },
    banking: {
      title: "Secure Java Banking & Transaction Portal",
      category: "Enterprise Financial System & Security",
      image: "assets/img/portfolio/banking-portal.jpg",
      tags: ["Java", "Spring Security", "PostgreSQL", "Hibernate", "BCrypt", "JWT", "Audit Trails"],
      description: "A financial transaction management portal built with strict banking security principles, multi-factor authentication, atomic ACID fund transfers, and tamper-proof ledger logs.",
      features: [
        "Spring Security with role-based access control (Customer, Teller, Administrator).",
        "Two-factor authentication (MFA/TOTP) and session hijack protection.",
        "Atomic database transactions preventing double-spending and transfer rollbacks.",
        "Automated PDF account statement generation and transaction analytics charts.",
        "Audit logging on all administrative actions and sensitive financial transfers."
      ],
      github: "https://github.com/Snehalmajhi20"
    },
    assistant: {
      title: "AI Desktop Voice Assistant",
      category: "AI & Desktop System Automation",
      image: "assets/img/portfolio/desktop assistant.png",
      tags: ["Python", "SpeechRecognition", "Pyttsx3", "OS Automation", "PyQt5"],
      description: "An intelligent voice-activated desktop companion engineered to automate daily operating system tasks, answer conversational queries, manage files, and boost workflow efficiency.",
      features: [
        "Accurate natural language speech-to-text processing and voice response generation.",
        "Automated application launching, web searches, and system performance monitoring.",
        "Voice-driven note-taking, clipboard operations, and email drafting tools.",
        "Lightweight background resource footprint with customizable hotword wake commands."
      ],
      github: "https://github.com/Snehalmajhi20"
    },
    threat: {
      title: "Network & Web Threat Intelligence Analyzer",
      category: "Cybersecurity & Data Visualization",
      image: "assets/img/portfolio/net-dark-web.jpg",
      tags: ["Python", "Network Scraper", "Threat Intelligence", "Data Analytics", "Flask"],
      description: "A threat detection and security analytics dashboard designed to monitor breach feeds, detect suspicious network traffic patterns, and report vulnerability signals.",
      features: [
        "Automated scrapers gathering real-time vulnerability advisories and threat bulletins.",
        "Threat classification and risk score assignment based on CVE database metrics.",
        "Interactive analytics charts visualizing threat origins and attack vectors.",
        "Custom email alert notification triggers when high-severity anomalies are detected."
      ],
      github: "https://github.com/Snehalmajhi20"
    },
    game: {
      title: "Java Interactive Algorithm Game Engine",
      category: "OOP Design Patterns & Artificial Intelligence",
      image: "assets/img/portfolio/tic-tac.jpg",
      tags: ["Java", "Minimax AI Algorithm", "OOP Design", "Data Structures", "Java Swing/GUI"],
      description: "An interactive game suite built to showcase advanced object-oriented design patterns, recursion, state space tree evaluation, and an unbeatable Minimax AI agent.",
      features: [
        "Unbeatable AI player utilizing the Minimax decision algorithm with Alpha-Beta pruning.",
        "Pure Object-Oriented clean architecture separating game state, rules, and UI.",
        "Interactive GUI with move history, instant win/loss detection, and move recommendation hints.",
        "Configurable AI difficulty levels ranging from random exploration to optimal depth-first search."
      ],
      github: "https://github.com/Snehalmajhi20"
    }
  };

  const projectModal = select('#projectDetailsModal');
  const modalBackdrop = select('#modalBackdrop');
  const modalCloseBtn = select('#modalCloseBtn');
  const modalContent = select('#modalContent');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal || !modalContent) return;

    const tagsHtml = data.tags.map(tag => `<span class="tech-badge me-1 mb-1">${tag}</span>`).join('');
    const featuresHtml = data.features.map(f => `<li><i class="bi bi-check2-circle text-info me-2"></i>${f}</li>`).join('');

    modalContent.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${data.image}" alt="${data.title}" class="img-fluid">
      </div>
      <span class="text-info fw-bold small text-uppercase font-monospace">${data.category}</span>
      <h3 class="fw-bold text-white mt-1 mb-3">${data.title}</h3>
      <p class="text-light">${data.description}</p>
      
      <h5 class="text-white fw-bold mt-4 mb-2"><i class="bx bx-cog text-info me-2"></i>Key Features & Architecture:</h5>
      <ul class="modal-feature-list list-unstyled">
        ${featuresHtml}
      </ul>

      <h5 class="text-white fw-bold mt-4 mb-2"><i class="bx bx-code-curly text-info me-2"></i>Technologies Used:</h5>
      <div class="d-flex flex-wrap gap-1 mb-4">
        ${tagsHtml}
      </div>

      <div class="d-flex gap-3 mt-4 pt-3 border-top border-secondary">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-primary-glow">
          <i class="bx bxl-github"></i> View GitHub Repository
        </a>
      </div>
    `;

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  };

  // Resume Modal Helper
  const openResumeModal = () => {
    const resumeModalEl = select('#resumeModal');
    if (!resumeModalEl) return;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(resumeModalEl);
      modalInstance.show();
    } else {
      resumeModalEl.classList.add('show');
      resumeModalEl.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  };

  const closeResumeModal = () => {
    const resumeModalEl = select('#resumeModal');
    if (!resumeModalEl) return;
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const modalInstance = bootstrap.Modal.getInstance(resumeModalEl);
      if (modalInstance) modalInstance.hide();
    } else {
      resumeModalEl.classList.remove('show');
      resumeModalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  };

  /**
   * Fallback Copy Function for older environments
   */
  function fallbackCopy(text, onSuccess) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }

  /**
   * Global Event Delegation for Clicks
   * Ensures all buttons work flawlessly across all screen ratios & dynamic elements
   */
  document.addEventListener('click', function(e) {
    // 1. Mobile navigation toggle (hamburger)
    const mobileToggle = e.target.closest('.mobile-nav-toggle');
    if (mobileToggle) {
      e.preventDefault();
      toggleMobileNav();
      return;
    }

    // 2. Mobile nav close button
    const mobileClose = e.target.closest('.mobile-nav-close');
    if (mobileClose) {
      e.preventDefault();
      closeMobileNav();
      return;
    }

    // 3. Mobile nav backdrop click
    if (e.target.classList.contains('mobile-nav-backdrop')) {
      e.preventDefault();
      closeMobileNav();
      return;
    }

    // 4. Smooth scroll navigation links (.scrollto)
    const scrollLink = e.target.closest('.scrollto');
    if (scrollLink && scrollLink.hash && select(scrollLink.hash)) {
      e.preventDefault();
      closeMobileNav();
      scrollto(scrollLink.hash);
      return;
    }

    // 5. Project details modal open buttons (.btn-open-modal or .btn-details)
    const projectBtn = e.target.closest('.btn-open-modal');
    if (projectBtn) {
      e.preventDefault();
      const projectId = projectBtn.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
      return;
    }

    // 6. Project details modal close buttons
    if (e.target.closest('#modalCloseBtn') || e.target.closest('#modalBackdrop')) {
      e.preventDefault();
      closeProjectModal();
      return;
    }

    // 7. Resume modal trigger buttons (.btn-trigger-resume)
    const resumeBtn = e.target.closest('.btn-trigger-resume');
    if (resumeBtn) {
      e.preventDefault();
      closeMobileNav();
      openResumeModal();
      return;
    }

    // 8. Copy to clipboard badges (.copy-badge)
    const copyBtn = e.target.closest('.copy-badge');
    if (copyBtn) {
      e.preventDefault();
      const textToCopy = copyBtn.getAttribute('data-copy');
      if (textToCopy) {
        const handleCopySuccess = () => {
          const originalText = copyBtn.innerText;
          copyBtn.innerText = 'Copied!';
          copyBtn.style.background = '#06b6d4';
          copyBtn.style.color = '#0b0f19';
          setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(handleCopySuccess).catch(() => {
            fallbackCopy(textToCopy, handleCopySuccess);
          });
        } else {
          fallbackCopy(textToCopy, handleCopySuccess);
        }
      }
      return;
    }
  });

  // Keyboard Escape Key Handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeProjectModal();
      closeResumeModal();
    }
  });

  /**
   * Interactive Contact Form with Instant Client Validation & Feedback
   */
  const contactForm = select('#portfolioContactForm');
  const formStatus = select('#formStatus');
  const submitBtn = select('#submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = select('#contactName').value.trim();
      const email = select('#contactEmail').value.trim();
      const subject = select('#contactSubject').value.trim();
      const message = select('#contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.innerText = 'Please complete all required fields before submitting.';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending Message...';
      }

      // Build form data for FormSubmit.co (works on GitHub Pages - no PHP needed)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);
      formData.append('_subject', '[Portfolio Contact] ' + subject);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      fetch('https://formsubmit.co/snehalmajhi20@gmail.com', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> 🎉 Your message has been sent successfully! I'll get back to you soon. You can also reach me via <a href="mailto:snehalmajhi20@gmail.com" class="text-decoration-underline text-white">direct email</a> or LinkedIn.`;
          }
          if (submitBtn) {
            submitBtn.innerHTML = '<i class="bx bx-check-circle"></i> Message Sent!';
            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
            }, 4000);
          }
          contactForm.reset();
        } else {
          throw new Error('Server error: ' + response.status);
        }
      })
      .catch(error => {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.innerHTML = `❌ Failed to send message. Please email me directly at <a href="mailto:snehalmajhi20@gmail.com" class="text-decoration-underline text-white">snehalmajhi20@gmail.com</a>`;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
        }
        console.error('Form submission error:', error);
      });
    });
  }

})();