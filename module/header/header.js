// module/header/header.js
// Bootstrap 5 header (no dropdowns) with an API other modules can use.
// API:
//   - setTitle(text)
//   - setBrand({ text, href })
//   - addButton({ id, label, onClick, placement: 'left'|'right'|'brand-right' })
//   - removeButton(id)

export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <header data-role="header" class="header">
      <nav class="navbar navbar-dark bg-dark navbar-expand-md border-bottom border-opacity-10">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#" data-role="brand">
            <span class="brand-mark">NOIZ</span>
          </a>

          <div class="d-flex align-items-center gap-2" data-slot="brand-right" aria-label="Brand actions"></div>

          <button class="navbar-toggler" type="button"
                  data-bs-toggle="collapse" data-bs-target="#noizHeaderNav"
                  aria-controls="noizHeaderNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="noizHeaderNav">
            <ul class="navbar-nav me-auto" data-slot="left" aria-label="Primary navigation"></ul>
            <div class="d-flex align-items-center gap-2" data-slot="right" aria-label="Utility actions"></div>
          </div>
        </div>
      </nav>
    </header>
  `;

  const slots = {
    left: root.querySelector('[data-slot="left"]'),
    right: root.querySelector('[data-slot="right"]'),
    brandRight: root.querySelector('[data-slot="brand-right"]'),
  };
  const brand = root.querySelector('[data-role="brand"]');

  const registry = new Map(); // id -> { placement, onClick }

  function renderButton({ id, label, placement }) {
    const leftHtml = `<li class="nav-item"><button class="nav-link btn btn-link px-0" data-role="btn" data-id="${id}">${label}</button></li>`;
    const btnHtml  = `<button class="btn btn-outline-light btn-sm" data-role="btn" data-id="${id}">${label}</button>`;

    if (placement === 'left') {
      slots.left.insertAdjacentHTML('beforeend', leftHtml);
    } else if (placement === 'brand-right') {
      slots.brandRight.insertAdjacentHTML('beforeend', btnHtml);
    } else {
      slots.right.insertAdjacentHTML('beforeend', btnHtml);
    }
  }

  // Delegated clicks
  utils.delegate(root, 'click', '[data-role="btn"]', (e, el) => {
    const id = el.getAttribute('data-id');
    const rec = registry.get(id);
    if (rec?.onClick) rec.onClick(e);
  });

  // Public API
  const api = {
    setTitle(text) {
      // Keep brand element but replace text
      brand.querySelector('.brand-mark').textContent = text ?? '';
    },
    setBrand({ text = 'NOIZ', href = '#' } = {}) {
      brand.setAttribute('href', href);
      brand.querySelector('.brand-mark').textContent = text;
    },
    addButton({ id, label, onClick, placement = 'right' } = {}) {
      if (!id || !label) return;
      api.removeButton(id);
      renderButton({ id, label, placement });
      registry.set(id, { placement, onClick });
    },
    removeButton(id) {
      if (!registry.has(id)) return;
      root.querySelectorAll(`[data-role="btn"][data-id="${CSS.escape(id)}"]`).forEach(n => n.remove());
      registry.delete(id);
    }
  };

  // Example: auto-wire messages button if module exists
  if (hub.isReady('messages')) {
    api.addButton({
      id: 'messages',
      label: 'Messages',
      onClick: async () => hub.api.messages.open?.(),
      placement: 'right'
    });
  } else {
    const off = hub.once('module:ready:messages', () => {
      api.addButton({
        id: 'messages',
        label: 'Messages',
        onClick: async () => hub.api.messages.open?.(),
        placement: 'right'
      });
    });
    utils.onCleanup(off);
  }

  return api;
}
