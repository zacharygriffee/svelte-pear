# Svelte + Pear Template

A template for creating Svelte applications powered by the **Pear runtime**, designed for building cross-platform desktop applications.

## Features

- **Svelte**: A modern, reactive framework for building user interfaces.
- **Pear Runtime**: P2P-ready runtime.
- **Rollup**: Creates bundles for development purposes.
- **Testing**: Includes `brittle` for testing.
- **File Watching**: Automatically rebuilds bundles during development.

---

## Installation
[Setup Pear](https://docs.pears.com/guides/getting-started)
Open terminal to init where . is the directory you like to init the project to.
Prefer cloning from GitHub for now (until a stable pear seed is available):

```bash
git clone https://github.com/zacharygriffee/svelte-pear-template.git my-new-app
cd my-new-app
npm install
```

If/when seeding is available, you can also init from the staged template:

```shell
pear init pear://8cnwqjydhcx6714sfty3kkdyracjng6ohwfmagxsixggcnnpskzo .
```

## Project Structure

```
svelte-pear/
├── app.js                 # Browser entry; loads Pear bridges and the bundled UI
├── dist/                  # Bundled UI output consumed by app.js
│   └── entry.js           # Rollup output (generated)
├── lib/                   # Unbundled Pear-facing utilities (not bundled)
│   └── pear.js            # Example Pear runtime helper
├── src/                   # Svelte UI source code (bundled)
│   ├── entry.js           # Rollup entry that exports mountApp
│   ├── App.svelte         # Root Svelte component
│   └── lib/components/    # Svelte component library
│       └── Counter.svelte
├── test/                  # Test files
│   └── index.test.js      # Example test file
├── _template.json         # Template JSON (specific to your app needs)
├── index.html             # Main entry point for Pear (loads app.js)
├── package.json           # Project configuration and dependencies
├── package-lock.json      # Locked dependency versions
├── README.md              # Project documentation
└── rollup.config.js       # Rollup configuration file
```
$lib and $src similar to sveltekit alias work as expected for Svelte sources inside `src/`.

### Key Directories and Files

- **`src/`**:
    - Bundled Svelte UI source. `entry.js` exports `mountApp`, which is loaded dynamically.

- **`dist/`**:
    - Rollup output produced by `npm run build`; `dist/entry.js` is required by `app.js`.

- **`lib/`**:
    - Unbundled Pear-facing scripts. Use this space for runtime bridges and pass them into Svelte via `app.js`.

- **`app.js`**:
    - Browser entry loaded by `index.html`. Imports `dist/entry.js`, hands `lib/` APIs into Svelte, and hooks Pear reloads.

- **`index.html`**:
    - Main entry point loaded by Pear and references `app.js` for bootstrapping.

---

## Development Workflow

### 1. Clone the Repository

```bash
git clone https://github.com/zacharygriffee/svelte-pear-template.git my-new-app
cd my-new-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

This script builds `dist/entry.js` and launches Pear via `pear run -d .`. Re-run after code changes or use the watch script during UI work:

```bash
npm run watch-build
```

### 4. Create the Production Build

Production packaging for the Pear app is handled **entirely by Pear**. However, the `dist/` directory will contain all the necessary assets for production once you're ready to package.

To prepare the `dist/` directory:
```bash
npm run build
```

Once the app is ready, Pear's built-in production packaging tools 
- [Read Pear Release Docs for details](https://docs.pears.com/guides/releasing-a-pear-app)

---

## Pear Runtime Configuration

The `pear` configuration is defined in `package.json`:

[Read pear docs for more details.](https://docs.pears.com/)


```json
"pear": {
  "name": "svelte-pear",
  "type": "desktop",
  "gui": {
    "backgroundColor": "#ffffff",
    "height": 768,
    "width": 1024
  }
}
```

### Key Options
- **`name`**: Name of your Pear app.
- **`type`**: Specifies the app type (`desktop`).
- **`gui`**: Configures the appearance and dimensions of the app window.

---

## Scripts

| Script           | Description                                                   |
|-------------------|---------------------------------------------------------------|
| `npm run dev`     | Builds `dist/entry.js` and runs Pear (`pear run -d .`).       |
| `npm run build`   | Generates the `dist/` bundle from `src/`.                     |
| `npm run test`    | Runs tests in the `test/` directory using `brittle`.          |
| `npm run watch-build` | Watches `src/` for changes and rebuilds `dist/`.          |
| `npm run watch-dev` | Cleans, rebuilds, runs Pear, then rebuilds on change.       |
| `npm run dev-package` | Writes a local `package.json` with concrete Pear values (uses env overrides). |
| `npm run restore-template` | Restores the templated `package.json` from `package.template.json`. |

---

## Testing

This template uses the `brittle` library for writing and running tests. Add test files in the `test/` directory and run:

```bash
npm run test
```

---

## Production Workflow

When the app is ready for production:
1. Ensure the `dist/` directory is complete and up-to-date by running:
   ```bash
   npm run build
   ```
2. Use Pear’s production packaging tools to package the app:
   [Read pear docs for more details.](https://docs.pears.com/)
3. Your app at this point should be available for download via p2p pear link.

### Publishing via Pear

- Keep `package.json` templated when staging/publishing so `_template.json` can inject values; run `npm run restore-template` before any `pear stage` commands.
- Links are derived from `pear.name` and channel; use the same name/channel to keep the same pear link across machines.
- Typical flow from a clean checkout: `npm run restore-template && npm ci && npm run build && pear stage dev` (or `production`), then `pear seed <channel>` to share.

### Working with templated package.json

During template development, run:

```bash
npm run dev-package
```

This writes a runnable `package.json` from the template, using defaults or environment variables:

```bash
APP_NAME=my-pear-app PEAR_HEIGHT=900 PEAR_WIDTH=1440 PEAR_LICENSE=MIT npm run dev-package
```

To restore the untouched template:

```bash
npm run restore-template
```

---

## License

This template is licensed under the [MIT License](LICENSE).

---
