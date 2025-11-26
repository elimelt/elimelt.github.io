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
      stiffness: 50,
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
    // Dynamic size that grows as meat is eaten
    let currentSize = config.size;
    // Idle detection and sprite switching
    const idleThresholdMs = 3000;
    let lastMoveAt = performance.now();
    let isIdle = false;
    let currentSprite = 'top'; // 'top' -> grep-top.png, 'full' -> grep.png
    const baseSize = config.size;
    let lastEatAt = performance.now();
    const hungerDelayMs = 1200;
    const shrinkPerSecond = 10;
    
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
      lastMoveAt = performance.now();
    }
    if ('onpointermove' in window) {
      window.addEventListener('pointerdown', updateTargetFromEvent, { passive: true });
      window.addEventListener('pointermove', updateTargetFromEvent, { passive: true });
    } else {
      window.addEventListener('mousemove', updateTargetFromEvent, { passive: true });
      window.addEventListener('touchstart', updateTargetFromEvent, { passive: true });
      window.addEventListener('touchmove', updateTargetFromEvent, { passive: true });
    }
    
    // Meat spawn + eat
    const meats = [];
    const maxMeats = 8;
    let destroyed = false;
    let spawnTimerId = null;
    let rafId = null;
    function spawnMeat() {
      if (destroyed) return;
      const size = 22 + Math.random() * 22; // 22..44
      const radius = size / 2;
      const margin = 20 + radius;
      const posX = margin + Math.random() * (window.innerWidth - margin * 2);
      const posY = margin + Math.random() * (window.innerHeight - margin * 2);
      
      const el = document.createElement('div');
      el.className = 'meat';
      el.textContent = '🥩';
      el.style.position = 'fixed';
      el.style.left = `${posX - radius}px`;
      el.style.top = `${posY - radius}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = `${size * 0.85}px`;
      el.style.lineHeight = '1';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))';
      document.body.appendChild(el);
      
      meats.push({
        el,
        x: posX,
        y: posY,
        r: radius,
        createdAt: performance.now(),
        ttl: 15000 + Math.random() * 15000, // 15-30s before uneaten despawn
        state: 'meat',
        eatenAt: 0
      });
    }
    function scheduleNextSpawn() {
      const delay = 600 + Math.random() * 1400; // 0.6..2.0s
      spawnTimerId = setTimeout(() => {
        if (destroyed) return;
        if (meats.length < maxMeats) spawnMeat();
        scheduleNextSpawn();
      }, delay);
    }
    scheduleNextSpawn();
    
    function tick(now) {
      if (destroyed) return;
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
      
      // Shrink over time if not eating (not below base size)
      if (currentSize > baseSize && (now - lastEatAt) > hungerDelayMs) {
        currentSize = Math.max(baseSize, currentSize - shrinkPerSecond * dt);
      }
      
      const anchorOffsetX = config.anchor.x * currentSize;
      const anchorOffsetY = config.anchor.y * currentSize;
      const left = x - anchorOffsetX;
      const top = y - anchorOffsetY;
      
      // Determine idle state and swap sprites if needed
      const nowIdle = (now - lastMoveAt) > idleThresholdMs;
      if (nowIdle !== isIdle) {
        isIdle = nowIdle;
        if (isIdle && currentSprite !== 'full') {
          img.src = 'assets/grep.png';
          currentSprite = 'full';
        } else if (!isIdle && currentSprite !== 'top') {
          img.src = config.imgSrc; // 'assets/grep-top.png'
          currentSprite = 'top';
        }
      }
      
      let angle = 0;
      if (config.rotate && !isIdle) {
        angle = Math.atan2(targetY - y, targetX - x) + config.angleOffset;
      }
      
      img.style.width = `${currentSize}px`;
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
      
      // Eat or expire meats
      for (let i = meats.length - 1; i >= 0; i--) {
        const m = meats[i];
        // Despawn logic
        if (m.state === 'meat') {
          if (now - m.createdAt > m.ttl) {
            m.el.remove();
            meats.splice(i, 1);
            continue;
          }
          // Collision: use anchor point vs meat center
          const dx = x - m.x;
          const dy = y - m.y;
          const eatRadius = 6;
          if (dx * dx + dy * dy <= (m.r + eatRadius) * (m.r + eatRadius)) {
            // Convert to bone and start 5s despawn timer
            m.state = 'bone';
            m.eatenAt = now;
            m.el.textContent = '🦴';
            m.el.style.opacity = '0.95';
            // Prevent re-eating by shrinking collision radius
            m.r = 0;
            // Grow follower when eating meat
          const growth = Math.max(3, Math.round((currentSize * 0.06)));
          currentSize = currentSize + growth;
          lastEatAt = now;
          }
        } else if (m.state === 'bone') {
          if (now - m.eatenAt > 5000) {
            m.el.remove();
            meats.splice(i, 1);
          }
        }
      }
      
      rafId = requestAnimationFrame(tick);
    }
    
    rafId = requestAnimationFrame(tick);
    
    const onBlur = () => {
      x = targetX;
      y = targetY;
      vx = 0;
      vy = 0;
    };
    window.addEventListener('blur', onBlur);

    function destroy() {
      destroyed = true;
      if (spawnTimerId) {
        clearTimeout(spawnTimerId);
        spawnTimerId = null;
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // Remove event listeners
      if ('onpointermove' in window) {
        window.removeEventListener('pointerdown', updateTargetFromEvent);
        window.removeEventListener('pointermove', updateTargetFromEvent);
      } else {
        window.removeEventListener('mousemove', updateTargetFromEvent);
        window.removeEventListener('touchstart', updateTargetFromEvent);
        window.removeEventListener('touchmove', updateTargetFromEvent);
      }
      window.removeEventListener('blur', onBlur);
      // Remove DOM elements
      meats.forEach(m => {
        if (m.el && m.el.parentNode) m.el.parentNode.removeChild(m.el);
      });
      meats.length = 0;
      if (img && img.parentNode) img.parentNode.removeChild(img);
      if (debugSvg && debugSvg.parentNode) debugSvg.parentNode.removeChild(debugSvg);
    }

    return { destroy };
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
  
  const meatToggle = document.getElementById('meat-toggle');
  let ratController = null;
  function updateMeatToggleUi(enabled) {
    if (!meatToggle) return;
    meatToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    meatToggle.title = enabled ? 'Disable rat meat game' : 'Enable rat meat game';
    meatToggle.classList.toggle('meat-active', !!enabled);
  }
  if (meatToggle) {
    const enabledByDefault = localStorage.getItem('meatGame') === 'true';
    if (enabledByDefault) {
      ratController = initRatFollower({
        anchor: { x: 0.5, y: 0.0 },
        size: 76,
        angleOffset: Math.PI / 2
      }) || null;
    }
    updateMeatToggleUi(!!ratController);
    meatToggle.addEventListener('click', () => {
      const isEnabled = !!ratController;
      if (isEnabled) {
        ratController.destroy();
        ratController = null;
        localStorage.setItem('meatGame', 'false');
        updateMeatToggleUi(false);
      } else {
        ratController = initRatFollower({
          anchor: { x: 0.5, y: 0.0 },
          size: 76,
          angleOffset: Math.PI / 2
        }) || null;
        localStorage.setItem('meatGame', 'true');
        updateMeatToggleUi(!!ratController);
      }
    });
  }
});
