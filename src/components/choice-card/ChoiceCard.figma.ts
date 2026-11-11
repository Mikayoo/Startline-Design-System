// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-599
// source=src/components/choice-card/ChoiceCard.tsx
// component=ChoiceCard
import figma from "figma";
const instance = figma.selectedInstance;
const control = instance.getEnum("Control", { Radio: "radio", Check: "check" });
const selected = instance.getEnum("State", { Default: false, Selected: true });
const helper = instance.getBoolean("Show helper") ? instance.getString("Helper") : null;
const icon = instance.getInstanceSwap("Icon");
let iconName = null;
if (icon && icon.type === "INSTANCE") { const n = icon.getPropertyValue("Name"); if (typeof n === "string") iconName = n.toLowerCase().replace(/ /g, "-"); }
export default {
  example: figma.code`<ChoiceCard
  name="question"
  value="option"
  control="${control}"${iconName ? figma.code`
  icon="${iconName}"` : ""}
  title="${instance.getString("Title")}"${helper ? figma.code`
  helper="${helper}"` : ""}${selected ? figma.code`
  defaultChecked` : ""}
/>`,
  imports: ['import { ChoiceCard } from "@startline/ui"'],
  id: "choice-card",
  metadata: { nestable: true },
};
