# @startline/ui

React component library for **Startline**, built from the Startline Figma design system.
Figma is the source of truth; every component, token and prop name mirrors it.

- 19 components (+ helpers) with Storybook stories, tests and Figma Code Connect
- Design tokens generated from Figma variables — 4 themes: light, dark, high-contrast light/dark
- Multilingual: Plus Jakarta Sans + Noto fallbacks (Arabic, Ethiopic, Devanagari, Bengali, Gurmukhi),
  device fonts for Chinese/Japanese/Korean, every component right-to-left ready
- Built on React 19, Tailwind CSS v4 and shadcn/ui (Radix), restyled to Startline tokens

**Browse it:** [Storybook](https://mikayoo.github.io/Startline-Design-System/) — every component, every variant, all four themes.

## Use

`@startline/ui` is not published to npm yet. To try it in an app, build a package from this repo:

```bash
git clone https://github.com/Mikayoo/Startline-Design-System.git
cd Startline-Design-System
npm install
npm run build
npm pack            # → startline-ui-0.1.0.tgz
# in your app:
npm install ../Startline-Design-System/startline-ui-0.1.0.tgz
```

```tsx
import "@startline/ui/styles.css";
import { Button, TaskCard } from "@startline/ui";

<TaskCard state="next" title="Apply for a Social Insurance Number" actionLabel="Start this step" actionHref="/sin" />
<Button size="lg">Continue</Button>
```

Themes follow the device; force one with `<html data-theme="dark">` (`light`, `dark`, `ic-light`, `ic-dark`).

## Docs

- [CLAUDE.md](CLAUDE.md) — rules for building with the system (for people and AI agents)
- [docs/components.md](docs/components.md) — every component and prop (generated)
- [docs/tokens.md](docs/tokens.md) — every token (generated)
- [CONTRIBUTING.md](CONTRIBUTING.md) — how to propose, review, build and release a change
- [PLAN.md](PLAN.md) — Figma audit, decisions and change log
- Storybook: `npm run dev` → http://localhost:6006

## Develop

```bash
npm install
npm run dev          # Storybook
npm run check        # typecheck + lint + tests
npm run build        # dist/
```

Tokens: update Figma variables → refresh `tokens/figma-variables.json` → `npm run tokens`.

## Licence

Code: MIT. Fonts: SIL Open Font License 1.1 (Plus Jakarta Sans, Noto Sans).
Startline logo and app icon are brand assets, not covered by the MIT licence.
