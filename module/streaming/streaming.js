export default async function init({ root, utils }) {
  root.innerHTML = `
    <section class="streaming">
      <div class="video-wrapper">
        <iframe class="stream-frame" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
      </div>
    </section>
  `;

  const messages = [
    {
      user: {
        name: 'Lena',
        avatar: 'https://placehold.co/24x24',
        color: '#0a8d48',
        badges: [
          'https://static-cdn.jtvnw.net/badges/v1/51f536c1-96ca-495b-bc11-150c857a6d54/2',
          'https://static-cdn.jtvnw.net/badges/v1/a56ef091-e8cd-49bd-9de9-7b342c9a7e7e/2',
          'https://static-cdn.jtvnw.net/badges/v1/ada84c7c-36d4-4bb3-b2d6-d601d468e6c7/2'
        ]
      },
      time: '9:58 AM',
      text: 'wow'
    },
    {
      user: {
        name: 'Ash',
        avatar: 'https://placehold.co/24x24',
        color: '#2a7fff',
        badges: [
          'https://static-cdn.jtvnw.net/badges/v1/098219cb-48d8-4945-96a6-80594c7a90dd/2',
          'https://static-cdn.jtvnw.net/badges/v1/3ffa9565-c35b-4cad-800b-041e60659cf2/2'
        ]
      },
      time: '9:58 AM',
      text: 'more pushups!'
    },
    {
      user: {
        name: 'IntroMeb',
        avatar: 'https://placehold.co/24x24',
        color: '#26bba4',
        badges: [
          'https://static-cdn.jtvnw.net/badges/v1/8dbdfef5-0901-457f-a644-afa77ba176e5/2'
        ]
      },
      time: '9:58 AM',
      text: 'great play!!'
    },
    {
      user: {
        name: 'Laura Mipsum',
        avatar: 'https://placehold.co/24x24',
        color: '#0fa36b',
        badges: [
          'https://static-cdn.jtvnw.net/badges/v1/cf91bbc0-0332-413a-a7f3-e36bac08b624/2',
          'https://static-cdn.jtvnw.net/badges/v1/2cbc339f-34f4-488a-ae51-efdf74f4e323/2',
          'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2',
          'https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/2',
          'https://static-cdn.jtvnw.net/badges/v1/ccbbedaa-f4db-4d0b-9c2a-375de7ad947c/2'
        ]
      },
      amount: '$5.00',
      text: 'BRAVO',
      sticker: 'https://streamstickers.com/uploads/spongebob-sample-55340.gif'
    }
  ];

  const chat = document.createElement('aside');
  chat.className = 'live-chat';
  chat.innerHTML = `
    <header class="chat-header">
      <h3 class="chat-title">Live chat</h3>
      <div class="chat-status">Top chat · 283K</div>
    </header>
    <div class="chat-messages"></div>
    <form class="chat-input">
      <div class="input-avatar avatar-wrap" style="--avi-width:32px; --frame:none;">
        <img class="avatar-image" src="https://placehold.co/32x32" alt="Anon">
      </div>
      <input type="text" placeholder="Say something..." maxlength="200" />
      <button type="submit">Send</button>
    </form>
  `;

  const messagesEl = chat.querySelector('.chat-messages');
  messages.forEach(msg => {
    if (msg.amount) {
      messagesEl.innerHTML += `
        <div class="chat-super">
          <div class="super-header" style="background:${msg.user.color};">${msg.amount}</div>
          <div class="super-body">
            <div class="message-avatar avatar-wrap" style="--avi-width:32px; --frame:none;">
              <img class="avatar-image" src="${msg.user.avatar}" alt="${msg.user.name}">
            </div>
            <div class="message-body">
              <div class="message-meta">
                <span class="message-author" style="color:${msg.user.color};">${msg.user.name}</span>
                ${renderBadges(msg.user.badges)}
              </div>
              <div class="message-text">${msg.text}</div>
              ${msg.sticker ? `<img class="super-sticker" src="${msg.sticker}" alt="sticker">` : ''}
            </div>
          </div>
        </div>
      `;
    } else {
      messagesEl.innerHTML += `
        <div class="chat-message">
          <div class="message-avatar avatar-wrap" style="--avi-width:32px; --frame:none;">
            <img class="avatar-image" src="${msg.user.avatar}" alt="${msg.user.name}">
          </div>
          <div class="message-body">
            <div class="message-meta">
              <span class="message-time">${msg.time}</span>
              <span class="message-author" style="color:${msg.user.color};">${msg.user.name}</span>
              ${renderBadges(msg.user.badges)}
            </div>
            <div class="message-text">${msg.text}</div>
          </div>
        </div>
      `;
    }
  });

  document.body.appendChild(chat);
  utils.onCleanup(() => chat.remove());
  return {};

  function renderBadges(badges) {
    if (!badges || !badges.length) return '';
    const imgs = badges.slice(0, 5).map(url => `<img class="message-badge" src="${url}" alt="badge">`).join('');
    return `<span class="message-badges">${imgs}</span>`;
  }
}
