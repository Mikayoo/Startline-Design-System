// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1930
// source=src/components/logo/Logo.tsx
// component=LogoMark
import figma from "figma";
const instance = figma.selectedInstance;
const theme = instance.getEnum("Theme", { Color: "color", Mono: "mono", Inverse: "inverse" });

export default {
  example: figma.code`<LogoMark theme="${theme}" />`,
  imports: ['import { LogoMark } from "@startline/ui"'],
  id: "logo-mark",
  metadata: { nestable: true },
};
