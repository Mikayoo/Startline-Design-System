// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3510
// source=src/patterns/ScreenPatterns.tsx
// component=HeroCard
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<HeroCard
  image={photoUrl}
  tag="${instance.getString("Tag")}"
  title="${instance.getString("Title")}"
  progress={{ current: 1, total: 3, label: "${instance.getString("Progress")}" }}
  actionLabel="Continue"
  actionHref="/next-step"
/>`,
  imports: ['import { HeroCard } from "@startline/ui"'],
  id: "hero-card",
  metadata: { nestable: true },
};
