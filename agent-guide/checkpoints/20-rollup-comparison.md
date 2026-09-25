# Optional Checkpoint 20: Compare Rollup Historically

Explain that Rollup was Vite's production bundler through Vite 7 and remains a widely used standalone bundler, while Vite 8 moved to Rolldown. Rolldown follows the same broad module-bundling model and retains compatibility with much of the Rollup plugin ecosystem.

If the learner agrees, install Rollup as an exact development dependency. For npm:

```sh
npx --no-install rollup app.js --format es --dir dist-rollup
```

Inspect how it links static modules, preserves the dynamic-import boundary, and removes the unused export. Ignore `dist-rollup/` in Git.

Explain the boundary of this direct command: `app.js` is the Rollup entry, so Rollup follows and emits the JavaScript dependency graph. It does not automatically copy or generate `index.html`, and the existing `styles.css` is linked from HTML rather than imported by JavaScript, so it is not part of this graph. The output is therefore a JavaScript bundling experiment, not a complete runnable site build.

To produce a full site with Rollup directly, we would need to add the surrounding build responsibilities: copy or generate HTML, update its script references, bring CSS into the build, process or extract that CSS, copy other assets, and optionally transpile and minify JavaScript. Rollup's plugin system can provide those capabilities.

Show this only as conceptual architecture, not runnable configuration; the plugin names are placeholders for real plugins that would need to be selected, installed, imported, and configured:

```js
export default {
  input: "app.js",
  output: {
    dir: "dist-rollup",
    format: "es",
  },
  plugins: [
    htmlPlugin(),
    cssPlugin(),
    transpilationPlugin(),
    minificationPlugin(),
  ],
};
```

Use the comparison:

```text
Rollup core
  -> follows modules, links code, tree-shakes, emits chunks

Rollup + selected plugins
  -> can also handle HTML, CSS, assets, transpilation, and minification

Vite
  -> provides an integrated dev-and-build workflow with those common responsibilities already coordinated
```

Never imply that a Vite 8 build invoked this separately installed Rollup package.

Next: [Wrap Up](21-wrap-up.md)
