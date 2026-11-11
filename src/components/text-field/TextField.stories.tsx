import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=95-1959" } },
  args: { label: "Provider or contact", placeholder: "Enter a name" },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHelper: Story = { args: { helper: "Check the details before saving" } };
export const Filled: Story = { args: { defaultValue: "Community legal clinic" } };
export const Error: Story = { args: { defaultValue: "12", error: "Enter the full name of the provider, for example “Riverside Clinic”." } };
export const Disabled: Story = { args: { disabled: true } };

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TextField label="Default" placeholder="Enter a name" />
      <TextField label="Filled" defaultValue="Community legal clinic" helper="Check the details before saving" />
      <TextField label="Error" defaultValue="12" error="Enter the full name of the provider." />
      <TextField label="Disabled" placeholder="Enter a name" disabled />
    </div>
  ),
};
