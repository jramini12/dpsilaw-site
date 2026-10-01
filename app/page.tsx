import Image from "next/image";

const features = [
  {
    title: "Spaced-Repetition Flashcards",
    body: "An SM-2 algorithm schedules every card so harder vocabulary surfaces more often. Build decks in any of twelve languages or generate them in seconds with AI.",
  },
  {
    title: "Karaoke Speaking Drills",
    body: "Forty-plus pre-loaded courtroom and police-station dialogues. Lines are colour-coded by speaker and highlighted in real time as the system voice reads them aloud. Record your own consecutive interpretation and listen back.",
  },
  {
    title: "AI-Generated Practice",
    body: "Type a topic, pick a difficulty, and get a fresh deck or a fresh scenario in seconds. Powered by Google Gemini. Realistic UK legal phrasing, ready to study.",
  },
  {
    title: "Progress and Streaks",
    body: "Daily streak counter, exam-date countdown, mastery and accuracy charts. Set your DPSI exam date and let the app pace your daily target.",
  },
  {
    title: "Universal Search",
    body: "Find any deck, card, scenario, category, speaker or line of script across the whole app in milliseconds.",
  },
  {
    title: "Offline-First, Ad-Free",
    body: "All decks, cards and progress live on your device. The only network call is to the AI generator, and only when you ask. No ads, no accounts, no third-party analytics.",
  },
];

const screenshots = [
  { src: "/screenshots/01_Dashboard.png", alt: "Dashboard with streak, exam countdown and study targets", label: "Dashboard" },
  { src: "/screenshots/02_PracticeCategories.png", alt: "Practice category grid: Criminal, Family, Housing, Immigration, Police", label: "Practice categories" },
  { src: "/screenshots/03_ScenarioList.png", alt: "Scenario list inside Criminal Law", label: "Scenarios" },
  { src: "/screenshots/04_Progress.png", alt: "Progress charts: activity, mastery, accuracy", label: "Progress" },
  { src: "/screenshots/05_Search.png", alt: "Universal search across decks, cards and scenarios", label: "Search" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100 via-stone-50 to-stone-50"
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1 text-xs font-medium text-teal-800 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600" /> Built for the UK DPSI Law option
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 leading-tight text-balance">
                Pass the talk-out-loud bits of the DPSI Law exam.
              </h1>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-2xl">
                DPSI Law: Interpreter Prep is the iPhone study companion for the Diploma in Public Service Interpreting.
                Spaced-repetition flashcards, AI-generated decks, and karaoke-style courtroom dialogues you can shadow,
                pause, slow down and record yourself interpreting.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-dashed border-stone-300 bg-stone-100/80 px-4 py-2 text-sm font-medium text-stone-600 cursor-default select-none">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Coming soon to the App Store
                </p>
                <a
                  href="#features"
                  className="inline-flex h-12 items-center rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-900 hover:border-stone-400 transition-colors"
                >
                  See what is inside
                </a>
              </div>
              <p className="mt-6 text-xs text-stone-500 max-w-xl">
                iPhone, iOS 26 or later. Twelve languages supported including English, Farsi, Arabic, French and Spanish.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-4 rounded-[3rem] bg-teal-200/40 blur-2xl" aria-hidden />
                <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden border border-stone-200 bg-white shadow-2xl">
                  <Image
                    src="/screenshots/01_Dashboard.png"
                    alt="DPSI Law dashboard"
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">Inside the app</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
              Everything you need between now and exam day.
            </h2>
            <p className="mt-4 text-stone-600">
              Built around how working interpreters actually revise. Rote vocabulary, real courtroom registers, and
              honest feedback on whether you can deliver under pressure.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-stone-200 bg-stone-50/60 p-6 transition-colors hover:border-teal-300 hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-stone-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100/60 border-t border-stone-200">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">Screenshots</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
              A quick tour.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {screenshots.map((s) => (
              <figure key={s.src} className="flex flex-col gap-3">
                <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-md">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-xs font-medium text-stone-500 text-center">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-stone-200">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            A study app, not an exam board.
          </h2>
          <p className="mt-5 text-stone-600 leading-relaxed">
            DPSI Law: Interpreter Prep is an independent study aid. It is not affiliated with, endorsed by or
            otherwise connected to the Chartered Institute of Linguists or any examination body. Always cross-check
            terminology against authoritative legal sources before relying on it in a live interpreting assignment.
          </p>
        </div>
      </section>
    </>
  );
}
