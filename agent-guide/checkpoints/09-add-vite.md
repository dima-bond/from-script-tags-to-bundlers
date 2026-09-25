# Checkpoint 9: Add Vite

Only now add tooling.

Before installing, ask and wait for the learner's answer:

> We already have a Python HTTP server that can run the app. What would we want Vite to add beyond simply serving files?

Then explain what Vite is:

- Vite is a frontend build tool. It coordinates the development experience and the production build around the source files we already have.
- During development, it runs an HTTP dev server, understands the module graph, transforms files when necessary, and provides fast updates when source code changes.
- For production, `vite build` follows the graph and produces optimized deployable assets, including bundles, split chunks, transformed syntax, minification, and hashed filenames.
- Vite is not a JavaScript framework like React or Vue. It can be used with those frameworks, but this project uses it with plain HTML, CSS, and JavaScript.
- Vite is also not a package manager. npm, pnpm, or Yarn installs Vite; Vite then runs the project and builds its frontend assets.

Give the alternatives a little context:

- **Parcel** is another integrated build tool with a dev server and production builds, with a strong focus on automatic, low-configuration behavior.
- **Rsbuild** is a comparable higher-level build tool powered by Rspack, with a dev server, sensible defaults, and production optimization.
- **webpack** and **Rspack** are highly configurable bundlers with broad ecosystems. They can power complete development setups, but usually expose more configuration and bundler concepts directly.
- **Rollup**, **Rolldown**, and **esbuild** can be used directly for lower-level transformation or bundling work. They overlap with Vite's responsibilities, but they are not exact one-for-one replacements for Vite's complete dev-server and build workflow.
- Frameworks such as Next.js may already provide an integrated build system. In that kind of project, adding Vite separately is usually unnecessary unless the architecture explicitly calls for it.

Explain why this lesson chooses Vite:

- It can adopt the existing `index.html` without scaffolding a new application.
- Its development mode continues the browser-native ES Module story from the earlier checkpoints.
- Its production command gives us a concrete `dist/` folder in which dependency graphs, transpilation, bundling, code splitting, minification, tree shaking, and chunks can be examined.
- It provides useful defaults while the later checkpoints deliberately open the black box and inspect what those defaults did.

1. Install Vite as an exact development dependency. For npm:

   ```sh
   npm install --save-dev --save-exact vite
   ```

   Explain that this downloads Vite into `node_modules/`, adds it to `devDependencies`, and creates or updates the lockfile.

   If `node_modules/` does not appear immediately, refresh the explorer or reload VS Code/the current editor. Editors may cache the tree or hide ignored folders. Verify installation through `package.json`, the lockfile, or terminal output before assuming failure.

2. Add scripts to the existing `package.json`:

   ```json
   {
     "scripts": {
       "dev": "vite --host 127.0.0.1",
       "build": "vite build",
       "preview": "vite preview --host 127.0.0.1"
     }
   }
   ```

3. Run the dev server through the package-manager script.

Explain that Vite is a `devDependency` because it is development/build tooling, scripts avoid global installation, Vite serves native ESM during development, and it performs an optimized production build. Vite is a build tool and dev server, not merely a bundler.

Next: [Checkpoint 10](10-build-and-inspect.md)
