// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2158
// source=src/components/search-field/SearchField.tsx
// component=SearchField
import figma from "figma";
const instance = figma.selectedInstance;

const query = instance.getString("Query");
const size = instance.getEnum("Size", { MD: "md", LG: "lg" });
// Default/Focus show Query as placeholder; Filled shows it as the value. Focus is a CSS state.
const filled = instance.getEnum("State", { Default: false, Focus: false, Filled: true, Disabled: false });
const disabled = instance.getEnum("State", { Default: false, Focus: false, Filled: false, Disabled: true });
const showClear = instance.getBoolean("Show clear");

export default {
  example: figma.code`<SearchField
  aria-label="Search"
  size="${size}"${filled ? figma.code`
  value="${query}"
  onChange={(e) => setQuery(e.target.value)}` : figma.code`
  placeholder="${query}"`}${showClear ? figma.code`
  onClear={() => setQuery("")}` : ""}${disabled ? figma.code`
  disabled` : ""}
/>`,
  imports: ['import { SearchField } from "@startline/ui"'],
  id: "search-field",
  metadata: { nestable: true },
};
