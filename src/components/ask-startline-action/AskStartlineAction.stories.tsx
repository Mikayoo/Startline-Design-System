import type { Meta, StoryObj } from "@storybook/react-vite";
import { AskStartlineAction } from "./AskStartlineAction";

const meta = {
  title: "Components/AskStartlineAction",
  component: AskStartlineAction,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2076" } },
  args: { format: "compact", children: "Ask Startline", disabled: false },
  argTypes: { format: { control: "inline-radio", options: ["compact", "contextual"] } },
} satisfies Meta<typeof AskStartlineAction>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = {};
export const Contextual: Story = { args: { format: "contextual" } };

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 bg-surface-primary p-8">
      <AskStartlineAction format="compact" />
      <AskStartlineAction format="compact" disabled />
      <AskStartlineAction format="contextual" />
      <AskStartlineAction format="contextual" disabled />
    </div>
  ),
};
