// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2219
// source=src/components/task-card/TaskCard.tsx
// component=TaskCard
import figma from "figma";
const instance = figma.selectedInstance;

const state = instance.getEnum("State", { Next: "next", Upcoming: "upcoming", Complete: "complete" });
const title = instance.getString("Title");
const description = instance.getBoolean("Show description") ? instance.getString("Description") : null;
const meta = instance.getBoolean("Show meta") ? instance.getString("Meta") : null;
const action = instance.getString("Action label");

export default {
  example: figma.code`<TaskCard
  state="${state}"
  title="${title}"${description ? figma.code`
  description="${description}"` : ""}${meta ? figma.code`
  meta="${meta}"` : ""}
  actionLabel="${action}"
  actionHref="/steps/…"
/>`,
  imports: ['import { TaskCard } from "@startline/ui"'],
  id: "task-card",
  metadata: { nestable: true },
};
