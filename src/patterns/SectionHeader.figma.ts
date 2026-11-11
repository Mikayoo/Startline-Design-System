// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3529
// source=src/patterns/ScreenPatterns.tsx
// component=SectionHeader
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<SectionHeader title="${instance.getString("Title")}" actionLabel="${instance.getString("Action")}" actionHref="/…" />`,
  imports: ['import { SectionHeader } from "@startline/ui"'],
  id: "section-header",
  metadata: { nestable: true },
};
