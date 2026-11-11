import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceCard } from "./ChoiceCard";

const meta = {
  title: "Components/ChoiceCard",
  component: ChoiceCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-599" } },
  args: { title: "Refugee claimant", helper: "Waiting for a decision on your claim", icon: "shield", name: "demo", control: "radio" },
  argTypes: { control: { control: "inline-radio", options: ["radio", "check"] } },
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof ChoiceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {};
export const Check: Story = { args: { control: "check" } };

/** A real onboarding question. */
export const Question: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-section-title text-text-primary">What is your situation?</legend>
      <ChoiceCard name="status" value="claimant" icon="shield" title="Refugee claimant" helper="Waiting for a decision on your claim" defaultChecked />
      <ChoiceCard name="status" value="pr" icon="home" title="Permanent resident" helper="You have PR status" />
      <ChoiceCard name="status" value="student" icon="school" title="International student" />
    </fieldset>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChoiceCard name="a" icon="shield" title="Radio · default" helper="Helper text" />
      <ChoiceCard name="b" icon="shield" title="Radio · selected" helper="Helper text" defaultChecked />
      <ChoiceCard control="check" icon="users" title="Check · default" />
      <ChoiceCard control="check" icon="users" title="Check · selected" defaultChecked />
    </div>
  ),
};
