import type { Meta, StoryObj } from "@storybook/react-vite";
import { AskStartlineAction } from "../ask-startline-action";
import { Badge } from "../badge";
import { Button } from "../button";
import { SourceIndicator } from "../source-indicator";
import { AIAssistantPanel, AIAssistantQuestion, AIAssistantSuggestions } from "./AIAssistantPanel";

const meta = {
  title: "Patterns/AIAssistantPanel",
  component: AIAssistantPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2315" } },
  decorators: [(Story) => <div className="w-110 bg-surface-warm p-4"><Story /></div>],
} satisfies Meta<typeof AIAssistantPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Entry: Story = {
  render: () => (
    <AIAssistantPanel state="entry" subtitle="AI navigation assistant" footnote="Trusted sources stay visible in the answer.">
      <h2 className="text-screen-heading text-text-primary">What can I help you understand?</h2>
      <p className="text-body text-text-secondary">
        Ask in your own words. Startline will explain the information, show where it comes from, and help you find the next useful step.
      </p>
      <AIAssistantSuggestions suggestions={["What should I do first?", "What benefits may apply to me?", "Help me understand this document"]} />
      <AskStartlineAction className="self-start" />
    </AIAssistantPanel>
  ),
};

export const Answer: Story = {
  render: () => (
    <AIAssistantPanel state="answer" subtitle="Answer with sources" footnote="Startline organizes the guidance; the linked source remains authoritative.">
      <AIAssistantQuestion>I just arrived in Ontario. What should I do first?</AIAssistantQuestion>
      <SourceIndicator kind="ai-summary">AI summary · sources shown</SourceIndicator>
      <p className="text-body text-text-primary">
        A useful first step is to make sure your core identity and work documents are in place. If you plan to work, applying for a Social
        Insurance Number is usually one of the first tasks. Your exact next steps can change based on your immigration status, family, and province.
      </p>
      <div className="flex flex-col gap-1">
        <p className="text-label text-text-brand">Why this matters</p>
        <p className="text-body text-text-secondary">It helps unlock employment and connects to several other settlement tasks.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <SourceIndicator kind="official">Official source</SourceIndicator>
        <SourceIndicator kind="updated">Updated Aug 2026</SourceIndicator>
      </div>
      <Button asChild className="self-start"><a href="#source">Open official source</a></Button>
      <AskStartlineAction format="contextual" className="self-start">Ask a follow-up</AskStartlineAction>
    </AIAssistantPanel>
  ),
};

export const Escalation: Story = {
  render: () => (
    <AIAssistantPanel state="escalation" subtitle="When confirmation matters" footnote="AI can continue explaining while you decide who to contact.">
      <Badge status="warning">Human help recommended</Badge>
      <h2 className="text-screen-heading text-text-primary">This depends on your specific situation.</h2>
      <p className="text-body text-text-secondary">
        I can explain the official information, but I should not decide how immigration rules, legal requirements, or individual eligibility
        apply to you. A settlement worker, government service, or qualified professional can confirm your case.
      </p>
      <Button className="self-start">Find official help</Button>
      <Button variant="secondary" className="self-start">Show official guidance</Button>
    </AIAssistantPanel>
  ),
};
