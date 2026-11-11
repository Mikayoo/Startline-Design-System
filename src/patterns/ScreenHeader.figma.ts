// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3480
// source=src/patterns/ScreenPatterns.tsx
// component=ScreenHeader
import figma from "figma";
const instance = figma.selectedInstance;
export default {
  example: figma.code`<ScreenHeader eyebrow="${instance.getString("Eyebrow")}" title="${instance.getString("Title")}" avatarSrc={photoUrl} action={<IconButton icon="bell" label="Notifications" />} />`,
  imports: ['import { IconButton, ScreenHeader } from "@startline/ui"'],
  id: "screen-header",
  metadata: { nestable: true },
};
