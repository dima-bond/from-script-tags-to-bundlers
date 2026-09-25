# Checkpoint 10: Build and Inspect Output

Question stop: before building, ask and wait for the learner's prediction:

> We have several source files. Do you expect `dist` to contain the same files with the same names, one large file, or something in between?

Record the prediction and compare it with the generated output after the build.

Before building, confirm that `/dist/` is listed in `.gitignore`. It is already present in the starter project, so point it out rather than adding a duplicate. Explain that `dist/` is reproducible generated output: contributors edit the source files and run the build again, while a deployment service can build or consume `dist/` without requiring those generated files to be committed. A project with a deployment process that explicitly requires committed build artifacts may choose differently, but that is not this lesson's workflow.

Run `npm run build` or the chosen package manager's equivalent, then inspect `dist/`.

Explain:

- `dist/index.html` is generated output.
- JavaScript filenames may contain hashes.
- The dynamic import may become a separate chunk.
- Output chunks are deployed, not edited.

Record the actual filenames and approximate sizes; the next checkpoints will use them as evidence.

Next: [Checkpoint 11](11-open-vite-black-box.md)
