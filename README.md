# South Road Farm

Marketing site for [South Road Farm](https://southroad.farm) — a private 66-acre wedding venue in Fayette, Maine.

Static HTML/CSS/JS. No build step, no framework, no dependencies.

---

## Structure

```
/
├── index.html          Home
├── farm.html           The Farm (origin story + timeline)
├── contact.html        Inquiry form
├── faq.html            FAQ accordion
├── weekend.html        The Weekend (Friday–Sunday narrative)
│
├── components/
│   ├── header.html     Site nav — injected via fetch() in site.js
│   └── footer.html     Site footer — injected via fetch() in site.js
│
├── css/
│   ├── shared.css      Global tokens, nav, hero base, CTA, footer, buttons
│   ├── index.css       Home page only
│   ├── farm.css        Farm page only
│   ├── contact.css     Contact page only
│   ├── faq.css         FAQ page only
│   └── weekend.css     Weekend page only
│
├── js/
│   ├── site.js         Shared: component injection, nav behavior, scroll fade
│   ├── index.js        Home page only: property carousel
│   ├── contact.js      Form submit + thank-you state
│   └── faq.js          Accordion open/close
│
└── assets/
    ├── favicon.svg
    └── images/
```

---

## Token system

Defined in `css/shared.css` under `:root`:

| Token          | Desktop | Tablet (≤900px) | Mobile (≤599px) |
| -------------- | ------- | --------------- | --------------- |
| `--pad-x`      | 48px    | 32px            | 24px            |
| `--pad-x-wide` | 72px    | 32px            | 24px            |
| `--pad-v`      | 120px   | 80px            | 56px            |
| `--pad-v-sm`   | 80px    | 56px            | 40px            |

Color tokens: `--forest`, `--forest-mid`, `--cream`, `--cream-warm`, `--amber`, `--amber-light`, `--stone`, `--white`.

RGB triplet companions (for `rgba()` use): `--forest-rgb`, `--cream-rgb`, `--forest-ui-rgb`.

---

## Breakpoints

| Name            | Query                                     | Purpose                         |
| --------------- | ----------------------------------------- | ------------------------------- |
| Tablet + mobile | `max-width: 900px`                        | Main layout collapse            |
| Tablet only     | `min-width: 600px` and `max-width: 900px` | Nav dropdown panel              |
| Mobile          | `max-width: 599px`                        | Full-screen nav, tighter tokens |

Breakpoints are declared in cascade order (900 → 600–900 → 599) so mobile token overrides correctly win on phones.

---

## Components

Header and footer are HTML fragments loaded at runtime via `fetch()` in `site.js`. They require a local server to work (browsers block `fetch()` on `file://`). Use any static server:

```bash
npx serve .
# or
python3 -m http.server
```

---

## Cache busting

All CSS and JS asset references use a manual query string version, e.g. `?v=1.1`. There is no build step to automate this. When you update a CSS or JS file, bump the version string on that file's `<link>` or `<script>` tag in every HTML page that loads it. Bump `shared.css` across all five pages; bump page-specific files only on their own page.

---

## Running locally

No install needed. Serve the root directory with any static file server and open `http://localhost:PORT`.
