# Contributing to Startline UI

Startline has one system in two places: the Figma library (source of truth) and this repo (its code
twin). A change is finished only when both match. This guide is for designers, engineers and AI agents.

## What counts as a change

| Type | Examples | Path |
|---|---|---|
| **Fix** | Wrong token on a state, broken focus ring, a11y bug, Figma ≠ code | Fast track — skip the proposal |
| **Extend** | New variant or prop on an existing component, new semantic token | Proposal, light review |
| **New** | New component or pattern | Proposal, full review |
| **Breaking** | Rename, removal, changed default, token value change across modes | Proposal, full review, deprecation period |

## The flow

```
1. Propose → 2. Review → 3. Build (Figma + code) → 4. Release → 5. Migrate
```

### 1. Propose
Open a GitHub issue titled `[Proposal] <Component or token>` with:

- **The problem** — the screen or flow where the current system falls short. A screenshot beats a paragraph.
- **Why existing parts don't work** — which component or token you tried first, and what broke.
  Most proposals end here: the answer is an existing component used differently.
- **Reuse** — at least two places it will be used. One-off UI stays in the product, not the system.
- **Draft** — a Figma link, even rough.

### 2. Review
The system owner reviews within a week against five questions:

1. Does it solve a problem in more than one place?
2. Can it be built from existing tokens? New tokens need a reason a semantic token can't cover.
3. Does it work in all four modes — Light, Dark, IC Light, IC Dark?
4. Is it accessible: 4.5:1 text contrast, ≥ 44 px targets, keyboard and screen-reader support,
   colour never the only signal?
5. Does it work right-to-left and with long translated strings (German, Tigrinya, Arabic)?

Outcome: **accept**, **accept with changes**, or **decline with the alternative to use**. Decisions are
logged in [PLAN.md](PLAN.md) under *Design decisions* so the reasoning outlives the conversation.

### 3. Build
Figma first, then code — never the other way round.

**Figma**
- Variants and properties named so they read as props (`Variant`, `Size`, `State`) — see the naming
  table in [CLAUDE.md](CLAUDE.md).
- Every fill, stroke, radius, gap and padding bound to a variable. No raw values.
- Every state: default, hover, pressed, focus, disabled, plus loading / error where relevant.
- Component description: what it's for, when not to use it, and `Code: <Component prop="…">`.

**Code** — one folder per component with five files (component, stories, Code Connect, test, index),
as described in CLAUDE.md. Then:

```bash
npm run tokens   # if variables changed
npm run docs
npm run check    # typecheck + lint + tests, including the no-hard-coded-values test
```

Add visual QA screenshots (Figma light/dark vs Storybook) to `docs/qa/<component>/`.

### 4. Release
- Semantic versioning: fix → patch, extend/new → minor, breaking → major.
- Add an entry to [CHANGELOG.md](CHANGELOG.md): what changed, why, and what to do about it.
- Design and code ship together: Figma changes land the same day the code merges. (Startline's screens live in
  the system file, so they update in place; if the library is ever consumed by other files, publish it then.)
- Merging to `main` rebuilds the public Storybook automatically.

### 5. Migrate (breaking changes only)
Nothing is deleted in the same release it's replaced.

1. Mark the old part **deprecated**: prefix the Figma component name with `⚠ Deprecated –`, point its
   description at the replacement, and add `@deprecated` JSDoc in code.
2. Count usage and track it in the changelog entry.
3. Remove it in the next major release, once usage is zero.

#### Worked example: `Primary Button` → `PillButton`
The original `Primary Button` and `Secondary Button` were standalone components with a `Style`
property and raw colours. v3.1 replaced them with `PillButton` (main screen action) and `Button`
(compact in-card actions), both fully token-bound, with `Variant` instead of `Style`.

- **Proposal reason:** two buttons, two naming schemes, no disabled or focus states, no dark mode.
- **Deprecation:** old components renamed and pointed at their replacements; 194 + 24 instances
  counted across the Startline screens.
- **Migration:** instances swapped screen by screen, checking each in Light and Dark.
- **Removal:** scheduled for the next major release once usage reaches zero.

## Who decides
Startline currently has one system owner (Michael Ajibola). Anyone can propose; the owner accepts,
and is the only one who publishes the Figma library or releases a package. As more designers join,
this becomes a rotating reviewer per product area, with the owner keeping final say on tokens.
