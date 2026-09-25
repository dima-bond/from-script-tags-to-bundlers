# Checkpoint 8: Introduce Package Management

Purpose: show how a plain browser project becomes package-managed before adding Vite.

Do not install Vite yet.

Explain:

- Until now, the browser ran only files we wrote, so no third-party packages were needed.
- npm, pnpm, and Yarn download packages, record project dependencies, and run named commands.
- `package.json` is the manifest containing metadata, scripts, and direct dependencies; it does not contain downloaded package code.
- `node_modules/` contains installed packages and should not be committed.
- A lockfile records the exact resolved dependency graph and should normally be committed.

Ask which package manager the learner prefers. Recommend npm when they have no preference because Node.js includes it and it adds the fewest concepts. Use their choice consistently.

Check Node.js and the package manager, then initialize the manifest. For npm:

```sh
npm init -y
```

Review the generated file, remove irrelevant fields if useful, and set `private` to `true`. Explain that creating `package.json` installed no bundler and changed nothing about browser execution.

Confirm `node_modules/` is in `.gitignore` before installing packages.

Next: [Checkpoint 9](09-add-vite.md)
