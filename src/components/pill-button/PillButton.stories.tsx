import type { Meta, StoryObj } from "@storybook/react-vite";
import { PillButton } from "./PillButton";

const meta = {
  title: "Components/PillButton",
  component: PillButton,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=592-550" } },
  args: { children: "Continue", variant: "primary", arrow: false, disabled: false },
  argTypes: { variant: { control: "inline-radio", options: ["primary", "secondary", "on-dark", "ghost"] } },
} satisfies Meta<typeof PillButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { arrow: true } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-86 flex-col gap-4 bg-surface-warm p-4">
      <PillButton arrow className="w-full">Continue</PillButton>
      <PillButton variant="secondary" className="w-full">Save for later</PillButton>
      <div className="rounded-xl bg-surface-brand p-4"><PillButton variant="on-dark" arrow>Continue</PillButton></div>
      <PillButton variant="ghost" className="w-full">Skip for now</PillButton>
      <PillButton disabled className="w-full">Continue</PillButton>
    </div>
  ),
};
