# Portfolio redesign implementation report

## Dark-only update

All six pages now use the same dark palette. The theme switch and browser storage logic were removed, and links, controls, badges, and diagram panels use the shared color tokens. Chrome checks passed across all six pages at nine viewport widths, including with an old light preference and with JavaScript disabled. Twenty-eight sampled text contrast pairs met 4.5:1, with a minimum of 6.55:1. The report below records the original redesign and its QA run.

## 1. Existing portfolio audit

The clean local checkout contained six static HTML pages, one shared stylesheet, one browser script, the portrait, the current CV PDF, 10 credential originals with thumbnails, and a GitHub Actions CV-refresh workflow. There was no package manifest, site build, lint configuration, test runner, or frontend framework. The checked-in CV workflow regenerates and commits the PDF on selected inputs or manual dispatch. The repository advertises GitHub Pages as its public site.

The baseline combined several competing style layers. A light-only override neutralized theme styles and hid decorative canvas elements while JavaScript retained their animation logic. Project filtering could leave headings for empty groups. Clipboard fallback displayed success regardless of its result. Navigation lacked a primary landmark and full mobile dismissal and focus behavior. The About page used inline serif typography in education, and its credential count was stale.

## 2. Design direction

The Intelligent Systems Portfolio uses an editorial layout, an indigo accent, Manrope headings, Inter body text, and monospace metadata. The split hero places the candidate's introduction and actions before the portrait on mobile. A compact credibility strip connects directly to research, recognition, and internship evidence. The stylesheet defines shared color, type, spacing, interaction, and status tokens. First visits use light mode, and an explicit theme selection persists across pages.

## 3. Files created and modified

| Files | Changes |
| --- | --- |
| `index.html`, `projects.html`, `publications.html`, `about.html`, `certificates.html`, `contact.html` | Redesigned layouts, navigation, page metadata, and page-specific content presentation. |
| `style.css`, `main.js` | Shared design system, responsive layout, theme, navigation, filters, clipboard feedback, and credential dialog. |
| `portrait-480.webp`, `portrait-800.webp`, `favicon.svg` | Responsive portrait files derived from the original and a compact monogram favicon. |
| `IMPLEMENTATION_REPORT.md`, `portfolio-screenshots.zip` | Implementation report and QA captures. These files are optional when publishing the site. |

## 4. Page-by-page changes

- **Home.** Added the split hero, credibility strip, Pahar Prohori case study, two hosted application cards, selected research, technical expertise, experience and education, selected recognition, and contact actions.
- **Work.** Kept all 10 projects and placed the flagship before BizMind AI and PromptGuard, the digital health and robotics prototypes, and the ML/software archive. Pahar Prohori describes stored NISAR features and uses a diagram of the documented risk-scoring workflow. BizMind AI and PromptGuard retain source and API links and describe the documented hosting and access limits.
- **Research.** Formatted the three conference papers as an editorial list with separate status, topic, venue, and citation metadata. Preserved titles, author order, venue details, paper statuses, DOI destinations, and citation text.
- **About.** Consolidated the profile, grouped the original skills into four capabilities, and retained the four internship project links, education, recognized activities, and leadership entries. The checked-in PDF confirms the ninth semester, 2023–2027 expected period, 3.35/4.00 through the eighth semester, and HSC and SSC results. The site and CV also agree on the internship role and the three publication statuses.
- **Credentials.** Kept all 10 credential assets, thumbnails, and verification links. Distinguished Galactic Problem Solver recognition from the two competition participation certificates. The native dialog offers the original image and restores focus after closing.
- **Contact.** Prioritized email, LinkedIn, GitHub, and CV. Retained the existing phone and faculty reference on this page. The footer retains the dynamic copyright year, GitHub and LinkedIn.

## 5. Functionality preserved

All six page URLs, relative asset paths, the original portrait and credentials, existing secondary-page external destinations, mailto actions, publication citations, project and credential filters, and the current CV PDF were retained. The CV generator and its workflow were left intact. Projects remain readable with scripts disabled, and the credential thumbnails link to original files as a fallback.

## 6. Functional issues fixed

- Mobile navigation now exposes its expanded state and closes on Escape, link activation, or focus leaving the menu. Escape restores focus to the toggle.
- Filtering updates the selected state, result count and list of visible groups. Deployed and archive headings disappear when their own group has zero matches.
- Clipboard feedback follows the outcome of the copy promise. The site announces both success and failure.
- Credential previews support keyboard activation, native Escape closing, accurate dialog labels, and focus restoration.
- Removed the continuous canvas loop and conflicting theme overrides. Corrected the credentials count from eight to 10.

## 7. Responsive testing

Headless Chrome rendered all six pages at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 CSS pixels. All 54 page/width checks passed without horizontal overflow. The homepage passed a landscape/portrait resize and a 640 px reflow smoke check. Full-page desktop and mobile screenshots were reviewed. Physical devices, other browser engines, and browser zoom were outside this test run.

## 8. Accessibility testing

Keyboard tests passed for the skip link, mobile menu, and dialog activation, dismissal, and focus restoration. Verified pressed states and status announcements in the DOM, reduced-motion CSS, image alternatives, active page markers, page titles, one main landmark and one H1 per page. Fourteen sampled text color combinations met 4.5:1, with a minimum of 6.10:1. Four sampled control border combinations met 3:1. Dedicated screen-reader testing and a full WCAG 2.2 AA audit remain unperformed.

## 9. Performance testing

The original portrait is 403,007 bytes. The 480w and 800w WebP variants are 25,300 and 69,046 bytes, about 94% and 83% smaller respectively. The hero image has responsive sources, intrinsic dimensions, and high fetch priority. Credential cards use the existing smaller thumbnail files, intrinsic dimensions, and lazy loading. The site uses two externally loaded font families with system fallbacks.

Headless Chrome over localhost with HTTP cache disabled, remote fonts blocked, and no network or CPU throttling reported a 24 ms homepage LCP entry and zero cumulative layout shift at both 390 px and 1440 px in the final smoke run. This measures a local fallback-font configuration. Lighthouse scores, production Web Vitals and field INP were unmeasured.

## 10. Build, lint and validation

There is no site build, configured linter, or configured test command. `node --check main.js` and `git diff --check` passed. Chrome parsed the stylesheet and reported no uncaught script errors during the interaction checks. Structural validation checked six unique document titles, active navigation, image dimensions and alternatives, duplicate IDs, fragments, and 173 local references to 32 distinct targets. The local HTTP server served the pages, stylesheet, script, favicon, portrait variants, all credential images, and CV successfully. The downloaded CV matched the checked-in PDF byte for byte. The CV-generation workflow was inspected and was not run.

## 11. Verified links and interactions

- Verified GitHub profile and all linked project repositories, the public portfolio URL, the university conference page, faculty profile, Credly verification, and leadership site by HTTP.
- The public BizMind AI and PromptGuard demo and API documentation URLs returned HTTP 200 after a longer retry. Their public READMEs confirmed the listed demo URLs and documented retrieval, authentication, or classification details. The Pahar Prohori README confirmed its existing demo URL and described NISAR features, Random Forest, and shelter routing.
- Both DOI URLs redirected to the matching IEEE Xplore document identifiers. Xplore returned HTTP 202, so the publisher document bodies were outside verification.
- Browser checks covered software and ML project filters, credential participation filtering, light/dark persistence, reduced motion, native dialog behavior, email and citation copying, permission-rejected copying, CV download, and a no-JavaScript project archive. Email delivery was outside scope.

## 12. Screenshots

`portfolio-screenshots.zip` contains baseline homepage captures at 1440 px and 390 px, final captures of all six pages at both widths, a dark-theme research capture, and the open credential dialog. Local captures use system fallback fonts.

## 13. Remaining limitations

External link behavior varied by destination. LinkedIn returned HTTP 999 to the automated client. The existing Pahar Prohori demo returned a TLS name error. Both Render demos and API documentation endpoints timed out on the first probe and responded on the longer retry. Authenticated features remain unverified. The case studies use diagrams grounded in their documented workflows. All external destinations remain in the portfolio.

## 14. Decisions required

- **[DECISION REQUIRED] Faculty reference and telephone privacy.** Confirm continuing consent for public listing of the existing faculty contact details and phone numbers. No new references to those details were added.
- **[DECISION REQUIRED] Pahar Prohori live demo.** The existing URL returned a TLS name error. Provide a verified replacement if one exists, or decide whether to remove the demo action while retaining source and credential links.

## 15. Local preview

From the repository directory, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/`. The loopback HTTP origin supports browser clipboard testing subject to browser permission.

## 16. Existing deployment

The existing public site is served by [GitHub Pages](https://nisa3131.github.io/portfolio/). Publish the site files through the repository's configured Pages source after review. The Pages source settings were not independently queried. The existing `.github/workflows/build-cv.yml` refreshes the CV on its configured triggers. The redesign is in the local working tree and has not been deployed.

## 17. Summary

The redesign puts applied AI projects and academic evidence near the top of the portfolio, gives each page a distinct role, and preserves the existing static architecture. Local browser and asset checks passed. Remaining verification concerns relate to external services, production performance, and broader accessibility coverage.
