import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1984" } },
  args: { "aria-label": "Appointment reminders", defaultChecked: false, disabled: false },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

/** Same grid as Figma: Checked × State. */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 bg-surface-primary p-8">
      <Switch aria-label="Off" />
      <Switch aria-label="Off disabled" disabled />
      <Switch aria-label="On" defaultChecked />
      <Switch aria-label="On disabled" defaultChecked disabled />
    </div>
  ),
};
