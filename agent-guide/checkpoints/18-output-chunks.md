# Checkpoint 18: Explain the Final Output Chunks

Purpose: assemble the observations into one concrete build map.

Use real generated filenames and sizes:

```text
index.html
  ├─ assets/index-[hash].css
  └─ assets/index-[hash].js
       └╌ import("./tips-[hash].js") on demand
```

Show this evidence table:

| Responsibility | Evidence the learner observed |
| --- | --- |
| Dependency graph | Vite followed static and dynamic imports from the entry |
| Transpilation | Modern syntax changed for the configured target |
| Bundling | Several static modules appeared in one entry chunk |
| Code splitting | `tips.js` became a separately requested lazy chunk |
| Minification | Normal output was smaller and harder to read |
| Tree shaking | The unused marker stayed in source but vanished from output |
| Output chunks | HTML referenced hashed JS and CSS ready to deploy |

Explain that content hashes support cache invalidation: changed content gets a new filename while unchanged assets can remain cached.

Next: [Optional Checkpoint 19](19-esbuild-comparison.md), [Optional Checkpoint 20](20-rollup-comparison.md), or [Wrap Up](21-wrap-up.md)
