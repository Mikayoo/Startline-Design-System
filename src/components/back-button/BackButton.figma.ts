// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1044
// source=src/components/back-button/BackButton.tsx
// component=BackButton
import figma from "figma";

// Legacy Back button (pre-v3.1). New screens use Startline / Icon button with Arrow left.
export default {
  example: figma.code`<BackButton onClick={() => history.back()} />`,
  imports: ['import { BackButton } from "@startline/ui"'],
  id: "back-button",
  metadata: { nestable: true },
};
