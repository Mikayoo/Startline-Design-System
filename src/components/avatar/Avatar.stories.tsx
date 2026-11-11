import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=93-2040" } },
  args: { initials: "AM", size: "md", name: "Amina Mohamed" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] }, type: { control: "inline-radio", options: ["initials", "icon"] } },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const IconAvatar: Story = { name: "Icon", args: { initials: undefined, type: "icon" } };

/** Same grid as Figma: Type × Size. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-surface-primary p-8">
      {(["initials", "icon"] as const).map((type) => (
        <div key={type} className="flex items-center gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Avatar key={size} type={type} size={size} initials="AM" name="Amina Mohamed" />
          ))}
        </div>
      ))}
    </div>
  ),
};
