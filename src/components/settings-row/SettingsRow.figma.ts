// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2023
// source=src/components/settings-row/SettingsRow.tsx
// component=SettingsRow
import figma from "figma";
const instance = figma.selectedInstance;

const disabled = instance.getEnum("State", { Default: false, Pressed: false, Disabled: true });

export default {
  example: figma.code`<SettingsRow
  label="${instance.getString("Label")}"
  value="${instance.getString("Value")}"
  href="/settings/…"${disabled ? figma.code`
  disabled` : ""}
/>`,
  imports: ['import { SettingsRow } from "@startline/ui"'],
  id: "settings-row",
  metadata: { nestable: true },
};
