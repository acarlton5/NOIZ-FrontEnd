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
  <div class="chat-body" data-role="list">
    ${messages.map(messageTpl).join('')}
  </div>
  <form class="chat-form" data-role="form">
    <input type="text" class="chat-input" data-role="input" placeholder="Say something..." maxlength="200" />
    <button type="submit" class="btn btn-primary btn-sm">Send</button>
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

  function render() {
    root.innerHTML = tpl(messages);
    const list = root.querySelector('[data-role="list"]');
    list.scrollTop = list.scrollHeight;
  }

  render();

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

  utils.delegate(root, 'click', '[data-action="hide"]', () => {
    root.style.display = 'none';
  });

  return {
    addMessage(m) {
      messages.push(m);
      render();
    }
  };
}
