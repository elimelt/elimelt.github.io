/**
 * theme-toggle.js
 * Smooth theme toggling with appropriate icons
 */

(function() {
  // Get theme toggle button and icon
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check for saved preference, or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '●';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '○';
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update DOM
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '●' : '○';
    
    // Save preference
    localStorage.setItem('theme', newTheme);

    // Add subtle animation to indicate theme change
    themeToggle.classList.add('toggle-active');
    setTimeout(() => {
      themeToggle.classList.remove('toggle-active');
      // Remove transition after change to prevent transitions during page interactions
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    }, 300);
  });

  // Handle navigation active states
  document.addEventListener('scroll', highlightNavLinks);

  function highlightNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Initial highlight
  highlightNavLinks();
})();