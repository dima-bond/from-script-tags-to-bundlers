# Checkpoint 6: Add Dynamic Import

Purpose: introduce lazy loading before adding a bundler.

Before editing, explain why lazy loading exists:

- A static import makes a module part of the initial dependency graph, so the browser must download, parse, and evaluate it before or during the app's initial startup.
- Some code is large or rarely needed: a settings screen, chart editor, payment flow, admin panel, or modal a user may never open.
- A dynamic import postpones that work until the feature is requested. This can reduce the initial JavaScript download and help the first screen become usable sooner.
- The tradeoff is that the first use of the feature may wait for another network request, so essential or frequently used code should not be split lazily without a reason.
- `tips.js` is intentionally tiny, so this project will not gain measurable speed from splitting it. It exists to make the loading behavior easy to observe before applying the idea to larger features.

Question stop: ask and wait for the learner's prediction:

> Should `tips.js` be downloaded when the page opens, or only after clicking **Show tip**? What tradeoff does that create?

Do not answer immediately. Return to their prediction when inspecting the Network panel later in this checkpoint.

Edit:

1. Create `tips.js` and export a function returning a learning tip.
2. Add a `Show tip` button.
3. Add an initially hidden, accessible toast with a message area and close button. The toast may appear near the end of the HTML because its visual location will be controlled by CSS, not document flow.
4. Load the module only inside the click handler:

   ```js
   const { getTip } = await import("./tips.js");
   ```

5. Put the tip in the toast and reveal it; the close button hides it again.
6. Style the toast as a viewport overlay, not as content at the bottom of the page. Use this layout as a guide:

   ```css
   .toast {
     position: fixed;
     top: 1rem;
     right: 1rem;
     z-index: 1000;
     width: min(24rem, calc(100vw - 2rem));
     padding: 1rem 3rem 1rem 1rem;
   }

   .toast-close {
     position: absolute;
     top: 0.5rem;
     right: 0.5rem;
   }

   .toast[hidden] {
     display: none;
   }
   ```

   The exact colors may follow the existing page, but the toast must have clear contrast, a visible boundary or shadow, and a visible keyboard-focus state on the close button.

7. Keep the close button fully inside the toast and within the viewport. Give the message enough right padding so text cannot run underneath the button. Use an `aria-label` such as `Close tip` if the control only displays an icon.

8. Verify the toast after scrolling to the bottom of the page and at a narrow mobile width. It must remain visible near the viewport corner, the message must wrap, and the close button must stay reachable without horizontal scrolling.

Keep the toast small; it demonstrates the import, not a reusable notification system.

Explain:

- Static imports load with the initial graph.
- The tip is lazy because dynamic `import("./tips.js")` runs only when execution reaches it in the click handler.
- Being inside a function is not sufficient: a normal static `import` is top-level-only and loaded up front.
- A production bundler can turn the dynamic import into a separate chunk.

In the Network panel, reload and confirm `tips.js` is initially absent. Click `Show tip` and observe the request and toast. A later click may reuse the browser cache.

Next: [Checkpoint 7](07-motivate-bundler.md)
