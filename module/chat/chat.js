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
  return `
    <div class="chat-message">
      <span class="time">${m.time}</span>
      <span class="name" style="color:${m.color || '#333'}">${m.user}</span>
      <span class="text">${m.text}</span>
    </div>
  `;
};

const tpl = (messages) => `
  <div class="chat-header">
    <div class="title">Live chat</div>
    <div class="meta">Top chat • 283K</div>
  </div>
  <div class="chat-dono-scroller" data-role="dono-scroller"></div>
  <div class="chat-body" data-role="list">
    ${messages.map(messageTpl).join('')}
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
    { time: '9:58 AM', user: 'Lena', color: '#07b', text: 'wow' },
    { time: '9:58 AM', user: 'Ash', color: '#0a0', text: 'more pushups!' },
    { time: '9:58 AM', user: 'IntroMeb', color: '#c00', text: 'great play!' },
    { time: '9:58 AM', user: 'Chankonabe', color: '#b80', text: "how's everyone on the eh team doing?" },
    { time: '9:58 AM', user: 'pexelwiz', color: '#609', text: 'awesome! 👏' },
    { type: 'donation', user: 'Laura Ipsum', amount: '$5.00', text: 'BRAVO 🦊' }
  ];

  let donoScroller;

  function render() {
    root.innerHTML = tpl(messages);
    const list = root.querySelector('[data-role="list"]');
    list.scrollTop = list.scrollHeight;
    donoScroller = root.querySelector('[data-role="dono-scroller"]');
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

  function spawnDonation({ user, amount, duration = 5000 } = {}) {
    if (!donoScroller) return;
    const pill = document.createElement('div');
    pill.className = 'dono-pill';
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
