# Project rules

- Keep the supplied canvas-based TechText in a self-contained UI module; its pointer interactions belong only to the main name heading, leaving the rest of the plain site unchanged.
- Preserve a real text heading alongside decorative canvas text for accessibility and search indexing.
- Mount one fixed, pointer-transparent ShapeWaves background at the application shell so it persists across all sections and routes; it reacts to window-level pointer moves (no pointer-events needed); resolve colors from semantic CSS tokens and keep an animated, interactive 2D-canvas fallback when WebGPU fails so motion works in every browser.
- TechText on the name heading sweeps automatically when the pointer is not over it, so the effect plays without hovering.
- Certificate files stay in a private storage bucket with no client read rule; the site links to a backend function that redirects to a short-lived signed link, so files can be viewed but the bucket can't be listed.
- The hero photo sits inside a decorative, pointer-transparent CrystalizedBall (ogl WebGL) layer; keep the real <img> on top so the photo stays visible and accessible.
