import { users } from '../users.js';

export default async function init({ root, utils }) {

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
  });

  return {};
}
