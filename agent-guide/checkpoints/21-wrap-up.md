# Checkpoint 21: Wrap Up

Purpose: reconnect every experiment into one understandable frontend build story.

Before presenting the summary, ask the learner:

> If someone says "Vite builds the app," which separate jobs can you now name inside that sentence?

Let them recall as many as they can, then fill in the complete picture.

## Where We Started

We began with files the browser could consume directly:

```text
index.html
  ├─ styles.css
  └─ app.js
```

HTML named the script, the browser downloaded it, and the application ran. There was no package manager, dependency installation, transformation, bundling, or generated output directory.

That setup was valid. The problem appeared only as the code grew:

- putting everything in one JavaScript file mixed unrelated responsibilities
- splitting code into classic scripts introduced shared globals
- HTML had to list scripts in the correct order
- dependencies existed, but were not declared where they were used

## What ES Modules Changed

ES Modules moved dependency declarations into JavaScript:

```js
import { formatCount } from "./formatters.js";
```

Now `app.js` explicitly states what it needs. The browser or a build tool can start from an entry and follow those imports to construct a dependency graph.

```text
index.html
  └─ app.js
      ├─ formatters.js
      ├─ state.js
      └╌ tips.js       dynamic import
```

The browser could run this graph without a bundler when served over HTTP. This is important: build tools are not required merely because ES Modules exist.

The dynamic import added another idea: not all reachable code must load initially. Optional code can be requested when the user needs it.

## Why We Added Tooling

As applications grow, source code is organized for developers while production output should be organized for runtime delivery. A build tool automates the conversion between those two representations.

We introduced a package manager to record and install development tools, then added Vite to provide:

- an HTTP development server
- module resolution and development-time transformation
- fast feedback while files change
- an optimized production build
- complete browser-facing output under `dist/`

## What Happened During the Build

Use this consolidated model:

```text
developer source
  index.html + CSS + JavaScript modules + packages
                         ↓
                  dependency graph
                         ↓
                    transpilation
                         ↓
                       bundling
                         ↓
                    tree shaking
                         ↓
                    code splitting
                         ↓
                    minification
                         ↓
browser-facing output
  HTML + CSS + JavaScript chunks + referenced assets
```

Remind the learner that this is a conceptual sequence. Real tools may combine, reorder, or repeat parts of the analysis.

Define each responsibility concisely:

- **Dependency graph:** the map of which modules depend on which other modules, starting from one or more entries. Static and dynamic imports both contribute to it.
- **Transpilation:** source-to-source conversion. It can turn newer JavaScript into older-compatible syntax, TypeScript into JavaScript, or JSX into JavaScript calls. It does not automatically polyfill missing runtime APIs.
- **Bundling:** following and linking modules into deployable output units. Several source modules can become one output chunk.
- **Tree shaking:** leaving statically unreachable exports out of production output. It is most reliable with analyzable ES Module imports and exports, including ESM dependencies from `node_modules`.
- **Code splitting:** dividing reachable code into multiple chunks. A dynamic import commonly creates a boundary for code that can load later.
- **Minification:** removing readability-oriented characters and shortening safe local names or expressions to reduce bytes without intentionally changing behavior.
- **Output chunks:** generated delivery files. Their boundaries do not have to match source-file boundaries.
- **Content hashing:** including a content-derived value in a filename so changed files receive new URLs while unchanged files can remain cached.

## What the Browser Finally Receives

For this project, the production result conceptually looked like:

```text
dist/index.html
  ├─ assets/index-[hash].css
  └─ assets/index-[hash].js
       └╌ imports tips-[hash].js after the user clicks Show tip
```

The browser does not run Vite, Rollup, esbuild, or the package manager. Those tools run before deployment. The browser receives standard HTML, CSS, JavaScript, and assets with references already rewritten to the generated filenames.

The goal is not necessarily "one JavaScript file." The goal is an intentional set of runtime files:

- initial code grouped for efficient startup
- optional code available in lazy chunks
- unused code omitted where analysis allows
- syntax matched to the selected browser target
- output compressed and named for effective caching

## Many Tools, Similar Responsibilities

Explain that the ecosystem contains overlapping layers rather than one mandatory tool:

- **Vite**, **Parcel**, and **Rsbuild** are higher-level build tools. They coordinate a development server, transformations, bundling, assets, and production defaults.
- **webpack** and **Rspack** are configurable bundlers with large plugin ecosystems and development tooling. They can form the core of a complete build setup.
- **Rollup** and **Rolldown** focus on module graphs, linking, tree shaking, chunks, and plugin-driven builds.
- **esbuild** can transpile, bundle, split, and minify depending on its options, but a raw JavaScript build does not automatically create the surrounding HTML/CSS application workflow.
- **Babel**, **SWC**, **Oxc**, and the TypeScript compiler are examples of tools that can perform syntax transformation or compilation responsibilities within a larger pipeline.
- Frameworks such as Next.js, Nuxt, and Astro provide their own integrated toolchains, so developers may use these same ideas without configuring each lower-level tool directly.

One product may perform several jobs, and several products may be combined to perform one build. Plugins often fill missing responsibilities such as HTML generation, CSS extraction, asset copying, transpilation, or minification.

Despite different APIs and architectures, a browser application build usually has the same broad contract:

```text
INPUT
developer-friendly source and installed dependencies

PROCESS
understand the graph, transform what is necessary, remove unreachable code,
choose delivery boundaries, and optimize output

OUTPUT
standard runtime files that browsers and servers can deliver
```

## The Complete Journey

```text
HTML + CSS + one JS file
  -> classic scripts
  -> hidden globals and script order
  -> ES Modules and explicit imports
  -> dependency graph
  -> dynamic import
  -> bundler motivation
  -> package management
  -> Vite development server
  -> production build
  -> visible dependency graph
  -> transpilation experiment
  -> bundling experiment
  -> code-splitting experiment
  -> minification comparison
  -> tree-shaking proof
  -> output chunks
```

Finish by asking the learner to explain, in their own words:

1. Why native ES Modules are useful even without a bundler.
2. Why production projects still use build tools when browsers understand ESM.
3. Why a source module, installed package, bundle, and output chunk are not the same thing.

Ask which path the learner wants next:

- TypeScript and transpilation
- CSS imports and asset handling
- minification and source maps
- a deeper tree-shaking experiment
- CommonJS versus ESM in Node.js
