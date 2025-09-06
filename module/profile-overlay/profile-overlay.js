export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <div class="profile-overlay hidden" role="dialog" aria-modal="true">
      <div class="po-card">
        <button type="button" class="po-close" aria-label="Close">&times;</button>
        <div class="po-banner"></div>
        <div class="po-content">
          <div class="po-avatar"><img alt="" /></div>
          <h2 class="po-name"></h2>
        </div>
        <div class="po-tabs">
          <button class="po-tab active">About</button>
          <button class="po-tab">Posts</button>
          <button class="po-tab">Stats</button>
        </div>
      </div>
    </div>
  `;

  const overlay = root.querySelector('.profile-overlay');
  const banner = overlay.querySelector('.po-banner');
  const avatar = overlay.querySelector('.po-avatar img');
  const nameEl = overlay.querySelector('.po-name');
  const closeBtn = overlay.querySelector('.po-close');

  function fill(user = {}) {
    overlay.style.setProperty('--accent', user.accent || '#5865f2');
    overlay.style.setProperty('--frame', user.frame ? `url('${user.frame}')` : 'none');
    banner.style.backgroundImage = user.banner ? `url("${user.banner}")` : 'none';
    avatar.src = user.avatar || '';
    avatar.alt = user.name || '';
    nameEl.textContent = user.name || '';
  }

  function show(user) {
    fill(user);
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
  }

  function hide() {
    overlay.classList.add('hidden');
    overlay.classList.remove('visible');
  }

  utils.listen(closeBtn, 'click', hide);
  utils.listen(overlay, 'click', (e) => { if (e.target === overlay) hide(); });
  utils.listen(document, 'keydown', (e) => { if (e.key === 'Escape') hide(); });

  return { show, hide };
}
