# Changelog

## 0.1.1 — 2026-11-13

- TextField and SearchField share one focus treatment (`Focus/Ring`) and radius (`Radius/MD`), matching Figma
- TextField disabled state uses `Border/Disabled`
- Figma: 218 deprecated `Primary Button` / `Secondary Button` instances migrated to `Pill button`; old components
  marked deprecated with 0 uses
- Storybook published to GitHub Pages; CONTRIBUTING.md added

## 0.1.0 — 2026-11-10

First version, generated from the Startline Figma design system.

- Tokens: colour (4 modes), spacing, radius, control sizes, typography, elevation — from Figma variables
- shadcn/ui theme mapped to Startline tokens
- Components: Button, Icon, LogoMark, LogoLockup, AppIcon, Avatar, SearchField, TextField, Switch,
  ChoiceCard, Badge, Chip, SourceIndicator, TaskCard, ResourceListItem, GuidanceCard, SettingsRow,
  BackButton, BottomNavigation, AskStartlineAction, AIAssistantPanel (+ AIAssistantQuestion, AIAssistantSuggestions)
- Figma Code Connect templates for every Figma component
- Multilingual fonts and right-to-left support
