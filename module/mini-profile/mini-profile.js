export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <div class="mini-profile hidden" role="dialog" aria-modal="false" aria-hidden="true">
      <div class="mp-banner"></div>
      <div class="mp-accent"></div>
      <div class="mp-body">
        <div class="mp-avatar"><img alt="" /></div>
        <div class="mp-meta">
          <div class="mp-name-line">
            <span class="mp-display"></span>
          </div>
          <div class="mp-status-line">
            <span class="status-dot" data-status="offline"></span>
            <span class="mp-status-text">Offline</span>
          </div>
        </div>
      </div>
      <div class="mp-actions"></div>
    </div>
  `;

  const card = root.querySelector('.mini-profile');
  const banner = card.querySelector('.mp-banner');
  const avatarImg = card.querySelector('.mp-avatar img');
  const display = card.querySelector('.mp-display');

  function fill(user) {
    card.style.setProperty('--accent', user.accent || '#5865f2');
    card.style.setProperty('--frame', user.frame ? `url('${user.frame}')` : 'none');
    if (user.banner) {
      banner.style.backgroundImage = `url("${user.banner}")`;
    } else {
      banner.style.backgroundImage = 'none';
    }
    avatarImg.src = user.avatar || '';
    avatarImg.alt = user.name || '';
    display.textContent = user.name || 'Unknown';
  }

  function position(anchor) {
    const rect = anchor.getBoundingClientRect();
    const mpW = card.offsetWidth;
    const mpH = card.offsetHeight;
    let left = rect.right + 8;
    if (left + mpW > window.innerWidth - 8) left = rect.left - mpW - 8;
    if (left < 8) left = 8;
    let top = rect.top;
    if (top + mpH > window.innerHeight - 8) top = window.innerHeight - mpH - 8;
    if (top < 8) top = 8;
    card.style.left = `${left + window.scrollX}px`;
    card.style.top = `${top + window.scrollY}px`;
  }

  function show(user, anchor) {
    fill(user);
    position(anchor);
    card.classList.add('visible');
    card.classList.remove('hidden');
  }

  function hide() {
    card.classList.remove('visible');
    card.classList.add('hidden');
  }

  utils.listen(document, 'click', (e) => {
    if (!card.classList.contains('visible')) return;
    if (!card.contains(e.target)) hide();
  });

  utils.listen(document, 'keydown', (e) => {
    if (e.key === 'Escape') hide();
  });

  utils.delegate(document, 'click', '[data-profile-name]', (e, el) => {
    const user = {
      name: el.dataset.profileName,
      avatar: el.dataset.profileAvatar,
      banner: el.dataset.profileBanner,
      accent: el.dataset.profileAccent,
      frame: el.dataset.profileFrame,
    };
    show(user, el);
  });

  return { show, hide };
}
