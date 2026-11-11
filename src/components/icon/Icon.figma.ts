// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1995
// source=src/components/icon/Icon.tsx
// component=Icon
import figma from "figma";
const instance = figma.selectedInstance;

const name = instance.getEnum("Name", {
  Search: "search",
  "Chevron Right": "chevron-right",
  Check: "check",
  Close: "close",
  Home: "home",
  Path: "path",
  Resources: "resources",
  Chat: "chat",
  Profile: "profile",
  Bell: "bell",
  Calendar: "calendar",
  "Map Pin": "map-pin",
});

export default {
  example: figma.code`<Icon name="${name}" />`,
  imports: ['import { Icon } from "@startline/ui"'],
  id: "icon",
  metadata: { nestable: true },
};
