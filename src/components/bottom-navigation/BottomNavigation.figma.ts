// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=604-1438
// source=src/components/bottom-navigation/BottomNavigation.tsx
// component=BottomNavigation
import figma from "figma";
const instance = figma.selectedInstance;

const active = instance.getEnum("Active", { Home: "home", "My Path": "my-path", Ask: "ask", Resources: "resources", Profile: "profile" });

export default {
  example: figma.code`<BottomNavigation active="${active}" />`,
  imports: ['import { BottomNavigation } from "@startline/ui"'],
  id: "bottom-navigation",
  metadata: { nestable: true },
};
