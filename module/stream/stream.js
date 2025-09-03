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
    return `
      <div class="message event">
        <div class="text">${m.text}</div>
      </div>
    `;
  }
  return `
    <div class="message" style="--accent:${m.user.accent}">
      <div class="avatar-wrap" style="--avi-width:32px; --avi-height:32px; --frame:url('${m.user.frame}');">
        <img src="${m.user.avatar}" alt="${m.user.name}" class="avatar-image" />
      </div>
      <div class="message-body">
        <div class="message-header">
          <span class="user" style="color:${m.user.accent}">${m.user.name}</span>
          ${m.user.badges.map(b => `<span class="badge bg-secondary">${b}</span>`).join('')}
          <time class="time">${m.time}</time>
        </div>
        <div class="text">${m.text}</div>
      </div>
    </div>
  `;
};

const sidebarTpl = (messages, members) => `
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#chat" type="button" role="tab">Chat</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#members" type="button" role="tab">Members</button>
      </li>
    </ul>
  </div>
  <div class="card-body tab-content">
    <div class="tab-pane fade show active" id="chat" role="tabpanel">
      <div data-role="messages" class="mb-3">
        ${messages.map(renderMessage).join('')}
      </div>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Type a message" data-role="input">
        <button class="btn btn-primary" data-action="send">Send</button>
      </div>
    </div>
    <div class="tab-pane fade" id="members" role="tabpanel">
      <ul class="list-group list-group-flush" data-role="members">
        ${members.map(name => `<li class="list-group-item">${name}</li>`).join('')}
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
    { type: 'event', text: 'Stream starting soon', time: now() },
    { user: users.Nova, text: 'Welcome to the stream!', time: now() },
    { user: users.Dex, text: 'Hey everyone!', time: now() }
  ];
  let members = [users.Nova.name, users.Dex.name, users.Kai.name];

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
    sidebar.innerHTML = sidebarTpl(messages, members);
    const messagesEl = sidebar.querySelector('[data-role="messages"]');
    messagesEl.scrollTop = messagesEl.scrollHeight;
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

  utils.listen(sidebar, 'keyup', (e) => {
    if (e.target.matches('[data-role="input"]') && e.key === 'Enter') {
      sidebar.querySelector('[data-action="send"]').click();
    }
  });

  utils.onCleanup(() => sidebar.remove());

  return {
    // optional API
  };
}

