const tpl = (user, unread) => `
  <section class="profile">
    <div class="profile-header">
      <div class="avatar-wrap" style="--avi-width:90px; --avi-height:90px; --frame:url('${user.frame}')">
        <img class="avatar-image" src="${user.avatar}" alt="${user.name}">
      </div>
      <h2 class="profile-name">${user.name}</h2>
    </div>
    <div class="profile-messages">
      <h3>Messages</h3>
      <span class="badge ${unread > 0 ? 'bg-success' : 'bg-secondary'}" data-role="unread">${unread}</span>
    </div>
  </section>
`;

export default async function init({ hub, root, utils, props }) {
  const user = props?.user || { name: 'Unknown', avatar: '', frame: '' };
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
