// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.nav-item.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                        const otherArrow = other.querySelector('.arrow');
                        if (otherArrow) otherArrow.style.transform = 'rotate(0)';
                    }
                });

                dropdown.classList.toggle('active');
                
                // Rotate arrow
                const arrow = toggle.querySelector('.arrow');
                if (arrow) {
                    if (dropdown.classList.contains('active')) {
                        arrow.style.transform = 'rotate(180deg)';
                    } else {
                        arrow.style.transform = 'rotate(0)';
                    }
                }
            }
        });
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We will send newsletters to: ' + email);
        form.reset();
    });
});

// Add real-time validation
const allInputs = document.querySelectorAll('input, select, textarea');
allInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#d32f2f';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(211, 47, 47)') {
            input.style.borderColor = '';
        }
    });
});

// Phone number formatting (Uganda format)
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as +256 XXX XXXXXX
        if (value.startsWith('256')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+256' + value.substring(1);
        } else if (value.length > 0 && !value.startsWith('+')) {
            value = '+256' + value;
        }
        
        e.target.value = value;
    });
});

// Date validation - prevent future dates for date of birth
const dobInputs = document.querySelectorAll('input[type="date"]');
dobInputs.forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('max', today);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Observe sections for animation
const animatedSections = document.querySelectorAll('.welcome-section, .clubs-section, .notice-board-section, .staff-section, .gallery-section, .important-days-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedSections.forEach(section => {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #4A90E2;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 998;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = '#2C5F8D';
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = '#4A90E2';
    backToTopBtn.style.transform = 'scale(1)';
});

console.log('Midland High School website loaded successfully!');
// Master Guide Stories Logic
const storiesTrack = document.getElementById('storiesTrack');
const storyCards = document.querySelectorAll('.story-card');
const prevStoryBtn = document.getElementById('prevStory');
const nextStoryBtn = document.getElementById('nextStory');
const storiesDotsContainer = document.getElementById('storiesDots');

if (storiesTrack && storyCards.length > 0) {
    let currentStoryIndex = 0;
    
    // Create dots
    storyCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `story-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToStory(index));
        storiesDotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.story-dot');
    
    function goToStory(index) {
        storyCards[currentStoryIndex].classList.remove('active');
        dots[currentStoryIndex].classList.remove('active');
        
        currentStoryIndex = index;
        if (currentStoryIndex >= storyCards.length) currentStoryIndex = 0;
        if (currentStoryIndex < 0) currentStoryIndex = storyCards.length - 1;
        
        storyCards[currentStoryIndex].classList.add('active');
        dots[currentStoryIndex].classList.add('active');
    }
    
    nextStoryBtn.addEventListener('click', () => goToStory(currentStoryIndex + 1));
    prevStoryBtn.addEventListener('click', () => goToStory(currentStoryIndex - 1));
    
    // Auto-advance
    setInterval(() => {
        goToStory(currentStoryIndex + 1);
    }, 6000);
}

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
