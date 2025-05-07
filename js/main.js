function ensureImageMode() {
  const logoImgeDivs = document.querySelectorAll('.company-logo');

  const ext = '.png';
  const darkExt = '-dark.png';
  const isDarkMode = document.body.classList.contains('dark-mode');
  logoImgeDivs.forEach(logoImgeDiv => {
    const logoImage = logoImgeDiv.querySelector('img');
    if (logoImage)
      logoImage.src = isDarkMode
        ? logoImage.src.replace(ext, darkExt)
        : logoImage.src.replace(darkExt, ext);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
  }

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeIcon.textContent = '☀️';

    } else {
      localStorage.setItem('theme', 'light');
      themeIcon.textContent = '🌙';
    }
    ensureImageMode();
  });

  ensureImageMode();

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');

  // Show button when scrolling down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
});