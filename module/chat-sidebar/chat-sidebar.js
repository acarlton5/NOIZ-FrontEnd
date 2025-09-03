export default function init({ root }) {
  root.innerHTML = `
    <aside class="chat-sidebar">
      <ul class="chat-messages" data-role="messages">
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/40/40" alt="LuchaUno"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#4ade80">LuchaUno</span>
            <span class="text">Nice!</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/41/41" alt="DoctorHoot"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#60a5fa">DoctorHoot</span>
            <span class="text">What was that?</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/42/42" alt="PitBear"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#f97316">PitBear</span>
            <span class="text">Can I play next game?</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/43/43" alt="PirateDropout"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#d946ef">PirateDropout</span>
            <span class="text">Push!</span>
          </div>
        </li>
        <li class="message event">
          <div class="event-bubble">
            <img class="sticker" src="https://placekitten.com/64/64" alt="sticker"/>
            <div class="info">
              <div class="name" style="color:#d946ef">PirateDropout</div>
              <div class="text">+50,000</div>
            </div>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/44/44" alt="LuchaUno"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#4ade80">LuchaUno</span>
            <span class="text">That's so cool!</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/45/45" alt="PitBear"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#f97316">PitBear</span>
            <span class="text">I really love this channel</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://placekitten.com/46/46" alt="DoctorHoot"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#60a5fa">DoctorHoot</span>
            <span class="text">Thanks for joining!</span>
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
    li.innerHTML = `<div class="msg"><span class="name" style="color:#3b82f6">You</span><span class="text">${text}</span></div>`;
    messages.appendChild(li);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

  return {};
}
