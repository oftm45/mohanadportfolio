# Add certificates from storage

## What you'll see
- A new **Certificates** section is added to the main page, plus a "Certificates" link in the top menu.
- It shows all 19 files from the `certificate` storage folder as cards in the site's black and burgundy style.
- Order: awards first (First place, Second place ×2), then the other certificates, newest first.
- Each card shows the certificate name, who issued it, and the date, with a **View** button that opens the file in a new tab.

## Steps
1. Open every file and read its real title, issuer and date, so the cards show correct details instead of file names.
2. Remove duplicate files if two files turn out to be the same certificate (for example the two M3aarf files, or "Second place winner" and "Second place").
3. Make the certificate files viewable by visitors (they are private right now).
4. Build the section and menu link.
5. Click every View button in a test browser to check each file opens.

## Technical details
- Bucket `certificate` is private. Make it public with `storage_update_bucket(public=true)`, and link with the public object URL. If the workspace blocks public buckets, use a small public read policy on `storage.objects` for this bucket, or signed URLs, instead.
- Certificate data (title, issuer, date, file path, isAward) goes in one array in a new `src/components/CertificatesSection.tsx`. Sort it by `isAward`, then by date descending.
- Add the section to `src/pages/Index.tsx` and the nav entry to `Navigation.tsx`. Use the existing motion reveal patterns.
- Update the memory rule that said "no certificates section" (the user has now asked for it back).
- Skipped: the maintenance page stays as it is.
