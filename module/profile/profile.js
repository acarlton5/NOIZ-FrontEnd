const tpl = (unread) => `
  <section class="profile">
    <h2>Profile</h2>
    <p class="profile-details">User profile details go here.</p>
    <div class="profile-messages">
      <h3>Messages</h3>
      <span class="badge ${unread > 0 ? 'bg-success' : 'bg-secondary'}" data-role="unread">${unread}</span>
    </div>
  </section>
`;

export default async function init({ hub, root, utils }) {
  let unread = 0;
  try {
    unread = await hub.api.messages.getUnread();
  } catch {}

  root.innerHTML = tpl(unread);

  const badge = root.querySelector('[data-role="unread"]');
  const update = (n) => {
    badge.textContent = n;
    badge.classList.toggle('bg-success', n > 0);
    badge.classList.toggle('bg-secondary', n <= 0);
  };

  const off = hub.on('messages:unreadChanged', update);
  utils.onCleanup(off);

  return {};
}
