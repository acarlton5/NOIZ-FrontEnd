export default {};

async function load() {
  const module = document.querySelectorAll('module');
  for (const module of modules) {
    const name = module.getAttribute('name');
    if (!name) continue;
    const root = document.createElement('div');
    comp.replaceWith(root);
    const [module, html] = await Promise.all([
      import(`./module/${name}/${name}.js`),
      fetch(`./module/${name}/${name}.html`).then(r => r.text())
    ]);
    root.innerHTML = html;
    await module.default({ root, props: {} });
  }
}

load();
