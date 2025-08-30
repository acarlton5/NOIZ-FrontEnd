# Contributing Guidelines

This project is rebuilt with a mobile‑first mindset using Bootstrap 5.
Follow these rules for all code in this repository.

## Layout & Components
- `index.html` uses `<comp>` elements with `name` attributes as mount points. Place each component in `components/<name>/<name>.{html,css,js}`.
- Build layouts with Bootstrap's grid (`container[-fluid]`, `row`, `col-*`).
- Prefer responsive utility classes and relative units; avoid fixed pixel widths or heights unless guarded by media queries.
- Ensure components collapse or stack on small viewports. Test changes in browser DevTools' device mode (e.g., iPhone 12).

## Coding Conventions
- JavaScript components must default-export `async function init({ root, props })`.
- Import component CSS in `app.css`; runtime lazy loading is also supported.
- Keep styles scoped to the component; avoid global selectors.

## Testing
- Run `npm test` before committing. The current script prints a placeholder message but ensures the command completes without error.
