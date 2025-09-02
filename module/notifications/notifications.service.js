// module/notifications/notifications.service.js
// Preloads notification styles and exposes a simple notification API.

export default function ({ hub }) {
  // Ensure CSS is loaded when service starts
  if (!document.querySelector('link[data-module="notifications"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/module/notifications/notifications.css';
    link.dataset.module = 'notifications';
    document.head.appendChild(link);
  }

  function notify(message, { timeout = 3000, icon, actions = [] } = {}) {
    let container = document.querySelector('.notification-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }

    const popup = document.createElement('div');
    popup.className = 'notification-popup';

    if (icon) {
      const img = document.createElement('img');
      img.src = icon;
      img.alt = '';
      img.className = 'notification-icon';
      popup.appendChild(img);
    }

    const content = document.createElement('div');
    content.className = 'notification-content';
    content.textContent = message;
    popup.appendChild(content);

    const close = document.createElement('button');
    close.className = 'notification-close';
    close.innerHTML = '&times;';
    close.addEventListener('click', () => popup.remove());
    popup.appendChild(close);

    if (actions.length) {
      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'notification-actions';
      actions.forEach(({ label, onClick }) => {
        const btn = document.createElement('button');
        btn.className = 'notification-action';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          if (typeof onClick === 'function') onClick();
          popup.remove();
        });
        actionsWrap.appendChild(btn);
      });
      popup.appendChild(actionsWrap);
    }

    container.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('show'));

    if (timeout) {
      window.setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('fade-out');
        popup.addEventListener('transitionend', () => popup.remove(), { once: true });
      }, timeout);
    }

    return popup;
  }

  const api = { notify };
  return api;
}
