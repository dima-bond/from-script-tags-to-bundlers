# Checkpoint 13: Make Transpilation Visible

Purpose: separate syntax transformation from bundling and minification.

Question stop: before showing generated code, ask and wait for the learner's answer:

> If our target browser does not understand optional chaining, should the tool remove the feature, replace its syntax, or add support to the browser?

Use the answer to distinguish syntax transformation from runtime polyfills, but let the generated output provide the final evidence.

Before the experiment, establish the broader definition:

> Transpilation transforms source code into other source code while preserving its intended behavior. Backward compatibility is a common use, but it is not the only use.

Show two important examples:

```ts
// TypeScript source
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

```js
// JavaScript output: type annotations are removed
function greet(name) {
  return `Hello, ${name}`;
}
```

The browser runs JavaScript, not TypeScript type syntax, so a tool converts the TypeScript source before execution.

```jsx
// JSX source
const heading = <h1>Hello</h1>;
```

```js
// Conceptual JavaScript output
const heading = jsx("h1", { children: "Hello" });
```

JSX is convenient source syntax for describing UI, but browsers do not parse it as ordinary JavaScript. A tool converts it into JavaScript function calls. The exact generated function depends on the framework and JSX configuration.

Connect these examples to the current experiment:

- TypeScript to JavaScript removes or transforms syntax the browser does not understand.
- JSX to JavaScript converts UI syntax into executable JavaScript.
- Newer JavaScript to older JavaScript is the backward-compatibility case demonstrated in this checkpoint.
- Transpilation handles syntax; it does not automatically provide missing runtime APIs. An older browser without `Promise`, `fetch`, or `Array.prototype.flat` may still need a polyfill.

Add one useful example of modern syntax, such as optional chaining with nullish coalescing. Configure an explicit older target so the change is observable rather than dependent on Vite's changing default:

```js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2015",
  },
});
```

Add `build:readable` alongside existing scripts:

```json
{
  "scripts": {
    "build:readable": "vite build --minify=false --outDir dist-readable"
  }
}
```

Before running it, explain why this extra command exists:

- The normal `npm run build` creates optimized, minified production code. Minification makes the output compact and difficult to compare with the source, so it would hide the transpilation lesson.
- `build:readable` is a custom script created only for inspection. npm looks up the project-local Vite executable and runs the command written in `package.json`.
- `vite build` performs the production build using the `es2015` target from `vite.config.js`.
- `--minify=false` keeps generated names, spacing, and expressions readable enough to inspect.
- `--outDir dist-readable` writes this teaching build to a separate folder so it does not replace the normal optimized `dist/` output.

Then run:

```sh
npm run build:readable
```

Do not report only that the command succeeded. Open the generated JavaScript, find the code corresponding to the optional-chaining/nullish-coalescing expression, and show a short source-versus-output comparison. Point out the checks Vite generated to preserve the same behavior without requiring the older target browser to understand that newer syntax.

Explain that transpilation preserves behavior while changing syntax for a target, does not inherently combine modules, and does not automatically polyfill missing browser APIs. The readable build is still generated production output.

Add `dist-readable/` to `.gitignore` because it is reproducible generated output, just like `dist/`; it is kept separate only so the learner can inspect it during this checkpoint.

Next: [Checkpoint 14](14-bundling.md)
