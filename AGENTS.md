# Project rules

- Keep the supplied canvas-based TechText in a self-contained UI module; its pointer interactions belong only to the main name heading, leaving the rest of the plain site unchanged.
- Preserve a real text heading alongside decorative canvas text for accessibility and search indexing.
- Mount one fixed, pointer-transparent ShapeWaves background at the application shell so it persists across all sections and routes; it reacts to window-level pointer moves (no pointer-events needed); resolve colors from semantic CSS tokens and keep an animated, interactive 2D-canvas fallback when WebGPU fails so motion works in every browser.
- TechText on the name heading sweeps automatically when the pointer is not over it, so the effect plays without hovering.
- Certificate files stay in a private storage bucket with no client read rule; the site links to a backend function that redirects to a short-lived signed link, so files can be viewed but the bucket can't be listed.
- Certificates are shown as FolderFloat (matter-js) folders grouped by category; pills open files through the certificate backend function, and a screen-reader-only list keeps every certificate link indexable.
- Sections below the hero and secondary pages are lazy-loaded; in-page jumps must go through `src/lib/scrollToSection.ts`, which waits for the target to mount, so early clicks still work.
- Routes are wrapped in an ErrorBoundary (reset on path change) that shares the themed `ErrorScreen` with the 404 page, so crashes or failed chunk loads never show a blank page.
- Project content lives once in `src/data/projects.ts`; the home cards and the `/projects/:slug` page both read it, so a new project needs only a data entry plus a line in `public/sitemap.xml` and `public/llms.txt`.
- Per-page title, description, canonical and share tags go through `usePageMeta`, which restores the previous values on leave so the home page never keeps a sub-page's canonical.
- The share preview image is a static 1200x630 file in `public/` referenced by absolute URL in `index.html`, because link-preview crawlers don't run JavaScript.
- Contact form messages go through the `contact-submit` backend function (validation, honeypot, per-IP rate limit) into `contact_submissions`, which has no client access; email forwarding is optional via a Formspree form ID secret so stored messages never depend on a third party.
