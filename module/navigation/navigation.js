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
        <img src="images/logo.png" alt="User avatar" />
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
    <nav class="navigation-sidebar" data-role="sidebar">
      <ul class="navigation-menu">
        ${links
          .map(
            (l) => `
        <li class="navigation-item"><a href="${l.href}" class="navigation-link">${l.title}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
  `;

  const sidebar = root.querySelector('[data-role="sidebar"]');

  const api = {
    open() {
      sidebar.classList.add('open');
    },
    close() {
      sidebar.classList.remove('open');
    },
    toggle() {
      sidebar.classList.toggle('open');
    }
  };

  return api;
}
