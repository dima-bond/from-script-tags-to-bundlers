# Checkpoint 4: Add One More Module

Purpose: show the dependency graph growing.

Before editing, explain:

- Imagine the app now needs more logic for changing and reading state.
- Keeping state, formatting, and UI behavior in `app.js` gives one file unrelated jobs.
- A state module keeps responsibilities findable and lets one entry depend on multiple modules.

Create `state.js`, move the counter state there, and export functions such as:

```js
export function increment() {}
export function getCount() {}
```

Import and use them from `app.js`. Then show:

```text
index.html
  -> app.js
       -> formatters.js
       -> state.js
```

Explain that this is the beginning of a dependency graph.

Next: [Checkpoint 5](05-commonjs-excursion.md)
