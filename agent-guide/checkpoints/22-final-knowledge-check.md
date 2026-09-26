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
9. Use qualitative words for the final evaluation. Do not provide points, a numeric score, or a percentage.
10. Privately track what the learner explained independently and every topic whose initial answer was incomplete, incorrect, or absent. Record the specific missing distinction, not only the question number. Use those notes for the final evaluation; do not interrupt the conversation with scoring after every answer.

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

> In this project, how do the browser and build tool get from `index.html` to the complete JavaScript dependency graph? Compare static imports with dynamic `import()`: when is each dependency needed, what happens to a dynamic import without a bundler, and does it always guarantee a separate generated chunk when a bundler is used?

A complete answer should cover:

- HTML points to the JavaScript entry module
- static `import` statements declare dependencies that are needed as the module loads
- following imports recursively produces the dependency graph
- `import()` also creates a graph edge, but loading can be deferred until the execution path reaches it
- without a bundler, the browser can request the dynamically imported source module directly when execution reaches `import()`
- a build tool can use a dynamic-import boundary to create a separate lazy chunk, but the exact chunk layout remains a build decision and can depend on configuration
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

> What is tree shaking, and why is it generally more reliable with ES Modules than CommonJS? What does "static" mean in this context, can tree shaking apply to packages from `node_modules`, and how can top-level side effects limit what gets removed?

A complete answer should cover:

- tree shaking omits exports or code that the build can prove are unreachable
- static ESM syntax makes the module path and requested bindings visible for analysis without executing the program
- dynamic CommonJS `require()` and mutable exports can make reliable analysis harder
- third-party ESM dependencies are part of the same graph and can be tree-shaken when their structure and side-effect declarations permit it
- installing a whole package does not mean the whole package must appear in production output
- a side effect is observable work performed when a module is evaluated, such as registration, global mutation, an event listener, analytics initialization, or global CSS loading
- side-effectful top-level work must be preserved unless the bundler can prove it is safe to remove
- package metadata such as `"sideEffects": false` or a list of side-effectful files helps compatible tools decide whether an otherwise unused module must still be evaluated
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

> Explain the roles of a package manager, Vite, a lower-level tool such as Rollup or esbuild, and the browser. What does the package manager resolve beyond the dependencies we list directly, how does Vite relate to lower-level processing, and what complete output must ultimately be produced for the application to run?

A complete answer should cover:

- a package manager records direct dependencies, resolves and installs their transitive dependency graph, records the exact resolution in a lockfile, and runs project scripts; it is not itself the bundler
- compatible package requirements may be deduplicated, while incompatible version ranges can result in multiple installed versions; transitive dependencies are not the same concept as circular dependencies
- Vite is a higher-level frontend build tool that coordinates a development server and a complete production workflow across HTML, JavaScript, CSS, and assets
- Vite provides the developer-facing workflow while coordinating specialized lower-level processors and plugins; it does not need to personally implement every operation
- lower-level tools can perform overlapping jobs such as transformation, graph linking, bundling, code splitting, tree shaking, or minification depending on the tool and configuration
- syntax transformation by these tools does not automatically polyfill missing browser APIs
- raw Rollup or esbuild usage may need extra configuration or plugins to produce and connect HTML, CSS, assets, and JavaScript as a complete site
- the browser does not run npm, Vite, Rollup, or esbuild
- the final contract is standard browser-consumable HTML, CSS, JavaScript chunks, and referenced assets served over HTTP

## Course Completion

After the learner answers Question 9 and receives feedback, show this as a top-level Markdown heading exactly once:

# Congratulations! You completed From Script Tags to Bundlers.

Follow it with a short closing paragraph: the learner began with one HTML file and one JavaScript file, then uncovered why modules and build tools exist and how source becomes browser-facing output. Do not introduce another required checkpoint.

Then give a short evidence-based evaluation using words rather than percentages. Use one of these overall levels:

- **Strong understanding:** the learner independently explained most core mechanisms and their relationships; remaining gaps were refinements rather than foundational misconceptions.
- **Solid understanding:** the main pipeline is clear, but several important distinctions needed prompting or correction.
- **Developing understanding:** multiple foundational relationships remain unclear and should be revisited with another concrete experiment.

Use this compact structure:

```md
**Overall understanding: [Strong / Solid / Developing]**

**Explained confidently:** [two or three specific concepts]

**Worth revisiting:**
- [topic from an incomplete, incorrect, or absent answer]: [the specific idea that was missing]
- [repeat for every topic that needs review, or write "No major gaps observed"]

**Corrected during the discussion:** [important misconception now clarified, or omit this line]
```

Base the evaluation on what the learner initially explained and any answers to follow-up questions, not on information the agent supplied itself. Under **Worth revisiting**, include every question topic whose initial answer was incomplete, incorrect, or absent, but consolidate repeated gaps into one clear item. Briefly say what needs review instead of writing only a question number or broad label. Keep the tone encouraging but accurate. Do not call an answer weak merely because it used different terminology, and do not repeat the full feedback already given after every question.

Finally, offer these optional next directions without pressuring the learner to choose immediately:

- TypeScript and transpilation
- CSS imports and asset handling
- source maps and debugging production output
- a deeper tree-shaking experiment
- CommonJS versus ESM in Node.js
