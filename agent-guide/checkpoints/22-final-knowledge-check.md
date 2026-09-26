# Checkpoint 22: Final Knowledge Check

Purpose: let the learner retrieve and connect the important ideas instead of only rereading a summary.

This is a guided conversation, not a multiple-choice quiz. Tell the learner there are nine questions and that the goal is understanding, not perfect terminology.

## How to Run the Check

Follow this sequence strictly:

1. Ask only one question at a time. Do not show later questions or the expected answer in advance.
2. Wait for the learner's answer before evaluating it.
3. Judge the idea, not the exact wording.
4. If the answer is correct, confirm it and add only an important nuance that was omitted.
5. If it is incomplete, name what was correct, then supply the missing part clearly.
6. If it is incorrect, correct the misconception directly and explain the right model with a small example or diagram when useful.
7. Keep feedback focused, but broad enough that the learner can understand the complete answer.
8. Ask one short follow-up only when a central misconception remains. Otherwise continue to the next numbered question.
9. Do not provide a score or percentage unless the learner asks for one.

After feedback, explicitly ask whether the learner is ready for the next question. Wait before continuing.

## Question 1: From Classic Scripts to ES Modules

Ask:

> When JavaScript grew from one classic script into several files, what problems appeared, and what did ES Modules change?

A complete answer should cover:

- classic scripts share global scope and can collide through global names
- HTML must list scripts in a correct dependency order
- `import` and `export` make dependencies and public values explicit in JavaScript
- each ES Module has its own module scope

Do not imply that ESM itself performs bundling.

## Question 2: Native ESM and the HTTP Server

Ask:

> Why did our ES Module version need an HTTP server, and did starting that server mean we had introduced a bundler?

A complete answer should cover:

- module imports cause the browser to request additional files
- opening through `file://` gives an unsuitable or `null` origin and browsers commonly block module requests under origin/CORS rules
- an HTTP server gives the files a normal shared origin
- the server only serves files in this experiment; the browser still follows native ESM imports
- no dependency linking, optimization, or production output generation occurred merely because the server was running

## Question 3: Entry Point and Dependency Graph

Ask:

> Starting from `index.html`, how can a browser or build tool discover the JavaScript dependency graph, and how does a dynamic import differ from a static import in that graph?

A complete answer should cover:

- HTML points to the JavaScript entry module
- static `import` statements declare dependencies that are needed as the module loads
- following imports recursively produces the dependency graph
- `import()` also creates a graph edge, but loading can be deferred until the execution path reaches it
- the graph enables later build decisions; it is not itself a bundle

## Question 4: Transpilation and Polyfills

Ask:

> What is transpilation? Give two examples, and explain why it is not the same as adding a polyfill.

A complete answer should cover:

- transpilation changes source representation while preserving intended behavior
- examples include TypeScript to JavaScript, JSX to JavaScript calls, or newer JavaScript syntax to an older target
- a polyfill provides a missing runtime API or behavior, such as a browser implementation of an unsupported method
- changing syntax cannot by itself create a missing browser API

## Question 5: Bundling, Modules, and Chunks

Ask:

> What does bundling do, and why do source modules not map one-to-one to output chunks?

A complete answer should cover:

- the bundler follows and links the dependency graph into deployable output units
- several source modules can be combined into one chunk
- one application can still produce several chunks; bundling does not necessarily mean one giant file
- chunk boundaries are delivery decisions influenced by entries, shared dependencies, dynamic imports, and tool configuration
- modules organize source for developers, while chunks organize generated code for delivery

## Question 6: Lazy Loading and Code Splitting

Ask:

> What made `tips.js` lazy in our project, what optimization can that provide, and what tradeoff does it introduce?

A complete answer should cover:

- `tips.js` was reached through `import()` on the click execution path rather than a top-level static import
- the bundler could preserve that boundary as a separate output chunk
- the initial page avoids downloading, parsing, and evaluating optional code
- the later interaction may require an extra network request and can have a small delay
- merely putting code inside a normal function does not make its module lazy

## Question 7: Tree Shaking

Ask:

> What is tree shaking, why is it generally more reliable with ES Modules than CommonJS, and can it apply to a package from `node_modules`?

A complete answer should cover:

- tree shaking omits exports or code that the build can prove are unreachable
- static ESM imports and exports are easier to analyze before execution
- dynamic CommonJS `require()` and mutable exports can make reliable analysis harder
- third-party ESM dependencies are part of the same graph and can be tree-shaken when their structure and side-effect declarations permit it
- installing a whole package does not mean the whole package must appear in production output
- some internal helpers and side-effectful code may still be required; tree shaking is not a promise that every unused-looking line disappears

Use `lodash-es` named imports as the concrete package example if clarification is needed.

## Question 8: Minification and Generated Output

Ask:

> What visible changes did minification make, why do production filenames contain hashes, and why should we not edit files inside `dist/`?

A complete answer should cover:

- minification removes unnecessary whitespace and comments and may shorten safe local names or simplify expressions
- its primary goal is fewer transferred bytes, not modularity or backward compatibility
- content hashes give changed output a new URL and support effective caching
- `dist/` is reproducible generated output whose names and contents can change on the next build
- source files and build configuration are the durable inputs that should be edited

## Question 9: Tools and the Browser Contract

Ask:

> Explain the roles of a package manager, Vite, a lower-level tool such as Rollup or esbuild, and the browser. What ultimately has to be produced for the application to run?

A complete answer should cover:

- a package manager records, installs, and resolves project dependencies and scripts; it is not itself the bundler
- Vite is a higher-level frontend build tool that coordinates a development server and production build workflow
- lower-level tools can perform overlapping jobs such as transformation, graph linking, bundling, code splitting, tree shaking, or minification depending on the tool and configuration
- raw Rollup or esbuild usage may need extra configuration or plugins to produce and connect HTML, CSS, assets, and JavaScript as a complete site
- the browser does not run npm, Vite, Rollup, or esbuild
- the final contract is standard browser-consumable HTML, CSS, JavaScript chunks, and referenced assets served over HTTP

## Course Completion

After the learner answers Question 9 and receives feedback, briefly summarize two or three things they explained especially well. Then show this as a top-level Markdown heading exactly once:

# Congratulations! You completed From Script Tags to Bundlers.

Follow it with a short closing paragraph: the learner began with one HTML file and one JavaScript file, then uncovered why modules and build tools exist and how source becomes browser-facing output. Do not introduce another required checkpoint.

Finally, offer these optional next directions without pressuring the learner to choose immediately:

- TypeScript and transpilation
- CSS imports and asset handling
- source maps and debugging production output
- a deeper tree-shaking experiment
- CommonJS versus ESM in Node.js
