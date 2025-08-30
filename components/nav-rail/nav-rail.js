export default async function init({ root }) {
  const items = root.querySelectorAll('.rail-item');
  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      items.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  });
}

