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

### Languages and fonts
Plus Jakarta Sans (brand) covers Latin languages and Vietnamese. Other scripts fall back automatically:
bundled Noto Sans Arabic (Arabic, Persian, Urdu), Ethiopic (Amharic, Tigrinya), Devanagari (Hindi),
Bengali, Gurmukhi (Punjabi) — each downloads only when that script is on screen. Chinese, Japanese and
Korean use the device's system fonts (too large to bundle); `lang` picks the regional forms.

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
   - Spacing `Spacing/N` → `p-N`, `gap-N` (4 px grid: 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32; half-steps
     0.5, 1.5, 2.5, 4.5 exist as Figma `Spacing/0-5` etc.).
   - Radius `Radius/SM|MD|LG|XL|2XL|Pill` → `rounded-sm|md|lg|xl|2xl|full`.
   - Text styles → `text-display` (28 px screen/hero titles), `text-screen-heading`, `text-section-title`, `text-title`, `text-card-title`, `text-body`,
     `text-button`, `text-label`, `text-caption`, `text-navigation`, `text-tab-label`, `text-eyebrow`
     (capitals section labels like "DO THESE FIRST").
   - Control heights `Control/SM|MD|LG|XL` → `h-control-sm|md|lg|xl` (36/44/52/56 px).
   - Shadows `shadow-raised` (cards), `shadow-floating` (bottom bar), `shadow-action` (primary pill),
     `shadow-100`, `shadow-200` (Figma elevation styles). Photo overlays: `from-overlay-photo-top` … `to-overlay-photo-bottom`.
3. **Pick colours by meaning, not by look.** `Text/Error` for error text, `Action/Primary` for the
   main action. Token descriptions in `docs/tokens.md` say what each is for.
4. **One primary Button per screen.** Secondary for alternatives, tertiary for low emphasis.
5. **Touch targets ≥ 44 px.** Icons are 24 px; wrap interactive icons to 44 px.
6. **Colour never carries meaning alone** — pair status colours with a label or icon.
7. **Brand artwork is the only fixed-colour code** (`src/brand/`). Do not copy its colours elsewhere.
   **Do not edit generated files by hand:** `src/styles/tokens.css`, `docs/tokens.md`,
   `docs/components.md`, `native/tokens.ts`. Change Figma (or `tokens/figma-variables.json`) and run `npm run tokens`.
   `native/tokens.ts` is the same tokens for React Native: the Startline Expo app copies it with its own `npm run tokens`.
8. **RTL-safe layout.** Arabic, Persian and Urdu are right-to-left. Use start/end utilities (`ps-`, `pe-`,
   `ms-`, `me-`, `start-`, `end-`, `text-start`, `rounded-s`, `border-e`), never left/right. Flip directional
   icons (chevrons, arrows, back) with `rtl:-scale-x-100`. A test fails on left/right utilities.
9. **Set `lang` (and `dir="rtl"` for ar/fa/ur) on user-language content** so the right font and glyph forms
   are chosen. Never hard-code a font family.
10. **Push, but never publish.** Agents may `git push` committed work to this repo's GitHub remote
   without asking (owner's standing approval, 2026-11-12). Never force-push. `npx figma connect publish`
   and `npm publish` are still done by the human owner.

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

All Startline Figma components (original set + the v3.1 set) are built (✅ stories + Code Connect + tests, checked against Figma in light and
dark). Full props, types and defaults: **[docs/components.md](docs/components.md)** (generated — read it).
Same data as JSON for tools: **[docs/components.manifest.json](docs/components.manifest.json)** — name, Figma node,
import line, every prop with `values` and `default`. Check it before using a prop.

| Component | Use when | Key props |
|---|---|---|
| `PillButton` | **The main screen action** (56 px, full width or on a photo hero). One primary per screen | `variant` primary·secondary·on-dark·ghost, `arrow`, `asChild` |
| `Button` | Compact actions inside cards/panels, destructive actions | `variant` primary·secondary·tertiary·destructive, `size` md·lg, `leadingIcon`, `trailingIcon`, `asChild` |
| `IconButton` | Round 44 px icon action (back, bell, search, more) | `icon` *, `label` *, `variant` light·glass, `dot` |
| `Icon` | One of the 39 Startline v3.1 icons (otherwise `lucide-react` with `strokeWidth={1.75}`) | `name`, `label` (only if meaningful alone) |
| `LogoMark`, `LogoLockup`, `AppIcon` | Brand | `theme` color·mono·inverse, `layout` horizontal·stacked |
| `Avatar` | A person | `initials`, `type` initials·icon, `size` sm·md·lg, `name` |
| `SearchField` | Searching a list | `size`, `onClear`, plus input props; needs `aria-label` |
| `TextField` | Form input | `label` *, `helper`, `error`, plus input props |
| `Switch` | Instant on/off setting | `checked`, `onCheckedChange`, `disabled`; needs a label |
| `ChoiceCard` | Onboarding question answers | `title` *, `helper`, `icon`, `control` radio·check, `name`, `value` |
| `PriorityTile` | Picking goals in a 2-column grid | `icon` *, `label` *, `selected`, `onSelectedChange` |
| `SelectField` | Choosing from a list (province, language) | `label` *, `options` *, `value`, `onValueChange` |
| `ToggleRow` | A labelled switch in a settings/reminder list | `label` *, `checked`, `onCheckedChange` |
| `Badge` | Read-only status | `status` neutral·info·success·warning·error, `size`, `dot` |
| `Chip` | Filter toggle | `selected`, `onSelectedChange`, `size` sm·md, `leadingIcon` |
| `SourceIndicator` | Where info comes from — **always on AI text** | `kind` official·verified·updated·ai-summary, `size` |
| `PlanCard` | A step in the user's plan (My Path) | `state` default·next, `step`, `topic`, `title` *, `time`, `location`, `image`, `href` * |
| `ReviewRow` | One answer in a review/summary | `icon` *, `label` *, `value` *, `actionLabel`, `onAction` |
| `TaskCard` | A next step with a visible action | `state` next·upcoming·complete, `title` *, `description`, `meta`, `actionLabel`, `actionHref`/`onAction` |
| `ResourceListItem` | Comparing services in a list | `provider` *, `title` *, `description`, `kind` resource·service, `emphasis`, `href` |
| `GuidanceCard` | Information with no action | `title` *, `body`, `layout` card·row·tile, `tone` neutral·info |
| `SettingsRow` | A row in settings | `label` *, `value`, `href`/`onClick`, `disabled` |
| `BackButton` | Leaving a detail screen (= IconButton arrow-left) | `label`, `onClick` |
| `BottomNavigation` | The 5 top-level destinations (floating v3.1 bar) | `active` *, `items` (labels/hrefs), `linkAs` (router Link) |
| `AskStartlineAction` | Open the AI assistant from context | `format` compact·contextual, children |
| `AIAssistantPanel` (+ `AIAssistantQuestion`, `AIAssistantSuggestions`) | An AI step | `state` entry·answer·escalation, `subtitle`, `footnote`, children |

### Screen patterns (App v3.1)

`ScreenHeader`, `SearchBar`, `HeroCard`, `QuickAction`, `SectionHeader`, `RecommendationCard`,
`ReminderCard`, `EventCard`, `CardHeader` — compositions that repeat across v3.1 screens. Each is a Figma
component on the Patterns page with a Code Connect file (`src/patterns/*.figma.ts`).
A full screen built only from these and the components above: `src/examples/HomeScreen.tsx`
(Storybook: Examples / Home). Copy its structure for new top-level screens.

### Composition rules
- **Screens:** page background is `bg-surface-warm`; cards sit on it with `shadow-raised`. Screen padding
  `px-6`, vertical rhythm `gap-5`. Top-level screens start with `ScreenHeader` and float `BottomNavigation`
  (`absolute inset-x-4 bottom-6`); detail screens start with `BackButton` and a `text-screen-heading` title.
- **Buttons:** the main action is a `PillButton`; use `Button` only for compact in-card actions.
- **AI content:** every AI answer shows `<SourceIndicator kind="ai-summary">`, the sources used, and a way
  to reach a human. Use `AIAssistantPanel state="escalation"` for legal, immigration or eligibility decisions.
- **Lists:** wrap `ResourceListItem`, `SettingsRow` in `<ul><li>`; `ChoiceCard` groups in `<fieldset><legend>`.
- **Text:** every user-visible string is a prop — pass translated text; English defaults exist only as fallbacks.
- **Don't use** the deprecated/legacy Figma components `Primary Button`, `Secondary Button`, `Notification`,
  `Bottom Navigation (legacy)`, `Choice card (legacy)`, `Icon (legacy)`;
  device mock-ups (Status bar, Dynamic Island) are not in code.

## Adding or changing a component

Every component lives in `src/components/<kebab-name>/` with five files:

```
Button.tsx          component (shadcn base + cva variants, tokens only, JSDoc from Figma description)
Button.stories.tsx  one story per Figma variant + "All variants"; parameters.design = Figma link
Button.figma.ts     Code Connect template (parserless `figma.code`) mapping Figma properties → props
Button.test.tsx     render, states, keyboard, axe accessibility
index.ts            exports
```

Then export it from `src/index.ts`, update the table above, run `npm run docs` and the checks.
`scripts/no-hardcoded-values.test.ts` fails the build if a component contains a raw colour or an
arbitrary Tailwind value (`p-[13px]`). Stories and tests may use layout-only arbitrary values.

Code Connect files are `.figma.ts` templates (not `.figma.tsx` / `figma.connect()`). They are kept up to date
but **not published**: publishing needs a Figma Organization/Enterprise plan, which Startline does not have.
The Figma ↔ code link meanwhile is each Figma component description ("Code: <Button variant size>") plus a
Dev Mode link to its source. Map every Figma
property; `State` Hover/Pressed are dropped, `State=Disabled` → `disabled`. Validate with
`npx figma connect parse`. Visual QA images live in `docs/qa/<component>/`.

## Commands

```bash
npm run dev            # Storybook on http://localhost:6006
npm run tokens         # regenerate tokens.css, docs/tokens.md and native/tokens.ts from tokens/figma-variables.json
npm run docs           # regenerate docs/components.md + components.manifest.json from component source
npm run typecheck
npm run lint
npm test
npm run build          # library → dist/
npx figma connect parse  # validate Code Connect locally (does not upload)
```
