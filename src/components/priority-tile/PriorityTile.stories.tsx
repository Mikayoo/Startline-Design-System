import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriorityTile } from "./PriorityTile";
import type { IconName } from "../icon/icons";

const meta = {
  title: "Components/PriorityTile",
  component: PriorityTile,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=593-582" } },
  args: { icon: "home", label: "Housing", selected: false },
  decorators: [(Story) => <div className="w-44 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof PriorityTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };

/** A working 2-column picker. */
export const Grid: Story = {
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
  render: () => {
    const items: [IconName, string][] = [["home", "Housing"], ["briefcase", "Work"], ["heart", "Health"], ["speech", "Language"], ["school", "Education"], ["users", "Community"]];
    const [sel, setSel] = React.useState<Record<string, boolean>>({ Housing: true });
    return (
      <div className="grid grid-cols-2 gap-3">
        {items.map(([i, l]) => <PriorityTile key={l} icon={i} label={l} selected={!!sel[l]} onSelectedChange={(v) => setSel({ ...sel, [l]: v })} />)}
      </div>
    );
  },
};
