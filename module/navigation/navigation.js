
export default async function init({ hub, root, utils }) {
  const config = (await hub.api.modules.list?.()) || [];
  const links = config
    .filter((m) => m.nav)
    .map((m) => ({ title: m.title || m.name, module: m.name, icon: m.icon }));

  root.innerHTML = `
    <nav class="navigation-small" data-role="small">
      <a href="#" class="navigation-avatar avatar-wrap" style="--avi-width:48px; --avi-height:48px; --frame:url('https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png');">
        <img
          class="avatar-image"
          src="https://odindesignthemes.com/vikinger/img/avatar/01.jpg"
          alt="User avatar"
        />
      </a>
      <ul class="navigation-small-menu">
        ${links
          .map(
            (l) => `
        <li class="navigation-small-item">
          <a href="#" class="navigation-small-link" data-title="${l.title}" data-module="${l.module}">
            <svg class="icon" width="20" height="20"><use xlink:href="${l.icon}"></use></svg>
          </a>
        </li>`
          )
          .join('')}
      </ul>
    </nav>
    <nav class="navigation-large" data-role="large">
      <div class="navigation-large-profile">
        <img
          class="profile-banner"
          src="https://raw.githubusercontent.com/ItsPi3141/discord-fake-avatar-decorations/refs/heads/main/public/nameplates/d20_roll.png"
          alt=""
          aria-hidden="true"
        />
        <div class="avatar-wrap" style="--avi-width:90px; --avi-height:90px; --frame:url('https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png');">
          <img
            class="avatar-image"
            src="https://odindesignthemes.com/vikinger/img/avatar/01.jpg"
            alt="User avatar"
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
          <a href="#" class="navigation-large-link" data-module="${l.module}">
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
  const main = document.querySelector('main');


  utils.delegate(root, 'click', '.navigation-small-link, .navigation-large-link', (e, link) => {
    e.preventDefault();
    const mod = link.getAttribute('data-module');
    if (mod) window.LoadMainModule(mod);
  });

  // Tooltip handling for compact navigation
  let tooltip;
  const showTooltip = (e) => {
    const link = e.currentTarget;
    const title = link.getAttribute('data-title');
    if (!title) return;
    tooltip = document.createElement('div');
    tooltip.className = 'navigation-small-tooltip';
    tooltip.textContent = title;
    document.body.appendChild(tooltip);
    const rect = link.getBoundingClientRect();
    tooltip.style.top = `${rect.top + rect.height / 2}px`;
    tooltip.style.left = `${rect.right}px`;
    requestAnimationFrame(() => tooltip.classList.add('visible'));
  };

  const hideTooltip = () => {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  };

  small.querySelectorAll('.navigation-small-link').forEach((link) => {
    link.addEventListener('mouseenter', showTooltip);
    link.addEventListener('mouseleave', hideTooltip);
  });
  small.addEventListener('scroll', hideTooltip);

  const api = {
    showSmall() {
      large.classList.remove('mobile-open');
      const apply = () => {
        small.classList.remove('hidden');
        main.style.transform = 'translate(200.5px)';
        main.style.transition = 'transform 0.4s ease-in-out';
      };
      if (large.classList.contains('open')) {
        large.addEventListener(
          'transitionend',
          apply,
          { once: true }
        );
        large.classList.remove('open');
      } else {
        apply();
      }
    },
    showLarge() {
      small.classList.add('hidden');
      large.classList.remove('mobile-open');
      main.style.transform = 'translate(300.5px)';
      main.style.transition = 'transform 0.4s ease-in-out';
      requestAnimationFrame(() => {
        large.classList.add('open');
      });
    },
    toggle() {
      if (window.innerWidth < 992) {
        large.classList.toggle('mobile-open');
        if (large.classList.contains('mobile-open')) {
          main.style.transform = 'translate(300.5px)';
          main.style.transition = 'transform 0.4s ease-in-out';
        } else {
          main.style.transform = '';
          main.style.transition = '';
        }
      } else if (large.classList.contains('open')) {
        api.showSmall();
      } else {
        api.showLarge();
      }
    }
  };

  return api;
}
