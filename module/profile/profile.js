const tpl = (user) => `
  <section class="profile-chat" style="--accent:${user.accent};">
    <header class="profile-chat-header" style="--banner:url('${user.banner}')">
      <div class="profile-user">
        <div class="avatar-wrap" style="--avi-width:56px; --avi-height:56px; --frame:url('${user.frame}'); --frame-opacity:1;">
          <img class="avatar-image" src="${user.avatar}" alt="${user.name}">
        </div>
        <div class="user-meta">
          <h2 class="name">${user.name}</h2>
          <span class="topic"># general</span>
        </div>
      </div>
      ${
        user.isLive
          ? '<span class="live-pill" data-role="watch-live">LIVE</span>'
          : ''
      }
    </header>
    <div class="profile-chat-layout">
      <aside class="channel-list">
        <div class="channel-tabs">
          <button class="tab active" data-tab="topics">Topics</button>
          <button class="tab" data-tab="members">Members</button>
        </div>
        <div class="tab-content topics">
          <ul class="channels">
            <li class="channel active"># general</li>
            <li class="channel"># announcements</li>
            <li class="channel"># voice</li>
          </ul>
        </div>
        <div class="tab-content members hidden">
          <ul class="members">
            <li class="member">CreatorUser</li>
            <li class="member">MemberUser</li>
          </ul>
        </div>
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

  utils.delegate(root, 'click', '.channel-tabs .tab', (e) => {
    const tab = e.target.dataset.tab;
    root.querySelectorAll('.channel-tabs .tab').forEach((btn) => {
      btn.classList.toggle('active', btn === e.target);
    });
    root.querySelector('.tab-content.topics').classList.toggle('hidden', tab !== 'topics');
    root.querySelector('.tab-content.members').classList.toggle('hidden', tab !== 'members');
  });

  return {};
}

