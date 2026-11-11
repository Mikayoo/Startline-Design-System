// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1961
// source=src/components/source-indicator/SourceIndicator.tsx
// component=SourceIndicator
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const kind = instance.getEnum("Kind", { Official: "official", Verified: "verified", Updated: "updated", "AI Summary": "ai-summary" });
const size = instance.getEnum("Size", { SM: "sm", MD: "md" });

export default {
  example: figma.code`<SourceIndicator kind="${kind}" size="${size}">${label}</SourceIndicator>`,
  imports: ['import { SourceIndicator } from "@startline/ui"'],
  id: "source-indicator",
  metadata: { nestable: true },
};
