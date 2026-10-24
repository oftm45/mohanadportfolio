# Scrambled-then-assembled PORTFOLIO letters

## What you will see
- In the letter poster (the 3D tilting card under your intro), the big letters of **PORTFOLIO** start out scattered: spread across the poster, tilted at random angles and in a jumbled order.
- Then each letter flies to its correct spot one after another and settles, so the word **PORTFOLIO** forms clearly.
- It plays each time the poster scrolls into view, so visitors always catch it.
- Hovering a letter still spins it like before once the word has formed.
- People who turn off motion on their device see the finished word straight away.

## Steps
1. Add a "scatter" starting state to every letter in the poster: a random offset, rotation and slight shrink, picked so letters land in mixed-up spots.
2. Animate each letter from its scattered state to its real place with a staggered, springy movement (about 1.5 seconds total), replacing the current slot-machine roll at the start.
3. Start the animation when the poster enters the screen and reset it when it leaves, so it replays.
4. Keep the existing hover spin, colors (burgundy on black) and the rest of the poster unchanged.
5. Check it in a test browser on a computer and phone-sized screen: letters start jumbled, end as PORTFOLIO, no errors.

## Technical details
- File: `src/components/ui/waving-portfolio-landing.tsx` only.
- Each `LetterCell` gets deterministic scatter values from the existing `hash()` helper (x/y offset within poster bounds, rotation -40 to 40 degrees, scale 0.7), applied as CSS variables on the cell group with a `transform` transition; a "assembled" class removes them with per-letter `transition-delay`.
- An `IntersectionObserver` on the poster root toggles the assembled state (reset on exit). The intro reel roll is skipped for the scatter phase; hover `reroll` stays.
- `prefers-reduced-motion` renders the assembled state immediately.
