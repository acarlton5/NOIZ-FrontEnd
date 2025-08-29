export default async function init({ root, props }) {
  const items = root.querySelectorAll('.rail-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
