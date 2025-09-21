const ThemeManager = {
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  STORAGE_KEY: 'theme',
  ICON_MAPPING: {
    ['light']: '#icon-moon',
    ['dark']: '#icon-sun'
  },

  init() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.getElementById('theme-icon');

    if (!this.themeToggle || !this.themeIcon) return;

    this.loadSavedTheme();
    this.setupEventListeners();
  },

  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme === this.THEMES.DARK) {
      document.body.classList.add('dark-mode');
      this.themeIcon.querySelector('use').setAttribute('href', this.ICON_MAPPING[this.THEMES.DARK]);
    } else {
      this.themeIcon.querySelector('use').setAttribute('href', this.ICON_MAPPING[this.THEMES.LIGHT]);
    }
  },

  setupEventListeners() {
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  },

  toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const currentTheme = isDarkMode ? this.THEMES.DARK : this.THEMES.LIGHT;
    localStorage.setItem(this.STORAGE_KEY, currentTheme);
    this.themeIcon.querySelector('use').setAttribute('href', this.ICON_MAPPING[currentTheme]);
    LogoManager.updateLogos();
  }
};

const LogoManager = {
  init() {
    this.updateLogos();
  },

  updateLogos() {
    const logoImgs = document.querySelectorAll('.timeline-logo');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const ext = '.png';
    const darkExt = '-dark.png';

    logoImgs.forEach(logoImg => {
      if (logoImg) {
        logoImg.src = isDarkMode
          ? logoImg.src.replace(ext, darkExt)
          : logoImg.src.replace(darkExt, ext);
      }
    });
  }
};

const NavigationManager = {
  init() {
    this.setupActiveNavLinks();
    this.setupSmoothScrolling();
    this.handleInitialHash();
    this.setupPopstateListener();
  },

  setupActiveNavLinks() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      if (currentLocation.includes('index.html') || currentLocation === '/' || currentLocation === '') {
        // For index page, highlight based on hash
        window.addEventListener('scroll', () => {
          this.highlightNavOnScroll();
        });
      } else if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
      }
    });
  },

  highlightNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';

    sections.forEach(section => {
      const offset = 120;
      const sectionTop = section.offsetTop - offset;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(currentSectionId)) {
        link.classList.add('active');
      }
    });
  },

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Update the URL
          history.pushState(null, null, targetId);
          
          // Simple smooth scroll
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });

          // Close mobile menu if it's open
          const sidebar = document.getElementById('sidebar');
          if (sidebar && sidebar.classList.contains('mobile-open')) {
            if (window.MobileMenuManager && window.MobileMenuManager.closeMobileMenu) {
              window.MobileMenuManager.closeMobileMenu();
            }
          }
        }
      });
    });
  },

  handleInitialHash() {
    // Handle initial page load with hash
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        this.scrollToSection(hash);
      }, 100); // Small delay to ensure page is fully loaded
    }
  },

  setupPopstateListener() {
    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
      const hash = window.location.hash;
      if (hash) {
        this.scrollToSection(hash);
      } else {
        // Scroll to top if no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  },

  scrollToSection(hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      const offset = 60;
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  }
};

const NotesManager = {
  NOTES_URL: 'https://notes.elimelt.com',

  init() {
    if (!this.isIndexPage()) return;

    this.notesContainer = document.getElementById('notes-content');
    if (this.notesContainer) {
      this.fetchAndDisplayNotes();
    }
  },

  isIndexPage() {
    const path = window.location.pathname;
    return path.includes('/index.html') || path === '/';
  },

  async fetchAndDisplayNotes() {
    try {
      const notesHtml = await this.fetchNotesHtml();
      if (notesHtml) {
        this.notesContainer.innerHTML = notesHtml;
        this.formatNotes();
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      this.notesContainer.innerHTML = '<li class="note-item">Unable to load notes. Please try again later.</li>';
    }
  },

  async fetchNotesHtml() {
    const response = await fetch(this.NOTES_URL);
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

    this.updateLinks(notesContainer);
    return notesContainer.innerHTML;
  },

  updateLinks(container) {
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        link.setAttribute('href', this.NOTES_URL + href);
      }
    });
  },

  formatNotes() {
    const noteItems = this.notesContainer.querySelectorAll('li');
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
  }
};

const MobileMenuManager = {
  init() {
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.sidebar = document.getElementById('sidebar');
    this.overlay = null;

    if (!this.mobileMenuToggle || !this.sidebar) return;

    this.setupEventListeners();
  },

  setupEventListeners() {
    this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    
    // NavigationManager will handle closing the mobile menu when nav links are clicked

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.sidebar.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  },

  toggleMobileMenu() {
    if (this.sidebar.classList.contains('mobile-open')) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  },

  openMobileMenu() {
    this.sidebar.classList.add('mobile-open');
    this.mobileMenuToggle.classList.add('active');
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-overlay';
    document.body.appendChild(this.overlay);
    
    // Show overlay with animation
    setTimeout(() => {
      this.overlay.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  },

  closeMobileMenu() {
    this.sidebar.classList.remove('mobile-open');
    this.mobileMenuToggle.classList.remove('active');
    
    // Hide overlay with animation
    if (this.overlay) {
      this.overlay.classList.remove('show');
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.remove();
          this.overlay = null;
        }
      }, 300);
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  LogoManager.init();
  NavigationManager.init();
  NotesManager.init();
  MobileMenuManager.init();
  
  // Make MobileMenuManager globally accessible
  window.MobileMenuManager = MobileMenuManager;
});