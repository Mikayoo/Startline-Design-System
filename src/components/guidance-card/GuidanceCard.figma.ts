// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2007
// source=src/components/guidance-card/GuidanceCard.tsx
// component=GuidanceCard
import figma from "figma";
const instance = figma.selectedInstance;

const layout = instance.getEnum("Layout", { Card: "card", Row: "row", Tile: "tile" });
const tone = instance.getEnum("Tone", { Neutral: "neutral", Info: "info" });
const body = instance.getBoolean("Show body") ? instance.getString("Body") : null;

export default {
  example: figma.code`<GuidanceCard
  layout="${layout}"
  tone="${tone}"
  title="${instance.getString("Title")}"${body ? figma.code`
  body="${body}"` : ""}
/>`,
  imports: ['import { GuidanceCard } from "@startline/ui"'],
  id: "guidance-card",
  metadata: { nestable: true },
};
