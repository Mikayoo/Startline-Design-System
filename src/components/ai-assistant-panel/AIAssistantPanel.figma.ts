// url=https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2315
// source=src/components/ai-assistant-panel/AIAssistantPanel.tsx
// component=AIAssistantPanel
import figma from "figma";
const instance = figma.selectedInstance;

const state = instance.getEnum("State", { Entry: "entry", Answer: "answer", Escalation: "escalation" });

const entry = figma.code`<AIAssistantPanel state="entry" subtitle="AI navigation assistant" footnote="Trusted sources stay visible in the answer.">
  <h2 className="text-screen-heading text-text-primary">What can I help you understand?</h2>
  <p className="text-body text-text-secondary">Ask in your own words…</p>
  <AIAssistantSuggestions suggestions={suggestions} onSelect={ask} />
  <AskStartlineAction onClick={openComposer} />
</AIAssistantPanel>`;

const answer = figma.code`<AIAssistantPanel state="answer" subtitle="Answer with sources" footnote="Startline organizes the guidance; the linked source remains authoritative.">
  <AIAssistantQuestion>{question}</AIAssistantQuestion>
  <SourceIndicator kind="ai-summary">AI summary · sources shown</SourceIndicator>
  <p className="text-body text-text-primary">{answer}</p>
  <div className="flex gap-2">
    <SourceIndicator kind="official">Official source</SourceIndicator>
    <SourceIndicator kind="updated">Updated Aug 2026</SourceIndicator>
  </div>
  <Button asChild><a href={sourceUrl}>Open official source</a></Button>
  <AskStartlineAction format="contextual">Ask a follow-up</AskStartlineAction>
</AIAssistantPanel>`;

const escalation = figma.code`<AIAssistantPanel state="escalation" subtitle="When confirmation matters" footnote="AI can continue explaining while you decide who to contact.">
  <Badge status="warning">Human help recommended</Badge>
  <h2 className="text-screen-heading text-text-primary">This depends on your specific situation.</h2>
  <p className="text-body text-text-secondary">…</p>
  <Button onClick={findHelp}>Find official help</Button>
  <Button variant="secondary" onClick={showGuidance}>Show official guidance</Button>
</AIAssistantPanel>`;

export default {
  example: state === "answer" ? answer : state === "escalation" ? escalation : entry,
  imports: [
    'import { AIAssistantPanel, AIAssistantQuestion, AIAssistantSuggestions, AskStartlineAction, Badge, Button, SourceIndicator } from "@startline/ui"',
  ],
  id: "ai-assistant-panel",
  metadata: { nestable: false },
};
