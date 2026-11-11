import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField } from "./SelectField";

const provinces = [
  { value: "on", label: "Ontario" }, { value: "qc", label: "Québec" }, { value: "bc", label: "British Columbia" }, { value: "ab", label: "Alberta" },
];
const meta = {
  title: "Components/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-620" } },
  args: { label: "Province or territory", options: provinces, defaultValue: "on" },
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof SelectField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Placeholder: Story = { args: { defaultValue: "", placeholder: "Choose a province" } };
export const Disabled: Story = { args: { disabled: true } };
