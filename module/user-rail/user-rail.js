export default async function init({ root, utils }) {
  const users = [
    {
      name: 'Marina Valentine',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/01.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/aim_for_love.png',
      hasNotification: true,
      accent: '#ff72b6'
    },
    {
      name: 'Neko Bebop',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/aurora.png',
      accent: '#8ab4ff'
    },
    {
      name: 'Nick Grissom',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/bf_soldier_helmet.png',
      accent: '#ffd059'
    }
  ];

  root.innerHTML = `
    <nav class="user-rail">
      <ul class="user-rail-list">
        ${users
          .map(
            (u, i) => `
        <li class="user-rail-item${u.hasNotification ? ' has-notification' : ''}" data-index="${i}" style="--accent:${u.accent};">
          <div class="avatar-wrap" style="--frame:url('${u.frame}');">
            <img class="avatar-image" src="${u.avatar}" alt="${u.name}">
          </div>
        </li>`
          )
          .join('')}
      </ul>
    </nav>
  `;

  utils.delegate(root, 'click', '.user-rail-item', (e, el) => {
    root.querySelectorAll('.user-rail-item.active').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    el.classList.remove('has-notification');
    const u = users[parseInt(el.getAttribute('data-index'), 10)];
    window.LoadMainModule('profile', { user: u });
    window.location.hash = '/profile';
  });

  return {};
}
