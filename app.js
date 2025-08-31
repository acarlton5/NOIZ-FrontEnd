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
    await Promise.all(
      Array.from(modules).map(async (m) => {
        const name = m.dataset.module;
        try {
          const response = await fetch(`module/${name}/${name}.html`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const html = await response.text();

          // Replace the placeholder element so the loaded markup becomes part of the
          // document structure instead of being nested inside a <module> tag. This
          // ensures dropdown triggers like the settings cog are present in the DOM.
          const template = document.createElement('template');
          template.innerHTML = html;
          const fragment = template.content;
          const first = fragment.firstElementChild;
          // Insert the full fragment so all nodes, including those at the end
          // like the settings dropdown trigger, are added to the DOM.
          m.replaceWith(fragment);

          try {
            const module = await import(`./module/${name}/${name}.js`);
            if (module.default) {
              await module.default({ root: first, props: {} });
            }
          } catch (e) {
            console.error(`Failed to load module ${name}`, e);
          }
        } catch (e) {
          console.error(`Failed to fetch module ${name}`, e);
        }
      })
    );
  },

};

// Make the helper available globally for dynamically imported modules.
window.app = app;


app.loadModules();
