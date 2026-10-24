# Full site audit, fixes and report

## Scope (what the site actually has)
Your site is a one-page portfolio plus one project page (Smart Greenhouse) and a 404 page. It has **no** sign-in, accounts, purchases, contact form, database tables or email sending. The only backend piece is the private certificate store and the function that opens certificates. So items about login, purchases, sessions, database indexes and SPF/DKIM do not apply. The report will mark them "Not applicable" and explain what to add if you need them later.

Current facts:
- Latest security scan: 0 open issues, but it is older than recent changes, so it will be re-run.
- Dependency scan: 0 vulnerable packages.
- No Google Analytics or any visitor tracking is installed.

## What I will do

1. **Functional check**: open every page and section in a test browser; click every link and button (nav, LinkedIn, Instagram, email copy, ICSC, project demo, every certificate in every folder, 404 page). Fix anything broken.
2. **User experience**: check the reading order, button labels, error and success messages (email copy), keyboard use, focus outlines, screen-reader labels, text contrast on black/burgundy. Fix issues found.
3. **Speed**: measure load time and download size; check the heaviest parts (moving background, letter poster, certificate folders, animation libraries); load heavy sections only when scrolled to; shrink the large profile image; remove unused files (e.g. placeholder image, unused libraries). Re-measure and report before/after numbers.
4. **Phones and browsers**: test at phone, tablet and desktop sizes in Chromium, Firefox and Safari-engine (WebKit); fix overflow, tap size and text size problems (including the small typing line on phones).
5. **Security**: re-run the security scan and database checks; confirm certificates stay private; confirm HTTPS on the live site; add a safe set of browser security rules (content policy, referrer policy) in the page head where hosting allows; check library updates.
6. **Backend function**: test the certificate function for speed, bad filenames and missing files; make sure it returns clear errors.
7. **Analytics**: report that none is installed; offer Lovable's built-in visitor analytics (no setup) or Google Analytics if you give me your Measurement ID. Email: not applicable.
8. **Backups**: explain the daily automatic backups (about 14 days, database only, certificate files not included) and give a simple routine: keep your own copy of the certificate files and export when needed.
9. **Monitoring**: explain where errors and function logs can be seen; check the backend health once and report.
10. **Final report**: delivered as a document in Files with every finding, priority (Critical/High/Medium/Low), fix done or steps, time estimate, and pass/fail acceptance checks.

## Needs your input (does not block the rest)
- Google Analytics Measurement ID, if you want Google Analytics instead of the built-in one.

## Technical details
- Tools: Playwright (chromium/firefox/webkit), Lighthouse-style metrics via Performance API, `vite build` size output, security--run_security_scan, supabase--linter, supabase--db_health, edge function curl tests.
- Likely code changes: `React.lazy` for ShowcaseSection/CertificatesSection/matter-js and gsap users, image recompression to WebP, removing unused ui files/deps, CSP/referrer meta in `index.html`, a11y fixes in components.
- Report: `/mnt/documents/site-audit-report.md` (or PDF).
