const app = {

};


async function loadModules() {
  const modules = document.querySelectorAll('module[data-module]');
  await Promise.all(Array.from(modules).map(async (m) => {
    const name = m.dataset.module;
    const html = await fetch(`module/${name}/${name}.html`).then((r) => r.text());
    m.innerHTML = html;
    try {
      const module = await import(`../module/${name}/${name}.js`);
      if (module.default) {
        await module.default({ root: m, props: {} });
      }
    } catch (e) {
      console.error(`Failed to load module ${name}`, e);
    }
  }));
}




  loadModules();

