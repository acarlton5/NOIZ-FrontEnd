export default async function init({ root, props }) {
  const pageLoader = root.querySelector('.page-loader');
  if (!pageLoader) return;

  const hidePageLoader = () => {
    pageLoader.classList.add('hidden');
    window.removeEventListener('load', hidePageLoader);
  };

  if (document.readyState === 'complete') {
    hidePageLoader();
  } else {
    window.addEventListener('load', hidePageLoader);
  }
}
