# Abu Kawser — Portfolio

Personal portfolio for **Abu Kawser** — final-year Computer Science undergrad at the University of
Dhaka, working on backend and systems engineering.

Live site: _add the Vercel URL here once deployed_

---

## Stack

| Layer     | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router, React 19)          |
| Styling   | Tailwind CSS v4 with CSS custom properties |
| Motion    | Framer Motion                              |
| Live data | GitHub REST API, cached with ISR           |
| Hosting   | Vercel                                     |

No CMS, no analytics, no trackers.

## What is dynamic

- **Live GitHub numbers.** Star counts, public repo totals and the top-languages marquee are fetched
  from the GitHub API in a server component and revalidated hourly (`src/lib/github.ts`). Post a
  project somewhere and the site updates itself — no redeploy, no hand-edited HTML. If the API is
  rate-limited or unreachable the page degrades to hardcoded fallbacks rather than failing.
- **Generated OG image.** `src/app/opengraph-image.tsx` renders the social preview card, so links
  shared to LinkedIn show a real card instead of a blank rectangle.
- **Case-study routes.** `/work/[slug]` is statically generated per project from `src/lib/data.ts`.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npx eslint src  # lint
```

## Editing content

Almost everything lives in **`src/lib/data.ts`**:

- `PROFILE` — name, role, email, links, location
- `PROJECTS` — projects, metrics, tech stack, and the long-form `caseStudy` blocks
- `ACHIEVEMENTS` — hackathon, datathon and CTF placements
- `SKILLS` — grouped toolkit
- `OPEN_TO` — what kind of work is being sought

Adding a `caseStudy` object to a project automatically creates its `/work/<slug>` page and links it
from the home page. No component changes needed.

Design tokens (colours, and the light and dark palettes) live at the top of `src/app/globals.css`.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import `Mayamoho/Portfolio`.
2. Accept the detected defaults — Next.js is auto-configured, nothing to change.
3. Deploy. Every push to `main` redeploys automatically.

Optionally set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical URLs and OG tags point at it.
Without it, the Vercel production URL is used automatically.

## Accessibility & performance

- Full keyboard navigation with visible focus rings.
- `prefers-reduced-motion` disables the ambient animation, cursor glow and count-ups.
- Light and dark themes, remembered in `localStorage` and applied before first paint.
- Semantic landmarks, labelled icon buttons, and `Person` JSON-LD structured data.

## License

MIT — see [LICENSE](./LICENSE).
