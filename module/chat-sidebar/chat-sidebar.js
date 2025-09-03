export default function init({ root }) {
  root.innerHTML = `
    <aside class="chat-sidebar">
      <ul class="chat-messages" data-role="messages">
        <li class="message">
          <div class="avatar"><img src="https://placekitten.com/40/40" alt="Kitten"></div>
          <div class="bubble">
            <div class="name">PirateDropout</div>
            <div class="text">+50,000</div>
          </div>
        </li>
        <li class="message">
          <div class="avatar"><img src="https://placekitten.com/41/41" alt="Cat"></div>
          <div class="bubble">
            <div class="name">DoctorHoot</div>
            <div class="text">Can I play next game?</div>
          </div>
        </li>
      </ul>
      <form class="chat-input" data-role="form">
        <input type="text" class="form-control" data-role="input" placeholder="Type a message" />
      </form>
    </aside>
  `;

  const form = root.querySelector('[data-role="form"]');
  const input = root.querySelector('[data-role="input"]');
  const messages = root.querySelector('[data-role="messages"]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.className = 'message self';
    li.innerHTML = `<div class="bubble"><div class="text">${text}</div></div>`;
    messages.appendChild(li);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

  return {};
}
