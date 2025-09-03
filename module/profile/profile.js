const members = [
  {
    name: 'Bri',
    status: 'Typing...',
    avatar: 'https://odindesignthemes.com/vikinger/img/avatar/04.jpg',
    banner: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/nameplates/space_city.png',
    frame:
      'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/sporty.png',
    accent: '#ffcd00'
  },
  {
    name: 'Nick Grissom',
    status: 'Online',
    avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
    banner: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/nameplates/bamboo.png',
    frame:
      'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/a_hint_of_clove.png',
    accent: '#72ffb6'
  }
];

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
            ${members
              .map(
                (m) => `
            <li class="member" style="--banner:url('${m.banner}'); --accent:${m.accent};">
              <div class="avatar-wrap" style="--avi-width:32px; --avi-height:32px; --frame:url('${m.frame}');">
                <img class="avatar-image" src="${m.avatar}" alt="${m.name}">
              </div>
              <div class="meta">
                <span class="name">${m.name}</span>
                <span class="status">${m.status}</span>
              </div>
            </li>`
              )
              .join('')}
          </ul>
        </div>
      </aside>
      <section class="chat">
        <div class="messages">
          <div class="chat-message">
            <div class="avatar-wrap" style="--avi-width:40px; --avi-height:40px; --frame:url('https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/sporty.png');">
              <img class="avatar-image" src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" alt="Member User">
            </div>
            <div class="content">
              <div class="meta">
                <span class="author">Member User ✓</span>
                <time>2:42 PM</time>
              </div>
              <div class="text">Main chat uses the same message components — just larger tokens.</div>
            </div>
          </div>
          <div class="chat-message">
            <div class="avatar-wrap" style="--avi-width:40px; --avi-height:40px; --frame:url('https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/a_hint_of_clove.png');">
              <img class="avatar-image" src="https://odindesignthemes.com/vikinger/img/avatar/02.jpg" alt="Creator User">
            </div>
            <div class="content">
              <div class="meta">
                <span class="author">Creator User</span>
                <time>2:42 PM</time>
              </div>
              <div class="text">Everything here is scoped so the sidebar chat stays unchanged.</div>
            </div>
          </div>
          <div class="chat-alert cheer">
            <div class="alert-header">
              <span class="title">300 Cheer</span>
              <span class="art">Cheerer Art</span>
            </div>
            <div class="alert-body">Rinoga: Let's gooo!</div>
          </div>
          <div class="chat-alert sub">
            <div class="alert-header">
              <span class="title">Tier 1 Subscription</span>
              <span class="art">Subscriber Art</span>
            </div>
            <div class="alert-body">KamiKitsune subbed for 6 months!</div>
          </div>
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

