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
    let elementPos = target.offsetTop;
    window.scrollTo({
      top: elementPos - offset + 5,
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
   * Mobile nav toggle handling
   */
  on('click', '.mobile-nav-toggle', function(e) {
    let navbar = select('#navbar');
    if (navbar) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    }
  });

  /**
   * Smooth scroll on links with .scrollto and auto-close mobile menu
   */
  on('click', '.scrollto', function(e) {
    if (this.hash && select(this.hash)) {
      e.preventDefault();
      let navbar = select('#navbar');
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        if (navbarToggle) {
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
      }
      scrollto(this.hash);
    }
  }, true);

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

  on('click', '.btn-open-modal', function(e) {
    e.preventDefault();
    const projectId = this.getAttribute('data-project');
    if (projectId) {
      openProjectModal(projectId);
    }
  }, true);

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeProjectModal);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  /**
   * Copy to Clipboard Handler
   */
  on('click', '.copy-badge', function(e) {
    const textToCopy = this.getAttribute('data-copy');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.innerText;
        this.innerText = 'Copied!';
        this.style.background = '#06b6d4';
        this.style.color = '#0b0f19';
        setTimeout(() => {
          this.innerText = originalText;
          this.style.background = '';
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.warn('Clipboard copy failed:', err);
      });
    }
  }, true);

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
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...';
      }

      // Prepare simulated sending with mailto trigger fallback
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been received. You can also connect directly via <a href="mailto:snehalmajhi20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" class="text-decoration-underline text-white">direct email</a> or LinkedIn.`;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bx bx-check-circle"></i> Message Sent!';
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
          }, 4000);
        }

        contactForm.reset();
      }, 1000);
    });
  }

})();