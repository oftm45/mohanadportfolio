# Code audit report (Phase 1) and cleanup plan (Phase 2)

No code changes until approved. Findings below are from a scan of the code; anything not listed was checked and is clean.

## Audit report

### 1. Look and feel
- Leftover off-palette colors in `src/components/Footer.tsx` 34-44: purple/blue/pink hover colors (`hover:border-purple-500/50`, `group-hover:text-purple-400`, `text-blue-400`) and a pulsing red heart (line 57, `text-red-500 animate-pulse`). These break the black and burgundy palette.
- Footer background decorations (lines 12-14): gradient plus two blurred blobs, already hidden by CSS, so they are dead markup.
- `src/index.css` still defines unused color tokens and glow helpers from old palettes (glow-blue, glow-green, glow-purple, cyan/purple names); class names like `glow-blue` are still used in About and Contact.
- Generic icons: `Sparkles` in `SkillsSection.tsx` line 7, `Bot` in `AchievementsSection.tsx` line 21.
- Symbols used as icons: "❤" in `LanguageContext.tsx` lines 81 and 156, "✓" text in `ContactSection.tsx` line 120 (green, off-palette).
- Copy: "Made with love by Mohanad" footer line is filler; project descriptions in `ProjectsSection.tsx` were written by me as placeholders and still need the real details.
- Page info (`index.html`): `twitter:site` is `@lovable_dev` (line 23); the share image is an old preview screenshot (lines 20, 24); the description (27-28) still says "Programming & Web Development" and doesn't mention IoT, ICSC or FGC.

### 2. Dead ends
- No empty links or do-nothing buttons found.
- The Resume / CV button isn't added yet, so no dead button. It waits for the CV file.
- Copy-email button: shows a toast on success but nothing if copying fails (`ContactSection.tsx` 61-63, only a console error).
- Leftover Arabic branches: `language === 'ar'` checks in Footer (4), Hero (3) and Navigation (1), plus a full Arabic text set in `LanguageContext.tsx`. Arabic was removed from the site, so this code can never run.

### 3. Security
- No private keys or tokens in the site code. The backend client file exists but the site never uses it: no database, no logins, no forms that save data.
- No deep security scan has been run on this project. Run one from the Security tab before calling the site secure.

### 4. Code tidiness
- 44 unused component files in `src/components/ui/` (for example sidebar, chart, dock, spline-scene, shape-landing-hero, rainbow-button, ShapeWavesFallback leftovers to double-check).
- `src/App.css` is the unused Vite starter file.
- `src/tailwind.config.lov.json` is a large generated file full of purple/indigo/cyan entries; confirm it is unused before deleting.
- One `any` type: `container-scroll-animation.tsx` line 57.
- Unused imports in `AboutSection.tsx` line 3 (`Code`, `Heart`, `ExternalLink`) and Footer (`Code2`, `t`).
- Large files over 500 lines: `TechText.jsx` (994), `waving-portfolio-landing.tsx` (990), `ShapeWaves.jsx` (857). These are pasted visual components; splitting them adds risk for little gain, so they stay as they are.
- `NotFound.tsx` console.error on 404 is intentional; keep it.
- No tests exist; this site has no business rules, so none are proposed.

## Cleanup steps (Phase 2, in order)
1. Delete unused files: the 44 unused UI components, `App.css`, and the generated tailwind json once confirmed unused. Check: site builds and every section still shows.
2. Remove dead Arabic branches and the Arabic text set; keep the language helper so nothing crashes. Check: all page text unchanged.
3. Palette cleanup: swap the Footer's purple/blue/pink/red colors and the green check for burgundy; drop the dead blob markup; rename the glow helpers to one burgundy glow and remove the old palette tokens. Check: screenshots of every section.
4. Icons and copy: replace `Sparkles` with a target/brain-style icon, `Bot` with a robotics-arm-style icon; remove the "Made with ❤" line.
5. Copy-email: show an error message when copying fails.
6. Page info: remove `@lovable_dev`, remove the old share image (hosting adds a fresh one), update the description to mention IoT, ICSC Ambassador and FGC.
7. Fix the `any` type and the unused imports.

## Still needs you
- Real project descriptions and the CV PDF.
- A security scan from the Security tab.
