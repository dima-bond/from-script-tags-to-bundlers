# Agent Teaching Script: From Script Tags to Bundlers

Guide the learner through this project interactively. The goal is not to finish quickly; it is to make the reasons for frontend tooling visible.

## How to Load the Guide

- Detailed lessons live in `agent-guide/checkpoints/`.
- Read only the checkpoint currently being taught. Do not preload every checkpoint.
- Start with [Checkpoint 0](agent-guide/checkpoints/00-inspect-starting-app.md) unless the learner names another checkpoint or the repository clearly shows later progress.
- When a checkpoint is complete, wait for the learner to agree before opening the next linked checkpoint.
- If resuming in a new conversation, inspect the files and recent Git history, identify the likely completed checkpoint, and confirm it briefly with the learner before continuing.
- Open [Vocabulary](agent-guide/vocabulary.md) only when introducing or clarifying one of its terms.

## Optional Model Choice

Before Checkpoint 0, briefly explain that this course mostly involves focused explanations and small file edits, so a lightweight coding-capable model may be faster and sufficient. Recommend the lightest suitable model available in the learner's client, such as Luna with medium reasoning when offered, and ask whether they want to use it.

If they agree, ask them to select it using their Codex model picker and wait for confirmation. Do not claim that `AGENTS.md` or the running agent can switch its own model. If the model is unavailable or the learner declines, continue normally with the current model. Mention that a stronger model can still be selected later for deeper architecture or toolchain questions.

## Teaching Rules

- Move one checkpoint at a time.
- Start every checkpoint message with a prominent Markdown heading using its number and title.
- Put the purpose and short explanation immediately below the heading, before commands, code, or edits.
- Keep completion notes and the prompt to continue under the same checkpoint heading.
- Before editing, explain what problem the step demonstrates.
- After editing, tell the learner exactly what to open or try.
- Do not install a bundler before Checkpoint 9 or convert the project to Vite early.
- Keep the project small enough that the learner can read every file.
- Prefer plain language over deep compiler theory. Answer "why" questions before continuing.
- If a command fails because a package is missing, explain why that is expected at that stage.

## Optional Git Workflow

At the beginning, recommend Git so each checkpoint has a clear before-and-after diff. Ask whether the learner wants the agent to manage lesson commits.

If they agree:

1. Reuse the existing repository, or run `git init` if this is not one.
2. After Checkpoint 0, ensure the starting lesson files have a baseline commit. A clean cloned repository already has a baseline.
3. After each checkpoint, show or point to `git diff`.
4. When the learner agrees to continue, commit the completed checkpoint before editing the next one.
5. Use a concise message describing the lesson change, such as `feat: split formatter into classic script`.
6. Stage only checkpoint files. Never include unrelated changes or untracked files.

The learner's initial agreement authorizes these local lesson commits for the guided session. If they decline, continue without initializing Git or committing.

## Starting State

The project starts with `index.html`, `styles.css`, and `app.js`. The HTML deliberately loads a classic script:

```html
<script src="./app.js"></script>
```

This is not a mistake. CSS is already separate only to keep the HTML readable; linking CSS does not require a bundler.

## Checkpoint Index

0. [Inspect the Starting App](agent-guide/checkpoints/00-inspect-starting-app.md)
1. [Add a Second Classic Script](agent-guide/checkpoints/01-add-classic-script.md)
2. [Explain the Pain](agent-guide/checkpoints/02-explain-the-pain.md)
3. [Convert to ES Modules](agent-guide/checkpoints/03-convert-to-es-modules.md)
4. [Add One More Module](agent-guide/checkpoints/04-add-state-module.md)
5. [Brief CommonJS Excursion](agent-guide/checkpoints/05-commonjs-excursion.md)
6. [Add Dynamic Import](agent-guide/checkpoints/06-add-dynamic-import.md)
7. [Motivate the Bundler](agent-guide/checkpoints/07-motivate-bundler.md)
8. [Introduce Package Management](agent-guide/checkpoints/08-package-management.md)
9. [Add Vite](agent-guide/checkpoints/09-add-vite.md)
10. [Build and Inspect Output](agent-guide/checkpoints/10-build-and-inspect.md)
11. [Open the Vite Black Box](agent-guide/checkpoints/11-open-vite-black-box.md)
12. [See the Dependency Graph](agent-guide/checkpoints/12-dependency-graph.md)
13. [Make Transpilation Visible](agent-guide/checkpoints/13-transpilation.md)
14. [Make Bundling Visible](agent-guide/checkpoints/14-bundling.md)
15. [Make Code Splitting Visible](agent-guide/checkpoints/15-code-splitting.md)
16. [Make Minification Visible](agent-guide/checkpoints/16-minification.md)
17. [Prove Tree Shaking](agent-guide/checkpoints/17-tree-shaking.md)
18. [Explain the Final Output Chunks](agent-guide/checkpoints/18-output-chunks.md)
19. [Optional: Compare esbuild Directly](agent-guide/checkpoints/19-esbuild-comparison.md)
20. [Optional: Compare Rollup Historically](agent-guide/checkpoints/20-rollup-comparison.md)
21. [Wrap Up](agent-guide/checkpoints/21-wrap-up.md)
22. [Final Knowledge Check](agent-guide/checkpoints/22-final-knowledge-check.md)
