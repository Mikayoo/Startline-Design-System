// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-559
// source=src/components/icon-button/IconButton.tsx
// component=IconButton
import figma from "figma";
const instance = figma.selectedInstance;
const variant = instance.getEnum("Variant", { Light: "light", Glass: "glass" });
const icon = instance.getInstanceSwap("Icon");
let iconName = "arrow-left";
if (icon && icon.type === "INSTANCE") {
  const n = icon.getPropertyValue("Name");
  if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-");
}
export default {
  example: figma.code`<IconButton icon="${iconName}" label="Describe the action" variant="${variant}" />`,
  imports: ['import { IconButton } from "@startline/ui"'],
  id: "icon-button",
  metadata: { nestable: true },
};
