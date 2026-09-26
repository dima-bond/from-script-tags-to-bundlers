# Checkpoint 14: Make Bundling Visible

Purpose: show several source modules linked into fewer output files.

At the start, show the shared pipeline in a `text` code block with `← current focus` beside **module linking / bundling** only. Tree shaking and code splitting appear as separate lines, but do not claim they have already been demonstrated; their experiments come in Checkpoints 15 and 17.

Before inspecting output, explain why bundling exists:

- Source modules are organized for developers. Small files with clear responsibilities are easier to understand, test, and change.
- Production files are organized for delivery. Shipping every source module separately can create many requests and nested dependency discovery as an application grows.
- Because a bundler already knows the complete dependency graph, it can link related modules ahead of time, remove module-loading boundaries that are unnecessary in production, and emit fewer intentional loading units.
- The same whole-graph view also enables related optimizations such as tree shaking, code splitting, minification, asset hashing, and consistent handling of package imports.
- Bundling does not mean "always make one file." One huge file would delay optional features and reduce caching flexibility. The goal is a useful set of output chunks, not the smallest possible file count.

Show the development-versus-production idea:

```text
DEVELOPMENT: browser loads source modules
index.html -> app.js -> formatters.js
                     -> state.js

PRODUCTION: browser loads generated delivery units
index.html -> index-[hash].js
              contains the linked app + formatter + state code
```

This project is too small for bundling those three files to produce a meaningful speed improvement. The point is to make the structural transformation visible before imagining the same graph with hundreds of modules.

Question stop: before opening the readable bundle, ask and wait for the learner's prediction:

> Does one source module necessarily become one output file? Where do you expect the code from `formatters.js` and `state.js` to end up?

Keep the prediction visible while inspecting the generated entry chunk.

Explain why the readable build is used again: minified output would hide recognizable names and structure. Open the readable entry chunk under `dist-readable/assets/` and find code from `app.js`, `formatters.js`, and `state.js` in that one generated file. This is direct evidence that Vite followed the imports and linked the static modules rather than merely copying each source file into `dist-readable/`.

Use the real output name in this comparison:

```text
SOURCE MODULES                         READABLE OUTPUT
app.js ─┬─ formatters.js      ──────▶  assets/index-[hash].js
        └─ state.js
```

After inspecting it, make the distinction explicit:

- A **module** is a source-code unit with imports and exports, chosen mainly for code organization.
- A **chunk** is a generated delivery unit chosen by the build, mainly for browser loading and caching.
- Several modules can be linked into one chunk, while dynamic imports can cause other modules to become separate chunks.
- The readable chunk is being inspected only to reveal that mapping. It is generated evidence, not code the learner should maintain or edit.

Reconnect this to the module-scope explanation from Checkpoint 3. Combining modules into one physical chunk must not turn their separate local bindings into accidental collisions. A bundler tracks which declaration every reference belongs to and can rename bindings, wrap module code, or use another equivalent representation. Show this simplified example:

```text
SOURCE MODULES                  POSSIBLE LINKED OUTPUT
users.js:  export const status         const status = "active";
orders.js: export const status   ->    const status$1 = "paid";
```

The exact generated names and strategy are tool-dependent. A minifier may later shorten both names further, but it must preserve every reference to the correct value. Physical file boundaries may disappear in a chunk while the behavior of the original module scopes remains intact.

Conclude with the practical reason for this checkpoint: it proves that `vite build` did more than copy or rename files. It changed the developer-friendly module graph into browser-delivery units. Checkpoint 15 will explain why `tips.js` was deliberately not placed in the initial entry chunk.

Next: [Checkpoint 15](15-code-splitting.md)
