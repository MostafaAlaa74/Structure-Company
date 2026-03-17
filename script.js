document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Initialize aria-expanded
    mobileBtn.setAttribute('aria-expanded', 'false');

    mobileBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        navLinks.removeAttribute('style');
        
        // Update aria-expanded
        const isExpanded = navLinks.classList.contains('active');
        mobileBtn.setAttribute('aria-expanded', isExpanded);
        
        // Toggle icon
        const icon = mobileBtn.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            navLinks.removeAttribute('style');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECTS
    // ============================================
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // SERVICE TABS
    // ============================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            serviceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
        
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                serviceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ============================================
    // CHOOSE US PILLS (WHY CHOOSE US SECTION)
    // ============================================
    const choosePills = document.querySelectorAll('.choose-pill');
    const choosePanels = document.querySelectorAll('.choose-text-panel');

    choosePills.forEach(pill => {
        const handlePillActivation = function() {
            const pillValue = this.getAttribute('data-pill');

            // Update active pill
            choosePills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            // Update active panel
            choosePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-panel') === pillValue) {
                    panel.classList.add('active');
                }
            });
        };

        pill.addEventListener('click', handlePillActivation);
        pill.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePillActivation.call(this);
            }
        });
    });

    // ============================================
    // PROJECT FILTER
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        const handleFilter = () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeInUp 0.25s ease-out forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        };

        button.addEventListener('click', handleFilter);
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFilter();
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER (SCROLL ANIMATIONS)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-tab, .service-detail-card, .project-card, .contact-info-card, .choose-content, .innovation-content, .license-card'
    );
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = `all 0.35s cubic-bezier(0.4, 0, 0.2, 1)  ${index * 0.01}s`;
        observer.observe(el);
    });

    // Add animate-in styles
    const animStyle = document.createElement('style');
    animStyle.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animStyle);

    // ============================================
    // PARALLAX HERO
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.4);
                width: 20px;
                height: 20px;
                pointer-events: none;
                animation: ripple-animation 0.4s ease-out;
            `;
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 400);
        });
    });

    // Ripple animation CSS
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.innerHTML = `
            @keyframes ripple-animation {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // COUNTER ANIMATION (for stats if added later)
    // ============================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ============================================
    // CERTIFICATE LIGHTBOX MODAL
    // ============================================
    const licenseCards = document.querySelectorAll('.license-card');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalClose = document.querySelector('.cert-modal-close');
    const certModalOverlay = document.querySelector('.cert-modal-overlay');

    if (certModal && licenseCards.length > 0) {
        let lastFocusedElement;

        licenseCards.forEach(card => {
            card.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('h3').textContent;
                
                if (img) {
                    lastFocusedElement = this;
                    certModalImg.src = img.src;
                    certModalImg.alt = img.alt;
                    certModalTitle.textContent = title;
                    certModal.setAttribute('aria-hidden', 'false');
                    certModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                    
                    // Focus the close button
                    setTimeout(() => {
                        certModalClose.focus();
                    }, 100);
                }
            });
        });

        // Close modal functions
        const closeModal = () => {
            certModal.classList.remove('active');
            certModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Return focus to the last focused element
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
            
            // Clear image source after animation to prevent flashing previous image on next open
            setTimeout(() => {
                if (!certModal.classList.contains('active')) {
                    certModalImg.src = '';
                }
            }, 200);
        };

        certModalClose.addEventListener('click', closeModal);
        certModalOverlay.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ============================================
    // BILINGUAL SUPPORT (JS-BASED)
    // ============================================
    const langToggle = document.getElementById('langToggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
    const metaDesc = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    
    let currentLang = document.documentElement.lang || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        
        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        
        // Update standard meta tags
        if (translations[lang].site_desc) {
            if (metaDesc) metaDesc.content = translations[lang].site_desc;
            if (ogDesc) ogDesc.content = translations[lang].site_desc;
            if (twitterDesc) twitterDesc.content = translations[lang].site_desc;
        }
        
        if (translations[lang].site_title) {
            if (ogTitle) ogTitle.content = translations[lang].site_title;
            if (twitterTitle) twitterTitle.content = translations[lang].site_title;
        }

        if (metaKeywords && translations[lang].site_keywords) {
            metaKeywords.content = translations[lang].site_keywords;
        }
        
        // Update all text elements with data-i18n
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Update all inputs with data-i18n-placeholder
        i18nPlaceholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    if (langToggle && typeof translations !== 'undefined') {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            updateLanguage(newLang);
        });
    }

});