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
      <div class="header-actions brand-group">
        <a class="header-brand" href="#" data-role="brand">
          <svg class="logo" width="40" height="40"><use xlink:href="#svg-logo-vikinger"></use></svg>
          <h1 class="header-brand-text">NOIZ</h1>
        </a>
        <button class="sidemenu-trigger" type="button" aria-label="Menu">
          <svg class="icon-hamburger" width="20" height="20"><use xlink:href="#svg-hamburger"></use></svg>
        </button>
      </div>

      <div class="header-actions">
        <nav class="navigation">
          <ul class="menu-main">
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">Home</a></li>
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">News</a></li>
            <li class="menu-main-item"><a class="menu-main-item-link" href="#">Faqs</a></li>
            <li class="menu-main-item dropdown">
              <a class="menu-main-item-link dropdown-toggle" id="headerMore" href="#" data-bs-toggle="dropdown" aria-expanded="false" role="button">
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
        </nav>
      </div>

      <div class="header-actions search-bar">
        <div class="interactive-input" data-role="search">
          <input type="text" placeholder="Search here for people or groups" aria-label="Search">
          <div class="interactive-input-icon-wrap">
            <svg class="interactive-input-icon" width="20" height="20"><use xlink:href="#svg-magnifying-glass"></use></svg>
          </div>
          <div class="interactive-input-action" data-role="clear">
            <svg class="interactive-input-action-icon" width="16" height="16"><use xlink:href="#svg-cross-thin"></use></svg>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <div class="quest dropdown">
          <button class="action-list-item quest-trigger" id="questDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
            <svg class="icon" width="24" height="24"><use xlink:href="#svg-questbox"></use></svg>
          </button>
          <div class="dropdown-menu quest-menu" aria-labelledby="questDropdown">
            <div class="quest-accordion accordion" id="questAccordion">
              <div class="accordion-item quest-campaign">
                <h2 class="accordion-header" id="campaignOneHeading">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#campaignOne" aria-expanded="false" aria-controls="campaignOne">
                    <div class="quest-header p-3 w-100">
                      <img class="quest-banner" src="https://images.igdb.com/igdb/image/upload/t_1080p/ar35sq.webp" alt="Sea of Thieves banner">
                      <p class="quest-title mb-1">Mixer Loot - Sea of Thieves</p>
                      <p class="quest-desc">Earn in-game content by watching exciting moments on Mixer.</p>
                      <a href="#" class="quest-link">Learn more</a>
                    </div>
                  </button>
                </h2>
                <div id="campaignOne" class="accordion-collapse collapse" aria-labelledby="campaignOneHeading" data-bs-parent="#questAccordion">
                  <div class="accordion-body p-0">
                    <div class="quest-body p-3">
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Obsidian Six Item Pack</p>
                          <p class="quest-item-desc">Watch the completion of 30 Sea of Thieves Arena matches</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:66%"></div></div>
                            <div class="quest-progress-text">20 / 30</div>
                          </div>
                        </div>
                      </div>
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Midnight Monkey Outfit</p>
                          <p class="quest-item-desc">Complete 10 arena matches</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:50%"></div></div>
                            <div class="quest-progress-text">5 / 10</div>
                          </div>
                        </div>
                      </div>
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Golden Sail Set</p>
                          <p class="quest-item-desc">Win 12 adventure battles</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:60%"></div></div>
                            <div class="quest-progress-text">12 / 20</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="accordion-item quest-campaign">
                <h2 class="accordion-header" id="campaignTwoHeading">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#campaignTwo" aria-expanded="false" aria-controls="campaignTwo">
                    <div class="quest-header p-3 w-100">
                      <img class="quest-banner" src="https://images.igdb.com/igdb/image/upload/t_1080p/ar8eh.webp" alt="Dead by Daylight banner">
                      <p class="quest-title mb-1">Mixer Loot - Dead by Daylight</p>
                      <p class="quest-desc">Earn rewards by watching spine-chilling matches.</p>
                      <a href="#" class="quest-link">Learn more</a>
                    </div>
                  </button>
                </h2>
                <div id="campaignTwo" class="accordion-collapse collapse" aria-labelledby="campaignTwoHeading" data-bs-parent="#questAccordion">
                  <div class="accordion-body p-0">
                    <div class="quest-body p-3">
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Escape Artist</p>
                          <p class="quest-item-desc">Survive 15 trials</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:40%"></div></div>
                            <div class="quest-progress-text">6 / 15</div>
                          </div>
                        </div>
                      </div>
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Night Hunter</p>
                          <p class="quest-item-desc">Hook 20 survivors</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:25%"></div></div>
                            <div class="quest-progress-text">5 / 20</div>
                          </div>
                        </div>
                      </div>
                      <div class="quest-item">
                        <div class="quest-thumb">
                          <img src="images/home-icon.svg" alt="Quest item">
                        </div>
                        <div class="quest-info flex-grow-1">
                          <p class="quest-item-title">Fog Explorer</p>
                          <p class="quest-item-desc">Search 10 chests</p>
                          <div class="quest-progress-wrap">
                            <div class="quest-progress-bar"><div class="quest-progress" style="width:10%"></div></div>
                            <div class="quest-progress-text">1 / 10</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <button class="action-list-item settings-button" type="button">
          <svg class="icon" width="24" height="24"><use xlink:href="#svg-settings"></use></svg>
        </button>
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
