# Optional Checkpoint 19: Compare esbuild Directly

Offer this only after the Vite experiments. Current Vite versions may not use esbuild internally; this is a comparison exposing individual responsibilities.

If the learner agrees, install `esbuild` as an exact development dependency. For npm:

```sh
npx --no-install esbuild app.js --target=es2015 --format=esm --outfile=dist-esbuild-transform/app.js
npx --no-install esbuild app.js --bundle --splitting --format=esm --target=es2015 --outdir=dist-esbuild
```

Before inspecting the results, clarify the terminology:

- **Transformation** is the broad term for rewriting source code.
- **Transpilation** is source-to-source transformation. In this command, transforming newer JavaScript syntax for the `es2015` target is transpilation.
- **Bundling** is different: it follows imports across files, links imports to exports, and emits output chunks for the dependency graph.

The first command demonstrates transpilation without bundling:

```text
app.js
  ↓ rewrite syntax inside this file
dist-esbuild-transform/app.js
  still imports ./formatters.js and ./state.js
```

Without `--bundle`, esbuild does not perform the important bundling work:

- it does not recursively follow the static imports from `app.js`
- it does not link imported names to their exported implementations
- it does not place code from `formatters.js` and `state.js` into an entry chunk
- it does not analyze the complete application graph for cross-module tree shaking or chunk boundaries

The transform-only file is an inspection artifact, not a complete runnable copy of the app. Because it was moved to another directory while its imported files were not copied beside it, those relative imports may not resolve if the learner tries to run it.

The second command adds `--bundle`, so esbuild performs both transpilation and bundling:

```text
app.js
  ├─ formatters.js
  └─ state.js
        ↓ transpile + follow imports + link modules
dist-esbuild/ entry chunk
```

Because it also uses `--splitting --format=esm`, the dynamic `tips.js` import can remain a separate lazy chunk.

Also explain why no HTML entry appears: these commands give esbuild `app.js` as the entry point, so esbuild follows the JavaScript graph and emits JavaScript chunks. It does not automatically generate or copy `index.html`, the separately linked stylesheet, or other HTML-owned assets. The resulting directories are JavaScript experiments, not complete deployable copies of this site. Vite works at a higher level in this project: it treats `index.html` as the application entry, discovers its scripts and styles, and emits a rewritten HTML file with the production assets.

Require a concrete comparison:

1. Open `dist-esbuild-transform/app.js` and find a static import such as `./formatters.js`. Its presence proves that the module boundary was not bundled.
2. Open the bundled entry in `dist-esbuild/`. Find the formatter and state implementations linked into that output and confirm the original static import is gone.
3. Point out that both outputs may contain transpiled syntax, but only the second represents the linked application graph.

Use equivalent commands for the chosen package manager and ignore both generated directories in Git.

Explain that "transpiler," "bundler," and "minifier" name responsibilities. One tool can perform several depending on its options.

Next: [Optional Checkpoint 20](20-rollup-comparison.md) or [Wrap Up](21-wrap-up.md)
