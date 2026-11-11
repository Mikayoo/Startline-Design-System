// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1995
// source=src/components/icon/Icon.tsx
// component=Icon
import figma from "figma";
const instance = figma.selectedInstance;

// Legacy 12-icon set (still referenced by older components). Maps to the v3.1 names.
const name = instance.getEnum("Name", {
  Search: "search", "Chevron Right": "chevron-right", Check: "check", Close: "close", Home: "home",
  Path: "route", Resources: "book", Chat: "speech", Profile: "user", Bell: "bell", Calendar: "calendar", "Map Pin": "pin",
});

export default {
  example: figma.code`<Icon name="${name}" />`,
  imports: ['import { Icon } from "@startline/ui"'],
  id: "icon-legacy",
  metadata: { nestable: true },
};
