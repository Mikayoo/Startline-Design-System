// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3562
// source=src/patterns/ScreenPatterns.tsx
// component=EventCard
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<EventCard image={photoUrl} date="${instance.getString("Date")}" title="${instance.getString("Title")}" location="${instance.getString("Location")}" href="/…" />`,
  imports: ['import { EventCard } from "@startline/ui"'],
  id: "event-card",
  metadata: { nestable: true },
};
