// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3539
// source=src/patterns/ScreenPatterns.tsx
// component=RecommendationCard
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<RecommendationCard image={photoUrl} topic="${instance.getString("Topic")}" title="${instance.getString("Title")}" source="${instance.getString("Source")}" href="/…" />`,
  imports: ['import { RecommendationCard } from "@startline/ui"'],
  id: "recommendation-card",
  metadata: { nestable: true },
};
