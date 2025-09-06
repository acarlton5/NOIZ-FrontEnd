export default async function init({ hub, root, utils }) {
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
            <button class="po-edit">Edit Profile</button>
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
