// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=934-318
// source=src/components/document-card/DocumentCard.tsx
// component=DocumentCard
import figma from "figma";
const instance = figma.selectedInstance;

const level = instance.getEnum("Level", { Required: "required", Recommended: "recommended", Helpful: "helpful" });

export default {
  example: figma.code`<DocumentCard
  level="${level}"
  title="${instance.getString("Title")}"
  helper="${instance.getString("Helper")}"
  body="${instance.getString("Body")}"
/>`,
  imports: ['import { DocumentCard } from "@startline/ui"'],
  id: "document-card",
  metadata: { nestable: true },
};
