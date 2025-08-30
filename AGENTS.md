# Contributing Guidelines

This project is rebuilt with a mobile‑first mindset using Bootstrap 5.
Follow these rules for all code in this repository.

## Layout & Modules
- `index.html` uses `<module>` elements with `data-module` attributes as mount points. Place each module in `module/<name>/<name>.{html,css,js}`.
- Build layouts with Bootstrap's grid (`container[-fluid]`, `row`, `col-*`).
- Prefer responsive utility classes and relative units; avoid fixed pixel widths or heights unless guarded by media queries.
- Ensure modules collapse or stack on small viewports. Test changes in browser DevTools' device mode (e.g., iPhone 12).

## Coding Conventions
- JavaScript modules must default-export `async function init({ root, props })`.
- Import module CSS in `app.css`; runtime lazy loading is also supported.
- Keep styles scoped to the module; avoid global selectors.

## Testing
- Run `npm test` before committing. The current script prints a placeholder message but ensures the command completes without error.
