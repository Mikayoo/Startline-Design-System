// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=584-455
// source=src/components/toggle-row/ToggleRow.tsx
// component=ToggleRow
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<ToggleRow label="${instance.getString("Label")}" checked={checked} onCheckedChange={setChecked} />`,
  imports: ['import { ToggleRow } from "@startline/ui"'],
  id: "toggle-row",
  metadata: { nestable: true },
};
