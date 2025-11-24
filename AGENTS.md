# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds bundled UI code; `entry.js` exports `mountApp`, and `$lib`/`$src` aliases cover Svelte modules.
- `dist/` is the Rollup output (`entry.js`) loaded dynamically by the browser-level `app.js`.
- Root `lib/` contains unbundled Pear-facing helpers; pass anything Svelte needs through `app.js` props.
- `index.html` bootstraps `app.js` (the browser entry), and `test/` contains `*.test.js` brittle suites.

## Build, Test, and Development Commands
- Install deps: `npm install`.
- Build once: `npm run build` (outputs to `dist/`).
- Dev run: `npm run dev` (builds, then launches Pear with the current bundle).
- Live dev: `npm run watch-dev` (cleans, builds, starts a watcher, then runs Pear).
- Rebuild only: `npm run watch-build`.
- Materialize a runnable `package.json`: `npm run dev-package` (optionally set `APP_NAME`, `PEAR_HEIGHT`, `PEAR_WIDTH`, `PEAR_LICENSE`), restore with `npm run restore-template`.
- Tests: `npm test` (runs all brittle specs). Clean artifacts: `npm run clean`.

## Coding Style & Naming Conventions
- Use ES modules with double quotes and semicolons, matching existing files; prefer 4-space indentation.
- Svelte components use `PascalCase.svelte` and live under `src/lib/components`; exports and filenames should align. Keep runtime bridges in root `lib/`.
- Keep styles scoped; use `:global` only for app-wide resets. Favor small, focused components.
- Import via `$lib/...` and `$src/...` aliases instead of long relative paths.

## Testing Guidelines
- Framework: `brittle`. Place tests alongside related areas in `test/`, using `*.test.js`.
- Name tests by behavior (e.g., `renders counter start value`) and keep them deterministic.
- Run `npm test` before PRs; add targeted tests for new logic or regressions. Use `npm test -- --grep "<pattern>"` to focus.

## Commit & Pull Request Guidelines
- Commits: concise, present-tense statements (e.g., `Add Pear reload hook`); group related changes and avoid mixed concerns.
- PRs: include a short summary, testing notes (`npm test`, manual Pear checks), and screenshots/gifs for UI changes.
- Reference issue IDs when applicable and call out Pear configuration changes (window sizes, background color) in the description.

## Security & Configuration Tips
- The Pear manifest lives in `package.json` under `pear`; keep values consistent with the shipped build and avoid committing secrets or tokens.
- Confirm `dist/` is regenerated after dependency or Rollup config changes before sharing artifacts.
- Prefer environment variables or local config files (ignored) for machine-specific paths or credentials.
