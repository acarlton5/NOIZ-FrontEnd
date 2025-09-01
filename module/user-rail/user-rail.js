export default async function init({ root, utils }) {
  const users = [
    { name: 'Marina Valentine', msg: 'Can you stream the new game?', time: '2h' },
    { name: 'Neko Bebop', msg: "Awesome! I'll see you there!", time: '54m' },
    { name: 'Nick Grissom', msg: "I was wondering if you wanted to...", time: '1d' }
  ];

  root.innerHTML = `
    <aside class="user-rail card text-white bg-dark">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Chats</span>
        <button class="btn-close btn-close-white" data-action="close" aria-label="Close"></button>
      </div>
      <div class="list-group list-group-flush" data-role="list">
        ${users.map((u, i) => `
          <button class="list-group-item list-group-item-action bg-dark text-light d-flex align-items-start" data-index="${i}">
            <img src="https://via.placeholder.com/32" alt="${u.name}" class="rounded-circle me-2" width="32" height="32">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <span class="fw-bold">${u.name}</span>
                <small class="text-muted">${u.time}</small>
              </div>
              <div class="small text-muted">${u.msg}</div>
            </div>
          </button>
        `).join('')}
      </div>
    </aside>
  `;

  utils.delegate(root, 'click', '[data-index]', (e, el) => {
    const u = users[parseInt(el.getAttribute('data-index'), 10)];
    alert(`Open conversation with ${u.name}`);
  });

  utils.delegate(root, 'click', '[data-action="close"]', () => {
    root.style.display = 'none';
  });

  return {
    open() { root.style.display = ''; },
    close() { root.style.display = 'none'; }
  };
}
