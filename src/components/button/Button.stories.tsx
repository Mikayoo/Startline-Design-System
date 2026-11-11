import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { Button } from "./Button";

const FIGMA = "https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=94-2027";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { design: { type: "figma", url: FIGMA } },
  args: { children: "Continue", variant: "primary", size: "lg", disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary", "destructive"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = { args: { variant: "tertiary" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Delete" } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcons: Story = {
  args: { leadingIcon: <Icon name="search" />, trailingIcon: <Icon name="chevron-right" /> },
};
export const AsLink: Story = {
  args: { asChild: true, children: <a href="#next">Go to next step</a> },
};

const variants = ["primary", "secondary", "tertiary", "destructive"] as const;
const sizes = ["md", "lg"] as const;

/** Same grid as the Figma component set: rows = Variant × Size, columns = State. */
export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-[repeat(4,max-content)] items-center justify-items-start gap-x-8 gap-y-4 bg-surface-primary p-8">
      <span />
      {["Default", "Disabled", "With icons"].map((h) => (
        <span key={h} className="text-label text-text-secondary">
          {h}
        </span>
      ))}
      {variants.flatMap((variant) =>
        sizes.map((size) => (
          <div key={`${variant}-${size}`} className="contents">
            <span className="text-caption text-text-secondary">
              {variant} · {size}
            </span>
            <Button variant={variant} size={size}>
              Continue
            </Button>
            <Button variant={variant} size={size} disabled>
              Continue
            </Button>
            <Button variant={variant} size={size} leadingIcon={<Icon name="search" />} trailingIcon={<Icon name="chevron-right" />}>
              Continue
            </Button>
          </div>
        )),
      )}
    </div>
  ),
};

/**
 * Pixel-comparison layout, identical to the Figma QA frame: 32 px padding, rows 56 px tall with 16 px
 * between them, and each button centred in a fixed cell (160 / 160 / 240 px) so the columns line up.
 */
export const FigmaComparison: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="inline-flex flex-col gap-4 bg-surface-primary p-8">
      {variants.flatMap((variant) =>
        sizes.map((size) => (
          <div key={`${variant}-${size}`} className="flex h-14 items-center">
            <div className="flex w-40 justify-center">
              <Button variant={variant} size={size}>Continue</Button>
            </div>
            <div className="flex w-40 justify-center">
              <Button variant={variant} size={size} disabled>Continue</Button>
            </div>
            <div className="flex w-60 justify-center">
              <Button variant={variant} size={size} leadingIcon={<Icon name="search" />} trailingIcon={<Icon name="chevron-right" />}>
                Continue
              </Button>
            </div>
          </div>
        )),
      )}
    </div>
  ),
};

const CONTINUE: [lang: string, label: string][] = [
  ["en", "Continue"], ["vi", "Tiếp tục"], ["ar", "متابعة"], ["fa", "ادامه"], ["ur", "جاری رکھیں"],
  ["zh-Hans", "继续"], ["zh-Hant", "繼續"], ["ja", "続ける"], ["ko", "계속"],
  ["am", "ቀጥል"], ["ti", "ቀጽል"], ["hi", "जारी रखें"], ["bn", "চালিয়ে যান"], ["pa", "ਜਾਰੀ ਰੱਖੋ"],
];

/** Every supported script, each in its own `lang` (and `dir` for RTL) so the right font is chosen. */
export const Multilingual: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-4 bg-surface-primary p-8">
      {CONTINUE.map(([lang, label]) => (
        <div key={lang} lang={lang} dir={["ar", "fa", "ur"].includes(lang) ? "rtl" : "ltr"}>
          <Button size="lg" trailingIcon={<Icon name="chevron-right" />}>
            {label}
          </Button>
        </div>
      ))}
    </div>
  ),
};
