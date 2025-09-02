const tpl = (user) => `
  <section class="profile-chat">
    <header class="profile-chat-header">
      <h2>${user.name}</h2>
      ${user.isLive ? '<button class="btn btn-danger btn-sm" data-role="watch-live">Watch Live</button>' : ''}
    </header>
    <div class="profile-chat-layout">
      <aside class="channel-list">
        <ul class="channels">
          <li class="channel active"># general</li>
          <li class="channel"># announcements</li>
          <li class="channel"># voice</li>
        </ul>
      </aside>
      <section class="chat">
        <div class="messages">
          <div class="message"><span class="author">MemberUser</span> Much cooler user names etc.</div>
          <div class="message"><span class="author">CreatorUser</span> Everything here is scoped into the sidebar chat stay unchanged.</div>
          <div class="message"><span class="author">System</span> 100 Cheer</div>
        </div>
        <form class="message-form">
          <input type="text" placeholder="Send a message" />
        </form>
      </section>
    </div>
  </section>
`;

export default async function init({ root, utils, props }) {
  const user = props?.user || { name: 'Unknown', isLive: false };
  root.innerHTML = tpl(user);

  if (user.isLive) {
    utils.delegate(root, 'click', '[data-role="watch-live"]', (e) => {
      e.preventDefault();
      window.LoadMainModule('streaming', { user });
    });
  }

  return {};
}

