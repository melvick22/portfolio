// Dark/Light mode toggle
  const toggleBtn = document.getElementById('mode-toggle');
  const modeIcon = toggleBtn.querySelector('i');
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
      modeIcon.classList.remove('fa-moon');
      modeIcon.classList.add('fa-sun');
    } else {
      modeIcon.classList.remove('fa-sun');
      modeIcon.classList.add('fa-moon');
    }
  });

  // Mobile navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-times');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').classList.remove('fa-times');
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
    } else {
      navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
    }
  });

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Typing effect in hero section
  const text = "Software Engineer | Full-Stack Developer | AI & Blockchain Enthusiast";
  let i = 0;
  const typingText = document.getElementById("typing-text");
  
  function type() {
    if(i < text.length){
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  
  // Start typing effect after page loads
  window.addEventListener('load', type);