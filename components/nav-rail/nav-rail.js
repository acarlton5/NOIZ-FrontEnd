export default async function init({ root, props }) {
  const items = root.querySelectorAll('.rail-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  });
}
