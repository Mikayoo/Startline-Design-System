import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReviewRow } from "./ReviewRow";

const meta = {
  title: "Components/ReviewRow",
  component: ReviewRow,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-626" } },
  args: { icon: "file", label: "Situation", value: "Refugee claimant", onAction: () => {} },
  decorators: [(Story) => <div className="w-86 rounded-xl bg-surface-primary px-4"><Story /></div>],
} satisfies Meta<typeof ReviewRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const List: Story = {
  render: () => (
    <ul className="divide-y divide-border-subtle">
      <li><ReviewRow icon="file" label="Situation" value="Refugee claimant" onAction={() => {}} /></li>
      <li><ReviewRow icon="pin" label="City" value="Kitchener, Ontario" onAction={() => {}} /></li>
      <li><ReviewRow icon="speech" label="Language" value="Arabic" onAction={() => {}} /></li>
    </ul>
  ),
};
