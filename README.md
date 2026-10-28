# DigiPixel agency website design directions

Three **alternative DigiPixel agency websites**, not websites for DigiPixel clients.

Purpose: compare distinctly different approaches for the new affordable web design agency. The existing `digipixel-website` repository is reserved for Pixlwrk and is not modified here. The separately built `digipixel-starter-previews` repository contains example customer websites; do not confuse it with this project.

## Concepts

1. **Bold / The Bold One**: bright yellow and electric blue, giant type, illustrated website mock-up, highly visible calls to action and a simple three-step buying explanation.
2. **Editorial / The Refined One**: cream, ink and terracotta, expressive serif typography, photography-led art direction, quiet confidence, relationship-led conversion.
3. **Interactive / The Digital One**: dark mode, mint and lilac, UI-based presentation, functional website category selector which changes two example layouts, guided enquiry approach.

Each is an accessible, mobile-responsive static HTML prototype located in `docs/<slug>/index.html`. They are intentionally independent design systems and are **not three recolours of one agency template**. `docs/index.html` is an overview with actual screenshot previews.

## Boundaries

- Concept sites are marketing design previews, not live client or customer websites.
- No live forms, analytics, tracking, cookies, CRM, pricing estimate or back end. The sample forms validate locally and explicitly state that nothing is submitted or stored.
- Business example copy and browser artwork are illustrative; no fabricated customers, case studies, testimonials or performance statistics.
- No prices or delivery-time guarantees are asserted until commercial packages are agreed.
- All pages have noindex metadata and a `robots.txt` disallow policy.
- Fonts load from Google Fonts with system font fallbacks. Five static photos from Unsplash are locally saved in `docs/*/assets`, all used as illustration, not a claim of customer work.
- These concepts do not affect the live DigiPixel or Pixlwrk websites.
- The winning concept can be implemented as a native, editable WordPress website with a working enquiry form, SEO foundations, analytics and packaging after selection.

## Images

Example imagery sourced from Unsplash:

- Bold / shop: `photo-1554118811-1e0d58224f24`
- Editorial / owner: `photo-1556761175-b413da4baf72`
- Editorial / details: `photo-1497366754035-f200968a6e72`
- Editorial / shop: `photo-1441986300917-64674bd600d8`
- Editorial / maker: `photo-1497366811353-6870744d04b2`

Check final licences and replace all illustrative photography with approved brand assets for production.

## Local review

From the project root:

```sh
python3 -m http.server 8784 --directory docs
```

Open `http://127.0.0.1:8784/` and follow the three comparison cards.

## Publishing

GitHub Pages may serve the `docs/` folder on the `main` branch for external review. The noindex rules are only crawler instructions, not access control. Do not add customer information, credentials or private files.

## Design acceptance criteria

- Three genuinely different homepage architectures, navigation systems, typographic hierarchies and conversion journeys.
- Desktop and mobile functional without horizontal scroll.
- Real images load and sample links resolve.
- Interactive category selector updates the content and pre-selects the form field.
- Mobile navigation, keyboard focus, and non-submitting forms work.
