# NOIZ

A modular, Bootstrap 5–powered starter for building responsive social/streaming UIs. Each feature is a small module that mounts into a `<module data-module="...">` tag.

## Project Structure
```
.
├── index.html      # Page skeleton with <module> mount points
├── app.js          # Module loader and event bus
├── app.css         # Global styles + module imports
├── module/         # One folder per module
├── data/           # JSON fixtures that drive the UI
├── images/         # Static assets
├── scripts/        # Helper scripts for data generation
└── package.json    # npm scripts
```

## Getting Started
1. Run `npm start` to launch a local static server via [`serve`](https://www.npmjs.com/package/serve).
2. Open the printed URL (e.g., `http://localhost:3000/`) to view `index.html`.

## Development Guidelines
- Build layouts with Bootstrap's grid (`container[-fluid]`, `row`, `col-*`).
- Prefer responsive utilities; avoid fixed pixel widths or heights.
- Test layouts on small screens using browser DevTools' device mode.
- See [AGENTS.md](AGENTS.md) for complete contributing rules.

## Scripts
- `npm start` – serve the project locally with `serve`.
- `npm test` – placeholder tests; run before committing.

Happy hacking!
