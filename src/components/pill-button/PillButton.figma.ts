// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-550
// source=src/components/pill-button/PillButton.tsx
// component=PillButton
import figma from "figma";
const instance = figma.selectedInstance;
const variant = instance.getEnum("Variant", { Primary: "primary", Secondary: "secondary", "On dark": "on-dark", Ghost: "ghost" });
const arrow = instance.getBoolean("Show arrow");
export default {
  example: figma.code`<PillButton variant="${variant}"${arrow ? " arrow" : ""}>${instance.getString("Label")}</PillButton>`,
  imports: ['import { PillButton } from "@startline/ui"'],
  id: "pill-button",
  metadata: { nestable: true },
};
