// module/chat/chat.js
// Simple sidebar chat module with mock data and basic send capability

const messageTpl = (m) => {
  if (m.type === 'donation') {
    return `
      <div class="chat-donation">
        <div class="donation-header">
          <span class="name">${m.user}</span>
          <span class="amount">${m.amount}</span>
        </div>
        ${m.text ? `<div class="donation-text">${m.text}</div>` : ''}
      </div>
    `;
  }
  if (m.type === 'sticker') {
    return `
      <div class="chat-message sticker">
        <span class="msg-avatar avatar-wrap">
          ${m.avatar ? `<img class="avatar-image" src="${m.avatar}" alt="${m.user}">` : `<span class="avatar-letter" style="background:${m.avatarColor || '#933'}">${(m.user || '?')[0]}</span>`}
        </span>
        <div class="msg-body">
        <div class="msg-header">
          <span class="name" style="color:${m.color || '#333'}">${m.user}</span>
          <span class="time">${m.time}</span>
        </div>
          <div class="sticker-meta">
            ${m.badge ? `<img class="sticker-badge" src="${m.badge}" alt="badge" />` : ''}
            <span class="amount">${m.amount || ''}</span>
          </div>
          <img class="sticker" src="${m.sticker}" alt="sticker" />
        </div>
      </div>
    `;
  }
  return `
    <div class="chat-message">
      <span class="msg-avatar avatar-wrap">
        ${m.avatar ? `<img class="avatar-image" src="${m.avatar}" alt="${m.user}">` : `<span class="avatar-letter" style="background:${m.avatarColor || '#933'}">${(m.user || '?')[0]}</span>`}
      </span>
      <div class="msg-body">
        <div class="msg-header">
          <div class="user-meta">
            <span class="name" style="color:${m.color || '#333'}">${m.user}</span>
            ${m.badges && m.badges.length ? `<span class="badges">${m.badges.slice(0,5).map((b) => `<img src="${b}" alt="badge" />`).join('')}</span>` : ''}
          </div>
          <span class="time">${m.time}</span>
        </div>
        <div class="text">${m.text}</div>
      </div>
    </div>
  `;
};

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
      name: 'StreamerOne',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg'
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
      name: 'StreamerTwo',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg'
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

const renderEmoteDrawer = () =>
  EMOTE_SETS.map((set) => {
    const header = set.global
      ? `<div class="emote-set-header"><img class="streamer-avatar" src="images/logo.png" alt="NOIZ" /><span class="streamer-name">Global</span></div>`
      : `<div class="emote-set-header"><img class="streamer-avatar" src="${set.streamer.avatar}" alt="${set.streamer.name}" /><span class="streamer-name">${set.streamer.name}</span></div>`;
    const emotes = set.emotes
      .map((url) => `<button type="button" class="emote" data-url="${url}"><img src="${url}" alt="emote" /></button>`)
      .join('');
    return `<div class="emote-set">${header}<div class="emote-list">${emotes}</div></div>`;
  }).join('');

const tpl = (messages) => `
  <div class="chat-header">
    <div class="title">Live chat</div>
    <div class="meta">Top chat • 283K</div>
  </div>
  <div class="chat-dono-scroller" data-role="dono-scroller"></div>
  <div class="chat-body" data-role="list">
    ${messages.map(messageTpl).join('')}
  </div>
  <div class="chat-drawer emote-drawer" data-role="emote-drawer">
    ${renderEmoteDrawer()}
  </div>
  <div class="chat-drawer resonance-drawer" data-role="resonance-drawer">
    <div class="emote-set">
      <div class="emote-set-header"><span class="streamer-name">Resonances</span></div>
    </div>
  </div>
  <form class="chat-form" data-role="form">
    <div class="chat-input-group">
      <div class="chat-input-top">
        <div class="chat-avatar">A</div>
        <div class="chat-input-wrapper">
          <div class="chat-user">Anon</div>
          <input type="text" class="chat-input" data-role="input" placeholder="Chat..." maxlength="200" />
        </div>
      </div>
      <div class="chat-input-bottom">
        <span class="chat-count" data-role="count">0/200</span>
        <div class="chat-actions">
          <div class="chat-tools">
            <button type="button" class="chat-emoji-btn" aria-label="Emoji">😊</button>
            <button type="button" class="chat-money-btn" aria-label="Send a tip">💲</button>
          </div>
          <button type="submit" class="chat-send-btn" aria-label="Send">
            <svg class="chat-send-icon" viewBox="0 0 24 24">
              <path d="M2 21L23 12 2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </form>
  <button type="button" class="chat-hide btn btn-link" data-action="hide">Hide chat</button>
`;

export default async function init({ root, utils }) {
  let messages = [
    {
      time: '9:58 AM',
      user: 'Lena',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/01.jpg',
      color: '#07b',
      text: 'wow',
      badges: [
        'https://static-cdn.jtvnw.net/badges/v1/51f536c1-96ca-495b-bc11-150c857a6d54/2',
        'https://static-cdn.jtvnw.net/badges/v1/a56ef091-e8cd-49bd-9de9-7b342c9a7e7e/2',
        'https://static-cdn.jtvnw.net/badges/v1/ada84c7c-36d4-4bb3-b2d6-d601d468e6c7/2',
        'https://static-cdn.jtvnw.net/badges/v1/098219cb-48d8-4945-96a6-80594c7a90dd/2',
        'https://static-cdn.jtvnw.net/badges/v1/3ffa9565-c35b-4cad-800b-041e60659cf2/2'
      ]
    },
    {
      time: '9:58 AM',
      user: 'Ash',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
      color: '#0a0',
      text: 'more pushups!',
      badges: [
        'https://static-cdn.jtvnw.net/badges/v1/8dbdfef5-0901-457f-a644-afa77ba176e5/2',
        'https://static-cdn.jtvnw.net/badges/v1/cf91bbc0-0332-413a-a7f3-e36bac08b624/2'
      ]
    },
    {
      time: '9:58 AM',
      user: 'IntroMeb',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg',
      color: '#c00',
      text: 'great play!',
      badges: [
        'https://static-cdn.jtvnw.net/badges/v1/2cbc339f-34f4-488a-ae51-efdf74f4e323/2'
      ]
    },
    {
      time: '9:58 AM',
      user: 'Chankonabe',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/04.jpg',
      color: '#b80',
      text: "how's everyone on the eh team doing?",
      badges: [
        'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2',
        'https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/2',
        'https://static-cdn.jtvnw.net/badges/v1/ccbbedaa-f4db-4d0b-9c2a-375de7ad947c/2'
      ]
    },
    {
      time: '9:58 AM',
      user: 'pexelwiz',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/05.jpg',
      color: '#609',
      text: 'awesome! 👏'
    },
    {
      time: '9:59 AM',
      user: 'StickerFan',
      avatar: 'https://odindesignthemes.com/vikinger/img/avatar/06.jpg',
      color: '#333',
      type: 'sticker',
      sticker: 'https://streamstickers.com/uploads/vader-sample-65017.gif',
      amount: '$3.00',
      badge: 'https://static-cdn.jtvnw.net/badges/v1/51f536c1-96ca-495b-bc11-150c857a6d54/2'
    },
    { type: 'donation', user: 'Laura Ipsum', amount: '$5.00', text: 'BRAVO 🦊' }
  ];

  let donoScroller, emoteDrawer, resonanceDrawer;

  function render() {
    root.innerHTML = tpl(messages);
    const list = root.querySelector('[data-role="list"]');
    list.scrollTop = list.scrollHeight;
    donoScroller = root.querySelector('[data-role="dono-scroller"]');
    emoteDrawer = root.querySelector('[data-role="emote-drawer"]');
    resonanceDrawer = root.querySelector('[data-role="resonance-drawer"]');
    const form = root.querySelector('[data-role="form"]');
    root.style.setProperty('--chat-form-height', `${form.offsetHeight}px`);
  }

  render();
  messages.filter((m) => m.type === 'donation').forEach(spawnDonation);

  utils.delegate(root, 'submit', '[data-role="form"]', (e) => {
    e.preventDefault();
    const input = root.querySelector('[data-role="input"]');
    const text = input.value.trim();
    if (!text) return;
    messages.push({
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      user: 'Anon',
      color: '#333',
      text
    });
    input.value = '';
    render();
  });

  utils.delegate(root, 'input', '[data-role="input"]', (e) => {
    const counter = root.querySelector('[data-role="count"]');
    counter.textContent = `${e.target.value.length}/200`;
  });


  utils.delegate(root, 'click', '[data-action="hide"]', () => {
    root.style.display = 'none';
  });

  utils.delegate(root, 'click', '.chat-emoji-btn', () => {
    emoteDrawer.classList.toggle('open');
    resonanceDrawer.classList.remove('open');
  });

  utils.delegate(root, 'click', '.chat-money-btn', () => {
    resonanceDrawer.classList.toggle('open');
    emoteDrawer.classList.remove('open');
  });

  function spawnDonation({ user, amount, duration = 5000, accent } = {}) {
    if (!donoScroller) return;
    const pill = document.createElement('div');
    pill.className = 'dono-pill';
    if (accent) pill.style.setProperty('--accent', accent);
    pill.innerHTML = `
      <span class="avatar">${(user || '?')[0]}</span>
      <span class="amount">${amount}</span>
      <div class="dono-timer"></div>`;
    const timer = pill.querySelector('.dono-timer');
    donoScroller.appendChild(pill);
    donoScroller.scrollLeft = donoScroller.scrollWidth;
    requestAnimationFrame(() => {
      timer.style.transitionDuration = `${duration}ms`;
      timer.style.width = '0%';
    });
    setTimeout(() => pill.remove(), duration);
  }

  return {
    addMessage(m) {
      messages.push(m);
      render();
      if (m.type === 'donation') {
        spawnDonation(m);
      }
    },
    showDonation(m) {
      spawnDonation(m);
    }
  };
}
