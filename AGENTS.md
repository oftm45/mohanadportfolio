# Project rules

- Keep the supplied canvas-based TechText in a self-contained UI module; its pointer interactions belong only to the main name heading, leaving the rest of the plain site unchanged.
- Preserve a real text heading alongside decorative canvas text for accessibility and search indexing.
- Mount one fixed, pointer-transparent ShapeWaves background at the application shell so it persists across all sections and routes; resolve colors from semantic CSS tokens and retain a static canvas fallback when WebGPU fails for cross-browser readability.