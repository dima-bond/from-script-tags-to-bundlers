# Checkpoint 11: Open the Vite Black Box

Purpose: replace one mysterious "Vite step" with distinct build responsibilities.

Inspect the installed Vite major version; do not guess its lower-level tools.

- Vite 8 uses Rolldown for dependency processing/bundling, Oxc-based tools for JavaScript transformation/minification, and Lightning CSS for CSS minification.
- Older Vite versions used esbuild for fast development transforms/dependency optimization and Rollup for production bundling.
- Vite is the user-facing tool coordinating these responsibilities. One lower-level tool may perform several responsibilities.

Present this as a useful model, not six guaranteed isolated passes:

```text
source entry
    ↓
dependency graph
    ↓
syntax transformation for a target
    ↓
module linking / bundling
    ↓
tree shaking
    ↓
code-splitting decisions
    ↓
minification
    ↓
output chunks and assets
```

Briefly define the three graph-based responsibilities before moving on:

- **Module linking / bundling** connects imports with exports and turns source modules into delivery units.
- **Tree shaking** uses reachability information to leave unused exports out of production output.
- **Code splitting** decides which reachable code belongs in the initial chunk and which code can live in separate lazy or shared chunks.

These are separate ideas, but the diagram is still a teaching model rather than a guaranteed execution order. They all depend on the same graph, and real bundlers often analyze them together. Each concept gets its own later experiment: bundling in Checkpoint 14, code splitting in Checkpoint 15, and tree shaking in Checkpoint 17.

In each following checkpoint, repeat this map in a `text` code block with `← current focus` beside only the concept currently being examined.

Next: [Checkpoint 12](12-dependency-graph.md)
