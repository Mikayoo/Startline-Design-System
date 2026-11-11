# Startline UI — instructions for agents

`@startline/ui` is the React component library for **Startline**, generated from the Startline Figma
design system. Figma is the source of truth; this repo is its code twin. Read this file before you
use, change or add anything.

- Figma file: https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline
- Stack: Vite (library mode) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui
  (restyled to Startline tokens) · Storybook (catalog) · Figma Code Connect
- Plan, audit and decisions: [PLAN.md](PLAN.md)

## Using the library in an app

```tsx
import "@startline/ui/styles.css"; // tokens, theme, font (Plus Jakarta Sans, bundled)
import { Button } from "@startline/ui";

<Button variant="primary" size="lg">Continue</Button>
```

### Themes
Four themes come from the Figma `Startline / Colour` modes:

| `data-theme` | Figma mode | Applied automatically when |
|---|---|---|
| `light` | Light | default |
| `dark` | Dark | device prefers dark |
| `ic-light` | IC - Light | device prefers more contrast (light) |
| `ic-dark` | IC - Dark | device prefers more contrast (dark) |

With no attribute the theme follows the device. To force one, set `data-theme` on `<html>`
(or any wrapper). Never write per-theme colours in components — tokens switch automatically.

## Rules (must follow)

1. **Use components before building UI.** Check the component table below first. Do not rebuild a
   button, badge, field, card, etc. from `div`s.
2. **Tokens only. No hard-coded values.** No hex/rgb colours, no arbitrary pixel values
   (`p-[13px]`, `text-[#087f7a]`). Use the Tailwind classes generated from tokens:
   - Colour: `bg-surface-primary`, `text-text-primary`, `border-border-default`, `bg-action-primary`…
     (names = Figma variable path, lower-kebab). shadcn names (`bg-primary`, `text-muted-foreground`)
     also work and map to Startline tokens.
   - Spacing `Spacing/N` → `p-N`, `gap-N` (4 px grid: 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32).
   - Radius `Radius/SM|MD|LG|XL|Pill` → `rounded-sm|md|lg|xl|full`.
   - Text styles → `text-screen-heading`, `text-card-title`, `text-body`, `text-button`,
     `text-label`, `text-caption`, `text-navigation`.
   - Control heights `Control/SM|MD|LG` → `h-control-sm|md|lg` (36/44/52 px).
3. **Pick colours by meaning, not by look.** `Text/Error` for error text, `Action/Primary` for the
   main action. Token descriptions in `docs/tokens.md` say what each is for.
4. **One primary Button per screen.** Secondary for alternatives, tertiary for low emphasis.
5. **Touch targets ≥ 44 px.** Icons are 24 px; wrap interactive icons to 44 px.
6. **Colour never carries meaning alone** — pair status colours with a label or icon.
7. **Do not edit generated files by hand:** `src/styles/tokens.css`, `docs/tokens.md`,
   `docs/components.md`. Change Figma (or `tokens/figma-variables.json`) and run `npm run tokens`.
8. **Never publish or push.** `git push`, `npx figma connect publish` and `npm publish` are done by
   the human owner.

## Figma → code naming

Figma component properties become React props, so Figma and code read the same:

| Figma | React |
|---|---|
| Component `Startline / Task Card` | `TaskCard` |
| Variant property `Variant: Primary\|Secondary` | `variant: "primary" \| "secondary"` |
| `Size: SM\|MD\|LG` | `size: "sm" \| "md" \| "lg"` |
| Text property `Label` (main text) | `children` |
| Other text property `Helper` | `helper?: string` |
| Boolean `Show helper` | implied by passing `helper` |
| Boolean `Checked`, `Disabled` | `checked`, `disabled` |
| `State: Hover\|Pressed\|Focus` | CSS states — not props |
| Instance swap `Leading icon` | `leadingIcon?: ReactNode` |

## Components

Status: ⏳ planned · 🚧 in progress · ✅ done (stories + Code Connect + tests)

| Component | Use when | Status |
|---|---|---|
| Button | Actions. One primary per screen | ✅ |
| Icon | The 12 Startline icons; Lucide for anything else | ⏳ |
| Logo / AppIcon | Brand mark and lockup | ⏳ |
| Avatar | A person, by initials or icon | ⏳ |
| SearchField | Searching a list or resources | ⏳ |
| TextField | Single-line text input with persistent label | ⏳ |
| Switch | Instant on/off setting | ⏳ |
| ChoiceCard | Choosing one or several options with explanation | ⏳ |
| Badge | Showing a status | ⏳ |
| Chip | Filtering content | ⏳ |
| SourceIndicator | Showing where information comes from (official, verified, AI summary) | ⏳ |
| TaskCard | A next step the user should take | ⏳ |
| ResourceListItem | Comparing services/resources in a list | ⏳ |
| GuidanceCard | Supporting information with no task action | ⏳ |
| SettingsRow | A row in a settings list | ⏳ |
| BackButton | Leaving a detail screen | ⏳ |
| BottomNavigation | Switching between the 5 primary destinations | ⏳ |
| AskStartlineAction | Opening the AI assistant from context | ⏳ |
| AIAssistantPanel | AI answer with sources and human escalation | ⏳ |

## Adding or changing a component

Every component lives in `src/components/<kebab-name>/` with five files:

```
Button.tsx          component (shadcn base + cva variants, tokens only, JSDoc from Figma description)
Button.stories.tsx  one story per Figma variant + "All variants"; parameters.design = Figma link
Button.figma.ts     Code Connect template (parserless `figma.code`) mapping Figma properties → props
Button.test.tsx     render, states, keyboard, axe accessibility
index.ts            exports
```

Then export it from `src/index.ts`, update the table above and run the checks.
`scripts/no-hardcoded-values.test.ts` fails the build if a component contains a raw colour or an
arbitrary Tailwind value (`p-[13px]`). Stories and tests may use layout-only arbitrary values.

Code Connect files are `.figma.ts` templates (not `.figma.tsx` / `figma.connect()`). Map every Figma
property; `State` Hover/Pressed are dropped, `State=Disabled` → `disabled`. Validate with
`npx figma connect parse`. Visual QA images live in `docs/qa/<component>/`.

## Commands

```bash
npm run dev            # Storybook on http://localhost:6006
npm run tokens         # regenerate tokens.css + docs/tokens.md from tokens/figma-variables.json
npm run typecheck
npm run lint
npm test
npm run build          # library → dist/
npx figma connect parse  # validate Code Connect locally (does not upload)
```
