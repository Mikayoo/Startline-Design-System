// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2076
// source=src/components/ask-startline-action/AskStartlineAction.tsx
// component=AskStartlineAction
import figma from "figma";
const instance = figma.selectedInstance;

const format = instance.getEnum("Format", { Compact: "compact", Contextual: "contextual" });
const disabled = instance.getEnum("State", { Default: false, Hover: false, Pressed: false, Disabled: true });

export default {
  example: figma.code`<AskStartlineAction format="${format}" onClick={openAssistant}${disabled ? figma.code` disabled` : ""}>
  ${instance.getString("Label")}
</AskStartlineAction>`,
  imports: ['import { AskStartlineAction } from "@startline/ui"'],
  id: "ask-startline-action",
  metadata: { nestable: true },
};
