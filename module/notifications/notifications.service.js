// module/notifications/notifications.service.js
// Preloads notification styles and exposes a simple notification API.
import './notifications.css';

export default function ({ hub }) {
  // Ensure CSS is loaded when service starts
  if (!document.querySelector('link[data-module="notifications"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/module/notifications/notifications.css';
    link.dataset.module = 'notifications';
    document.head.appendChild(link);
  }

  function notify(message, { timeout = 3000 } = {}) {
    let container = document.querySelector('.notification-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }

    const popup = document.createElement('div');
    popup.className = 'notification-popup';
    popup.textContent = message;
    container.appendChild(popup);

    window.setTimeout(() => {
      popup.classList.add('fade-out');
      popup.addEventListener('transitionend', () => popup.remove(), { once: true });
    }, timeout);
  }

  const api = { notify };
  hub.extend?.('notifications', api);
  return api;
}
