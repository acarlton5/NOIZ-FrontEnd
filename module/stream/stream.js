// module/stream/stream.js
// Stream module with video player and live chat

const tpl = (messages, members) => `
  <section class="container my-3" data-role="stream">
    <div class="ratio ratio-16x9">
      <video controls src="https://www.w3schools.com/html/mov_bbb.mp4"></video>
    </div>
    <aside class="stream-sidebar card bg-dark text-white">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#chat" type="button" role="tab">Chat</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#members" type="button" role="tab">Members</button>
          </li>
        </ul>
      </div>
      <div class="card-body tab-content">
        <div class="tab-pane fade show active" id="chat" role="tabpanel">
          <div data-role="messages" class="mb-3" style="max-height:200px; overflow-y:auto;">
            ${messages.map(m => `<div class="mb-1"><strong>${m.user}:</strong> ${m.text}</div>`).join('')}
          </div>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Type a message" data-role="input">
            <button class="btn btn-primary" data-action="send">Send</button>
          </div>
        </div>
        <div class="tab-pane fade" id="members" role="tabpanel">
          <ul class="list-group list-group-flush" data-role="members">
            ${members.map(name => `<li class="list-group-item bg-dark text-white">${name}</li>`).join('')}
          </ul>
        </div>
      </div>
    </aside>
  </section>
`;

export default async function init({ root, utils }) {
  let messages = [
    { user: 'Nova', text: 'Welcome to the stream!' },
    { user: 'Dex', text: 'Hey everyone!' }
  ];
  let members = ['Nova', 'Dex', 'Kai'];

  function render() {
    root.innerHTML = tpl(messages, members);
  }

  render();

  utils.delegate(root, 'click', '[data-action="send"]', () => {
    const input = root.querySelector('[data-role="input"]');
    const text = input.value.trim();
    if (!text) return;
    messages.push({ user: 'You', text });
    input.value = '';
    render();
    const messagesEl = root.querySelector('[data-role="messages"]');
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });

  utils.listen(root, 'keyup', (e) => {
    if (e.target.matches('[data-role="input"]') && e.key === 'Enter') {
      root.querySelector('[data-action="send"]').click();
    }
  });

  return {
    // optional API
  };
}
