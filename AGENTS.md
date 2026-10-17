# Project rules

- Keep the supplied canvas-based TechText in a self-contained UI module; its pointer interactions belong only to the main name heading, leaving the rest of the plain site unchanged.
- Preserve a real text heading alongside decorative canvas text for accessibility and search indexing.
- Keep ShapeWaves isolated to the hero background, resolve its colors from semantic CSS tokens, and provide a static canvas fallback when WebGPU fails so content remains readable on every browser.