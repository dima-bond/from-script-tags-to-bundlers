# Checkpoint 17: Prove Tree Shaking

Purpose: demonstrate dead-export removal with a searchable marker.

Question stop: before adding the marker, ask and wait for the learner's answer:

> If a function is exported but never imported or called, should it still appear in production output? How could we prove the answer?

Use the learner's proposed test if it is reliable; otherwise introduce the searchable marker as the experiment.

Add an exported function to an already imported module, but never import or call that function. Include `TREE_SHAKING_REMOVED_ME` in its body.

Run the readable production build and search generated JavaScript for the exact marker. It should remain in source but be absent from output.

Explain:

- Tree shaking starts from reachable entries and removes unused exports when module structure is statically analyzable.
- Explicit ES Module relationships make this analysis possible.
- Top-level side effects may need preservation, so tree shaking is not simply "delete every uncalled function."
- Although this experiment follows minification in the lesson, tree shaking normally informs bundling before final minified chunks are emitted.

## Why ES Modules Made Tree Shaking Reliable

Explain the contrast:

```js
// ES Module: imports and exports are explicit and statically visible
import { add } from "./math.js";
```

A bundler can inspect that statement without running the program. It can see which file is required and which named export is reachable.

Traditional CommonJS allows more runtime-dependent patterns:

```js
const operation = getOperationName();
const math = require("./math");
math[operation](2, 3);
```

Here the used property may not be known until execution. Modern tools can optimize some simple CommonJS patterns, but support is tool-specific and must be conservative when the code is dynamic. Static ESM syntax made reliable cross-file tree shaking a normal production-build capability.

Clarify what **static** means here. It does not mean that the imported value can never change. It means the dependency and requested binding are visible in the source syntax without executing the program:

```js
import { formatDate } from "./tools.js";
```

The bundler can identify `./tools.js` and its `formatDate` export while building the graph. Compare that with a runtime-dependent access pattern:

```js
import * as tools from "./tools.js";

tools[getToolName()]();
```

This is still ESM, but the selected export is not known until runtime, so the bundler may need to keep every export that could match. ESM provides an analyzable structure; code still has to use that structure in a sufficiently explicit way.

## Why Side Effects Limit Removal

Define a **side effect** as observable work performed when a module is evaluated, rather than when one of its exported functions is later called. Contrast these modules:

```js
// math.js: declarations only; unused exports are easy to remove
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

```js
// register-elements.js: loading the module changes the application
customElements.define("fancy-button", FancyButton);

export function getRegisteredName() {
  return "fancy-button";
}
```

An application may intentionally load the second module only for its top-level work:

```js
import "./register-elements.js";
```

There is no imported value, but removing the module would stop the custom element registration. Other common top-level side effects include changing `window`, adding an event listener, starting analytics, or importing global CSS. A bundler may still remove unrelated unused exports, but it must preserve observable work unless it can prove that doing so is safe.

Explain that packages can provide side-effect metadata as a promise to compatible build tools:

```json
{
  "sideEffects": false
}
```

This says that unused modules in the package do not need to run merely for top-level effects and can be omitted when none of their exports are reachable. A package with a few intentional side-effect files can identify them instead:

```json
{
  "sideEffects": [
    "./register-elements.js",
    "./styles.css"
  ]
}
```

This metadata must be accurate. Incorrectly declaring a registration or CSS module side-effect-free can let a build remove behavior the application relies on. It assists tree shaking, but it does not replace the bundler's dependency and reachability analysis.

## The Same Analysis Applies to Third-Party Packages

Make clear that the dependency graph does not stop at our own files. When application code imports a package, the bundler follows that package into `node_modules` and analyzes reachable code when its format and side-effect information allow it.

Use this model:

```text
node_modules/lodash-es/
  ├─ debounce.js ──┐
  ├─ uniq.js       ├─ installed package contains many modules
  ├─ cloneDeep.js  │
  └─ ...           │
                   ↓ production build follows used imports
dist/assets/index-[hash].js
  └─ debounce + the internal helpers debounce actually needs
```

Installing a package places its complete published contents in `node_modules`; it does not automatically place the whole package in the browser bundle. Tree shaking affects generated production output, not installation size.

Show an ESM-friendly Lodash example:

```js
import { debounce } from "lodash-es";
```

Because `lodash-es` exposes ES Modules, the bundler can normally retain `debounce` and its reachable internal helpers while leaving unrelated exports such as `cloneDeep` out of the production bundle. "Only debounce" does not necessarily mean one function body because it may rely on shared helpers.

Contrast it with importing the traditional CommonJS-style package as one object:

```js
import _ from "lodash";

_.debounce(save, 300);
```

That shape can cause substantially more code to be retained because the bundler may not be able to prove which properties of the CommonJS export object are unused. A direct method import such as `lodash/debounce` can provide a smaller, explicit entry when an ESM build is unavailable.

Finish with the conditions for reliable library tree shaking:

- the package exposes statically analyzable ES Modules
- the app uses static, specific imports
- the package accurately identifies modules with side effects
- the production bundler enables tree shaking

Do not promise that a named import always produces the smallest possible bundle. Package format, internal dependencies, side effects, and bundler behavior all matter; inspecting the production output remains the proof.

Next: [Checkpoint 18](18-output-chunks.md)
