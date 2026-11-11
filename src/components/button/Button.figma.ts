// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2027
// source=src/components/button/Button.tsx
// component=Button
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const variant = instance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
  Tertiary: "tertiary",
  Destructive: "destructive",
});
const size = instance.getEnum("Size", { MD: "md", LG: "lg" });
// Hover and Pressed are CSS states in code; only Disabled becomes a prop.
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Disabled: true });

const leading = instance.getBoolean("Show leading icon") ? instance.getInstanceSwap("Leading icon") : null;
let leadingCode;
if (leading && leading.type === "INSTANCE") leadingCode = leading.executeTemplate().example;

const trailing = instance.getBoolean("Show trailing icon") ? instance.getInstanceSwap("Trailing icon") : null;
let trailingCode;
if (trailing && trailing.type === "INSTANCE") trailingCode = trailing.executeTemplate().example;

export default {
  example: figma.code`<Button
  variant="${variant}"
  size="${size}"${disabled ? figma.code`
  disabled` : ""}${leadingCode ? figma.code`
  leadingIcon={${leadingCode}}` : ""}${trailingCode ? figma.code`
  trailingIcon={${trailingCode}}` : ""}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@startline/ui"'],
  id: "button",
  metadata: { nestable: true },
};
