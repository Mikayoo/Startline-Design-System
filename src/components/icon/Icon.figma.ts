// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=831-3828
// source=src/components/icon/Icon.tsx
// component=Icon
import figma from "figma";
const instance = figma.selectedInstance;

const name = instance.getEnum("Name", {
  "Arrow left": "arrow-left", "Arrow right": "arrow-right", Bell: "bell", Book: "book", Bookmark: "bookmark",
  Briefcase: "briefcase", Calendar: "calendar", Call: "call", Check: "check", "Chevron down": "chevron-down",
  "Chevron right": "chevron-right", Child: "child", Clock: "clock", External: "external", File: "file",
  Filter: "filter", Globe: "globe", Heart: "heart", Help: "help", Home: "home", Info: "info", Lock: "lock",
  Mic: "mic", More: "more", Phone: "phone", Pin: "pin", Route: "route", Scale: "scale", School: "school",
  Search: "search", Send: "send", Shield: "shield", Sparkle: "sparkle", Speech: "speech", Star: "star",
  User: "user", Users: "users", "Wifi off": "wifi-off",
});

export default {
  example: figma.code`<Icon name="${name}" />`,
  imports: ['import { Icon } from "@startline/ui"'],
  id: "icon",
  metadata: { nestable: true },
};
