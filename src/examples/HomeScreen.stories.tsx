import type { Meta, StoryObj } from "@storybook/react-vite";
import { AR, HomeScreen } from "./HomeScreen";

const meta = {
  title: "Examples/Home (App v3.1)",
  component: HomeScreen,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=605-21" },
    docs: { description: { component: "App v3.1 / 09 Home rebuilt only from @startline/ui components and patterns." } },
  },
} satisfies Meta<typeof HomeScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};
/** Right-to-left check: Arabic copy, `dir="rtl"`. */
export const Arabic: Story = {
  render: () => (
    <div lang="ar" dir="rtl" className="w-fit">
      <HomeScreen copy={AR} />
    </div>
  ),
};
