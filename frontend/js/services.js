import { getSystem } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('services-content');
  if (!container) return;

  function formatPercent(value) {
    if (typeof value !== 'number' || isNaN(value)) return '—';
    const pct = value <= 1 ? value * 100 : value;
    return `${pct.toFixed(1)}%`;
  }

  function formatMb(value) {
    if (typeof value !== 'number' || isNaN(value)) return '—';
    return `${value.toFixed(1)} MB`;
  }

  function stripHealthy(uptime) {
    if (typeof uptime !== 'string') return uptime;

    return uptime.replace(/\(healthy\)/g, '').trim();
  }

  function render(data) {
    if (!data || typeof data !== 'object') {
      container.textContent = 'No data';
      return;
    }
    const services = Array.isArray(data.services) ? data.services : [];
    const totalContainers = typeof data.total_containers === 'number'
      ? data.total_containers
      : (services.length || '—');

    if (!services.length) {
      container.innerHTML = `
        <div class="section-description">Total containers: ${totalContainers}</div>
        <div>No services reported.</div>
      `;
      return;
    }

    const rows = services.map(svc => {
      const name = svc.name || 'unknown';
      const status = stripHealthy(svc.status) || 'unknown';
      const cpu = formatPercent(svc.cpu_percent);
      const mem = `${formatMb(svc.memory_mb)} (${formatPercent(svc.memory_percent)})`;
      return `
        <tr>
          <td>${name}</td>
          <td>${status}</td>
          <td>${cpu}</td>
          <td>${mem}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="section-description">Total containers: ${totalContainers}</div>
      <div class="services-table-wrap">
        <table class="services-table" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align:left; padding: 6px 4px; border-bottom: 1px solid var(--border);">Service</th>
              <th style="text-align:left; padding: 6px 4px; border-bottom: 1px solid var(--border);">Status</th>
              <th style="text-align:left; padding: 6px 4px; border-bottom: 1px solid var(--border);">CPU</th>
              <th style="text-align:left; padding: 6px 4px; border-bottom: 1px solid var(--border);">Memory</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  async function load() {
    try {
      const data = await getSystem();
      render(data);
    } catch (e) {
      console.error('Failed to load system services:', e);
      container.textContent = 'Failed to load services';
    }
  }

  load();
  setInterval(load, 10000);
});


