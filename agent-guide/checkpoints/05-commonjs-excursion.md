# Checkpoint 5: Brief CommonJS Excursion

Do not convert the project to CommonJS.

Explain that CommonJS was designed primarily for environments such as Node.js:

```js
// formatters.js
function formatCount(value) {
  return `Count: ${value}`;
}

module.exports = { formatCount };
```

```js
// app.js
const { formatCount } = require("./formatters");
console.log(formatCount(5));
```

Key points:

- Node.js understood `require`, `module`, and `module.exports`; browsers did not provide them and would report `ReferenceError: require is not defined`.
- Browserify and webpack could start at `app.js`, follow every `require(...)`, and package the dependency graph as browser-compatible JavaScript.
- They added a small module-loading runtime. They did not teach the browser CommonJS; they translated and packaged it ahead of time.
- Developers could use modules while HTML loaded one generated `<script src="./bundle.js"></script>`.
- ES Modules later became the browser-standard module system.

Use this simplified flow:

```text
app.js
  -> require("./formatters")
       -> formatters.js

Browserify or webpack
  -> follows the dependency
  -> produces bundle.js for the browser
```

Do not introduce Node module-resolution details yet.

Next: [Checkpoint 6](06-add-dynamic-import.md)
