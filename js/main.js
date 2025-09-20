const ThemeManager = {
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  STORAGE_KEY: 'theme',
  ICON_MAPPING: {
    ['light']: 'Dark',
    ['dark']: 'Light'
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
      this.themeIcon.textContent = 'Light';
    }
  },

  setupEventListeners() {
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  },

  toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem(this.STORAGE_KEY, isDarkMode ? this.THEMES.DARK : this.THEMES.LIGHT);
    this.themeIcon.textContent = isDarkMode ? 'Light' : 'Dark';
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
      const sectionTop = section.offsetTop - 100;
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
          window.scrollTo({
            top: targetElement.offsetTop - 40,
            behavior: 'smooth'
          });
        }
      });
    });
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

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  LogoManager.init();
  NavigationManager.init();
  NotesManager.init();
});