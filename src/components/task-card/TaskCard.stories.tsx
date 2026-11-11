import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskCard } from "./TaskCard";

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2219" } },
  args: {
    state: "next",
    title: "Apply for a Social Insurance Number",
    description: "You need a SIN to work in Canada and access some government programs.",
    meta: "Recommended today",
    actionLabel: "Start this step",
    actionHref: "#",
  },
  argTypes: { state: { control: "inline-radio", options: ["next", "upcoming", "complete"] } },
  decorators: [(Story) => <div className="w-90 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof TaskCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Next: Story = {};
export const Upcoming: Story = { args: { state: "upcoming" } };
export const Complete: Story = { args: { state: "complete" } };

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TaskCard {...args} state="next" />
      <TaskCard {...args} state="upcoming" />
      <TaskCard {...args} state="complete" />
    </div>
  ),
};
