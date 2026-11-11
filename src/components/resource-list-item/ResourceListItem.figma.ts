// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2274
// source=src/components/resource-list-item/ResourceListItem.tsx
// component=ResourceListItem
import figma from "figma";
const instance = figma.selectedInstance;

const kind = instance.getEnum("Kind", { Resource: "resource", Service: "service" });
const emphasis = instance.getEnum("Emphasis", { Recommended: "recommended", Default: "default" });

export default {
  example: figma.code`<ResourceListItem
  kind="${kind}"
  emphasis="${emphasis}"
  provider="${instance.getString("Provider")}"
  title="${instance.getString("Title")}"
  description="${instance.getString("Description")}"
  href="/resources/…"
/>`,
  imports: ['import { ResourceListItem } from "@startline/ui"'],
  id: "resource-list-item",
  metadata: { nestable: true },
};
