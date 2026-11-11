// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1984
// source=src/components/switch/Switch.tsx
// component=Switch
import figma from "figma";
const instance = figma.selectedInstance;

const checked = instance.getEnum("Checked", { False: false, True: true });
const disabled = instance.getEnum("State", { Default: false, Disabled: true });

export default {
  example: figma.code`<Switch
  aria-label="Setting name"
  checked={${checked ? "true" : "false"}}
  onCheckedChange={setChecked}${disabled ? figma.code`
  disabled` : ""}
/>`,
  imports: ['import { Switch } from "@startline/ui"'],
  id: "switch",
  metadata: { nestable: true },
};
