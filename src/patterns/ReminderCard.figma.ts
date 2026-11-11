// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3547
// source=src/patterns/ScreenPatterns.tsx
// component=ReminderCard
import figma from "figma";
const instance = figma.selectedInstance;
const icon = instance.getInstanceSwap("Icon");
let iconName = "calendar";
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
export default {
  example: figma.code`<ReminderCard icon="${iconName}" title="${instance.getString("Title")}" detail="${instance.getString("Detail")}" href="/…" />`,
  imports: ['import { ReminderCard } from "@startline/ui"'],
  id: "reminder-card",
  metadata: { nestable: true },
};
