// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3521
// source=src/patterns/ScreenPatterns.tsx
// component=QuickAction
import figma from "figma";
const instance = figma.selectedInstance;
const icon = instance.getInstanceSwap("Icon");
let iconName = "calendar";
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
export default {
  example: figma.code`<QuickAction icon="${iconName}" label="${instance.getString("Label")}" href="/…" />`,
  imports: ['import { QuickAction } from "@startline/ui"'],
  id: "quick-action",
  metadata: { nestable: true },
};
