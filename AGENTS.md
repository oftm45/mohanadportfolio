# Project rules

- Keep the supplied canvas-based TechText in a self-contained UI module; its pointer interactions belong only to the main name heading, leaving the rest of the plain site unchanged.
- Preserve a real text heading alongside decorative canvas text for accessibility and search indexing.
- Mount one fixed, pointer-transparent ShapeWaves background at the application shell so it persists across all sections and routes; it reacts to window-level pointer moves (no pointer-events needed); resolve colors from semantic CSS tokens and keep an animated, interactive 2D-canvas fallback when WebGPU fails so motion works in every browser.
- TechText on the name heading sweeps automatically when the pointer is not over it, so the effect plays without hovering.