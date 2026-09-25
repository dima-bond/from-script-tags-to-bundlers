# Checkpoint 15: Make Code Splitting Visible

Purpose: connect the earlier dynamic import to a real lazy chunk.

Find the generated chunk corresponding to `tips.js` and map it:

```text
SOURCE GRAPH                           OUTPUT CHUNKS
app.js ─┬─ formatters.js      ──────▶  index-[hash].js
        ├─ state.js
        └╌ tips.js            ──────▶  tips-[hash].js (lazy)
```

Run the production preview and use Network:

1. Reload and confirm the tip chunk is not initially requested.
2. Click `Show tip` and watch it arrive.
3. Close and reopen the tip, noting possible browser-cache reuse.

Explain that dynamic `import()` creates the source boundary while the bundler decides how to emit and reference the chunk.

Next: [Checkpoint 16](16-minification.md)
