# Checkpoint 2: Explain the Pain

Do not introduce ES Modules yet.

Show the script tags and explain:

- With two files, manual order is manageable.
- With twenty files, it becomes fragile.
- Dependencies are implicit.
- Globals can collide.

Use this model:

```text
classic scripts:
HTML owns file order
JS files silently share globals
```

Then ask:

> What if each JavaScript file could declare what it needs?

Next: [Checkpoint 3](03-convert-to-es-modules.md)
