# NOIZ

A modular, Bootstrap 5–powered starter for building responsive social/streaming UIs. Each feature is a small component that mounts into a `<comp name="..."></comp>` tag.

## Project Structure
```
.
├── index.html      # Page skeleton with <comp> mount points
├── app.js          # Component loader and event bus
├── app.css         # Global styles + component imports
├── components/     # One folder per component
├── data/           # JSON fixtures that drive the UI
├── images/         # Static assets
├── scripts/        # Helper scripts for data generation
└── package.json    # npm scripts
```

## Getting Started
1. Serve the project as static files:
   - `npx serve .` or `npx http-server .`
   - or run `npm start` to launch `node app.js`
2. Open the printed URL (e.g., `http://localhost:5173/`).

## Development Guidelines
- Build layouts with Bootstrap's grid (`container[-fluid]`, `row`, `col-*`).
- Prefer responsive utilities; avoid fixed pixel widths or heights.
- Test layouts on small screens using browser DevTools' device mode.
- See [AGENTS.md](AGENTS.md) for complete contributing rules.

## Scripts
- `npm start` – run the development server.
- `npm test` – placeholder tests; run before committing.

Happy hacking!
