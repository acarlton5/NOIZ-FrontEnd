// module/header/header.js
// Bootstrap 5 header styled to match the provided purple design.
// Provides a tiny API for setting the brand and adding utility buttons.
// API:
//   - setBrand({ text, href })
//   - addButton({ id, label, onClick })
//   - removeButton(id)

export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <header data-role="header" class="header">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#" data-role="brand">
            <svg class="logo" width="40" height="40"><use xlink:href="#svg-logo-vikinger"></use></svg>
            <span class="brand-text">Vikinger</span>
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#noizHeaderNav" aria-controls="noizHeaderNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="noizHeaderNav">
            <ul class="navbar-nav align-items-center mb-2 mb-lg-0">
              <li class="nav-item">
                <button class="btn p-0 sidemenu-trigger" type="button">
                  <svg class="icon-grid" width="20" height="20"><use xlink:href="#svg-grid"></use></svg>
                </button>
              </li>
              <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Careers</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Faqs</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle p-0" href="#" id="headerMore" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg class="icon-dots" width="20" height="20"><use xlink:href="#svg-dots"></use></svg>
                </a>
                <ul class="dropdown-menu" aria-labelledby="headerMore">
                  <li><a class="dropdown-item" href="#">About Us</a></li>
                  <li><a class="dropdown-item" href="#">Our Blog</a></li>
                  <li><a class="dropdown-item" href="#">Contact Us</a></li>
                  <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
                </ul>
              </li>
            </ul>

            <form class="search-bar flex-grow-1 mx-lg-3 my-3 my-lg-0" role="search">
              <div class="interactive-input dark" data-role="search">
                <input class="form-control" type="text" placeholder="Search here for people or groups" aria-label="Search">
                <div class="interactive-input-icon-wrap">
                  <svg class="interactive-input-icon" width="20" height="20"><use xlink:href="#svg-magnifying-glass"></use></svg>
                </div>
                <div class="interactive-input-action" data-role="clear">
                  <svg class="interactive-input-action-icon" width="16" height="16"><use xlink:href="#svg-cross-thin"></use></svg>
                </div>
              </div>
            </form>

            <div class="action-list d-flex align-items-center gap-3" data-slot="right" aria-label="Utility actions">
              <button class="btn p-0" type="button">
                <svg class="icon" width="24" height="24"><use xlink:href="#svg-shopping-bag"></use></svg>
              </button>
              <button class="btn p-0" type="button">
                <svg class="icon" width="24" height="24"><use xlink:href="#svg-comment"></use></svg>
              </button>
              <button class="btn p-0" type="button">
                <svg class="icon" width="24" height="24"><use xlink:href="#svg-notification"></use></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;

  const slots = {
    right: root.querySelector('[data-slot="right"]')
  };
  const brand = root.querySelector('[data-role="brand"]');
  const registry = new Map();

  const searchWrap = root.querySelector('[data-role="search"]');
  const searchInput = searchWrap?.querySelector('input');
  const clearBtn = searchWrap?.querySelector('[data-role="clear"]');

  function updateSearch() {
    if (!searchWrap || !searchInput) return;
    searchWrap.classList.toggle('active', searchInput.value.length > 0);
  }

  searchInput?.addEventListener('input', updateSearch);
  clearBtn?.addEventListener('click', () => {
    if (!searchInput) return;
    searchInput.value = '';
    updateSearch();
    searchInput.focus();
  });

  function renderButton({ id, label }) {
    const btnHtml = `<button class="btn btn-outline-light btn-sm" data-role="btn" data-id="${id}">${label}</button>`;
    slots.right.insertAdjacentHTML('beforeend', btnHtml);
  }

  utils.delegate(root, 'click', '[data-role="btn"]', (e, el) => {
    const id = el.getAttribute('data-id');
    const rec = registry.get(id);
    if (rec?.onClick) rec.onClick(e);
  });

  const api = {
    setBrand({ text = 'Vikinger', href = '#' } = {}) {
      brand.setAttribute('href', href);
      brand.querySelector('.brand-text').textContent = text;
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
