# Codebase Cleanup Log

Tracked issues for future cleanup. These are patterns or inconsistencies found across the codebase that aren't urgent but would improve maintainability if addressed.

---

## CSS

### Redundant `font-family: "Jost"` declarations

Every page CSS file redeclares `font-family: "Jost", sans-serif` on most selectors, even though `body` in shared.css already sets it. Total: ~69 occurrences across 7 files. Removing them would cut a lot of noise and rely on normal CSS inheritance.

**Files:** shared.css (4), pricing.css (14), contact.css (9), faq.css (3), farm.css (2), venue.css (3), giveaway.css (34)

### Inconsistent `text-underline-offset` values

Link underline offsets vary across the site with no clear rationale:

- Nav active links: 5px (shared.css)
- Footer/FAQ links: 4px (shared.css)
- Pricing page links: 3px (pricing.css)

Could standardize on a single value (4px) or introduce a token like `--link-underline-offset`.

### No tablet-specific breakpoint in page CSS

shared.css defines a tablet-only breakpoint (`min-width: 600px and max-width: 900px`) for nav overlay styling, but no page CSS files use this middle breakpoint. Pages jump straight from desktop to mobile. May be worth adding tablet-specific tweaks for tighter layouts.

---

## HTML

### Inconsistent use of `<section>` vs `<div>` for page regions

Some pages use `<div>` for major content blocks where `<section>` would be more semantic. Fixed on pricing page but worth auditing other pages (weekend.html, farm.html, etc.).

---

## Content

### Review SEO venue pages

The `byVenue` FAQ entries in `faqs.json` were written before several site-wide changes: flat-rate pricing (no seasonal variation), new FAQs (what's included, what to bring, event insurance, vendor setup), intro pricing structure, and copy updates across pages. These SEO pages should be reviewed for consistency with the current site.

**Files:** `src/_data/faqs.json` (the `byVenue` object), and any corresponding venue page templates in `src/`

---

## Assets

### Remove unused image files

Audit `src/assets/images/` for any image files that aren't referenced by any HTML template, CSS file, or data file. Several images may have been orphaned as pages were rewritten (e.g., homepage gallery strip removal, image swaps). Removing them would reduce the build output and deploy size.

---

_Last updated: 2026-11-15_
