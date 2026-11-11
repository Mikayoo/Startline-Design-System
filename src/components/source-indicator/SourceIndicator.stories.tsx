import type { Meta, StoryObj } from "@storybook/react-vite";
import { SourceIndicator } from "./SourceIndicator";

const kinds = [["official", "Official source"], ["verified", "Verified"], ["updated", "Updated 3 May"], ["ai-summary", "AI summary"]] as const;
const meta = {
  title: "Components/SourceIndicator",
  component: SourceIndicator,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-1961" } },
  args: { children: "Official source", kind: "official", size: "sm" },
  argTypes: { kind: { control: "inline-radio", options: kinds.map((k) => k[0]) }, size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof SourceIndicator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AISummary: Story = { name: "AI summary", args: { kind: "ai-summary", children: "AI summary" } };

/** Same grid as Figma: Kind × Size. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-surface-primary p-8">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex flex-wrap gap-3">
          {kinds.map(([k, l]) => <SourceIndicator key={k} kind={k} size={size}>{l}</SourceIndicator>)}
        </div>
      ))}
    </div>
  ),
};
