# Checkpoint 3: Convert to ES Modules

Purpose: replace a hidden global dependency with an explicit dependency.

Question stop: before editing, ask and wait for the learner's answer:

> If `app.js` imports `formatters.js`, which file should HTML load: both files, or only `app.js`? Who should discover the second file?

Use their prediction to introduce the idea that HTML can name one module entry while the browser discovers its dependencies from JavaScript imports.

Edit:

1. Export the helper from `formatters.js`:

   ```js
   export function formatCount(value) {
     return `Count: ${value}`;
   }
   ```

2. Import it in `app.js`:

   ```js
   import { formatCount } from "./formatters.js";
   ```

3. Replace both classic script tags with:

   ```html
   <script type="module" src="./app.js"></script>
   ```

Explain that `type="module"` changes the browser's loading behavior. The browser treats `app.js` as a module entry, parses its imports, and requests each imported module itself. HTML only names the entry file; JavaScript now describes the rest of the dependency graph.

Before checking the result, explain the serving requirement:

- A classic script opened from disk can often be read directly as one local file. An ES Module is different: after loading `app.js`, the browser sees `import "./formatters.js"` and performs another module request for that URL.
- Browsers apply web security and CORS checks to module requests. An origin normally consists of a protocol, host, and port, such as `http://127.0.0.1:8000`.
- A page opened directly uses a `file://` URL. It does not have a normal web origin; browsers commonly represent it as origin `null` and refuse its module requests. This is why the console may say that a script from `file:///...` was blocked by CORS.
- A local HTTP server delivers both files from the same origin, so the browser can safely resolve and request the module graph:

  ```text
  http://127.0.0.1:8000/index.html
      -> http://127.0.0.1:8000/app.js
          -> http://127.0.0.1:8000/formatters.js
  ```

- The server only delivers the original files over HTTP. It does not combine, transform, transpile, or bundle them, so there is still no build step.

Start a dependency-free server from the project directory:

```sh
python3 -m http.server 8000
```

If port 8000 is occupied, choose another. Confirm the server responds, give the learner the matching URL such as `http://127.0.0.1:8000/`, and keep it running.

Ask the learner to predict what happens if `type="module"` is temporarily removed. Restore it after the experiment.

Next: [Checkpoint 4](04-add-state-module.md)
