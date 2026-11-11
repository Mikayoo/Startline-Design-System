// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-582
// source=src/components/priority-tile/PriorityTile.tsx
// component=PriorityTile
import figma from "figma";
const instance = figma.selectedInstance;
const selected = instance.getEnum("State", { Default: false, Selected: true });
const icon = instance.getInstanceSwap("Icon");
let iconName = "home";
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
export default {
  example: figma.code`<PriorityTile icon="${iconName}" label="${instance.getString("Label")}" selected={${selected ? "true" : "false"}} onSelectedChange={setSelected} />`,
  imports: ['import { PriorityTile } from "@startline/ui"'],
  id: "priority-tile",
  metadata: { nestable: true },
};
