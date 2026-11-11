import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsRow } from "./SettingsRow";

const meta = {
  title: "Components/SettingsRow",
  component: SettingsRow,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2023" } },
  args: { label: "Language", value: "English", href: "#" },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof SettingsRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, href: undefined } };

/** A settings list (press a row to see the Pressed state). */
export const List: Story = {
  render: () => (
    <ul className="flex flex-col gap-2">
      <li><SettingsRow label="Language" value="English" href="#" /></li>
      <li><SettingsRow label="Notifications" value="Appointment reminders on" href="#" /></li>
      <li><SettingsRow label="Location" value="Not shared" disabled /></li>
    </ul>
  ),
};
