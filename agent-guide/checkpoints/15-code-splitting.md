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

Explain that dynamic `import()` creates a potential source boundary while the bundler decides how to emit and reference the chunk. It commonly becomes a separate lazy chunk, but it is not the only reason a build can contain several chunks.

After proving the lazy chunk in this project, broaden the model with these small hypothetical examples. Do not add them to the application.

### Multiple entry points

A site can have more than one independently loaded page or application entry:

```text
admin.html -> admin.js -> admin-[hash].js
shop.html  -> shop.js  -> shop-[hash].js
```

Neither entry has to be lazy. They can produce separate entry chunks because a visitor may open one page without ever opening the other.

### A shared dependency

If both entries use the same substantial dependency, the bundler may extract it into a shared chunk instead of placing duplicate copies in both entry chunks:

```text
SOURCE GRAPH                    POSSIBLE OUTPUT
admin.js ─┐                     admin-[hash].js
          ├─> charting.js  ->   shared-[hash].js
shop.js ──┘                     shop-[hash].js
```

The browser can download the shared code once and reuse its cached copy when another entry needs it. Whether extraction is worthwhile depends on the build tool and its optimization rules.

### Explicit build configuration

A project can also configure chunk groups deliberately. For example, it might ask the bundler to keep a large framework or editor library in a separately cacheable `vendor-[hash].js` chunk. This is a delivery and caching decision, not evidence that the dependency was lazy in the source.

Conclude with this rule:

```text
dynamic import -> common opportunity for a lazy chunk
multiple entries -> separate entry chunks
shared dependency -> possible shared chunk
build configuration -> deliberate chunk boundaries
```

Do not promise an exact output layout from source syntax alone. The dependency graph provides the possibilities; the bundler and its configuration make the final chunking decision.

Next: [Checkpoint 16](16-minification.md)
