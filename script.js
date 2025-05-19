// Ultra-modern JavaScript functionality for The Lodgment website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const body = document.body;
    const loader = document.getElementById('loader');
    const header = document.querySelector('header');
    const cursor = document.querySelector('.cursor');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const menu = document.querySelector('.menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const faqItems = document.querySelectorAll('.faq-item');
    const tabButtons = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const sections = document.querySelectorAll('section');
    const tiltElements = document.querySelectorAll('.tilt-element');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialControls = document.querySelectorAll('.testimonial-indicators .indicator');
    const prevBtn = document.querySelector('.testimonial-controls .prev-btn');
    const nextBtn = document.querySelector('.testimonial-controls .next-btn');
    
    // Page loader
    setTimeout(() => {
        if (loader) {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons, .hero-image');
        let delay = 0.2;
        
        heroElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.8s ease ${delay}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay * 1000);
            
            delay += 0.2;
        });
    }, 2000);
    
    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    document.addEventListener('mousedown', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            if (menu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menu && menu.classList.contains('active') && !e.target.closest('.menu') && !e.target.closest('.mobile-menu')) {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check user preference
        const userTheme = localStorage.getItem('theme');
        if (userTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Update icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Tabs functionality
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button
                button.classList.add('active');
                
                // Get the target tab
                const target = button.getAttribute('data-tab');
                
                // Activate target pane
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Portfolio filter
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    body.style.overflow = '';
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Tilt effect for images
    if (tiltElements.length > 0) {
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                const rotateX = (0.5 - yPercent) * 10;
                const rotateY = (xPercent - 0.5) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }
    
    // Testimonial slider
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialControls.forEach(control => control.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialControls[index].classList.add('active');
        
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    // Testimonial indicator clicks
    if (testimonialControls.length > 0) {
        testimonialControls.forEach((control, index) => {
            control.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    // Auto advance testimonials every 5 seconds
    setInterval(() => {
        if (testimonialSlides.length > 1) {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
    }, 5000);
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.about-content, .glass-card, .stats-container, .portfolio-card, .blog-card, .section-heading');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    // Circular progress for stats
    const statCircles = document.querySelectorAll('.stat-circle-progress');
    
    function animateStatCircles() {
        statCircles.forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            circle.style.strokeDasharray = circumference;
            
            // Add gradient to SVG
            const svg = circle.closest('svg');
            if (!svg.querySelector('defs')) {
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                linearGradient.setAttribute('id', 'gradient');
                linearGradient.setAttribute('x1', '0%');
                linearGradient.setAttribute('y1', '0%');
                linearGradient.setAttribute('x2', '100%');
                linearGradient.setAttribute('y2', '0%');
                
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', '#6a11cb');
                
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '100%');
                stop2.setAttribute('stop-color', '#2575fc');
                
                linearGradient.appendChild(stop1);
                linearGradient.appendChild(stop2);
                defs.appendChild(linearGradient);
                svg.insertBefore(defs, svg.firstChild);
            }
            
            circle.setAttribute('stroke', 'url(#gradient)');
            
            setTimeout(() => {
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }, 500);
        });
    }
    
    // Observer for stat circles
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCircles();
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statObserver.observe(statsSection);
    }
    
    // Animated text effect
    const revealText = document.querySelectorAll('.reveal-text');
    
    revealText.forEach(text => {
        const textContent = text.textContent;
        text.textContent = '';
        
        for (let i = 0; i < textContent.length; i++) {
            const span = document.createElement('span');
            span.textContent = textContent[i] === ' ' ? ' ' : textContent[i];
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.03s ease ${i * 0.03}s`;
            text.appendChild(span);
        }
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        textObserver.observe(text);
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission with loading effect
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // For demo purposes, show success message after 1.5 seconds
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = '#20c997';
                successMessage.style.color = 'white';
                successMessage.style.borderRadius = '8px';
                successMessage.style.textAlign = 'center';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                successMessage.style.transition = 'all 0.5s ease';
                
                if (this.classList.contains('newsletter-form')) {
                    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                } else if (this.classList.contains('contact-form')) {
                    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                }
                
                // Reset form and button
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Append and animate success message
                this.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 4000);
            }, 1500);
        });
    });
    
    // Add active class to nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && sectionId) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});