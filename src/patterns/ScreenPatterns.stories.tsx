import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardHeader, EventCard, QuickAction, ReminderCard, SectionHeader } from "./ScreenPatterns";

const meta = {
  title: "Patterns/Screen patterns",
  component: CardHeader,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=838-3574" } },
  args: { icon: "call", title: "When you call 211" },
  decorators: [(Story) => <div className="flex w-90 flex-col gap-5 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof CardHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardHeaderOneLine: Story = { name: "Card header" };
export const CardHeaderWithDetail: Story = { name: "Card header with detail", args: { icon: "clock", title: "How long it takes", detail: "About 10 minutes" } };

/** An information card as used on App v3.1 detail screens. */
export const InformationCard: Story = {
  render: () => (
    <section className="flex flex-col gap-3 rounded-xl bg-surface-primary p-4 shadow-raised">
      <CardHeader icon="call" title="When you call 211" detail="Free · 24 hours a day" />
      <p className="text-body text-text-secondary">Someone will ask a few questions about your situation and suggest services near you.</p>
    </section>
  ),
};

/** Eyebrow label, section header, quick actions, reminder and event card together. */
export const Overview: Story = {
  render: () => (
    <>
      <p className="text-eyebrow text-text-secondary">DO THESE FIRST</p>
      <h1 className="text-display text-text-primary">My Path</h1>
      <SectionHeader title="Coming up" actionLabel="See all" actionHref="#" />
      <div className="grid grid-cols-3 gap-3">
        <QuickAction icon="calendar" label="My dates" href="#" />
        <QuickAction icon="bookmark" label="Saved" href="#" />
        <QuickAction icon="call" label="Help today" href="#" />
      </div>
      <ReminderCard title="1 reminder this week" detail="Prepare to contact 211 · Tomorrow, 10:00" href="#" />
      <EventCard date="Sat 31 Oct" title="Settlement worker drop-in" location="Kitchener City Hall" href="#" />
    </>
  ),
};
