// module/header/header.js
// Bootstrap 5 header with navigation, dropdown and search.
// Exposes a small API for setting the brand and adding utility buttons.
// API:
//   - setBrand({ text, href })
//   - addButton({ id, label, onClick })
//   - removeButton(id)

export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <header data-role="header" class="header">
      <nav class="navbar navbar-dark bg-dark navbar-expand-md border-bottom border-opacity-10">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#" data-role="brand">
            <span class="brand-mark">NOIZ</span>
          </a>

          <button class="navbar-toggler" type="button"
                  data-bs-toggle="collapse" data-bs-target="#noizHeaderNav"
                  aria-controls="noizHeaderNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="noizHeaderNav">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Careers</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Faqs</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="headerMore" role="button" data-bs-toggle="dropdown" aria-expanded="false">More</a>
                <ul class="dropdown-menu" aria-labelledby="headerMore">
                  <li><a class="dropdown-item" href="#">About Us</a></li>
                  <li><a class="dropdown-item" href="#">Our Blog</a></li>
                  <li><a class="dropdown-item" href="#">Contact Us</a></li>
                  <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
                </ul>
              </li>
            </ul>

            <form class="d-flex me-3" role="search">
              <input class="form-control form-control-sm bg-dark text-light border-secondary" type="search" placeholder="Search here for people or groups" aria-label="Search">
            </form>

            <div class="d-flex align-items-center gap-2" data-slot="right" aria-label="Utility actions"></div>
          </div>
        </div>
      </nav>
    </header>
  `;

  const slots = {
    right: root.querySelector('[data-slot="right"]')
  };
  const brand = root.querySelector('[data-role="brand"]');

  const registry = new Map(); // id -> { onClick }

  function renderButton({ id, label }) {
    const btnHtml = `<button class="btn btn-outline-light btn-sm" data-role="btn" data-id="${id}">${label}</button>`;
    slots.right.insertAdjacentHTML('beforeend', btnHtml);
  }

  // Delegated clicks
  utils.delegate(root, 'click', '[data-role="btn"]', (e, el) => {
    const id = el.getAttribute('data-id');
    const rec = registry.get(id);
    if (rec?.onClick) rec.onClick(e);
  });

  // Public API
  const api = {
    setBrand({ text = 'NOIZ', href = '#' } = {}) {
      brand.setAttribute('href', href);
      brand.querySelector('.brand-mark').textContent = text;
    },
    addButton({ id, label, onClick } = {}) {
      if (!id || !label) return;
      api.removeButton(id);
      renderButton({ id, label });
      registry.set(id, { onClick });
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
      onClick: async () => hub.api.messages.open?.()
    });
  } else {
    const off = hub.once('module:ready:messages', () => {
      api.addButton({
        id: 'messages',
        label: 'Messages',
        onClick: async () => hub.api.messages.open?.()
      });
    });
    utils.onCleanup(off);
  }

  return api;
}
