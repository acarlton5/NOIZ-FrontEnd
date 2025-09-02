export default async function init({ hub, root, utils }) {
  const container = document.createElement('div');
  container.className = 'alert-container';
  root.appendChild(container);

  function show({ message, type = 'info', timeout = 3000 }) {
    const el = document.createElement('div');
    el.className = `alert-item alert-${type}`;
    el.textContent = message;
    container.appendChild(el);
    utils.setTimeout(() => el.remove(), timeout);
  }

  hub.extend('alert', { show });

  const off = hub.on('alert', show);
  utils.onCleanup(off);
}
