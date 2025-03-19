/**
 * animations.js
 * Handles smooth animations and interactions
 */

(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize section fade-in on scroll
    initSectionFades();
    
    // Initialize terminal typing effect
    initTerminalTyping();
    
    // Initialize active nav state
    initActiveNavState();
  });
  
  // Animate sections as they come into view
  function initSectionFades() {
    const sections = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // Terminal typing effect
  function initTerminalTyping() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    // Store original content and clear the terminal
    const originalContent = terminalOutput.textContent;
    terminalOutput.textContent = '';
    
    // Start typing effect when terminal comes into view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Add content back and start typing animation
        terminalOutput.textContent = originalContent;
        terminalOutput.classList.add('typing');
        observer.unobserve(terminalOutput);
      }
    }, {
      threshold: 0.5
    });
    
    observer.observe(terminalOutput);
  }
  
  // Update active state of navigation links based on scroll position
  function initActiveNavState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
    
    // Set active link on page load and scroll
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      });
    });
  }
})();