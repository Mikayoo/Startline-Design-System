import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2004" } },
  args: { children: "Housing", size: "sm", selected: false, disabled: false },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] }, leadingIcon: { control: false } },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true, leadingIcon: <Icon name="check" /> } };
export const Disabled: Story = { args: { disabled: true } };

/** A working filter row. */
export const FilterRow: Story = {
  render: () => {
    const [on, setOn] = React.useState<Record<string, boolean>>({ Housing: true });
    return (
      <div className="flex flex-wrap gap-2">
        {["Housing", "Health", "Legal", "Language", "Work"].map((l) => (
          <Chip key={l} selected={!!on[l]} onSelectedChange={(v) => setOn({ ...on, [l]: v })} leadingIcon={on[l] ? <Icon name="check" /> : undefined}>
            {l}
          </Chip>
        ))}
      </div>
    );
  },
};

/** Same grid as Figma: State × Size. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-surface-primary p-8">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex gap-3">
          <Chip size={size}>Housing</Chip>
          <Chip size={size} selected>Housing</Chip>
          <Chip size={size} disabled>Housing</Chip>
        </div>
      ))}
    </div>
  ),
};
