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
