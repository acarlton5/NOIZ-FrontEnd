const app = {
  querySelector(selector, cb) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0 && typeof cb === 'function') {
      cb(elements);
    }
  },
  plugins: {
    createDropdown() {
      return {
        showDropdowns() {},
        hideDropdowns() {},
      };
    },
  },
  loadModules: {
    const modules = document.querySelectorAll('module[data-module]');
    await Promise.all(Array.from(modules).map(async (m) => {
      const name = m.dataset.module;
      try {
        const response = await fetch(`module/${name}/${name}.html`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();
        m.innerHTML = html;
        try {
          const module = await import(`../module/${name}/${name}.js`);
          if (module.default) {
            await module.default({ root: m, props: {} });
          }
        } catch (e) {
          console.error(`Failed to load module ${name}`, e);
        }
      } catch (e) {
        console.error(`Failed to fetch module ${name}`, e);
      }
    }));
  },

};

// Make the helper available globally for dynamically imported modules.
window.app = app;


app.loadModules();