export default async function init({ root, utils }) {
  const users = [
    {
      name: 'Marina Valentine',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/01.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png'
    },
    {
      name: 'Neko Bebop',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png'
    },
    {
      name: 'Nick Grissom',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/dragons_smile.png'
    }
  ];

  root.innerHTML = `
    <nav class="user-rail">
      <ul class="user-rail-list">
        ${users
          .map(
            (u, i) => `
        <li class="user-rail-item" data-index="${i}">
          <div class="avatar-wrap">
            <img class="avatar-image" src="${u.avatar}" alt="${u.name}">
            <img class="avatar-frame" src="${u.frame}" alt="" aria-hidden="true">
          </div>
        </li>`
          )
          .join('')}
      </ul>
    </nav>
  `;

  utils.delegate(root, 'click', '.user-rail-item', (e, el) => {
    const u = users[parseInt(el.getAttribute('data-index'), 10)];
    alert(`Open conversation with ${u.name}`);
  });

  return {};
}
