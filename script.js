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

// Modal Functions
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
const modal = document.getElementById('successModal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'successModal') {
            closeModal();
        }
    });
}

// O'Level Form Submission
const oLevelForm = document.getElementById('oLevelForm');
if (oLevelForm) {
    oLevelForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(oLevelForm);
        const data = Object.fromEntries(formData);
        data.application_type = "O'Level";  // add type

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
                showModal();
                oLevelForm.reset();
            } else {
                alert("Failed to submit: " + (result.error || "Unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting form. Please try again.");
        }
    });
}

// A'Level Form Submission
const aLevelForm = document.getElementById('aLevelForm');
if (aLevelForm) {
    aLevelForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(aLevelForm);
        const data = Object.fromEntries(formData);
        data.application_type = "A'Level";  // add type

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
                showModal();
                aLevelForm.reset();
            } else {
                alert("Failed to submit: " + (result.error || "Unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting form. Please try again.");
        }
    });
}

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

// Form Validation Enhancement
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#d32f2f';
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

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

// Scroll reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const animatedSections = document.querySelectorAll('.welcome-section, .clubs-section, .notice-board-section, .staff-section, .gallery-section, .important-days-section');
animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Print functionality (if needed)
function printPage() {
    window.print();
}

// Log page load
console.log('Midland High School website loaded successfully!');

// Back to top button (optional)
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
async function sendToServer(data, type) {
    try {
        const response = await fetch(
            "https://midland-highschool-backend.vercel.app/api/apply",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type,   // "OLEVEL" or "ALEVEL"
                    ...data
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to submit application");
        }

        return await response.json();
    } catch (error) {
        console.error("Submission error:", error);
        alert("Submission failed. Please try again.");
        throw error;
    }
}