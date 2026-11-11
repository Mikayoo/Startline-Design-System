import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlanCard } from "./PlanCard";

const meta = {
  title: "Components/PlanCard",
  component: PlanCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-619" } },
  args: { state: "default", step: "Step 2", topic: "Legal help", title: "Get free legal help", time: "About 30 min", location: "Kitchener", href: "#" },
  argTypes: { state: { control: "inline-radio", options: ["default", "next"] } },
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof PlanCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Next: Story = { args: { state: "next", topic: "Housing", title: "Find a safe place to stay", time: "About 20 min" } };
