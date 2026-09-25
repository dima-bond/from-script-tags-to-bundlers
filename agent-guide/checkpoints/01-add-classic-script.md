# Checkpoint 1: Add a Second Classic Script

Purpose: show how projects grew before modules.

Before editing, explain briefly:

- Keeping everything in one JS file is fine at first.
- As behavior grows, one file becomes harder to scan, reuse, and change safely.
- This step extracts a tiny helper using the old pre-module browser pattern.

Edit:

1. Create `formatters.js` and move the formatting helper into it.
2. Attach it to `window.lessonFormatters`. Do not leave the helper as a top-level declaration because classic scripts share global scope.

   ```js
   window.lessonFormatters = {
     formatCount(value) {
       return `Count: ${value}`;
     },
   };
   ```

3. Read that global from `app.js`.
4. Load both scripts in this exact HTML order:

   ```html
   <script src="./formatters.js"></script>
   <script src="./app.js"></script>
   ```

Explain that this works only because `formatters.js` loads first, and that `app.js` has a hidden dependency not expressed by an import.

Ask what will happen if the script order is reversed. If the learner wants, reverse it, observe the error, and restore it.

Next: [Checkpoint 2](02-explain-the-pain.md)
