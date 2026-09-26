# How to Use

1. Open this folder in a coding agent.
2. Ask the agent:

   ```text
   Start the script-tags-to-bundlers journey. Follow AGENTS.md one checkpoint at a time.
   ```

3. The agent should guide you through the project interactively.
4. Follow the browser instructions for each checkpoint. The first version opens directly, while the ES Module checkpoints use a local HTTP server.

## From Script Tags to Bundlers

This is a tiny learning project for understanding how a frontend build pipeline appears naturally.

It starts with three plain runtime files:

- `index.html`
- `styles.css`
- `app.js`

The point is not to begin with Vite, webpack, Rollup, or any other bundler.
The point is to feel the pressure that eventually makes a bundler useful.

## What You Will Learn

- why old projects used multiple `<script>` tags
- why global variables become painful
- what ES Modules solve
- what `import` and `export` mean
- what CommonJS was and why it mattered
- why browsers can run ESM now
- why bundlers still exist
- what dependency graphs, transpilation, and polyfills mean
- how bundling, tree shaking, code splitting, and minification differ
- what changes when a project adopts Vite
- how source files and installed packages become browser-facing output chunks
- how Vite, webpack, Rollup, esbuild, and related tools overlap
- how well you can explain the complete pipeline in a final interactive knowledge check

## Current State

The project currently uses a classic single-script setup:

```html
<script src="./app.js"></script>
```

That is intentional. Do not skip straight to tooling.

The learning path should move from:

```text
one HTML file + one JS file
      + one linked CSS file
      ↓
multiple classic scripts
      ↓
script order problems
      ↓
ES Modules
      ↓
dependency graph
      ↓
dynamic import() and lazy loading
      ↓
bundler motivation
      ↓
package management and Vite
      ↓
transpilation, bundling, tree shaking,
code splitting, and minification
      ↓
HTML, CSS, and output chunks for the browser
```

## For Humans

If you are reading this without an agent, open `AGENTS.md` first.
It contains the course rules and links to the individual checkpoint files.
