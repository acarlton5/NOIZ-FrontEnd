export default async function init({ hub, root, utils }) {
  const loggedIn = await fetch('/data/logged-in.json').then(r => r.json()).catch(() => null);

  const icons = {
    edit: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l12.15-12.15Z"/></svg>',
    shop: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clip-rule="evenodd"/></svg>',
    stream: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"/></svg>'
  };

  root.innerHTML = `
    <div class="mini-profile hidden" role="dialog" aria-modal="false" aria-hidden="true">
      <div class="mp-banner"></div>
      <div class="mp-accent"></div>
      <div class="mp-body">
        <div class="mp-avatar"><img alt="" /></div>
        <h2 class="mp-name"></h2>
        <p class="mp-tagline"></p>
        <div class="mp-actions"></div>
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
  const actions = card.querySelector('.mp-actions');
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

    actions.innerHTML = '';
    const isSelf = user.slug === loggedIn;
    if (isSelf) {
      actions.innerHTML += `<button class="mp-action edit">${icons.edit}<span>Edit Profile</span></button>`;
    }
    actions.innerHTML += `<button class="mp-action icon-only shop" title="Shop">${icons.shop}</button>`;
    actions.innerHTML += `<button class="mp-action icon-only chat" title="Chat">${icons.chat}</button>`;
    if (user.streaming) {
      actions.innerHTML += `<button class="mp-action icon-only stream" title="Stream">${icons.stream}</button>`;
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
      streaming: el.dataset.profileStreaming === 'true'
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
      streaming: el.dataset.profileStreaming === 'true'
    };
    hub.api['profile-overlay'].show(user);
  });

  return { show, hide };
}
