# Vocabulary

Introduce these definitions gradually, when each concept first appears.

## Classic Script

A JavaScript file loaded with `<script src="..."></script>`. It can create or read globals on `window`.

## Global Variable

A value available everywhere. Convenient in tiny projects, risky in larger ones because files can depend on invisible shared state.

## ES Module

The standard JavaScript module system based on `import` and `export`. A module declares its dependencies explicitly.

## CommonJS

The older Node.js module system based on `require()` and `module.exports`. Browsers did not run it directly, so bundlers often converted it for browser use.

## Dependency Graph

The map of which files depend on which other files. Bundlers build this graph by following imports from an entry point.

## Bundler

A tool that turns a developer-friendly module structure into runtime-friendly output files. It follows imports, builds a dependency graph, and emits browser-ready chunks.

## Chunk

An output JavaScript file produced by the build. One source file does not always equal one chunk.

## Tree Shaking

Omitting exports and supporting code that a production build can prove are unreachable. Static ESM structure makes that proof more reliable, while observable side effects must be preserved.

## Side Effect

Observable work performed when a module is evaluated rather than when an exported function is later called, such as registering a custom element, changing a global, adding an event listener, or loading global CSS.

## Code Splitting

Creating separate chunks that can be loaded later, commonly through dynamic `import()`.
