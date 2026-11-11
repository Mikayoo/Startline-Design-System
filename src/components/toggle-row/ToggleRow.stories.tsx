import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleRow } from "./ToggleRow";

const meta = {
  title: "Components/ToggleRow",
  component: ToggleRow,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=584-455" } },
  args: { label: "3 days before", defaultChecked: true },
  decorators: [(Story) => <div className="w-80 rounded-xl bg-surface-primary px-4"><Story /></div>],
} satisfies Meta<typeof ToggleRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Reminders: Story = {
  render: () => (
    <div>
      <ToggleRow label="3 days before" defaultChecked />
      <ToggleRow label="The day before" defaultChecked />
      <ToggleRow label="1 hour before" description="Sent as a phone notification" />
    </div>
  ),
};
