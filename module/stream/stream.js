// module/stream/stream.js
// Stream module with video player and live chat sidebar mounted outside main

const mainTpl = `
  <section class="my-3" data-role="stream">
    <div class="stream-main">
      <div class="ratio ratio-16x9">
        <video controls src="https://www.w3schools.com/html/mov_bbb.mp4"></video>
      </div>
    </div>
  </section>
`;

const renderMessage = (m) => {
  if (m.type === 'event') {
    const user = m.user || {};
    return `
      <div class="message event" style="--accent:${m.accent || user.accent || '#0d6efd'}">
        <div class="event-header">
          ${user.avatar ? `<div class="avatar-wrap" style="--avi-width:32px; --avi-height:32px; --frame:url('${user.frame || ''}')"><img src="${user.avatar}" alt="${user.name || ''}" class="avatar-image" /></div>` : ''}
          <div class="meta">
            ${user.name ? `<span class="user">${user.name}</span>` : ''}
            ${user.badges ? user.badges.map(b => `<span class="badge bg-secondary">${b}</span>`).join('') : ''}
          </div>
          ${m.time ? `<time class="time">${m.time}</time>` : ''}
        </div>
        <div class="event-body">${m.text}</div>
      </div>
    `;
  }
  return `
    <div class="message">
      <div class="avatar-wrap" style="--avi-width:32px; --avi-height:32px; --frame:url('${m.user.frame}');">
        <img src="${m.user.avatar}" alt="${m.user.name}" class="avatar-image" />
      </div>
      <div class="message-body">
        <time class="time">${m.time}</time>
        <span class="user" style="color:${m.user.accent}">${m.user.name}</span>
        ${m.user.badges.map(b => `<span class="badge bg-secondary">${b}</span>`).join('')}
        <span class="text">${m.text}</span>
      </div>
    </div>
  `;
};

const renderMember = (m) => `
  <li class="member" style="--accent:${m.user.accent}">
    <div class="avatar-wrap" style="--avi-width:32px; --avi-height:32px; --frame:url('${m.user.frame}');">
      <img src="${m.user.avatar}" alt="${m.user.name}" class="avatar-image" />
    </div>
    <div class="member-body">
      <div class="member-header">
        <span class="user" style="color:${m.user.accent}">${m.user.name}</span>
        ${m.user.badges.map(b => `<span class="badge bg-secondary">${b}</span>`).join('')}
      </div>
      <div class="status">${m.status}</div>
    </div>
  </li>
`;

const sidebarTpl = (messages, members, currentUser) => `
  <div class="card-header d-flex align-items-center">
    <ul class="nav nav-tabs card-header-tabs flex-grow-1" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#chat" type="button" role="tab">Chat</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#members" type="button" role="tab">Members (${members.length})</button>
      </li>
    </ul>
    <div class="header-actions ms-auto">
      <button class="btn btn-sm btn-link" data-action="settings" aria-label="Settings"><svg class="icon icon-settings"><use xlink:href="#svg-settings"></use></svg></button>
      <button class="btn btn-sm btn-link" data-action="close" aria-label="Close"><svg class="icon icon-cross"><use xlink:href="#svg-cross"></use></svg></button>
    </div>
  </div>
  <div class="card-body tab-content">
    <div class="tab-pane fade show active" id="chat" role="tabpanel">
      <div data-role="messages" class="mb-3">
        ${messages.map(renderMessage).join('')}
      </div>
      <div class="chat-input">
        <div class="input-user">${currentUser.name || 'Anon'}</div>
        <div class="input-wrap">
          <textarea class="form-control" rows="1" maxlength="200" placeholder="Chat..." data-role="input"></textarea>
          <div class="actions">
            <button class="btn btn-link p-0" data-action="emoji" aria-label="Emoji">😊</button>
            <button class="btn btn-link p-0" data-action="donate" aria-label="Send a tip">💲</button>
            <span class="char-count" data-role="count">0/200</span>
            <button class="btn btn-link p-0" data-action="send" aria-label="Send"><svg class="icon icon-send"><use xlink:href="#svg-send-message"></use></svg></button>
          </div>
        </div>
        <button class="btn btn-link w-100 hide-chat" data-action="hide">Hide chat</button>
      </div>
    </div>
    <div class="tab-pane fade" id="members" role="tabpanel">
      <ul class="list-unstyled" data-role="members">
        ${members.map(renderMember).join('')}
      </ul>
    </div>
  </div>
`;

export default async function init({ root, utils }) {
  const users = {
    Nova: {
      name: 'Nova',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/05.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/afternoon_breeze.png',
      accent: '#72ffb6',
      badges: ['Host']
    },
    Dex: {
      name: 'Dex',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/01.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/28_years_later.png',
      accent: '#ff72b6',
      badges: ['Mod']
    },
    Kai: {
      name: 'Kai',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/a_duck.png',
      accent: '#8ab4ff',
      badges: ['Member']
    },
    You: {
      name: 'You',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg',
      frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/afternoon_breeze.png',
      accent: '#0d6efd',
      badges: []
    }
  };

  const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  let messages = [
    { type: 'event', user: users.Nova, text: 'Stream starting soon', accent: '#ffc107', time: now() },
    { user: users.Nova, text: 'Welcome to the stream!', time: now() },
    { type: 'event', user: users.Dex, text: 'Dex subscribed for 3 months!', accent: '#0dcaf0', time: now() },
    { type: 'event', user: users.Kai, text: 'Kai tipped $5!', accent: '#ff9800', time: now() },
    { type: 'event', user: users.You, text: 'You sent a sticker!', accent: '#8bc34a', time: now() },
    { user: users.Dex, text: 'Hey everyone!', time: now() }
  ];
  let members = [
    { user: users.Nova, status: 'Hosting' },
    { user: users.Dex, status: 'Modding' },
    { user: users.Kai, status: 'Watching' }
  ];

  // Render main video section inside module root
  root.innerHTML = mainTpl;

  // Create chat sidebar outside of main content
  const sidebar = document.createElement('aside');
  sidebar.className = 'stream-sidebar card';
  sidebar.setAttribute('data-role', 'stream-sidebar');
  const rail = document.querySelector('module[data-module="user-rail"]');
  if (rail) {
    rail.before(sidebar);
  } else {
    document.body.appendChild(sidebar);
  }

  function renderSidebar() {
    sidebar.innerHTML = sidebarTpl(messages, members, users.You);
    const messagesEl = sidebar.querySelector('[data-role="messages"]');
    messagesEl.scrollTop = messagesEl.scrollHeight;
    const input = sidebar.querySelector('[data-role="input"]');
    const count = sidebar.querySelector('[data-role="count"]');
    if (input && count) {
      const update = () => { count.textContent = `${input.value.length}/200`; };
      input.addEventListener('input', update);
      update();
    }
  }

  renderSidebar();

  utils.delegate(sidebar, 'click', '[data-action="send"]', () => {
    const input = sidebar.querySelector('[data-role="input"]');
    const text = input.value.trim();
    if (!text) return;
    messages.push({ user: users.You, text, time: now() });
    input.value = '';
    renderSidebar();
  });

  utils.delegate(sidebar, 'click', '[data-action="close"], [data-action="hide"]', () => {
    sidebar.remove();
  });

  utils.delegate(sidebar, 'click', '[data-action="settings"]', () => {
    // Placeholder for settings action
    console.log('settings clicked');
  });

  utils.listen(sidebar, 'keydown', (e) => {
    if (e.target.matches('[data-role="input"]') && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sidebar.querySelector('[data-action="send"]').click();
    }
  });

  utils.onCleanup(() => sidebar.remove());

  return {
    // optional API
  };
}
