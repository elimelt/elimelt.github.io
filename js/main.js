// Simplified JavaScript - minimal functionality

// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  if (themeToggle && themeIcon) {
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.querySelector('use').setAttribute('href', '#icon-sun');
      updateLogos();
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeIcon.querySelector('use').setAttribute('href', isDark ? '#icon-sun' : '#icon-moon');
      updateLogos();
    });
  }
  
  // Update logos for dark/light mode
  function updateLogos() {
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelectorAll('.timeline-logo').forEach(logo => {
      logo.src = isDark ? logo.src.replace('.png', '-dark.png') : logo.src.replace('-dark.png', '.png');
    });
  }
  
  // Smooth scrolling navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        history.pushState(null, null, link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Close mobile menu if open
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          closeMobileMenu();
        }
      }
    });
  });
  
  // Mobile menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });
  }
  
  function closeMobileMenu() {
    if (sidebar) {
      sidebar.classList.remove('mobile-open');
      mobileToggle.classList.remove('active');
    }
  }
  
  // Load notes from external site (restored original functionality)
  const notesContainer = document.getElementById('notes-content');
  if (notesContainer) {
    async function fetchAndDisplayNotes() {
      try {
        const response = await fetch('https://notes.elimelt.com');
        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.statusText}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const notesContainer = doc.querySelector('.recent-posts');

        if (!notesContainer) {
          throw new Error('Notes container not found in fetched HTML');
        }

        // Update links to be absolute
        const links = notesContainer.querySelectorAll('a');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('http')) {
            link.setAttribute('href', 'https://notes.elimelt.com' + href);
          }
        });

        // Insert the notes HTML
        document.getElementById('notes-content').innerHTML = notesContainer.innerHTML;

        // Format the notes with proper classes
        const noteItems = document.querySelectorAll('#notes-content li');
        noteItems.forEach(item => {
          item.classList.add('note-item');

          const link = item.querySelector('a');
          if (link) link.classList.add('note-link');

          const date = item.querySelector('.date');
          if (date) date.classList.add('note-date');

          const category = item.querySelector('.category');
          if (category) category.classList.add('note-category');

          if (date && category) {
            const metaDiv = document.createElement('div');
            metaDiv.classList.add('note-meta');

            date.parentNode.insertBefore(metaDiv, date);
            metaDiv.appendChild(date);
            metaDiv.appendChild(category);
          }
        });
      } catch (error) {
        console.error('Error fetching notes:', error);
        document.getElementById('notes-content').innerHTML = '<li class="note-item">Unable to load notes. Please try again later.</li>';
      }
    }

    fetchAndDisplayNotes();
  }
});