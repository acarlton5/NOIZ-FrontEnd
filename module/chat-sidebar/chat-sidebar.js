export default async function init({ root }) {
  root.innerHTML = `
    <aside class="chat-sidebar">
      <header class="chat-header" style="--banner:url('images/banners/cityscape.png')">Chat</header>
      <ul class="chat-messages" data-role="messages"></ul>
      <div class="emote-drawer" data-role="drawer">
        <div class="tabs">
          <button type="button" data-tab="emotes" class="active">Emotes</button>
          <button type="button" data-tab="resonances">Resonances</button>
          <button type="button" data-tab="extensions">Extensions</button>
        </div>
        <div class="tab-content" data-role="tab-content"></div>
      </div>
      <form class="chat-input" data-role="form">
        <button type="button" class="drawer-btn" data-role="drawer-btn" aria-label="Open emotes">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm-2.5 4a.5.5 0 110 1 .5.5 0 010-1zm5 0a.5.5 0 110 1 .5.5 0 010-1zM5.5 9.5a2.5 2.5 0 005 0h-5z" fill="currentColor"/>
          </svg>
        </button>
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
  const drawer = root.querySelector('[data-role="drawer"]');
  const drawerBtn = root.querySelector('[data-role="drawer-btn"]');
  const tabs = root.querySelectorAll('[data-role="drawer"] .tabs button');
  const tabContent = root.querySelector('[data-role="tab-content"]');

  drawerBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  const EMOTE_SETS = [
    {
      global: true,
      emotes: [
        'https://static-cdn.jtvnw.net/emoticons/v2/1003187/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1003189/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1003190/static/dark/3.0'
      ]
    },
    {
      streamer: {
        name: 'SampleS3treamer',
        avatar:
          'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png'
      },
      emotes: [
        'https://static-cdn.jtvnw.net/emoticons/v2/160394/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160404/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160401/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160400/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_adfadf0ae06a4258adc865761746b227/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_665235901db747b1bd395a5f1c0ab8a9/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1220086/static/dark/3.0'
      ]
    },
    {
      streamer: {
        name: 'AnotherSt3reamer',
        avatar:
          'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png'
      },
      emotes: [
        'https://static-cdn.jtvnw.net/emoticons/v2/1003187/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1003189/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1003190/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160394/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160404/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160401/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/160400/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_adfadf0ae06a4258adc865761746b227/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_665235901db747b1bd395a5f1c0ab8a9/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1220086/static/dark/3.0'
      ]
    },
    {
      streamer: {
        name: 'AnotherStrea3mer',
        avatar:
          'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png'
      },
      emotes: [
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_a829c76ca15f49a2bf71e1270f83fe83/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4e1c5651219a462894aefa8b6720efc5/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_4b51b45f35df4dd8ad45a611c9a9ec35/static/dark/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/122213/static/light/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/406623/static/light/3.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/1494991/static/light/3.0'
      ]
    }
  ];

  function renderEmoteTab() {
    tabContent.innerHTML = EMOTE_SETS.map(set => {
      const header = set.global
        ? `<div class="emote-set-header"><span class="streamer-name">Global</span></div>`
        : `<div class="emote-set-header"><img class="streamer-avatar" src="${set.streamer.avatar}" alt="${set.streamer.name}" /><span class="streamer-name">${set.streamer.name}</span></div>`;
      const emotes = set.emotes
        .map(url => `<button type="button" class="emote" data-url="${url}"><img src="${url}" alt="emote" /></button>`)
        .join('');
      return `<div class="emote-set">${header}<div class="emote-list">${emotes}</div></div>`;
    }).join('');
  }

  const TAB_RENDERERS = {
    emotes: renderEmoteTab,
    resonances: renderResonanceTab,
    extensions: () => {
      tabContent.textContent = 'Extensions';
    }
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const renderer = TAB_RENDERERS[btn.dataset.tab];
      if (renderer) renderer();
    });
  });

  renderEmoteTab();

  const BADGE_URLS = [
    'images/badges/dev.png',
    'images/badges/mod.png',
    'images/badges/partner.png',
    'images/badges/vip.png',
    'images/badges/artist.png',
    'images/badges/sub.png',
    'images/badges/clipper.png',
    'images/badges/trophy.svg',
    'images/badges/gifter.png',
    'images/badges/bot.png',
    'images/badges/bugDCT.svg',
    'images/badges/heart.svg'
  ];

  const RESONANCE_ITEMS = [
    {
      sticker: 'images/resonances/001/catch_em.gif',
      amount: '100',
      badge: BADGE_URLS[8]
    },
    {
      sticker: 'images/resonances/002/pipe_smash.gif',
      amount: '200',
      badge: BADGE_URLS[9]
    },
    {
      sticker: 'images/resonances/003/wazzup.gif',
      amount: '500',
      badge: BADGE_URLS[10]
    }
  ];

  function renderResonanceTab() {
    tabContent.innerHTML = `
      <div class="resonance-grid">
        ${RESONANCE_ITEMS.map(
          item => `
            <button type="button" class="resonance-item">
              <img class="resonance-sticker" src="${item.sticker}" alt="resonance" />
              <div class="resonance-cost">
                <img class="resonance-badge" src="${item.badge}" alt="badge" />
                <span class="amount">${item.amount}</span>
              </div>
            </button>
          `
        ).join('')}
      </div>
    `;
  }

  const users = {
    LuchaUno: {
      name: 'LuchaUno',
      color: '#4ade80',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      frame: 'images/frames/afternoon_breeze.png',
      badges: [BADGE_URLS[0], BADGE_URLS[1]]
    },
    DoctorHoot: {
      name: 'DoctorHoot',
      color: '#60a5fa',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      frame: 'images/frames/aurora.png',
      badges: [BADGE_URLS[2]]
    },
    PitBear: {
      name: 'PitBear',
      color: '#f97316',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      frame: 'images/frames/dusk_and_dawn.png',
      badges: [BADGE_URLS[3], BADGE_URLS[4], BADGE_URLS[5]]
    },
    PirateDropout: {
      name: 'PirateDropout',
      color: '#d946ef',
      avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png',
      frame: 'images/frames/dragon_balls.png',
      badges: [BADGE_URLS[6], BADGE_URLS[7]]
    }
  };

  const initialMessages = [
    { user: users.LuchaUno, text: 'Nice!' },
    { user: users.DoctorHoot, text: 'What was that?' },
    { user: users.PitBear, text: 'Can I play next game?' },
    { user: users.PirateDropout, text: 'Push!' },
    {
      type: 'event',
      user: users.PirateDropout,
      sticker: 'images/resonances/001/catch_em.gif',
      badge: BADGE_URLS[11],
      text: '+50,000'
    },
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
            <div class="text">${msg.badge ? `<img class="badge-icon" src="${msg.badge}" alt="badge"/>` : ''}${msg.text}</div>
          </div>
        </div>
      `;
    } else {
      if (!msg.self) {
        const avatarWrap = document.createElement('div');
        avatarWrap.className = 'avatar-wrap';
        avatarWrap.style.setProperty('--avi-width', '36px');
        avatarWrap.style.setProperty('--avi-height', '36px');
        if (msg.user.frame) {
          avatarWrap.style.setProperty('--frame', `url('${msg.user.frame}')`);
        }
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
        badge.className = 'badge-icon';
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

