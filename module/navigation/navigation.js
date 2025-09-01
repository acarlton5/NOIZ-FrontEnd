export default async function init({ hub, root }) {
  const links = [
    { title: 'Newsfeed', href: '#', icon: '#svg-newsfeed' },
    { title: 'Overview', href: '#', icon: '#svg-overview' },
    { title: 'Groups', href: '#', icon: '#svg-group' },
    { title: 'Members', href: '#', icon: '#svg-members' },
    { title: 'Badges', href: '#', icon: '#svg-badges' },
    { title: 'Quests', href: '#', icon: '#svg-quests' },
    { title: 'Streams', href: '#', icon: '#svg-streams' },
    { title: 'Events', href: '#', icon: '#svg-events' },
    { title: 'Forums', href: '#', icon: '#svg-forums' },
    { title: 'Marketplace', href: '#', icon: '#svg-marketplace' }
  ];

  root.innerHTML = `
    <nav class="navigation-small" data-role="small">
      <a href="#" class="navigation-avatar">
        <img
          class="avatar-image"
          src="https://odindesignthemes.com/vikinger/img/avatar/01.jpg"
          alt="User avatar"
        />
        <img
          class="avatar-frame"
          src="https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png"
          alt=""
          aria-hidden="true"
        />
      </a>
      <ul class="navigation-small-menu">
        ${links
          .map(
            (l) => `
        <li class="navigation-small-item">
          <a href="${l.href}" class="navigation-small-link" data-title="${l.title}">
            <svg class="icon" width="20" height="20"><use xlink:href="${l.icon}"></use></svg>
          </a>
        </li>`
          )
          .join('')}
      </ul>
    </nav>
    <nav class="navigation-large" data-role="large">
      <div class="navigation-large-profile">
        <div class="avatar-wrap">
          <img
            class="avatar-image"
            src="https://odindesignthemes.com/vikinger/img/avatar/01.jpg"
            alt="User avatar"
          />
          <img
            class="avatar-frame"
            src="https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h3 class="user-name">Marina Valentine</h3>
        <p class="user-url">www.gamehuntress.com</p>
        <ul class="profile-stats">
          <li class="profile-stat"><span class="stat-value">930</span><span class="stat-label">Posts</span></li>
          <li class="profile-stat"><span class="stat-value">82</span><span class="stat-label">Friends</span></li>
          <li class="profile-stat"><span class="stat-value">5.7K</span><span class="stat-label">Visits</span></li>
        </ul>
        <ul class="user-badges">
          <li><svg class="badge-icon" width="24" height="24"><use xlink:href="#svg-facebook"></use></svg></li>
          <li><svg class="badge-icon" width="24" height="24"><use xlink:href="#svg-twitter"></use></svg></li>
          <li><svg class="badge-icon" width="24" height="24"><use xlink:href="#svg-instagram"></use></svg></li>
          <li><svg class="badge-icon" width="24" height="24"><use xlink:href="#svg-discord"></use></svg></li>
          <li><svg class="badge-icon" width="24" height="24"><use xlink:href="#svg-google"></use></svg></li>
        </ul>
      </div>
      <ul class="navigation-large-menu">
        ${links
          .map(
            (l) => `
        <li class="navigation-large-item">
          <a href="${l.href}" class="navigation-large-link">
            <svg class="icon" width="20" height="20"><use xlink:href="${l.icon}"></use></svg>
            <span>${l.title}</span>
          </a>
        </li>`
          )
          .join('')}
      </ul>
    </nav>
  `;

  const small = root.querySelector('[data-role="small"]');
  const large = root.querySelector('[data-role="large"]');

  const api = {
    showSmall() {
      large.classList.remove('mobile-open');
      if (large.classList.contains('open')) {
        large.addEventListener(
          'transitionend',
          () => {
            small.classList.remove('hidden');
          },
          { once: true }
        );
        large.classList.remove('open');
      } else {
        small.classList.remove('hidden');
      }
    },
    showLarge() {
      small.classList.add('hidden');
      large.classList.remove('mobile-open');
      requestAnimationFrame(() => {
        large.classList.add('open');
      });
    },
    toggle() {
      if (window.innerWidth < 992) {
        large.classList.toggle('mobile-open');
      } else if (large.classList.contains('open')) {
        api.showSmall();
      } else {
        api.showLarge();
      }
    }
  };

  return api;
}
