// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2004
// source=src/components/chip/Chip.tsx
// component=Chip
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const size = instance.getEnum("Size", { SM: "sm", MD: "md" });
const selected = instance.getEnum("State", { Default: false, Selected: true, Disabled: false });
const disabled = instance.getEnum("State", { Default: false, Selected: false, Disabled: true });
const icon = instance.getBoolean("Show leading icon");

export default {
  example: figma.code`<Chip
  size="${size}"
  selected={${selected ? "true" : "false"}}
  onSelectedChange={setSelected}${icon ? figma.code`
  leadingIcon={<Icon name="check" />}` : ""}${disabled ? figma.code`
  disabled` : ""}
>
  ${label}
</Chip>`,
  imports: ['import { Chip, Icon } from "@startline/ui"'],
  id: "chip",
  metadata: { nestable: true },
};
