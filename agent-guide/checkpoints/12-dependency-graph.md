# Checkpoint 12: See the Dependency Graph

Purpose: make the graph visible before discussing optimization.

Ask the learner to find every static and dynamic import, then draw the actual graph:

```text
index.html
  └─ app.js
      ├─ formatters.js       static import
      ├─ state.js            static import
      └╌ tips.js             dynamic import; lazy boundary
```

Use solid lines for initial dependencies and a dashed line for the dynamic import. Explain that Vite starts from `index.html`, discovers the entry, and follows imports recursively. Static imports are initially reachable; the dynamic import remains known but marks a possible loading boundary. The graph is an internal data structure, not a file sent to the browser.

Ask the learner to predict which source modules will share an output chunk.

Next: [Checkpoint 13](13-transpilation.md)
