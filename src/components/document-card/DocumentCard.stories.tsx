import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocumentCard } from "./DocumentCard";

const meta = {
  title: "Components/DocumentCard",
  component: DocumentCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=934-318" } },
  args: {
    title: "Refugee Protection Claimant Document",
    helper: "Often called the brown paper",
    body: "Some services ask to see it. If you don’t have it yet, ask the service what to bring instead.",
    level: "recommended",
  },
  argTypes: { level: { control: "inline-radio", options: ["required", "recommended", "helpful"] } },
  decorators: [(Story) => <div className="w-86 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof DocumentCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Recommended: Story = {};
export const Helpful: Story = {
  args: { title: "Letters about your claim or housing", helper: "Any you already have", body: "Keeps names, dates and reference details in one place.", level: "helpful" },
};
export const Required: Story = { args: { level: "required" } };

/** The list on "Documents you may need" (screen 54). Sample content. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DocumentCard title="Refugee Protection Claimant Document" helper="Often called the brown paper" body="Some services ask to see it. If you don’t have it yet, ask the service what to bring instead." level="recommended" />
      <DocumentCard icon="user" title="Photo ID" helper="Passport or other ID, if you have one" body="Helps a service know who they’re helping. If you don’t have one, ask what they accept." level="recommended" />
      <DocumentCard title="Letters about your claim or housing" helper="Any you already have" body="Keeps names, dates and reference details in one place when you talk to someone." level="helpful" />
      <DocumentCard title="Example required document" helper="Shown when a service requires it" body="Say what to do if the person doesn’t have it." level="required" />
    </div>
  ),
};
