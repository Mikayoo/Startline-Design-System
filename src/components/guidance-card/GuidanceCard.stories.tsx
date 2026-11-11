import type { Meta, StoryObj } from "@storybook/react-vite";
import { GuidanceCard } from "./GuidanceCard";

const meta = {
  title: "Components/GuidanceCard",
  component: GuidanceCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=96-2007" } },
  args: { title: "Prepare for your next step", body: "Keep useful details together so you can ask for the right support.", layout: "card", tone: "neutral" },
  argTypes: { layout: { control: "inline-radio", options: ["card", "row", "tile"] }, tone: { control: "inline-radio", options: ["neutral", "info"] } },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof GuidanceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {};
export const Info: Story = { args: { tone: "info" } };
export const Row: Story = { args: { layout: "row" } };

/** Tiles in a two-column grid, as designed. */
export const Tiles: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      <GuidanceCard {...args} layout="tile" tone="neutral" />
      <GuidanceCard {...args} layout="tile" tone="info" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <GuidanceCard {...args} layout="card" tone="neutral" />
      <GuidanceCard {...args} layout="card" tone="info" />
      <GuidanceCard {...args} layout="row" />
      <div className="grid grid-cols-2 gap-3">
        <GuidanceCard {...args} layout="tile" tone="neutral" />
        <GuidanceCard {...args} layout="tile" tone="info" />
      </div>
    </div>
  ),
};
