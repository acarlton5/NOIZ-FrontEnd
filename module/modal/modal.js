export default async function init({ hub, root, utils }) {
  root.innerHTML = '<div class="modal-backdrop" style="display:none"><div class="modal-content"></div></div>';
  const backdrop = root.querySelector('.modal-backdrop');
  const content = root.querySelector('.modal-content');

  function open(opts = {}) {
    const { html, node } = opts;
    content.innerHTML = '';
    if (node instanceof HTMLElement) {
      content.appendChild(node);
    } else if (typeof html === 'string') {
      content.innerHTML = html;
    }
    backdrop.style.display = 'flex';
  }

  function close() {
    backdrop.style.display = 'none';
    content.innerHTML = '';
  }

  hub.extend('modal', { open, close });
  const offOpen = hub.on('modal:open', open);
  const offClose = hub.on('modal:close', close);
  utils.onCleanup(offOpen);
  utils.onCleanup(offClose);

  utils.listen(backdrop, 'click', (e) => {
    if (e.target === backdrop) close();
  });

  return { destroy: close };
}
