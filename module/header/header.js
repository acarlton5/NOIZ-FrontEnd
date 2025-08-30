export default async function init({ root, props }) {
  const trigger = root.querySelector('.mobilemenu-trigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      document.body.classList.toggle('mobilemenu-open');
    });
  }
}
