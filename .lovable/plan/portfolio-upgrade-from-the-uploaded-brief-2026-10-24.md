# Portfolio upgrade from the uploaded brief

Colors stay black #000000 and burgundy #800020. The waves background, TechText name and "Mo" logo are kept.

## What gets built
1. **Interactive letter poster** (WavingPortfolioLanding) shown under the hero: name, year 2026, roles "IoT Developer" and "ICSC Ambassador", greeting "Hi, I'm Mohanad!", in black, burgundy and light ink.
2. **3D scroll showcase** (ContainerScroll): a card that tilts flat as you scroll, holding an "IoT & Robotics Command Center" panel.
3. **Navigation**: logo plus "Mohanad" text; links About, Skills, Projects, Achievements, Contact; a burgundy outlined "Resume / CV" button.
4. **Hero**: photo with a burgundy glowing border, typing words "IoT Developer", "Innovator", "Robotics Builder".
5. **About card**: Full Name, Nationality (Sudan, based in Sharjah UAE), Age 18, Official Role (ICSC Ambassador), Robotics Team (Team Sudan – FGC). The duplicate "Role" line is removed.
6. **Skills**: 3 badge cards (Programming & Development / IoT & Robotics / Focus Areas & Interests) with the items from the brief.
7. **Projects** (back again): 3 cards — FGC Robotics System, Smart IoT Monitoring Prototype, AI & Cybersecurity Web Toolkit, with tags.
8. **Achievements**: ICSC Ambassador card (button to https://icscompetition.org/en/mabubaker, the brief's Google link is fixed) and Team Sudan FGC card.
9. **Education**: main entry Manarat Al Sharjah School (Grades 9–12, Senior – Current) plus one combined Grades 1–8 entry.
10. **Contact**: one email MohanadAbubaker1@gmail.com with a copy button, Instagram and LinkedIn.
11. **Footer**: logo added.
12. **Motion turned back on** across the site (the earlier "no animations" setting is removed).

## Needs from you
- Upload the CV PDF; until then the Resume button stays hidden.
- Project descriptions are written by me from the brief's titles; send real details if you have them.

## Technical details
- New files `src/components/ui/waving-portfolio-landing.tsx` and `container-scroll-animation.tsx` copied from the brief; hardcoded hex colors replaced with theme tokens.
- Remove `MotionGlobalConfig.skipAnimations` and the "Plain mode" CSS block; update the animations memory.
- New `SkillsSection`, `ProjectsSection`, `AchievementsSection`; nav section ids updated; CV served via lovable-assets pointer.
- Grade 1–8 wording uses the brief's text.
