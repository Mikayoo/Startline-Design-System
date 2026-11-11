// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1959
// source=src/components/text-field/TextField.tsx
// component=TextField
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const value = instance.getString("Value");
const helper = instance.getString("Helper");
const showHelper = instance.getBoolean("Show helper");
const state = instance.getEnum("State", { Default: "default", Focus: "default", Filled: "filled", Error: "error", Disabled: "disabled" });

export default {
  example: figma.code`<TextField
  label="${label}"${state === "filled" ? figma.code`
  value="${value}"
  onChange={(e) => setValue(e.target.value)}` : figma.code`
  placeholder="${value}"`}${state === "error" ? figma.code`
  error="${helper}"` : showHelper ? figma.code`
  helper="${helper}"` : ""}${state === "disabled" ? figma.code`
  disabled` : ""}
/>`,
  imports: ['import { TextField } from "@startline/ui"'],
  id: "text-field",
  metadata: { nestable: true },
};
