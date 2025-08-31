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
  async loadModules() {
    const modules = document.querySelectorAll('module[data-module]');
    for (const m of modules) {
      const name = m.dataset.module;
      try {
        const response = await fetch(`module/${name}/${name}.html`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();

        // Inject the fetched markup directly before the placeholder so it becomes
        // part of the surrounding document structure. Using a temporary container
        // avoids leaving behind stray wrapper elements and ensures trailing nodes
        // like the settings cog remain intact.
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        const first = tmp.firstElementChild;
        while (tmp.firstChild) {
          m.parentNode.insertBefore(tmp.firstChild, m);
        }
        m.remove();

        try {
          const mod = await import(`./module/${name}/${name}.js`);
          if (mod.default) {
            await mod.default({ root: first, props: {} });
          }
        } catch (e) {
          console.error(`Failed to load module ${name}`, e);
        }
      } catch (e) {
        console.error(`Failed to fetch module ${name}`, e);
      }
    }
  },

};

// Make the helper available globally for dynamically imported modules.
window.app = app;


app.loadModules();
