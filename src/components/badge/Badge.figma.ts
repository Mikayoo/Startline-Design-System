// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1930
// source=src/components/badge/Badge.tsx
// component=Badge
import figma from "figma";
const instance = figma.selectedInstance;

const label = instance.getString("Label");
const status = instance.getEnum("Status", { Neutral: "neutral", Info: "info", Success: "success", Warning: "warning", Error: "error" });
const size = instance.getEnum("Size", { SM: "sm", MD: "md" });
const dot = instance.getBoolean("Show dot");

export default {
  example: figma.code`<Badge status="${status}" size="${size}"${dot ? "" : " dot={false}"}>${label}</Badge>`,
  imports: ['import { Badge } from "@startline/ui"'],
  id: "badge",
  metadata: { nestable: true },
};
