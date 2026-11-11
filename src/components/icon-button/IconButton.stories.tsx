import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-559" } },
  args: { icon: "arrow-left", label: "Back", variant: "light" },
  argTypes: { variant: { control: "inline-radio", options: ["light", "glass"] } },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const WithDot: Story = { args: { icon: "bell", label: "Notifications, 1 unread", dot: true } };
export const Glass: Story = {
  args: { variant: "glass", icon: "bookmark", label: "Save" },
  render: (args) => <div className="rounded-2xl bg-surface-brand p-6"><IconButton {...args} /></div>,
};
