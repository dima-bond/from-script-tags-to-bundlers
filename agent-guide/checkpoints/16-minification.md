# Checkpoint 16: Make Minification Visible

Purpose: compare readable generated code with optimized generated code.

Build both `dist-readable/` and normal `dist/`. Compare equivalent JavaScript files side by side and report byte sizes.

Do not ask the learner a vague question about finding optimizations. Open the actual entry chunks and guide them through the visible differences:

- `dist-readable/` keeps formatting and recognizable local names, making the generated code easier for a person to inspect.
- The normal `dist/` chunk is usually compressed into one very long line, or very few lines, because spaces and line breaks needed only for readability were removed.
- Local variables and function bindings may be renamed to short identifiers such as `a`, `n`, or `t`. Fewer identifier characters mean fewer bytes to download. Property names and externally visible names are not necessarily safe to rename, so not every word becomes shorter.
- Comments and other nonessential formatting disappear, and some expressions may be rewritten into shorter equivalent forms.

Show one short, concrete snippet from each generated file and point to the actual renamed binding or removed formatting. Do not paste the entire minified chunk.

Explain that minification compresses representation without intentionally changing behavior. It differs from transpilation: minification aims for smaller output, while transpilation aims for syntax compatible with a configured target. Report the size difference and note that changed generated content also produces a different filename hash.

Next: [Checkpoint 17](17-tree-shaking.md)
