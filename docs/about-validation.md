# Phase 2 validation — About Us only

Validated 9 October 2026.

- Production build passed. The existing Three.js bundle-size advisory remains; no new dependency was added.
- Visual checks: desktop 1440×900, tablet 768×1024, mobile 390×844. Additional width check at 320px. No horizontal overflow at checked sizes.
- Six requested sections and one H1. Section headings follow H2/H3 structure.
- Shared logo, architectural scene, header, footer, buttons and enquiry dialog.
- Home → About and About → Home navigation verified in the production build. The homepage intro remains functional.
- Mobile menu and closing Contact Us button verified.
- Contact dialog tested for Escape dismissal, focus restoration and background inertness. Local-preview submission semantics remain unchanged.
- No browser console errors or warnings observed in the production About page. Canvas loaded and logo asset resolved; no broken HTML image elements.
- Static About HTML contains its full content before JavaScript, with unique title, description, canonical URL and AboutPage structured data. Sitemap contains only homepage and About Us.
- Automated comparison: homepage sections and footer exactly match the pre-change production HTML. Approved src/style.css is byte-for-byte unchanged. Homepage navigation adds About Us and adjusts spacing/menu breakpoint to accommodate it.

Screenshots in docs/previews include desktop, tablet, mobile and the desktop hero. Research and company confirmation notes are in docs/about-content-research.md.
