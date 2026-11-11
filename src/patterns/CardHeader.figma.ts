// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3574
// source=src/patterns/ScreenPatterns.tsx
// component=CardHeader
import figma from "figma";
const instance = figma.selectedInstance;
const icon = instance.getInstanceSwap("Icon");
let iconName = "info";
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
const detail = instance.getBoolean("Show detail") ? instance.getString("Detail") : null;
export default {
  example: figma.code`<CardHeader icon="${iconName}" title="${instance.getString("Title")}"${detail ? figma.code` detail="${detail}"` : ""} />`,
  imports: ['import { CardHeader } from "@startline/ui"'],
  id: "card-header",
  metadata: { nestable: true },
};
