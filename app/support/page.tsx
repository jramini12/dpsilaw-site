import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | DPSI Law: Interpreter Prep",
  description:
    "Help, troubleshooting and contact for DPSI Law: Interpreter Prep. Voice quality, AI generation, recording and resetting your data.",
};

const faqs = [
  {
    q: "The text-to-speech voice sounds robotic. How do I improve it?",
    a: "Open iOS Settings, then Accessibility, then Spoken Content, then Voices, then English. Pick a UK English voice and tap the cloud icon to download the Enhanced or Premium variant. The next time you play a scenario the upgraded voice will be used automatically.",
  },
  {
    q: "AI generation is failing or returning an error.",
    a: "AI generation requires an active internet connection. If you are on cellular, check that data is enabled for the app in iOS Settings. If the error persists it is usually a transient Gemini service issue; wait a minute and try again. The app will surface the underlying error message to help diagnose.",
  },
  {
    q: "How do I reset my progress or delete my data?",
    a: "All app data (decks, cards, scenarios, recordings, streaks) lives on your device. To clear everything, delete the app from your home screen. Reinstalling will give you a fresh install with the bundled practice scenarios re-seeded.",
  },
  {
    q: "Can I use the app offline?",
    a: "Yes. Studying flashcards, running practice scenarios, recording yourself and viewing progress all work fully offline. Only the AI Generate buttons require a network connection.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Farsi, Arabic, French, German, Spanish, Italian, Portuguese, Russian, Chinese, Japanese and Korean. You can mix any source and target language when creating a deck.",
  },
  {
    q: "Is the app affiliated with the Chartered Institute of Linguists?",
    a: "No. DPSI Law: Interpreter Prep is an independent study aid. It is not affiliated with, endorsed by, or connected to the Chartered Institute of Linguists or any examination body. AI-generated content can be inaccurate; always verify against authoritative legal sources.",
  },
];

export default function SupportPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">Support</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">How can we help?</h1>
        <p className="mt-4 text-stone-600 leading-relaxed">
          For bug reports, feature requests or general questions, email{" "}
          <a className="text-teal-700 underline underline-offset-2" href="mailto:jramini12@gmail.com">
            jramini12@gmail.com
          </a>
          . Please include your iPhone model and iOS version so we can reproduce the issue quickly.
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-stone-900">Email support</h2>
        <p className="mt-2 text-stone-600 text-sm leading-relaxed">
          Direct line to the developer. We aim to reply within two working days.
        </p>
        <a
          href="mailto:jramini12@gmail.com?subject=DPSI%20Law%20support"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white"
        >
          Send an email
        </a>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Frequently asked questions</h2>
        <dl className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="text-base font-semibold text-stone-900">{f.q}</dt>
              <dd className="mt-2 text-stone-600 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
