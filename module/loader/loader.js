export default async function init({ root, props }) {
  const pageLoader = root.querySelector('.page-loader');
  if (!pageLoader) return;

  const hidePageLoader = () => {
    pageLoader.classList.add('hidden');
  };

  window.addEventListener('load', hidePageLoader);
}
