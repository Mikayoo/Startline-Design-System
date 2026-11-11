import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import { ICON_NAMES } from "./icons";

const meta = {
  title: "Foundations/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-1995" } },
  args: { name: "search" },
  argTypes: { name: { control: "select", options: ICON_NAMES } },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <span className="text-text-brand"><Icon {...args} /></span> };

/** All 12 icons. They take the text colour of their parent. */
export const AllIcons: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-4 gap-6 bg-surface-primary p-8 text-text-brand">
      {ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center gap-2">
          <Icon name={n} />
          <span className="text-caption text-text-secondary">{n}</span>
        </div>
      ))}
    </div>
  ),
};
