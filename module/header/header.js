// module/header/header.js
// Bootstrap 5 header styled to mirror the original NOIZ layout.
// Provides a tiny API for setting the brand and adding utility buttons.
// API:
//   - setBrand({ text, href })
//   - addButton({ id, label?, icon?, onClick })
//   - removeButton(id)

export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <header data-role="header" class="header">
      <div class="header-actions">
        <a class="header-brand" href="#" data-role="brand">
          <svg class="logo" width="40" height="40"><use xlink:href="#svg-logo-vikinger"></use></svg>
          <h1 class="header-brand-text">NOIZ</h1>
        </a>
      </div>

      <div class="header-actions">
        <button class="sidemenu-trigger" type="button">
          <svg class="icon-grid" width="20" height="20"><use xlink:href="#svg-grid"></use></svg>
        </button>

        <nav class="navigation">
          <ul class="menu-main">
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">Home</a></li>
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">News</a></li>
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">Faqs</a></li>
            <li class="menu-main-item dropdown">
              <button class="menu-main-item-link dropdown-toggle" id="headerMore" data-bs-toggle="dropdown" aria-expanded="false" type="button">
                <svg class="icon-dots" width="20" height="20"><use xlink:href="#svg-dots"></use></svg>
              </button>
              <ul class="dropdown-menu" aria-labelledby="headerMore">
                <li><a class="dropdown-item" href="#">About Us</a></li>
                <li><a class="dropdown-item" href="#">Our Blog</a></li>
                <li><a class="dropdown-item" href="#">Contact Us</a></li>
                <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header-actions search-bar">
        <div class="interactive-input" data-role="search">
          <input type="text" placeholder="Search for messages or groups" aria-label="Search">
          <div class="interactive-input-icon-wrap">
            <svg class="interactive-input-icon" width="20" height="20"><use xlink:href="#svg-magnifying-glass"></use></svg>
          </div>
          <div class="interactive-input-action" data-role="clear">
            <svg class="interactive-input-action-icon" width="16" height="16"><use xlink:href="#svg-cross-thin"></use></svg>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <div class="progress-stat">
          <p class="bar-progress-info mb-0">Next: <span class="bar-progress-text">0<span class="bar-progress-unit">exp</span></span></p>
          <div class="progress-stat-bar"><div class="bar-progress" style="width:0%"></div></div>
        </div>
      </div>

      <div class="header-actions">
        <div class="action-list" data-slot="right" aria-label="Utility actions">
          <button class="action-list-item" type="button">
            <svg class="icon" width="24" height="24"><use xlink:href="#svg-shopping-bag"></use></svg>
          </button>
          <button class="action-list-item" type="button">
            <svg class="icon" width="24" height="24"><use xlink:href="#svg-notification"></use></svg>
          </button>
        </div>
      </div>
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

  function renderButton({ id, label, icon }) {
    let btnHtml;
    if (icon) {
      btnHtml = `<button class="action-list-item" data-role="btn" data-id="${id}">
  <svg class="icon" width="24" height="24"><use xlink:href="${icon}"></use></svg>
</button>`;
      slots.right.insertAdjacentHTML('afterbegin', btnHtml);
    } else {
      btnHtml = `<button class="action-list-item btn btn-outline-light btn-sm" data-role="btn" data-id="${id}">${label}</button>`;
      slots.right.insertAdjacentHTML('beforeend', btnHtml);
    }
  }

  utils.delegate(root, 'click', '[data-role="btn"]', (e, el) => {
    const id = el.getAttribute('data-id');
    const rec = registry.get(id);
    if (rec?.onClick) rec.onClick(e);
  });

  const api = {
    setBrand({ text = 'NOIZ', href = '#' } = {}) {
      brand.setAttribute('href', href);
      brand.querySelector('.header-brand-text').textContent = text;
    },
    addButton({ id, label, icon, onClick } = {}) {
      if (!id || (!label && !icon)) return;
      api.removeButton(id);
      renderButton({ id, label, icon });
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
      icon: '#svg-messages',
      onClick: async () => hub.api.messages.open?.()
    });
  } else {
    const off = hub.once('module:ready:messages', () => {
      api.addButton({
        id: 'messages',
        icon: '#svg-messages',
        onClick: async () => hub.api.messages.open?.()
      });
    });
    utils.onCleanup(off);
  }

  return api;
}
