// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-2040
// source=src/components/avatar/Avatar.tsx
// component=Avatar
import figma from "figma";
const instance = figma.selectedInstance;

const type = instance.getEnum("Type", { Initials: "initials", Icon: "icon" });
const size = instance.getEnum("Size", { SM: "sm", MD: "md", LG: "lg" });
const initials = instance.getString("Initials");

export default {
  example:
    type === "initials"
      ? figma.code`<Avatar initials="${initials}" size="${size}" name="Full name" />`
      : figma.code`<Avatar type="icon" size="${size}" name="Full name" />`,
  imports: ['import { Avatar } from "@startline/ui"'],
  id: "avatar",
  metadata: { nestable: true },
};
