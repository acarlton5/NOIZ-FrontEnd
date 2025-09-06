export default async function init({ hub, root, utils }) {
  root.innerHTML = `
    <div class="mini-profile hidden" role="dialog" aria-modal="false" aria-hidden="true">
      <div class="mp-banner"></div>
      <div class="mp-accent"></div>
      <div class="mp-body">
        <div class="mp-avatar"><img alt="" /></div>
        <h2 class="mp-name"></h2>
        <p class="mp-tagline"></p>
        <button class="mp-edit">Edit Profile</button>
        <div class="mp-section mp-about-section">
          <h3>About Me</h3>
          <p class="mp-about"></p>
        </div>
        <div class="mp-section mp-member">
          <h3>Member Since</h3>
          <p class="mp-member-date"></p>
        </div>
        <div class="mp-section mp-connections">
          <h3>Connections</h3>
          <div class="mp-conn-list"></div>
        </div>
        <div class="mp-section mp-note">
          <h3>Note</h3>
          <p class="mp-note-text">Click to add a note</p>
        </div>
      </div>
    </div>
  `;

  const card = root.querySelector('.mini-profile');
  const banner = card.querySelector('.mp-banner');
  const avatarImg = card.querySelector('.mp-avatar img');
  const nameEl = card.querySelector('.mp-name');
  const tagEl = card.querySelector('.mp-tagline');
  const aboutSection = card.querySelector('.mp-about-section');
  const aboutEl = card.querySelector('.mp-about');
  const memberDateEl = card.querySelector('.mp-member-date');
  const connList = card.querySelector('.mp-conn-list');

  function fill(user = {}) {
    card.style.setProperty('--accent', user.accent || '#5865f2');
    card.style.setProperty('--frame', user.frame ? `url('${user.frame}')` : 'none');
    banner.style.backgroundImage = user.banner ? `url("${user.banner}")` : 'none';
    avatarImg.src = user.avatar || '';
    avatarImg.alt = user.name || '';
    nameEl.textContent = user.name || '';
    if (user.slug) {
      tagEl.textContent = `@${user.slug}`;
      tagEl.style.display = 'block';
    } else {
      tagEl.textContent = '';
      tagEl.style.display = 'none';
    }
    if (user.about) {
      aboutEl.textContent = user.about;
      aboutSection.style.display = 'block';
    } else {
      aboutEl.textContent = '';
      aboutSection.style.display = 'none';
    }
    if (user.memberSince) {
      memberDateEl.textContent = user.memberSince;
      memberDateEl.closest('.mp-member').style.display = 'block';
    } else {
      memberDateEl.textContent = '';
      memberDateEl.closest('.mp-member').style.display = 'none';
    }
    if (user.connections && user.connections.length) {
      connList.innerHTML = user.connections
        .map((c) => `<img src="${c}" alt="connection" />`)
        .join('');
      connList.closest('.mp-connections').style.display = 'block';
    } else {
      connList.innerHTML = '';
      connList.closest('.mp-connections').style.display = 'none';
    }
  }

  function position(x, y) {
    const mpW = card.offsetWidth;
    const mpH = card.offsetHeight;
    let left = x + 8;
    if (left + mpW > window.innerWidth - 8) left = x - mpW - 8;
    if (left < 8) left = 8;
    let top = y;
    if (top + mpH > window.innerHeight - 8) top = window.innerHeight - mpH - 8;
    if (top < 8) top = 8;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  function show(user, x, y) {
    fill(user);
    position(x, y);
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

  utils.delegate(document, 'contextmenu', '[data-profile-name]', (e, el) => {
    e.preventDefault();
    const user = {
      name: el.dataset.profileName,
      slug: el.dataset.profileSlug,
      avatar: el.dataset.profileAvatar,
      banner: el.dataset.profileBanner,
      accent: el.dataset.profileAccent,
      frame: el.dataset.profileFrame,
      about: el.dataset.profileAbout,
      memberSince: el.dataset.profileSince,
      connections: el.dataset.profileConnections
        ? el.dataset.profileConnections.split(',')
        : [],
    };
    show(user, e.pageX, e.pageY);
  });

  utils.delegate(document, 'click', '[data-profile-name]', (e, el) => {
    if (e.button !== 0) return;
    e.preventDefault();
    hide();
    const user = {
      name: el.dataset.profileName,
      slug: el.dataset.profileSlug,
      avatar: el.dataset.profileAvatar,
      banner: el.dataset.profileBanner,
      accent: el.dataset.profileAccent,
      frame: el.dataset.profileFrame,
      about: el.dataset.profileAbout,
      memberSince: el.dataset.profileSince,
      connections: el.dataset.profileConnections
        ? el.dataset.profileConnections.split(',')
        : [],
    };
    hub.api['profile-overlay'].show(user);
  });

  return { show, hide };
}
