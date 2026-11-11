import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResourceListItem } from "./ResourceListItem";

const meta = {
  title: "Components/ResourceListItem",
  component: ResourceListItem,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2274" } },
  args: { provider: "Government resource", title: "Resource title", description: "Official guidance relevant to your current path.", kind: "resource", emphasis: "default" },
  argTypes: { kind: { control: "inline-radio", options: ["resource", "service"] }, emphasis: { control: "inline-radio", options: ["recommended", "default"] } },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof ResourceListItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Recommended: Story = { args: { emphasis: "recommended" } };
export const Service: Story = { args: { kind: "service", provider: "Community organisation" } };

/** Same grid as Figma: Kind × Emphasis, as a list. */
export const AllVariants: Story = {
  render: (args) => (
    <ul className="flex flex-col gap-3">
      <li><ResourceListItem {...args} kind="resource" emphasis="recommended" href="#" /></li>
      <li><ResourceListItem {...args} kind="resource" emphasis="default" href="#" /></li>
      <li><ResourceListItem {...args} kind="service" emphasis="recommended" href="#" /></li>
      <li><ResourceListItem {...args} kind="service" emphasis="default" href="#" /></li>
    </ul>
  ),
};
