// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-620
// source=src/components/select-field/SelectField.tsx
// component=SelectField
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<SelectField label="${instance.getString("Label")}" value={value} onValueChange={setValue} options={options /* includes "${instance.getString("Value")}" */} />`,
  imports: ['import { SelectField } from "@startline/ui"'],
  id: "select-field",
  metadata: { nestable: true },
};
