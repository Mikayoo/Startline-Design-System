import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchField } from "./SearchField";

const meta = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2158" } },
  args: { "aria-label": "Search resources", placeholder: "Search", size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["md", "lg"] } },
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };

/** Controlled, with the clear button (Figma `Show clear`). */
export const WithClear: Story = {
  render: (args) => {
    const [q, setQ] = React.useState("Housing support");
    return <SearchField {...args} value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <SearchField aria-label="Default" size={size} placeholder="Search" />
          <SearchField aria-label="Filled" size={size} defaultValue="Housing support" onClear={() => {}} />
          <SearchField aria-label="Disabled" size={size} placeholder="Search" disabled />
        </div>
      ))}
    </div>
  ),
};
