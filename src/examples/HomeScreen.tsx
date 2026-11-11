/**
 * Example: Startline App v3.1 / 09 Home, rebuilt only from @startline/ui components and patterns.
 * Not part of the library export — a reference for how screens are composed.
 * Figma: https://www.figma.com/design/TiHKqEUApUi1FNNtRGzAC7/Startline?node-id=605-21
 */
import { BottomNavigation } from "../components/bottom-navigation";
import { IconButton } from "../components/icon-button";
import {
  EventCard,
  HeroCard,
  QuickAction,
  RecommendationCard,
  ReminderCard,
  ScreenHeader,
  SearchBar,
  SectionHeader,
} from "../patterns";

const img = (n: string) => `/examples/home/${n}`;

export interface HomeScreenCopy {
  greeting: string;
  title: string;
  search: string;
  hero: { tag: string; title: string; progress: string; action: string };
  quick: [string, string, string];
  recommended: string;
  seeAll: string;
  comingUp: string;
  reminder: { title: string; detail: string };
  nearYou: string;
  nav?: Partial<Record<"home" | "my-path" | "ask" | "resources" | "profile", { label: string }>>;
}

export const EN: HomeScreenCopy = {
  greeting: "Good morning, Kelvin",
  title: "Your next chapter",
  search: "Search or ask a question",
  hero: { tag: "Next step · Housing", title: "Find a safe place to stay", progress: "1 of 3 steps", action: "Continue" },
  quick: ["My dates", "Saved", "Help today"],
  recommended: "Recommended for you",
  seeAll: "See all",
  comingUp: "Coming up",
  reminder: { title: "1 reminder this week", detail: "Prepare to contact 211 · Tomorrow, 10:00" },
  nearYou: "Near you",
};

/** Arabic copy, to check right-to-left layout. */
export const AR: HomeScreenCopy = {
  greeting: "صباح الخير، كلفن",
  title: "فصلك التالي",
  search: "ابحث أو اطرح سؤالاً",
  hero: { tag: "الخطوة التالية · السكن", title: "ابحث عن مكان آمن للإقامة", progress: "١ من ٣ خطوات", action: "متابعة" },
  quick: ["مواعيدي", "المحفوظات", "مساعدة اليوم"],
  recommended: "مقترحات لك",
  seeAll: "عرض الكل",
  comingUp: "قريباً",
  reminder: { title: "تذكير واحد هذا الأسبوع", detail: "استعد للاتصال بـ 211 · غداً، 10:00" },
  nearYou: "بالقرب منك",
  nav: { home: { label: "الرئيسية" }, "my-path": { label: "مساري" }, ask: { label: "اسأل" }, resources: { label: "الموارد" }, profile: { label: "حسابي" } },
};

const RECS = [
  { image: "rec-health-card.png", topic: "Health", title: "Apply for your health card", source: "Ontario.ca · Sample" },
  { image: "rec-language.png", topic: "Language", title: "Free English or French classes", source: "Canada.ca · Sample" },
  { image: "rec-sin.png", topic: "Work", title: "Get your Social Insurance Number", source: "Canada.ca · Sample" },
  { image: "rec-doctor.png", topic: "Health", title: "Find a family doctor", source: "Ontario.ca · Sample" },
  { image: "rec-bank.png", topic: "Money", title: "Open a bank account", source: "Canada.ca · Sample" },
];

export function HomeScreen({ copy = EN }: { copy?: HomeScreenCopy }) {
  return (
    <div className="relative h-211 w-97.5 overflow-hidden bg-surface-warm">
      <main className="flex flex-col gap-5 px-6 pt-15 pb-36">
        <ScreenHeader
          avatarSrc={img("avatar.jpg")}
          eyebrow={copy.greeting}
          title={copy.title}
          action={<IconButton icon="bell" label="Notifications, 1 unread" dot />}
        />
        <SearchBar aria-label={copy.search} placeholder={copy.search} onAsk={() => {}} />
        <HeroCard
          image={img("hero.png")}
          tag={copy.hero.tag}
          title={copy.hero.title}
          progress={{ current: 1, total: 3, label: copy.hero.progress }}
          actionLabel={copy.hero.action}
          actionHref="#next-step"
        />
        <nav aria-label="Shortcuts" className="grid grid-cols-3 gap-3">
          <QuickAction icon="calendar" label={copy.quick[0]} href="#dates" />
          <QuickAction icon="bookmark" label={copy.quick[1]} href="#saved" />
          <QuickAction icon="call" label={copy.quick[2]} href="#help" />
        </nav>
        <section className="flex flex-col gap-5">
          <SectionHeader title={copy.recommended} actionLabel={copy.seeAll} actionHref="#recommended" />
          <div className="-me-6 flex snap-x gap-3 overflow-x-auto pe-6 pb-5">
            {RECS.map((r) => (
              <RecommendationCard key={r.title} image={img(r.image)} topic={r.topic} title={r.title} source={r.source} href="#rec" />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <SectionHeader title={copy.comingUp} actionLabel={copy.seeAll} actionHref="#dates" />
          <ReminderCard title={copy.reminder.title} detail={copy.reminder.detail} href="#reminder" />
        </section>
        <section className="flex flex-col gap-5">
          <SectionHeader title={copy.nearYou} actionLabel={copy.seeAll} actionHref="#events" />
          <EventCard image={img("event.png")} date="Sat 31 Oct" title="Settlement worker drop-in" location="Kitchener City Hall" href="#event" />
        </section>
      </main>
      <BottomNavigation active="home" items={copy.nav} className="absolute inset-x-4 bottom-6 w-auto" />
    </div>
  );
}
