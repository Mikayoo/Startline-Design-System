// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1946
// source=src/components/logo/Logo.tsx
// component=LogoLockup
import figma from "figma";
const instance = figma.selectedInstance;
const layout = instance.getEnum("Layout", { Horizontal: "horizontal", Stacked: "stacked" });
const theme = instance.getEnum("Theme", { Color: "color", Mono: "mono", Inverse: "inverse" });

export default {
  example: figma.code`<LogoLockup layout="${layout}" theme="${theme}" />`,
  imports: ['import { LogoLockup } from "@startline/ui"'],
  id: "logo-lockup",
  metadata: { nestable: true },
};
