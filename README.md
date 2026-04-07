# South Road Farm

Marketing site for [South Road Farm](https://southroad.farm) — a private 66-acre wedding venue in Fayette, Maine.

Built with [Eleventy](https://www.11ty.dev/). Deployed on Netlify.

---

## Development

```bash
npm install
npm run dev      # local dev server at http://localhost:8080
npm run build    # production build → public/
npm run format   # Prettier
```

---

## Structure

```
src/
├── _data/
│   ├── client.json     Business info: name, domain, email, address, social links
│   └── site.json       Site config: defaultOgImage, defaultDescription, analyticsId
│
├── _includes/
│   ├── layouts/
│   │   └── base.html   Base layout: fonts, analytics, shared.css, site.js, blocks
│   └── components/
│       ├── header.html Site nav
│       └── footer.html Site footer with subscribe form
│
├── css/
│   ├── shared.css      Global tokens, nav, hero base, CTA, footer, buttons
│   ├── index.css       Home page
│   ├── farm.css        Farm page
│   ├── contact.css     Contact page
│   ├── faq.css         FAQ page
│   └── weekend.css     Weekend page
│
├── js/
│   ├── site.js         Shared: nav behavior, subscribe form, scroll fade
│   ├── index.js        Home page: property carousel
│   ├── contact.js      Contact form submit + thank-you state
│   └── faq.js          FAQ accordion
│
├── assets/
│   ├── favicon.svg
│   └── images/
│
├── index.html          Home             → /
├── farm.html           The Farm         → /farm/
├── weekend.html        The Weekend      → /weekend/
├── contact.html        Inquire          → /contact/
├── faq.html            FAQ              → /faq/
├── 404.html            Not found        → /404.html
├── robots.html         robots.txt       → /robots.txt
└── sitemap.html        sitemap.xml      → /sitemap.xml
```

---

## Pages

Each page is a Nunjucks template that extends the base layout:

```html
---
title: Page Title
description: Meta description for this page.
ogImage: /assets/images/og-image.webp
---

{% extends "layouts/base.html" %} {% block head %}
<link rel="stylesheet" href="/css/page.css" />
{% endblock %} {% block body %}
<!-- page content -->
{% endblock %} {% block scripts %}
<script defer src="/js/page.js"></script>
{% endblock %}
```

Front matter keys:

- `title` — used in `<title>` and OG title
- `description` — meta description and OG description (falls back to `site.defaultDescription`)
- `ogImage` — OG image path (falls back to `site.defaultOgImage`)
- `noindex: true` — adds `<meta name="robots" content="noindex">` and excludes from sitemap
- `mainClass` — adds a class to `<main>` (renders as empty string when unset)
- `permalink` — overrides output path (used for 404.html and robots/sitemap)

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

---

## URLs

Clean URLs are used throughout (`/farm/` not `/farm.html`). The old `.html` URLs return 301 redirects defined in `netlify.toml`.
