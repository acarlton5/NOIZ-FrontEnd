const tpl = (user, unread) => `
  <section class="profile">
    <div class="profile-banner">
      <img src="${user.banner}" alt="${user.name} banner">
    </div>
    <div class="profile-content">
      <div class="profile-avatar">
        <div class="avatar-wrap" style="--avi-width:96px; --avi-height:96px; --frame:url('${user.frame}')">
          <img class="avatar-image" src="${user.avatar}" alt="${user.name}">
        </div>
      </div>
      <h2 class="profile-name">${user.name}</h2>
      <div class="profile-actions">
        <button class="btn btn-primary btn-sm">Add Friend</button>
        <button class="btn btn-secondary btn-sm position-relative">
          Messages
          <span class="badge ${unread > 0 ? 'bg-success' : 'bg-secondary'} position-absolute top-0 start-100 translate-middle" data-role="unread">${unread}</span>
        </button>
      </div>
    </div>
  </section>
`;

export default async function init({ hub, root, utils, props }) {
  const user = props?.user || { name: 'Unknown', avatar: '', frame: '', banner: '' };
  root.innerHTML = tpl(user, 0);

  const badge = root.querySelector('[data-role="unread"]');
  const update = (n) => {
    badge.textContent = n;
    badge.classList.toggle('bg-success', n > 0);
    badge.classList.toggle('bg-secondary', n <= 0);
  };

  hub.api.messages.getUnread().then(update).catch(() => {});
  const off = hub.on('messages:unreadChanged', update);
  utils.onCleanup(off);

  return {};
}
