export default {};

async function load() {
  const comps = document.querySelectorAll('comp');
  for (const comp of comps) {
    const name = comp.getAttribute('name');
    if (!name) continue;
    const root = document.createElement('div');
    comp.replaceWith(root);
    const [module, html] = await Promise.all([
      import(`./components/${name}/${name}.js`),
      fetch(`./components/${name}/${name}.html`).then(r => r.text())
    ]);
    root.innerHTML = html;
    await module.default({ root, props: {} });
  }
}

load();
