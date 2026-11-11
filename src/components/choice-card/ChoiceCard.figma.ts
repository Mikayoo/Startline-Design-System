// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1043
// source=src/components/choice-card/ChoiceCard.tsx
// component=ChoiceCard
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const helper = instance.getString("Helper");
const showHelper = instance.getBoolean("Show helper");
const selection = instance.getEnum("Selection", { Single: "single", Multiple: "multiple" });
const selected = instance.getEnum("State", { Default: false, Selected: true });

export default {
  example: figma.code`<ChoiceCard
  name="question"
  value="option"
  selection="${selection}"
  label="${label}"${showHelper ? figma.code`
  helper="${helper}"` : ""}${selected ? figma.code`
  defaultChecked` : ""}
/>`,
  imports: ['import { ChoiceCard } from "@startline/ui"'],
  id: "choice-card",
  metadata: { nestable: true },
};
