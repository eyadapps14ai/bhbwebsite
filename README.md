# BHB Business Hub — Phase 1

React, Three.js, React Three Fiber and GSAP. All work is contained in this folder.

## Preview on this Mac

Open http://127.0.0.1:5173 in Safari or Chrome while the local server is running.
To restart the server, double-click `Start BHB.command`, then open that address.
Keep the Terminal window open. Control+C stops the server.

With a regular Node installation: `npm install`, then `npm run dev`.
Production build: `npm run build`.

## Included

- User-triggered, approximately 9-second procedural 3D entrance: black opening, golden particles forming the custom BHB mark, illuminated doorway, opening doors, camera travel, homepage reveal.
- Custom SVG logo inspired by Option 2, with clear B letterforms and a gold architectural H.
- Responsive homepage, mobile menu, four service previews, enquiry dialogs, intro replay and skip.
- Reduced-motion users go directly to the homepage.

## Phase 1 limits

Enquiry forms validate input and save to this browser's local storage (`bhb-enquiries`); they do not send email or transmit leads. No additional pages have been built. The architectural scene is a real-time stylized CGI environment, not a photorealistic render. External Google Fonts are optional; local font fallbacks are provided.

## Logo assets

`brand/BHB-Official-Logo-Pack.zip` contains transparent 3200px PNGs and scalable SVGs for dark, light and single-colour use, plus monograms and preview files. All lettering in the primary SVGs is outlined as vector paths for font-independent print production. Editable descriptor source versions are included.

## SEO and AEO

The production build now pre-renders the full homepage into HTML and hydrates it in React. Service descriptions and visible question/answer content remain available without JavaScript or WebGL. The cinematic intro overlays the existing page rather than withholding page content.

Metadata, Open Graph and Twitter cards, Organization and matching FAQ structured data, favicon, robots.txt, canonical and sitemap are included. Default public address: https://www.bhbcentre.com/. Override with BHB_SITE_URL when building if the domain changes. Deploy the contents of `dist`, not the development source.

The local preview is not published or indexed. Before launch, confirm the real business address, phone, email, opening hours and official social profiles; these have not been invented. Configure HTTPS and redirects to the canonical host, submit the sitemap in Google Search Console/Bing Webmaster Tools and monitor real-world performance. Metadata and schema do not guarantee rankings, rich results or AI citations.

## Intro sound

Select “Enter with sound” to enable the original procedural ambient opening, doorway sound and six footsteps. Audio fades out when camera movement completes, or immediately when Skip Intro is selected. Muting and silent playback are supported. Browsers require a user gesture for audio, so playback cannot automatically begin with sound on page load. Reduced-motion preferences skip the intro.

## Phase 2 — About Us only

Preview http://127.0.0.1:5173/about/. The navigation includes About Us. The six-section page reuses the approved visual identity, architectural scene, header, footer and enquiry dialog. Homepage sections and content are unchanged.

The build pre-renders `dist/about/index.html` with unique page metadata and structured data. Deploy this directory alongside the homepage so direct `/about/` links resolve. Contact uses the existing local preview enquiry dialog; no contact page or individual service pages have been built.

Research, confirmation items and validation results are in `docs/about-content-research.md` and `docs/about-validation.md`.
