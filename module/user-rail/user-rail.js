import { getUserBySlug } from '../users.js';

export default async function init({ hub, root, utils }) {
  const loggedSlug = await fetch('/data/logged-in.json').then(r => r.json());
  const loggedUser = await getUserBySlug(loggedSlug);
  const { subscribed = [], followed = [] } = loggedUser || {};
  const slugs = [
    ...subscribed,
    ...followed.filter(slug => !subscribed.includes(slug))
  ];
  const users = (await Promise.all(slugs.map(getUserBySlug))).filter(Boolean);

  root.innerHTML = `
    <nav class="user-rail">
      <ul class="user-rail-list">
        ${users
          .map(
            (u, i) => `
        <li class="user-rail-item${u.hasNotification ? ' has-notification' : ''}" data-index="${i}" style="--accent:${u.accent};" data-profile-name="${u.name}" data-profile-slug="${u.slug}" data-profile-avatar="${u.avatar}" data-profile-banner="${u.banner}" data-profile-accent="${u.accent}" data-profile-frame="${u.frame}" data-profile-about="${u.about || ''}" data-profile-since="${u.memberSince || ''}" data-profile-connections="${(u.connections || []).join(',')}">
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
    e.stopPropagation();
    root.querySelectorAll('.user-rail-item.active').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    el.classList.remove('has-notification');
    const index = parseInt(el.dataset.index, 10);
    const user = users[index];
    if (user) {
      hub.api['profile-overlay'].show(user);
    }
  });

  return {};
}
