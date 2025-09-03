export default async function init({ root }) {
  root.innerHTML = `
    <aside class="chat-sidebar">
      <header class="chat-header">Chat</header>
      <ul class="chat-messages" data-role="messages"></ul>
      <form class="chat-input" data-role="form">
        <input type="text" class="form-control" data-role="input" placeholder="Type a message" />
        <button type="submit" class="send-btn" aria-label="Send">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2l9 6-9 6V2z" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </aside>
  `;

  const form = root.querySelector('[data-role="form"]');
  const input = root.querySelector('[data-role="input"]');
  const messages = root.querySelector('[data-role="messages"]');

  const BADGE_URLS = [
    'https://static-cdn.jtvnw.net/badges/v1/51f536c1-96ca-495b-bc11-150c857a6d54/2',
    'https://static-cdn.jtvnw.net/badges/v1/a56ef091-e8cd-49bd-9de9-7b342c9a7e7e/2',
    'https://static-cdn.jtvnw.net/badges/v1/ada84c7c-36d4-4bb3-b2d6-d601d468e6c7/2',
    'https://static-cdn.jtvnw.net/badges/v1/098219cb-48d8-4945-96a6-80594c7a90dd/2',
    'https://static-cdn.jtvnw.net/badges/v1/3ffa9565-c35b-4cad-800b-041e60659cf2/2',
    'https://static-cdn.jtvnw.net/badges/v1/8dbdfef5-0901-457f-a644-afa77ba176e5/2',
    'https://static-cdn.jtvnw.net/badges/v1/cf91bbc0-0332-413a-a7f3-e36bac08b624/2',
    'https://static-cdn.jtvnw.net/badges/v1/2cbc339f-34f4-488a-ae51-efdf74f4e323/2',
    'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2',
    'https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/2',
    'https://static-cdn.jtvnw.net/badges/v1/ccbbedaa-f4db-4d0b-9c2a-375de7ad947c/2',
    'https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2'
  ];

  const users = {
    LuchaUno: {
      name: 'LuchaUno',
      color: '#4ade80',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      badges: [BADGE_URLS[0], BADGE_URLS[1]]
    },
    DoctorHoot: {
      name: 'DoctorHoot',
      color: '#60a5fa',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      badges: [BADGE_URLS[2]]
    },
    PitBear: {
      name: 'PitBear',
      color: '#f97316',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      badges: [BADGE_URLS[3], BADGE_URLS[4], BADGE_URLS[5]]
    },
    PirateDropout: {
      name: 'PirateDropout',
      color: '#d946ef',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      badges: [BADGE_URLS[6], BADGE_URLS[7]]
    }
  };

  const initialMessages = [
    { user: users.LuchaUno, text: 'Nice!' },
    { user: users.DoctorHoot, text: 'What was that?' },
    { user: users.PitBear, text: 'Can I play next game?' },
    { user: users.PirateDropout, text: 'Push!' },
    { type: 'event', user: users.PirateDropout, sticker: 'https://streamstickers.com/uploads/vader-sample-65017.gif', text: '+50,000' },
    { user: users.LuchaUno, text: "That's so cool!" },
    { user: users.PitBear, text: 'I really love this channel' },
    { user: users.DoctorHoot, text: 'Thanks for joining!' }
  ];

  initialMessages.forEach(renderMessage);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    renderMessage({ self: true, user: { name: 'You', color: '#3b82f6', badges: [] }, text });
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

  function renderMessage(msg) {
    const li = document.createElement('li');
    li.className = 'message';
    if (msg.self) li.classList.add('self');
    if (msg.type === 'event') li.classList.add('event');

    if (msg.type === 'event') {
      li.innerHTML = `
        <div class="event-bubble">
          <img class="sticker" src="${msg.sticker}" alt="sticker"/>
          <div class="info">
            <div class="name" style="color:${msg.user.color}">${msg.user.name}</div>
            <div class="text">${msg.text}</div>
          </div>
        </div>
      `;
    } else {
      if (!msg.self) {
        const avatarWrap = document.createElement('div');
        avatarWrap.className = 'avatar-wrap';
        avatarWrap.style.setProperty('--avi-width', '36px');
        const avatar = document.createElement('img');
        avatar.className = 'avatar-image';
        avatar.src = msg.user.avatar;
        avatar.alt = msg.user.name;
        avatarWrap.appendChild(avatar);
        li.appendChild(avatarWrap);
      }

      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.style.color = msg.user.color;
      nameSpan.appendChild(document.createTextNode(msg.user.name));

      (msg.user.badges || []).slice(0, 5).forEach(url => {
        const badge = document.createElement('img');
        badge.className = 'badge';
        badge.src = url;
        badge.alt = 'badge';
        nameSpan.appendChild(badge);
      });

      const textSpan = document.createElement('span');
      textSpan.className = 'text';
      textSpan.textContent = msg.text;

      msgDiv.appendChild(nameSpan);
      msgDiv.appendChild(textSpan);
      li.appendChild(msgDiv);
    }

    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  }

  return {};
}

