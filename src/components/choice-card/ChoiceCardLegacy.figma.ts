// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1043
// source=src/components/choice-card/ChoiceCard.tsx
// component=ChoiceCard
import figma from "figma";
const instance = figma.selectedInstance;
// Legacy (pre-v3.1) Choice card → same code component.
const control = instance.getEnum("Selection", { Single: "radio", Multiple: "check" });
const selected = instance.getEnum("State", { Default: false, Selected: true });
const helper = instance.getBoolean("Show helper") ? instance.getString("Helper") : null;
export default {
  example: figma.code`<ChoiceCard name="question" value="option" control="${control}" title="${instance.getString("Label")}"${helper ? figma.code` helper="${helper}"` : ""}${selected ? figma.code` defaultChecked` : ""} />`,
  imports: ['import { ChoiceCard } from "@startline/ui"'],
  id: "choice-card-legacy",
  metadata: { nestable: true },
};
