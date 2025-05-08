const ThemeManager = {
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  STORAGE_KEY: 'theme',
  ICON_MAPPING: {
    ['light']: '🌙',
    ['dark']: '☀️'
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
      this.themeIcon.textContent = '🌙';
    }
  },
  setupEventListeners() {
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  },
  toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem(this.STORAGE_KEY, isDarkMode ? this.THEMES.DARK : this.THEMES.LIGHT);
    this.themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    LogoManager.updateLogos();
  }
};
const LogoManager = {
  init() {
    this.updateLogos();
  },
  updateLogos() {
    const logoImgDivs = document.querySelectorAll('.company-logo');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const ext = '.png';
    const darkExt = '-dark.png';
    logoImgDivs.forEach(logoImgDiv => {
      const logoImage = logoImgDiv.querySelector('img');
      if (logoImage) {
        logoImage.src = isDarkMode
          ? logoImage.src.replace(ext, darkExt)
          : logoImage.src.replace(darkExt, ext);
      }
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
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      this.notesContainer.innerHTML = '<p>Unable to load notes. Please try again later.</p>';
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
  }
};
const ScrollManager = {
  init() {
    this.backToTopButton = document.getElementById('back-to-top');
    if (!this.backToTopButton) return;
    this.setupScrollListener();
    this.setupBackToTopButton();
    this.setupSmoothScrolling();
  },
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.toggleBackToTopButton();
    });
  },
  toggleBackToTopButton() {
    this.backToTopButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
  },
  setupBackToTopButton() {
    this.backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};
const FriendsManager = {
  init() {
    if (!this.isFriendsPage()) return;
    this.friendsList = document.getElementById('friends-links');
    if (this.friendsList) {
      this.loadFriendsList();
    }
  },
  isFriendsPage() {
    return window.location.pathname.includes('friends.html');
  },
  async loadFriendsList() {
    try {
      const friendUrls = await this.fetchFriendsData();
      this.displayFriends(friendUrls);
    } catch (error) {
      console.error('Error loading friends data:', error);
      this.friendsList.innerHTML = '<li>Unable to load friends data. Please try again later.</li>';
    }
  },
  async fetchFriendsData() {
    const response = await fetch('data/friends.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch friends data: ${response.statusText}`);
    }
    return await response.json();
  },
  displayFriends(friendUrls) {
    if (friendUrls.length === 0) {
      this.friendsList.innerHTML = '<li>No friends added yet. Check back later!</li>';
      return;
    }
    const fragment = document.createDocumentFragment();
    friendUrls.forEach(url => {
      const listItem = document.createElement('li');
      const domain = this.getDomainFromUrl(url);
      listItem.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${domain}</a>`;
      fragment.appendChild(listItem);
    });
    this.friendsList.appendChild(fragment);
  },
  getDomainFromUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      return url;
    }
  }
};
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  LogoManager.init();
  NotesManager.init();
  ScrollManager.init();
  FriendsManager.init();
});