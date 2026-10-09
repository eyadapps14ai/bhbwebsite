# BHB photo sections

Local previews: http://127.0.0.1:5173/expertise/ and http://127.0.0.1:5173/spaces/.

## Team information
- Ahmed Marey — Sales Manager. Source: 2826243.jpg.
- Fasia — Admin & Sales Executive. Source: IMG-20261009-WA0150.jpg. User's “Adminc&” interpreted as the spacing typo “Admin &”. No biographies, qualifications or additional titles added.

Original portraits are used with matching 4:5 head-and-torso crops. Generated retouch candidates were rejected because fine facial texture changed. The original facial pixels are preserved apart from normal WebP resizing/compression; no beauty filters or skin recolouring. Fasia's original embedded branding remains. Further portrait lighting/white-balance retouch would benefit from a conventional photo editor that preserves source pixels.

## Office selection and editing
Five complementary photographs were selected from the supplied set, avoiding repeated near-identical views:
- Reception: 2826297.jpg
- Private office: 2826293.jpg
- Shared workspace: 2826289.jpg
- Meeting room: 2826269.jpg
- Window office: 355506.jpg

Built-in imagegen edit mode was used for modest lighting, white balance, contrast, clarity and architectural alignment. Prompt for each distinct office: “Natural photographic polish ONLY: improve exposure modestly, reduce green cast on white surfaces, retain warm lights, modest contrast and sharpness; gently straighten architectural verticals where needed. Preserve ALL actual furniture, chairs, desks, plants, rooms, layout, signs, objects, wall decor and window view. No additions or removal, redesign or staged luxury treatment. Preserve real colours.” Reception followed equivalent instructions. Candidates were visually reviewed against source photographs for room layout and furniture. These are AI retouch derivatives, not a source-pixel-only colour correction; originals remain the definitive record.

All supplied originals including the CR2 remain unchanged at the user's Downloads paths. They were not placed in the public website or deleted. Incomplete duplicate backups created during the full-disk incident were removed. Only seven selected optimized assets are published locally. scripts/prepare-photos.mjs records selected input paths and exports 480/960/1440 WebP copies non-destructively. public/photos/manifest.json records actual dimensions and byte sizes. All 21 files total approximately 1.6 MB.

## Layout and accessibility
Shared navigation opens the new routes. Expertise contains the supplied portraits and four existing areas of support. Spaces uses a responsive gallery with descriptions and a full-frame image dialog. Escape, focus containment/restoration and background scroll locking are supported; inactive content is inert. Single-column mobile portraits avoid cropped faces. Full-size office views use object-fit:contain. No prices, room capacity or availability invented.

## SEO
Both routes are pre-rendered in the production build with unique metadata, canonicals, CollectionPage schema and sitemap entries for https://www.bhbcentre.com. Semantic headings, descriptive image alternatives and internal links expose the content to search/answer engines. Search rankings or answer inclusion are not guaranteed.

Existing enquiry forms remain local-preview forms, without message delivery.

## Requested revisions
Fasia’s portrait background was matched to Ahmed’s pale grey-blue studio background and the original red background logo removed using imagegen edit mode. The prompt explicitly restricted changes to the background, preserving her facial features, skin tone, expression, hijab and clothing.
Reception was simplified at the user's request: sofas, foreground table, dispenser and counter clutter were removed. The actual desk, TV, plants and blue carpet were retained. This revised photograph represents an edited presentation, rather than an unmodified photograph of the complete room.

The reception desk's old branding was replaced with the approved black-and-gold full BHB logo, using the official logo PNG as the imagegen insert reference. The revised masters are saved in media/retouched. Optimized website variants were regenerated.

Further user-requested reception revisions: closed the open right-side office door, added two floor plants beside the counter, and replaced TV content with the approved ivory-and-gold BHB monogram only on black. Imagegen edits were inspected before exporting. Versioned prior masters remain in media/retouched.
