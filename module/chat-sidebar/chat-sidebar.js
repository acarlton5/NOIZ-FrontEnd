export default async function init({ root }) {
  root.innerHTML = `
    <aside class="chat-sidebar">
      <header class="chat-header">Chat</header>
      <ul class="chat-messages" data-role="messages">
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="LuchaUno"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#4ade80">LuchaUno</span>
            <span class="text">Nice!</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="DoctorHoot"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#60a5fa">DoctorHoot</span>
            <span class="text">What was that?</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="PitBear"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#f97316">PitBear</span>
            <span class="text">Can I play next game?</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="PirateDropout"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#d946ef">PirateDropout</span>
            <span class="text">Push!</span>
          </div>
        </li>
        <li class="message event">
          <div class="event-bubble">
            <img class="sticker" src="https://streamstickers.com/uploads/vader-sample-65017.gif" alt="sticker"/>
            <div class="info">
              <div class="name" style="color:#d946ef">PirateDropout</div>
              <div class="text">+50,000</div>
            </div>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="LuchaUno"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#4ade80">LuchaUno</span>
            <span class="text">That's so cool!</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="PitBear"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#f97316">PitBear</span>
            <span class="text">I really love this channel</span>
          </div>
        </li>
        <li class="message">
          <div class="avatar-wrap" style="--avi-width:36px;">
            <img class="avatar-image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/3aecb399-e583-41d5-985a-e2e2860ae531-profile_image-150x150.png" alt="DoctorHoot"/>
          </div>
          <div class="msg">
            <span class="name" style="color:#60a5fa">DoctorHoot</span>
            <span class="text">Thanks for joining!</span>
          </div>
        </li>
      </ul>
      <form class="chat-input" data-role="form">
        <input type="text" class="form-control" data-role="input" placeholder="Type a message" />
        <button type="submit" class="send-btn" aria-label="Send">&#10148;</button>
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
