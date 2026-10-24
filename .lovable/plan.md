# Remove maintenance page + add LinkedIn info

## 1. Remove the maintenance page
- Turn off the maintenance page and delete it, so visitors see the full site again after publishing.

## 2. Add your LinkedIn info
LinkedIn blocks automatic reading of profiles. From outside, only your headline shows: "Grade 12 ADV Student", Sharjah. Your experience, skills, courses and activities don't show.

What I'll do:
- Update the headline under your name and in the About section to "Grade 12 ADV Student", and keep the ICSC Ambassador and FGC roles as they are.
- When you send your full profile, add the rest to the matching sections: About text, Experience/Activities, Skills, Volunteering, Honors. Nothing gets added twice, so anything already in Certificates stays only there.

How to send your profile (any one):
- On LinkedIn, open your profile, tap **More** and then **Save to PDF**, and upload the file here.
- Or copy the About, Experience, Skills and Honors sections and paste them here.

## Technical details
- In `App.tsx`, remove the maintenance gate and its import, delete `MaintenancePage.tsx`, and drop the maintenance rule from `AGENTS.md`.
- Text goes in `LanguageContext.tsx`, `AboutSection.tsx`, `SkillsSection.tsx` and `AchievementsSection.tsx`. No new pages.
