/**
 * main.js
 * Main JavaScript file for the website
 */

(function() {
  // Document ready function
  document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    function setActiveLink() {
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
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
    
    // Add a simple "Back to Top" functionality
    // Only appears after scrolling down a bit
    const header = document.querySelector('header');
    
    function toggleBackToTop() {
      if (window.scrollY > window.innerHeight / 2) {
        header.classList.add('show-back-to-top');
      } else {
        header.classList.remove('show-back-to-top');
      }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // For fun - add a konami code easter egg
    // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    
    document.addEventListener('keydown', function(e) {
      // Check if the key matches the next key in the konami code
      if (e.key === konamiCode[konamiCodePosition] || 
          e.key.toLowerCase() === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        
        // If the entire code is entered
        if (konamiCodePosition === konamiCode.length) {
          activateKonamiCode();
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    });
    
    function activateKonamiCode() {
      // Create a fun animation showing "DEVELOPER MODE ACTIVATED"
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.color = '#0F0';
      overlay.style.fontSize = '3em';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';
      overlay.style.fontFamily = 'monospace';
      overlay.style.textAlign = 'center';
      overlay.innerHTML = '<div>DEVELOPER MODE ACTIVATED<br><span style="font-size: 0.5em">UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A</span></div>';
      
      document.body.appendChild(overlay);
      
      // Remove after a short delay
      setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      }, 2000);
      
      // Add a small visual tweak to the site as an easter egg reward
      document.body.classList.add('konami-activated');
      
      // Log to console
      console.log('%cKonami Code Activated!', 'color: #0F0; font-size: 20px; font-weight: bold;');
      console.log('%cYou\'ve unlocked developer mode. Nothing actually changes, but you feel cooler now.', 'color: #0FF;');
    }
    
    // Simple performance tracking
    console.time('Page Load');
    window.addEventListener('load', function() {
      console.timeEnd('Page Load');
    });
    
    // Track SPA-style navigation timing
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const section = this.getAttribute('href').substring(1);
        console.time(`Navigate to ${section}`);
        setTimeout(() => {
          console.timeEnd(`Navigate to ${section}`);
        }, 600); // Just after our smooth scroll should complete
      });
    });
  });
})();