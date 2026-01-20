// Dark/Light mode toggle
const toggleBtn = document.getElementById('mode-toggle');
const modeIcon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  if (document.body.classList.contains('dark')) {
    modeIcon.classList.remove('fa-moon');
    modeIcon.classList.add('fa-sun');
    // Update particles for dark mode
    particlesJS('particles-js', particlesDarkConfig);
  } else {
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    // Update particles for light mode
    particlesJS('particles-js', particlesLightConfig);
  }
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(248, 249, 255, 0.95)';
    if (document.body.classList.contains('dark')) {
      navbar.style.backgroundColor = 'rgba(15, 15, 30, 0.95)';
    }
  } else {
    navbar.style.backgroundColor = 'rgba(248, 249, 255, 0.9)';
    if (document.body.classList.contains('dark')) {
      navbar.style.backgroundColor = 'rgba(15, 15, 30, 0.9)';
    }
  }
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in, .fade-up');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  // Hero section animations
  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3
  });
  
  gsap.from('.hero-title', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out"
  });
  
  gsap.from('.hero-role', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 0.7,
    ease: "power3.out"
  });
  
  gsap.from('.hero-desc', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 0.9,
    ease: "power3.out"
  });
  
  gsap.from('.hero-btns', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 1.1,
    ease: "power3.out"
  });
  
  gsap.from('.code-snippet', {
    duration: 1.5,
    x: 100,
    opacity: 0,
    delay: 0.8,
    ease: "power3.out",
    rotateY: -30
  });
  
  // Add floating background elements
  const floatingElements = document.createElement('div');
  floatingElements.innerHTML = `
    <div class="floating-element"></div>
    <div class="floating-element"></div>
  `;
  document.querySelector('.hero').appendChild(floatingElements);
  
  // Scroll down button animation
  gsap.to('.scroll-down', {
    y: 10,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
  
  // ScrollTrigger animations for sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  });
  
  // Animate skill bars when in view
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 80%',
      onEnter: () => {
        const level = bar.getAttribute('data-level');
        gsap.to(bar, {
          width: `${level}%`,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    });
  });
});

// Read More functionality
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', function() {
    const fullDesc = this.nextElementSibling;
    fullDesc.classList.toggle('active');
    this.style.display = 'none';
  });
});

document.querySelectorAll('.read-less-btn').forEach(button => {
  button.addEventListener('click', function() {
    const fullDesc = this.parentElement;
    fullDesc.classList.remove('active');
    const readMoreBtn = fullDesc.previousElementSibling.previousElementSibling;
    readMoreBtn.style.display = 'block';
  });
});

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    gsap.to(cursorOutline, {
      duration: 0.3,
      left: e.clientX,
      top: e.clientY
    });
  });

  // Interactive cursor effects
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'scale(2)';
      cursorOutline.style.transform = 'scale(1.5)';
      cursorOutline.style.borderColor = 'var(--secondary)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'scale(1)';
      cursorOutline.style.transform = 'scale(1)';
      cursorOutline.style.borderColor = 'var(--primary)';
    });
  });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success state
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = `<span>${originalText}</span> <i class="fas fa-paper-plane"></i>`;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }, 2000);
  });
}

// Particle.js configurations
const particlesLightConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#6C63FF" },
    shape: { type: "circle" },
    opacity: { value: 0.1, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#6C63FF", opacity: 0.1, width: 1 },
    move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } }
  }
};

const particlesDarkConfig = {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#FFFFFF" },
    shape: { type: "circle" },
    opacity: { value: 0.05, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#FFFFFF", opacity: 0.05, width: 1 },
    move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } }
  }
};

// Initialize particles
particlesJS('particles-js', particlesLightConfig);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
window.addEventListener('load', () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const level = bar.getAttribute('data-level');
      bar.style.width = `${level}%`;
    }
  });
  
  const codeElement = document.querySelector('.code-content code');
  if (codeElement) {
    const originalCode = codeElement.textContent;
    codeElement.textContent = '';
    
    let i = 0;
    function typeCode() {
      if (i < originalCode.length) {
        codeElement.textContent += originalCode.charAt(i);
        i++;
        setTimeout(typeCode, 20);
      }
    }
    
    setTimeout(typeCode, 1500);
  }
});