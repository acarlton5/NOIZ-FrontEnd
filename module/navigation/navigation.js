export default async function init({ hub, root }) {
  root.innerHTML = `
    <nav class="navigation-sidebar" data-role="sidebar">
      <ul class="navigation-menu">
        <li class="navigation-item"><a href="#" class="navigation-link">Newsfeed</a></li>
        <li class="navigation-item"><a href="#" class="navigation-link">Overview</a></li>
        <li class="navigation-item"><a href="#" class="navigation-link">Groups</a></li>
        <li class="navigation-item"><a href="#" class="navigation-link">Members</a></li>
      </ul>
    </nav>
  `;

  const sidebar = root.querySelector('[data-role="sidebar"]');

  const api = {
    open() {
      sidebar.classList.add('open');
    },
    close() {
      sidebar.classList.remove('open');
    },
    toggle() {
      sidebar.classList.toggle('open');
    }
  };

  return api;
}
