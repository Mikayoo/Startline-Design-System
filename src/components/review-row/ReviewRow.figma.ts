// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-626
// source=src/components/review-row/ReviewRow.tsx
// component=ReviewRow
import figma from "figma";
const instance = figma.selectedInstance;
const icon = instance.getInstanceSwap("Icon");
let iconName = "file";
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
export default {
  example: figma.code`<ReviewRow icon="${iconName}" label="${instance.getString("Label")}" value="${instance.getString("Value")}" actionLabel="${instance.getString("Action label")}" onAction={goToQuestion} />`,
  imports: ['import { ReviewRow } from "@startline/ui"'],
  id: "review-row",
  metadata: { nestable: true },
};
