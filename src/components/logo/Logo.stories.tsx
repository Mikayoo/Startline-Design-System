import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppIcon, LogoLockup, LogoMark } from "./Logo";

const meta = {
  title: "Foundations/Logo",
  component: LogoLockup,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1946" } },
  args: { layout: "horizontal", theme: "color" },
  argTypes: {
    layout: { control: "inline-radio", options: ["horizontal", "stacked"] },
    theme: { control: "inline-radio", options: ["color", "mono", "inverse"] },
  },
} satisfies Meta<typeof LogoLockup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Lockup: Story = {};
export const Stacked: Story = { args: { layout: "stacked" } };

/** All themes on the surfaces they are meant for. */
export const Themes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8 rounded-lg bg-surface-primary p-6">
        <LogoMark theme="color" />
        <LogoMark theme="mono" />
        <LogoLockup theme="color" markSize={48} />
        <AppIcon />
      </div>
      <div className="flex items-center gap-8 rounded-lg bg-surface-brand p-6">
        <LogoMark theme="inverse" />
        <LogoLockup theme="inverse" markSize={48} />
      </div>
    </div>
  ),
};
