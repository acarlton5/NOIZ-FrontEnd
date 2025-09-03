export default async function init({ root, utils }) {
  root.innerHTML = `
    <section class="streaming">
      <div class="video-wrapper">
        <iframe class="stream-frame" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
      </div>
    </section>
  `;

  const chat = document.createElement('aside');
  chat.className = 'live-chat';
  chat.innerHTML = `
    <header class="chat-header">
      <h3 class="chat-title">Live chat</h3>
      <div class="chat-status">Top chat · 283K</div>
    </header>
    <div class="chat-messages">
      <div class="chat-message">
        <img class="message-avatar" src="https://placehold.co/24x24" alt="Lena">
        <div class="message-body">
          <div class="message-meta"><span class="message-author" style="color:#0a8d48;">Lena</span> <span class="message-time">9:58 AM</span></div>
          <div class="message-text">wow</div>
        </div>
      </div>
      <div class="chat-message">
        <img class="message-avatar" src="https://placehold.co/24x24" alt="Ash">
        <div class="message-body">
          <div class="message-meta"><span class="message-author" style="color:#2a7fff;">Ash</span> <span class="message-time">9:58 AM</span></div>
          <div class="message-text">more pushups!</div>
        </div>
      </div>
      <div class="chat-message">
        <img class="message-avatar" src="https://placehold.co/24x24" alt="IntroMeb">
        <div class="message-body">
          <div class="message-meta"><span class="message-author" style="color:#26bba4;">IntroMeb</span> <span class="message-time">9:58 AM</span></div>
          <div class="message-text">great play!!</div>
        </div>
      </div>
      <div class="chat-super">
        <div class="super-header" style="background:#0fa36b;">$5.00</div>
        <div class="super-body">
          <img class="message-avatar" src="https://placehold.co/24x24" alt="Laura">
          <div class="message-body">
            <div class="message-meta"><span class="message-author" style="color:#0fa36b;">Laura Mipsum</span></div>
            <div class="message-text">$5.00</div>
          </div>
        </div>
      </div>
    </div>
    <form class="chat-input">
      <img class="input-avatar" src="https://placehold.co/24x24" alt="Anon">
      <input type="text" placeholder="Say something..." maxlength="200" />
      <button type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(chat);
  utils.onCleanup(() => chat.remove());
  return {};
}
