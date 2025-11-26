import { getVisitors, getWsVisitors } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const statsEl = document.getElementById('visitor-stats');
  const listEl = document.getElementById('visitor-list');
  if (!statsEl || !listEl) return;

  let wsTracker = null;
  let reconnectTimer = null;

  function normalizeVisitors(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // visitors array directly
    if (Array.isArray(data.visitors)) return data.visitors;
    if (Array.isArray(data.activeVisitors)) return data.activeVisitors;
    if (Array.isArray(data.active)) return data.active;
    if (Array.isArray(data.current)) return data.current;
    if (Array.isArray(data.list)) return data.list;
    // visitors as object map
    const candidates = [data.visitors, data.activeVisitors, data.active, data.current, data.list];
    for (const candidate of candidates) {
      if (candidate && typeof candidate === 'object') {
        const values = Object.values(candidate);
        // If values look like visitor objects already
        if (values.length && typeof values[0] === 'object') {
          return values;
        }
        // If it's a map of ip -> primitive/timestamp, use keys as IPs
        const keys = Object.keys(candidate);
        if (keys.length && typeof candidate[keys[0]] !== 'object') {
          return keys.map(ip => ({ ip }));
        }
      }
    }
    return [];
  }

  function deriveCount(data, normalizedList) {
    if (!data) return normalizedList.length;
    // common count fields
    const countFields = [
      'activeCount',
      'activeVisitorsCount',
      'count',
      'active',
    ];
    for (const field of countFields) {
      const v = data[field];
      if (typeof v === 'number') return v;
    }
    // nested counts
    if (data.stats && typeof data.stats.active === 'number') return data.stats.active;
    if (data.active && typeof data.active.count === 'number') return data.active.count;
    return normalizedList.length;
  }

  function formatVisitor(visitor) {
    if (!visitor || typeof visitor !== 'object') return 'Unknown visitor';
    const ip = visitor.ip || visitor.address || visitor.id || 'unknown';
    const city = visitor.location?.city || visitor.city;
    const country = visitor.location?.country || visitor.country;
    const ua = visitor.userAgent || visitor.ua;
    const parts = [];
    parts.push(ip);
    if (city || country) {
      parts.push(`— ${[city, country].filter(Boolean).join(', ')}`);
    }
    if (ua) {
      parts.push(`(${ua.split(' ').slice(0, 6).join(' ')}…)`);
    }
    return parts.join(' ');
  }

  function render(visitors, countOverride) {
    const count = typeof countOverride === 'number' ? countOverride : visitors.length;
    statsEl.textContent = `${count} active ${count === 1 ? 'visitor' : 'visitors'}`;
    listEl.innerHTML = '';
    if (count === 0) {
      const li = document.createElement('li');
      li.textContent = 'No active visitors right now.';
      li.style.opacity = '0.8';
      listEl.appendChild(li);
      return;
    }
    // If API only provided a count but not a list
    if (!visitors || visitors.length === 0) {
      const li = document.createElement('li');
      li.textContent = `${count} visitors active (details unavailable)`;
      listEl.appendChild(li);
      return;
    }
    visitors.forEach(v => {
      const li = document.createElement('li');
      li.textContent = formatVisitor(v);
      listEl.appendChild(li);
    });
  }

  async function refreshVisitors() {
    try {
      const data = await getVisitors();
      const visitors = normalizeVisitors(data);
      const count = deriveCount(data, visitors);
      render(visitors, count);
    } catch (err) {
      console.error('Failed to load visitors:', err);
      statsEl.textContent = 'Failed to load visitors';
    }
  }

  function initRealtime() {
    clearTimeout(reconnectTimer);
    try {
      wsTracker = getWsVisitors({
        onConnect: () => {
          statsEl.textContent = 'Connected — updating…';
          refreshVisitors();
        },
        onVisitorJoin: () => {
          refreshVisitors();
        },
        onVisitorLeave: () => {
          refreshVisitors();
        },
        onUpdate: () => {
          // For other update types, just refresh the list
          refreshVisitors();
        },
        onError: (error) => {
          console.error('WebSocket error:', error);
          statsEl.textContent = 'Connection error — retrying…';
          reconnectTimer = setTimeout(initRealtime, 5000);
        },
        onDisconnect: () => {
          statsEl.textContent = 'Disconnected — retrying…';
          reconnectTimer = setTimeout(initRealtime, 3000);
        }
      });
    } catch (e) {
      console.error('Failed to start realtime tracking:', e);
      statsEl.textContent = 'Failed to connect — retrying…';
      reconnectTimer = setTimeout(initRealtime, 5000);
    }
  }

  // Initial load + subscribe
  refreshVisitors();
  initRealtime();
});


