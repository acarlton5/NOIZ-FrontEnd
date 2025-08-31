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
1. Run `npm start` to launch a local static server via [`live-server`](https://www.npmjs.com/package/live-server) on `http://127.0.0.1:5173/` without opening a browser.
2. Open `http://127.0.0.1:5173/` in your browser to view `index.html`.

## Development Guidelines
- Build layouts with Bootstrap's grid (`container[-fluid]`, `row`, `col-*`).
- Prefer responsive utilities; avoid fixed pixel widths or heights.
- Test layouts on small screens using browser DevTools' device mode.
- See [AGENTS.md](AGENTS.md) for complete contributing rules.

## Scripts
- `npm start` – serve the project locally with `live-server` on port 5173.
- `npm test` – placeholder tests; run before committing.

Happy hacking!
