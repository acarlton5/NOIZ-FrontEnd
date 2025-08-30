export default {};

async function load() {
  const modules = document.querySelectorAll('module');
  for (const moduleEl of modules) {
    const name = moduleEl.getAttribute('data-module');
    if (!name) continue;
    const root = document.createElement('div');
    moduleEl.replaceWith(root);
    const [moduleCode, html] = await Promise.all([
      import(`./module/${name}/${name}.js`),
      fetch(`./module/${name}/${name}.html`).then(r => r.text())
    ]);
    root.innerHTML = html;
    await moduleCode.default({ root, props: {} });
  }
}

load();
