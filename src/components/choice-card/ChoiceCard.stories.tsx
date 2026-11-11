import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceCard } from "./ChoiceCard";

const meta = {
  title: "Components/ChoiceCard",
  component: ChoiceCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1043" } },
  args: { label: "Choose an option", name: "demo", selection: "single" },
  argTypes: { selection: { control: "inline-radio", options: ["single", "multiple"] } },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof ChoiceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Multiple: Story = { args: { selection: "multiple" } };
export const WithHelper: Story = { args: { helper: "Supporting information" } };

/** A real question: pick one priority. */
export const SingleChoiceGroup: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-card-title text-text-primary">What do you need help with first?</legend>
      <ChoiceCard name="priority" value="housing" label="Housing" helper="Find a safe place to live" defaultChecked />
      <ChoiceCard name="priority" value="health" label="Health" />
      <ChoiceCard name="priority" value="language" label="Language" />
    </fieldset>
  ),
};

/** Same grid as Figma: Selection × State. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChoiceCard name="s1" label="Single · default" />
      <ChoiceCard name="s2" label="Single · selected" defaultChecked />
      <ChoiceCard selection="multiple" label="Multiple · default" />
      <ChoiceCard selection="multiple" label="Multiple · selected" defaultChecked />
    </div>
  ),
};
