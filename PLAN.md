# Startline → agent-ready React component library

## Context
Startline's design system lives in Figma (file `TiHKqEUApUi1FNNtRGzAC7`). The goal is a real React
library on GitHub that Claude and other agents can read and build with correctly: tokens that match
Figma one-to-one, components whose props are the Figma property names, a Storybook catalog, and a
Code Connect file per component so Figma Dev Mode points at the real code.
The working folder was empty (not a git repo yet).

## Figma audit (read 2026-11-10)

### What is already good
- **Variables with modes.** `Startline / Colour` has 39 semantic tokens in 4 modes: Light, Dark,
  IC-Light, IC-Dark (high contrast). They alias `Startline / Primitives` (43 raw colours).
  Primitives have no scopes, so designers can't pick raw colours by accident. Semantic tokens are scoped
  (text colours only show for text, etc.).
- **Code syntax already set** on almost every token (`var(--startline-text-primary)`), so names in
  code can match Figma exactly.
- **Layout + type tokens:** spacing 0–32 (4 px grid), radius none→pill, control heights 36/44/52,
  avatar sizes, font sizes and line heights.
- **Text styles** bind size/line height to variables. One font: Plus Jakarta Sans.
- **Core components are clean.** Button (24 variants), Ask Startline Action, Badge, Chip, Text field,
  Choice card, Task card, Resource list item, Guidance card, Settings row, Switch, Search field,
  Bottom navigation, Icon (12), Avatar, Logo. Button has zero hard-coded values.

### Fix in Figma — by priority
**P1 — blocks correct code / confuses agents**
1. **Rename Button's `Style` property to `Variant`.** `style` is a reserved prop in React; it can't be
   a component prop. (Same check for any future property called `style`, `class`, `key`, `ref`.)
2. **Give every component its own description.** Today descriptions are shared per page: Back button,
   Ask Startline Action and Button carry the same text; Search field carries the Choice-card text;
   all 5 brand/icon sets share one. Agents read these to choose components, so each needs: what it
   is, when to use it, when *not* to use it.
3. **Remove duplicates / strays:** `Primary Button` and `Secondary Button` (old standalone copies of
   Button), `Notification` / `Sec Notification` (no description, hard-coded teal `#087f7a`),
   and the second `AI Assistant Panel` (exists on both *Cards and lists* and *Patterns*).
4. **Add missing tokens shadcn needs:** a **focus ring colour** (`Border/Focus` is only a width),
   a **destructive action** colour set (`Action/Danger`, hover, text), and an **overlay/scrim** for
   dialogs and sheets.
5. **Fix the two rogue colour variables** `Bright Color` and `Action/Accent Bright`: raw hex instead of
   aliases, "all scopes", no code syntax. Alias them to a primitive and scope them, or delete.
   Also add code syntax to `Text/On Media`.

**P2 — hard-coded values (code will drift from Figma)**
6. **Text without a text style:** Navigation (25 layers), Text field (15), Guidance card (12),
   Settings row (6).
7. **Spacing not bound to `Spacing/*`:** AI Assistant Panel (14), Badge (10), Search field (8),
   Task card (6), Chip (6), Navigation (5), Switch (4), Resource list item (4), Source indicator (4).
8. **Radius not bound to `Radius/*`:** Choice card (4), Switch (4), Navigation (5), Back button (2).
9. **Frames without auto layout:** Search field (8), Task card (3), Source indicator (2),
   AI Assistant Panel (1).
10. **Text styles:** bind `Startline/Button` font size and all of `Startline / Navigation` to
    variables; delete or rename `Body text` (9.66 px — a mock-up leftover) and `Card tag`; use one naming
    pattern (`Startline / …` vs `Startline/…` are mixed).
11. **Effect styles:** shadow colour is hard-coded and won't change in dark mode; rename `splash`.

**P3 — consistency (makes props predictable)**
12. **Same idea, same property name.** Emphasis is called `Style`, `Kind`, `Type`, `Tone` and
    `Emphasis` in different components. Suggested: `Variant` (visual emphasis), `Status`
    (info/success/warning/error), `Size` (`SM|MD|LG`).
13. **States that are really booleans:** Switch `Value: Off|On` → boolean `Checked`; `State=Disabled`
    → boolean `Disabled` where possible. Hover/Pressed stay as variants for documentation, but in code
    they are CSS states, not props (Code Connect will ignore them).
14. **Add missing variants:** Button icon slots (`Leading icon` / `Trailing icon` instance-swap +
    booleans), Button **Focus** state, Button **Destructive** variant once the token exists.
15. **Token descriptions:** none of the 39 colour tokens has a description. A one-line "use for…" on
    each makes agents pick the right one.
16. Prototype-only `Prototype / Priorities` collection and device chrome (Status bar, Dynamic Island)
    stay out of the library. Rename `Mobile Navigation / Premium` → `Bottom Navigation`.

### Which fixes matter most
- **For code:** #1 (reserved prop name), #4 (missing tokens block the shadcn theme), #6–#9 (anything
  hard-coded must be guessed in code and will drift).
- **For agents:** #2 (descriptions are how an agent decides *which* component to use), #3 (duplicates
  make agents pick the wrong one), #12–#13 (consistent property names → predictable props), #15.

## Interview answers
| Topic | Decision |
|---|---|
| Font | Plus Jakarta Sans, **bundled** (no Google request) + Noto Sans fallbacks for Arabic, Ethiopic, Devanagari, Bengali, Gurmukhi; CJK via device fonts |
| Languages | Multilingual incl. **right-to-left** (Arabic, Persian, Urdu) — every component RTL-ready |
| Default theme | **Follow device** (light/dark), with override via `data-theme` attribute |
| High contrast | **All 4 modes** — IC modes auto-apply on `prefers-contrast: more`, or set manually |
| Figma fixes | **Claude edits Figma** through the connector; you review the changes before I build |
| Component order | Button → Avatar, Search field → form controls → status & tags → cards & lists → navigation & AI (all of them) |
| Icons | Export your **12 Figma icons** as React components + **Lucide** for anything missing |
| Brand | Logo Mark, Logo Lockup, App Icon, Avatar included. Status bar / Dynamic Island excluded |
| Package | **`@startline/ui`** |
| GitHub | **Public** repo. You create it and sign in; I push only when you say go |
| Storybook | Runs **locally**, source lives in the GitHub repo (hosting can come later) |

Note: Node 26 + npm 11 + git are installed; no `gh` CLI, so you'll create the GitHub repo on github.com
and give me its URL. Because the repo is public, the Figma file link inside Code Connect files will be
public too (only people with Figma access can open it).

## Implementation plan

### Stops (I pause and wait for you only at these)
- **Stop 0 — Figma fixes review:** after the P1 + P2 fixes, I show a before/after list + screenshots.
  Deleting duplicate components is permanent, so I'll name each one and confirm first.
- **Stop 1 — theme mapping table:** shadcn variable → your token (light/dark), before any theme code.
- **Stop 2 — Button:** Storybook screenshots next to Figma, in light and dark, plus `Button.figma.tsx`.
- **Stop 3 — anything leaving your computer:** `git push`, `figma connect publish`, `npm publish`.
  You sign in and run publishes yourself; I never handle passwords or tokens.

### Phase 0 — Fix Figma (Claude, via Figma connector)
- P1: rename `Style`→`Variant`; write a specific description per component (purpose / use when / don't
  use when); add `Focus/Ring`, `Action/Danger` (+hover, pressed, text), `Overlay/Scrim` tokens in all 4
  modes; fix `Bright Color` / `Action/Accent Bright`; add missing code syntax.
- Check if `Primary Button`, `Secondary Button`, `Notification`, `Sec Notification`, duplicate AI panel
  are used on screens → swap uses to the main component → delete after your OK.
- P2: apply text styles, bind spacing/radius to variables, add auto layout on the listed components.
- P3: unify property names (`Variant`, `Status`, `Size`), Switch `Checked` boolean, Button icon slots,
  Focus state, Destructive variant; one-line descriptions on colour tokens.
- → **Stop 0.**

### Phase 1 — Project setup (commit after each step)
- `git init`, `main` branch, `.gitignore`, `package.json` named `@startline/ui` (MIT licence unless you prefer another).
- Vite **library mode** + React 19 + TypeScript (strict) + Tailwind v4 (`@tailwindcss/vite`).
- shadcn/ui (`components.json`, CSS variables on, `cn()` helper in `src/lib/utils.ts`).
- Storybook (react-vite) with addons: a11y, themes (Light / Dark / IC-Light / IC-Dark toolbar).
- ESLint + Prettier, Vitest + Testing Library, `@figma/code-connect`.
- Write **PLAN.md** (this plan + audit + answers) and **CLAUDE.md** (agent instructions, below).

### Phase 2 — Tokens (Figma is the source of truth)
- `tokens/figma-variables.json`: snapshot of all Figma variables (pulled with the Figma connector).
- `scripts/build-tokens.ts` → `src/styles/tokens.css`. Variable names = Figma code syntax
  (`--startline-text-primary`). Modes: `:root` = light; `@media (prefers-color-scheme: dark)`;
  `@media (prefers-contrast: more)`; and `[data-theme="light|dark|ic-light|ic-dark"]` overrides.
- Spacing, radius, control heights, font sizes, line heights and text styles become Tailwind theme values
  (`p-4` = `Spacing/4`, `rounded-md` = `Radius/MD`, `text-body` = `Startline / Body`).
- → **Stop 1:** mapping table, e.g. `--primary` → `Action/Primary`, `--primary-foreground` →
  `Text/Inverse`, `--background` → `Surface/Primary`, `--foreground` → `Text/Primary`,
  `--muted` → `Background/Subtle`, `--border` → `Border/Default`, `--ring` → `Focus/Ring`,
  `--destructive` → `Action/Danger`, `--radius` → `Radius/MD`…
- Then `src/styles/theme.css` (shadcn variables pointing at Startline tokens) + `docs/tokens.md`.

### Phase 3 — Components
Folder per component, same pattern everywhere (`src/components/button/`):
- `Button.tsx` — shadcn base restyled with tokens only (no raw hex/px); variants via `cva`.
- `Button.stories.tsx` — one story per Figma variant + an "All variants" grid; Figma link in parameters.
- `Button.figma.ts` — Code Connect parserless template (`figma.code`), the current Code Connect format
  (changed from `.figma.tsx` after reading Figma's Code Connect guide). Requires the components to stay
  published and an Organization/Enterprise Figma plan to publish.
- `Button.test.tsx` — renders, disabled, keyboard focus, axe accessibility check.
- `index.ts` — exports; `src/index.ts` re-exports everything.

**Prop naming rule:** Figma property → camelCase prop. `Variant`→`variant`, `Size: MD|LG`→`size: "md"|"lg"`,
`Label` (text)→`children`, `Show helper` + `Helper` → `helper?: string`, `State=Disabled`→`disabled`.
Hover/Pressed/Focus are CSS states, not props. Figma description → JSDoc on the component so editors
and agents see it.

Order: **Button → Stop 2**, then Icon (12 SVGs + Lucide re-export) & Logo/App Icon, Avatar, Search field,
Text field, Switch, Choice card, Badge, Chip, Source indicator, Task card, Resource list item,
Guidance card, Settings row, Back button, Bottom navigation, Ask Startline Action, AI Assistant Panel.
Commit after each component.

### Phase 4 — Agent-readiness
- **CLAUDE.md** contents: what the library is; install + import; the theme switch; token rules
  ("never hard-code colours/spacing; use these Tailwind classes"); a table of every component with
  when-to-use and its props; Figma→prop naming rule; how to add a component (the 5-file pattern);
  commands; things agents must not do (edit `tokens.css` by hand, add raw hex, publish).
- `AGENTS.md` pointing to CLAUDE.md, for non-Claude agents.
- `docs/components.md` generated from component JSDoc + prop types.

### Phase 5 — Release prep → Stop 3
- README, CHANGELOG, `npm run build` output in `dist/` (ESM + types + `styles.css`).
- Ask you to create the public GitHub repo; push after your go-ahead.
- You run `npx figma connect publish` (needs your Figma token) and, later, `npm publish`.

## Verification
- `npm run typecheck`, `npm run lint`, `npm test` (incl. axe accessibility) pass on every commit.
- `npm run build` + `npm run build-storybook` succeed.
- `npx figma connect parse` validates every `.figma.tsx` locally (no upload).
- A token test fails if any component file contains a raw hex colour or arbitrary px value.
- Visual check: Storybook in the browser pane, each component in all 4 themes, compared with
  Figma screenshots of the same variants.
- After you publish Code Connect: open Button in Figma Dev Mode and confirm the snippet shows `@startline/ui`.

## Figma change log — Phase 0 (2026-11-10)

All edits are in place: no component was recreated, so existing screen instances stay linked.

### Tokens
- **New colour tokens (all 4 modes, scoped, code syntax, described):** `Focus/Ring`, `Action/Danger`,
  `Action/Danger Hover`, `Action/Danger Pressed`, `Text/On Danger`, `Overlay/Scrim`, `Elevation/Shadow`.
- **New primitives:** `Red/700`, `Red/800`, `Teal/400`, `Adaptive/errorHover|errorPressed|errorInk`,
  `Overlay/Ink 48`, `Overlay/Black 64`, `Shadow/Ink 12`, `Shadow/Black 40`.
- `Action/Accent Bright` → renamed **`Accent/Teal Bright`**, aliased to `Teal/400`, scoped.
- `Bright Color` → aliased + scoped, marked **DEPRECATED** (pending deletion).
- Code syntax added to 28 primitives and `Text/On Media`. Descriptions on all 39 colour tokens.
- **New layout tokens:** `Spacing/0-5` (2), `Spacing/1-5` (6), `Spacing/2-5` (10), `Spacing/4-5` (18),
  `Radius/2XL` (28) — the half-steps your components already used; they match Tailwind's 0.5/1.5/2.5.
- Descriptions on radius, control height and border tokens.

### Styles
- Text styles: one naming pattern (`Startline / …`); `Button` size and `Navigation` size/line height
  bound to variables; descriptions added; `Body text` and `Card tag` marked DEPRECATED.
- Effect styles: shadow colour bound to `Elevation/Shadow` (now changes in dark mode);
  `splash` → `Startline / Elevation / Splash`.

### Components
- Button: `Style` → **`Variant`**; new **Destructive** variant (32 variants total); new
  **Show leading icon / Leading icon / Show trailing icon / Trailing icon** properties.
- Switch: `Value: Off|On` → **`Checked: False|True`**. Choice card: `Type` → **`Selection`**.
- `Mobile Navigation / Premium` → **`Startline / Bottom Navigation`**.
- Specific description on all 22 library components (+ mock-up chrome marked as not in code).
- Bound to tokens: 52 spacing values, 13 radii; text styles applied to 58 text layers.
- Auto layout: the "missing" frames were icon drawings — correct as they are; no change.
- DEPRECATED (description only, nothing deleted): `Primary Button` (194 uses), `Secondary Button`
  (24 uses), `Notification` (2 uses), `Sec Notification` (0), duplicate `AI Assistant Panel` on Patterns (0).

### Left as intentional fine geometry (not tokenised)
- Choice card checkbox radius 5 px (20 px box), Switch knob inset 3 px.

### Decisions (2026-11-10)
- Deleted after a 16-page usage scan showed 0 uses: `Sec Notification`, duplicate `AI Assistant Panel`
  (Patterns), `Bright Color`, text styles `Body text` and `Card tag`.
- Kept, still DEPRECATED: `Primary Button` (194 uses), `Secondary Button` (24), `Notification` (2).
  Not in the code library; agents are told not to use them.

## Progress log
- 2026-11-10 Stop 1 approved: shadcn → Startline mapping in `src/styles/theme.css`.
- 2026-11-10 Button built. Matches Figma in light and dark (measured: heights 44/52, padding 20/24,
  radius 12, font 600 14/20, colours exact; widths within 1 px from text rendering). Comparison in
  `docs/qa/button/comparison.png`. Fixed in Figma: Destructive variants' label was not linked to `Label`.
- 2026-11-10 Button approved (Stop 2). Multilingual decision: Plus Jakarta Sans stays the brand font; bundled
  Noto Sans Arabic/Ethiopic/Devanagari/Bengali/Gurmukhi per-script (unicode-range, ~85–280 KB each, only
  downloaded when used); CJK via device fonts; Vietnamese subset restored. All components RTL-ready
  (logical utilities enforced by test; Storybook Direction + Language toolbar; Button Multilingual story).
- 2026-11-10 All 19 components built, each with stories, tests (121 total, incl. axe accessibility),
  Code Connect (21 `.figma.ts` templates) and light/dark visual QA in `docs/qa/`.
  Generated `docs/components.md`; CLAUDE.md finalised; AGENTS.md, README, CHANGELOG, LICENSE added.

### Figma fixes made during the build
- Button Destructive variants: label re-linked to the `Label` property.
- Icon artwork frames set to scale, so resized icons (20 px in buttons) scale correctly.
- 24 text layers used styles borrowed from another library (`Label/M`, `Label/L`) → identical local styles.
- Choice card: border `Neutral/100` (primitive) → `Border/Subtle`; new `Border/Medium` = 1.5 px token.
- `Neutral/Mist` (primitive) fills → `Background/Subtle` in Badge, Source indicator, Task card, AI panel,
  so they darken in dark mode.
- Borrowed effect styles `Elevation/100`, `/200` → local `Startline / Elevation / 100`, `/200`.

### Resolved 2026-11-13
- **1 Logo:** `Logo Mark / Theme=Color` renders correctly. `Inverse` was correct (white artwork) but invisible on
  the white canvas — added locked dark preview backdrops behind the Inverse mark and lockups (not part of the
  components). `Logo Lockup / Horizontal, Mono` now has its wordmark.
- **3 Dark mode:** already resolved — `Status/Info Subtle` uses Adaptive/raised, `Background/Brand Subtle` Adaptive/subtle.
- **5 Field consistency:** Text field and Search field now share focus (`Focus/Ring`, 2 px) and radius
  (`Radius/MD`, 12 px). Text field disabled border now `Border/Disabled`. Code updated to match.
- **8 Deprecated buttons:** all 218 instances (104 Startline Screens, 104 iPhone Mockups, 10 Portfolio Mockups)
  swapped to `Startline / Pill button` (Primary/Secondary, arrow off, labels kept, widths kept). Old components
  renamed `⚠ Deprecated – …` with 0 uses; remove in the next major release.
- **4 Back button:** accidental pressed drop shadow removed; Pressed stays distinct through its fill. Matches code.
- **6 Touch targets:** kept Chip SM (36 px) and Switch (26 px) visuals — same reasoning as iOS controls, where
  the visual can be smaller than the hit area. Both reach ≥ 44 px tappable in code; the rule is now written in the
  Figma component descriptions so designers space them correctly.
- **7 Shadows:** new semantic token `Elevation/Shadow Subtle` (Light/IC Light: Shadow/Ink 07 · Dark/IC Dark:
  Shadow/Black 24). `Elevation/100` and `/200` are now bound to it, so low-elevation cards keep an edge in dark modes.
  Light mode moves from rgb(12 31 30) to Ink #173332 at the same 7 % — not visible. `Elevation/Action` and
  `Elevation/Floating` still use fixed colours (Action is an intentional teal glow).
- **Still open:** 2 (publish the Figma library update — owner action).

### Open items for the designer (not changed — your call)
1. **Logo Mark component:** `Theme=Color` variant is empty; `Theme=Inverse` is white-on-white;
   `Logo Lockup` Horizontal+Mono has no wordmark. Code uses the complete mark from the lockup.
2. **Publish a library update** in Figma so instances everywhere pick up the `Style→Variant` rename and
   new Button properties (e.g. Buttons inside AI Assistant Panel still show `Style`).
3. **Dark mode:** `Status/Info Subtle` and `Background/Brand Subtle` are the same colour, so info tags on
   highlighted cards lose their pill shape. Consider a different dark value for one of them.
4. **Back button Pressed shadow** is Figma's default (0/4/4, black 25 %) — likely accidental; not in code.
5. **Consistency:** Text field focus = `Action/Primary`, Search field focus = `Border/Brand`; Text field
   radius 8 vs Search field 12. Code follows Figma; align if unintended.
6. **Touch targets:** Chip SM (36 px) and Switch (26 px) are below 44 px; code adds invisible hit areas.
7. **Shadows** `Elevation/100`, `/200` use a fixed ink colour (no dark value); `Splash` now uses
   `Elevation/Shadow` — check it still looks as intended.
8. Old `Primary Button` (194 uses) / `Secondary Button` (24 uses) remain deprecated in screens.
- 2026-11-10 Figma plan is not Organization/Enterprise, so Code Connect cannot be published. The 21
  `.figma.ts` templates stay in the repo (validated, ready if the plan changes). Instead: Figma component
  descriptions name the code component and props, and each component gets Dev Mode links to its GitHub
  source and Storybook story once the repo is public.

## v3.1 promotion (2026-11-10)
Decision: App v3.1 is the real product. Its 9 components and 38 icons lived on the "Onboarding v3" page,
outside the design system. Decision on off-scale values: add a few tokens, snap the rest (≤2 px).

**Figma**
- Promoted, renamed `Startline / …`, described, token-bound, moved to DS pages (all instances kept):
  Pill button, Icon button, Bottom Navigation (v3.1 tab bar), Choice card (v3.1 option card), Plan card,
  Review row, Select field, Toggle row, Priority tile. `Style` → `Variant` on Pill button and Icon button.
  New text properties: Plan card `Location`, `Status label`; Review row `Action label`.
- 38 v3.1 icons combined into `Startline / Icon` (property `Name`); 1,100 instances kept.
- Legacy (kept for older screens, marked DEPRECATED): Bottom Navigation (legacy), Choice card (legacy), Icon (legacy).
- New tokens: Radius/Card 20, Control/XL 56, Font Size/2XS 11 + Line Height/2XS 14, Surface/Glass,
  Border/Glass, Surface/Glass Dark, Overlay/Photo Top|Middle|Bottom, Surface/Brand Deep Start|End,
  Text/On Media Subtle. Text styles: Section title, Title, Tab label. Effect styles: Elevation/Action,
  Elevation/Floating, Effect/Glass.
- Snapped: radius 14→12, 18→16, 22→24; gaps 14→12, padding 14→16; 22 px titles → Screen heading 24.
  Reverted: tab labels kept at 11 px (Tab label style) — 12 px did not fit "Resources".
  Side effect: hero "Continue" pill is now the standard 56 px (was hand-set to 44 px).

**Code**: PillButton, IconButton, PlanCard, ReviewRow, SelectField, ToggleRow, PriorityTile (new);
BottomNavigation, ChoiceCard, BackButton, Icon (39 icons + aliases) updated; Avatar photo support;
screen patterns (ScreenHeader, SearchBar, HeroCard, QuickAction, SectionHeader, RecommendationCard,
ReminderCard, EventCard); `src/examples/HomeScreen.tsx` rebuilds App v3.1 / 09 Home only from the library —
compared with Figma in light, dark and Arabic RTL (`docs/qa/home/comparison.png`).

**Open items (v3.1)**
9. Make the screen patterns real Figma components (Hero card, Quick action, Recommendation card, Reminder
   card, Event card, Section header, Search bar, Screen header) and swap the one-off frames on the 40 screens.
10. The one-off frames on screens still use raw colours/values (e.g. hero gradients, reminder card); bind them
    to the new tokens when converting to components.
11. Reminder card shadow (raw 0/10/24, 25 %) mapped to `Elevation/Floating` in code.
12. Pill button vs Button: two button families exist; decide whether Button should adopt the pill shape.

## Startline screens updated to the design system (2026-11-10)
Scope: App v3.1, Onboarding v3, Startline Screens (older). Depth: patterns + tokens (no legacy swaps).
- New Figma pattern components (Patterns page): Screen header, Search bar, Hero card, Quick action,
  Section header, Recommendation card, Reminder card, Event card, Card header (+ optional Detail line).
- Swapped exact-match one-off frames for instances: App v3.1 — 1 screen header, 1 search bar, 1 hero,
  3 quick actions, 5 section headers, 5 recommendations, 3 reminders, 5 events, 109 card headers;
  Onboarding v3 — 1 section header. Bespoke heroes/reminders with other shapes left as they are.
- New text styles: Display (30/36 Bold, −1.5 %) and Eyebrow (12/16 SemiBold, 4 %); Font Size/3XL, Line Height/Display.
- Linked on screens: App v3.1 — 89 fills, 19 strokes, 129 texts, 2,295 spacing, 286 radii;
  Onboarding v3 — 63 fills, 8 strokes, 71 texts, 474 spacing, 136 radii;
  Startline Screens — 44 strokes, 6 texts, 852 spacing, 320 radii. Screens: exact matches only (no snapping).
- Left for review: ~25 one-off colours (e.g. #594d3d@0.4, #0a332e, #b9e6e2, #000000), Bold 34/40 splash titles, a few mixed-style texts.
- Visual check (docs/qa/screens/compare-*.png): older screens unchanged; App v3.1 and Onboarding shift ≤2 px.
  Found and fixed: Display at 30 px made "What matters most now?" wrap to two lines → Display set to
  28/34 (the most common big-title size; smaller never causes new wrapping).
- Code: `text-display`, `text-eyebrow` tokens (letter spacing now generated in em from Figma percent);
  `CardHeader` pattern; Code Connect files for all 9 pattern components (40 templates in total).

## Design decisions (2026-11-11)
- Logo Mark rebuilt in Figma: Color variant (was empty) now holds the gradient pathmark from the lockup;
  Mono → Text/Primary; Inverse → Text/Inverse. Matches the code `LogoMark`.
- Status/Info Subtle: Dark and IC-Dark now `Adaptive/raised`, so info tags keep their pill on brand-tinted cards.
- Buttons: keep both families — PillButton for the main screen action, Button for compact in-card and
  destructive actions (no change).
- One-off colours on screens: linked only exact matches to static semantic tokens (4) plus clear near-matches
  (#33d1c9 → Accent/Teal Bright, 48 % backdrop → Overlay/Scrim). Left as designed (no token fits): sand-brown
  photo tints #594d3d @30–50 %, #0a332e, #0f7a6b @35 %, #333d3b, #d4c29e, #000000, #b9e6e2 text on photos,
  #052925 @55 %, #8c540d (older screens).
- Still the owner's step: publish the Figma library update (Assets → Publish).
