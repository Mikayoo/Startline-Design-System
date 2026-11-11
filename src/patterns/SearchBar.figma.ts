// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3490
// source=src/patterns/ScreenPatterns.tsx
// component=SearchBar
import figma from "figma";
const instance = figma.selectedInstance;
const p = instance.getString("Placeholder");
export default {
  example: figma.code`<SearchBar aria-label="${p}" placeholder="${p}" onAsk={openAssistant} />`,
  imports: ['import { SearchBar } from "@startline/ui"'],
  id: "search-bar",
  metadata: { nestable: true },
};
