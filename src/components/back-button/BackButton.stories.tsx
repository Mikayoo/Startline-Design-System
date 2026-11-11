import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackButton } from "./BackButton";

const meta = {
  title: "Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=68-1044" } },
  args: { label: "Back" },
} satisfies Meta<typeof BackButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** In a detail-screen header. */
export const InHeader: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <header className="flex w-90 items-center gap-3 bg-surface-warm p-4">
      <BackButton label="Back to Resources" />
      <h1 className="text-card-title text-text-primary">Housing support</h1>
    </header>
  ),
};
