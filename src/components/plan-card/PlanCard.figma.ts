// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-619
// source=src/components/plan-card/PlanCard.tsx
// component=PlanCard
import figma from "figma";
const instance = figma.selectedInstance;
const state = instance.getEnum("State", { Default: "default", Next: "next" });
export default {
  example: figma.code`<PlanCard
  state="${state}"
  step="${instance.getString("Step")}"
  topic="${instance.getString("Topic")}"
  title="${instance.getString("Title")}"
  time="${instance.getString("Time")}"
  location="${instance.getString("Location")}"
  image={thumbnailUrl}
  href="/steps/…"
/>`,
  imports: ['import { PlanCard } from "@startline/ui"'],
  id: "plan-card",
  metadata: { nestable: true },
};
