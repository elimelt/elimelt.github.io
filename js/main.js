// Theme + UX
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
  
  function updateLogos() {
    const isDark = document.body.classList.contains('dark-mode');
    const toDark = (src) => {
      return src
        .replace('.png', '-dark.png')
        .replace('.svg', '-dark.svg')
    }
    const toLight = (src) => {
      return src
        .replace('-dark.png', '.png')
        .replace('-dark.svg', '.svg')
    }
    document.querySelectorAll('.timeline-logo').forEach(logo => {
      logo.src = isDark ? toDark(logo.src) : toLight(logo.src);
    });
  }
  
  function initRatFollower(options = {}) {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    const config = Object.assign({
      imgSrc: 'assets/grep-top.png',
      size: 100,
      anchor: { x: 0, y: 0 },
      stiffness: 100,
      damping: 22,
      mass: 1,
      rotate: true,
      debug: false,
      angleOffset: 0
    }, options);
    
    const img = document.createElement('img');
    img.src = config.imgSrc;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.loading = 'lazy';
    img.className = 'rat-follower';
    img.style.width = `${config.size}px`;
    img.style.transformOrigin = `${config.anchor.x * 100}% ${config.anchor.y * 100}%`;
    img.style.display = 'block';
    document.body.appendChild(img);
    
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let vx = 0;
    let vy = 0;
    let lastTime = performance.now();
    
    const anchorOffsetX = config.anchor.x * config.size;
    const anchorOffsetY = config.anchor.y * config.size;
    
    let debugSvg, debugLine, debugAnchorDot, debugTargetDot;
    if (config.debug) {
      debugSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      debugSvg.classList.add('rat-debug-overlay');
      debugSvg.style.position = 'fixed';
      debugSvg.style.top = '0';
      debugSvg.style.left = '0';
      debugSvg.style.width = '100vw';
      debugSvg.style.height = '100vh';
      debugSvg.style.pointerEvents = 'none';
      debugSvg.style.zIndex = '10001';
      
      debugLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      debugLine.setAttribute('stroke', '#ff3b6b');
      debugLine.setAttribute('stroke-width', '2');
      debugLine.setAttribute('stroke-linecap', 'round');
      debugLine.setAttribute('stroke-dasharray', '6 6');
      
      debugAnchorDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      debugAnchorDot.setAttribute('r', '4');
      debugAnchorDot.setAttribute('fill', '#35e06f');
      debugAnchorDot.setAttribute('stroke', '#0f8a3b');
      debugAnchorDot.setAttribute('stroke-width', '1.5');
      
      debugTargetDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      debugTargetDot.setAttribute('r', '3.5');
      debugTargetDot.setAttribute('fill', '#3aa0ff');
      debugTargetDot.setAttribute('stroke', '#1e6fd3');
      debugTargetDot.setAttribute('stroke-width', '1.5');
      
      debugSvg.appendChild(debugLine);
      debugSvg.appendChild(debugAnchorDot);
      debugSvg.appendChild(debugTargetDot);
      document.body.appendChild(debugSvg);
    }
    
    function setTarget(clientX, clientY) {
      targetX = clientX;
      targetY = clientY;
    }
    function updateTargetFromEvent(e) {
      if (e.touches && e.touches.length > 0) {
        setTarget(e.touches[0].clientX, e.touches[0].clientY);
      } else if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        setTarget(e.clientX, e.clientY);
      }
    }
    if ('onpointermove' in window) {
      window.addEventListener('pointerdown', updateTargetFromEvent, { passive: true });
      window.addEventListener('pointermove', updateTargetFromEvent, { passive: true });
    } else {
      window.addEventListener('mousemove', updateTargetFromEvent, { passive: true });
      window.addEventListener('touchstart', updateTargetFromEvent, { passive: true });
      window.addEventListener('touchmove', updateTargetFromEvent, { passive: true });
    }
    
    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;
      
      const k = config.stiffness;
      const c = config.damping;
      const m = config.mass;
      
      const fx = -k * (x - targetX) - c * vx;
      const fy = -k * (y - targetY) - c * vy;
      
      const ax = fx / m;
      const ay = fy / m;
      
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      
      const left = x - anchorOffsetX;
      const top = y - anchorOffsetY;
      
      let angle = 0;
      if (config.rotate) {
        angle = Math.atan2(targetY - y, targetX - x) + config.angleOffset;
      }
      
      img.style.transform = `translate(${left}px, ${top}px) rotate(${angle}rad)`;
      
      if (config.debug && debugSvg) {
        debugLine.setAttribute('x1', String(x));
        debugLine.setAttribute('y1', String(y));
        debugLine.setAttribute('x2', String(targetX));
        debugLine.setAttribute('y2', String(targetY));
        debugAnchorDot.setAttribute('cx', String(x));
        debugAnchorDot.setAttribute('cy', String(y));
        debugTargetDot.setAttribute('cx', String(targetX));
        debugTargetDot.setAttribute('cy', String(targetY));
      }
      
      requestAnimationFrame(tick);
    }
    
    requestAnimationFrame(tick);
    
    window.addEventListener('blur', () => {
      x = targetX;
      y = targetY;
      vx = 0;
      vy = 0;
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        history.pushState(null, null, link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          closeMobileMenu();
        }
      }
    });
  });
  
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

        const links = notesContainer.querySelectorAll('a');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('http')) {
            link.setAttribute('href', 'https://notes.elimelt.com' + href);
          }
        });

        document.getElementById('notes-content').innerHTML = notesContainer.innerHTML;

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
  
  initRatFollower({
    anchor: { x: 0.5, y: 0.0 },
    size: 76,
    angleOffset: Math.PI / 2
  });
});