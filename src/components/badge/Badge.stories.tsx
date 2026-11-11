import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const statuses = ["neutral", "info", "success", "warning", "error"] as const;
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1930" } },
  args: { children: "Optional", status: "neutral", size: "sm", dot: true },
  argTypes: { status: { control: "inline-radio", options: statuses }, size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { status: "success", children: "Approved" } };
export const Error: Story = { args: { status: "error", children: "Action needed" } };

/** Same grid as Figma: Status × Size. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-surface-primary p-8">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex flex-wrap gap-3">
          {statuses.map((s) => (
            <Badge key={s} status={s} size={size}>{s[0]!.toUpperCase() + s.slice(1)}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
