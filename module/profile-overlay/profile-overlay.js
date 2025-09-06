export default async function init({ hub, root, utils }) {
  const loggedIn = await fetch('/data/logged-in.json').then(r => r.json()).catch(() => null);

  const icons = {
    edit: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l12.15-12.15Z"/></svg>',
    shop: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clip-rule="evenodd"/></svg>',
    stream: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"/></svg>'
  };

  root.innerHTML = `
    <div class="profile-overlay hidden" role="dialog" aria-modal="true">
      <div class="po-card">
        <div class="po-left">
          <div class="po-banner"></div>
          <div class="po-accent"></div>
          <div class="po-left-body">
            <div class="po-avatar"><img alt="" /></div>
            <h2 class="po-name"></h2>
            <p class="po-tagline"></p>
            <div class="po-actions"></div>
            <div class="po-section po-about-section">
              <h3>About Me</h3>
              <p class="po-about"></p>
            </div>
            <div class="po-section po-member">
              <h3>Member Since</h3>
              <p class="po-member-date"></p>
            </div>
            <div class="po-section po-connections">
              <h3>Connections</h3>
              <div class="po-conn-list"></div>
            </div>
            <div class="po-section po-note">
              <h3>Note</h3>
              <p class="po-note-text">Click to add a note</p>
            </div>
          </div>
        </div>

        <div class="po-right">
          <div class="po-tabs">
            <button class="po-tab active" data-tab="activity">Activity</button>
            <button class="po-tab" data-tab="about">About</button>
            <button class="po-tab" data-tab="mutual">Mutual</button>
          </div>
          <div class="po-panels">
            <div class="po-panel active" data-panel="activity">
              <div class="po-activity">
                <p class="po-activity-head">You don't have any activity here</p>
                <p class="po-activity-sub">Connect accounts to show off your game status, see what friends are playing and more.</p>
                <div class="po-activity-actions">
                  <button class="po-btn">Connect Accounts</button>
                  <button class="po-btn">Add Game</button>
                </div>
              </div>
            </div>
            <div class="po-panel" data-panel="about">
              <p class="po-about-right"></p>
            </div>
            <div class="po-panel" data-panel="mutual">
              <p class="po-empty">No mutuals to show.</p>
            </div>
          </div>
          <div class="po-footer">
            <button type="button" class="po-close">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const overlay = root.querySelector('.profile-overlay');
  const banner = overlay.querySelector('.po-banner');
  const avatar = overlay.querySelector('.po-avatar img');
  const nameEl = overlay.querySelector('.po-name');
  const tagEl = overlay.querySelector('.po-tagline');
  const aboutSection = overlay.querySelector('.po-about-section');
  const aboutEl = overlay.querySelector('.po-about');
  const memberDateEl = overlay.querySelector('.po-member-date');
  const connList = overlay.querySelector('.po-conn-list');
  const actions = overlay.querySelector('.po-actions');
  const closeBtn = overlay.querySelector('.po-close');
  const tabs = overlay.querySelectorAll('.po-tab');
  const panels = overlay.querySelectorAll('.po-panel');
  const aboutRight = overlay.querySelector('.po-about-right');

  function fill(user = {}) {
    overlay.style.setProperty('--accent', user.accent || '#5865f2');
    overlay.style.setProperty('--frame', user.frame ? `url('${user.frame}')` : 'none');
    banner.style.backgroundImage = user.banner ? `url("${user.banner}")` : 'none';
    avatar.src = user.avatar || '';
    avatar.alt = user.name || '';
    nameEl.textContent = user.name || '';
    if (user.slug) {
      tagEl.textContent = `@${user.slug}`;
      tagEl.style.display = 'block';
    } else {
      tagEl.textContent = '';
      tagEl.style.display = 'none';
    }
    aboutEl.textContent = user.about || '';
    aboutSection.style.display = user.about ? 'block' : 'none';
    aboutRight.textContent = user.about || 'Nothing to see here';

    actions.innerHTML = '';
    const isSelf = user.slug === loggedIn;
    if (isSelf) {
      actions.innerHTML += `<button class="po-action edit">${icons.edit}<span>Edit Profile</span></button>`;
    }
    actions.innerHTML += `<button class="po-action icon-only shop" title="Shop">${icons.shop}</button>`;
    actions.innerHTML += `<button class="po-action icon-only chat" title="Chat">${icons.chat}</button>`;
    if (user.streaming) {
      actions.innerHTML += `<button class="po-action icon-only stream" title="Stream">${icons.stream}</button>`;
    }
    if (user.memberSince) {
      memberDateEl.textContent = user.memberSince;
      memberDateEl.closest('.po-member').style.display = 'block';
    } else {
      memberDateEl.closest('.po-member').style.display = 'none';
    }
    if (user.connections && user.connections.length) {
      connList.innerHTML = user.connections
        .map((c) => `<img src="${c}" alt="connection" />`)
        .join('');
      connList.closest('.po-connections').style.display = 'block';
    } else {
      connList.innerHTML = '';
      connList.closest('.po-connections').style.display = 'none';
    }
  }

  function switchTab(tabName) {
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === tabName));
    panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === tabName));
  }

  tabs.forEach((tab) => {
    utils.listen(tab, 'click', () => switchTab(tab.dataset.tab));
  });

  function show(user) {
    fill(user);
    switchTab('activity');
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
