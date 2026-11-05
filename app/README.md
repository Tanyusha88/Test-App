# Thank you, me.

A daily self-thanks journal — write yourself a short note each evening
for something you did well, build a streak, and look back on it later.
Built with Vite + React, using the Organic design system tokens from
`project/_ds/`. Notes and settings persist to `localStorage`.

## Setup

Requires Node.js (v18+) and npm.

```bash
npm install     # install dependencies
npm run dev     # start the dev server (prints a local URL, e.g. http://localhost:5173)
npm run build   # production build, output to dist/
npm run preview # serve the production build locally
npm run lint    # run oxlint
```

## Project layout

- `src/screens/` — the four main screens: Onboard, Today, Journal, Profile
- `src/components/` — ComposeSheet, SavedOverlay, TabBar
- `src/lib/` — seed data, date/streak helpers, id generation
- `src/hooks/usePersistentState.js` — localStorage-backed state
- `src/styles/tokens.css` — the Organic design system's tokens and component classes
