import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomNavigation } from "./BottomNavigation";

const meta = {
  title: "Components/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2406" } },
  args: { active: "home" },
  argTypes: { active: { control: "inline-radio", options: ["home", "my-path", "ask", "resources", "profile"] } },
  decorators: [(Story) => <div className="w-97.5 bg-surface-warm p-4 pb-8"><Story /></div>],
} satisfies Meta<typeof BottomNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};
export const Ask: Story = { args: { active: "ask" } };
/** Labels translated, e.g. French. */
export const Translated: Story = {
  args: { items: { home: { label: "Accueil" }, "my-path": { label: "Parcours" }, ask: { label: "Demander" }, resources: { label: "Ressources" }, profile: { label: "Profil" } } },
};
