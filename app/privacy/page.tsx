import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DPSI Law: Interpreter Prep",
  description:
    "Privacy policy for DPSI Law: Interpreter Prep. What data the app collects, what is sent to third parties, and how to delete it.",
};

const updated = "18 April 2026";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20 prose prose-stone">
      <header className="mb-10 not-prose">
        <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">Legal</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-stone-500">Last updated: {updated}</p>
      </header>

      <Section title="Who we are">
        <p>
          DPSI Law: Interpreter Prep is an independent iOS study application for candidates preparing for the
          UK Diploma in Public Service Interpreting (Law option). The app is published by an individual developer.
          Questions about this policy can be sent to <a href="mailto:jramini12@gmail.com">jramini12@gmail.com</a>.
        </p>
      </Section>

      <Section title="Summary">
        <ul>
          <li>The app does not require an account, sign-in or registration.</li>
          <li>The app does not run third-party analytics or advertising SDKs.</li>
          <li>All your decks, cards, scenarios, recordings and progress are stored locally on your device using
            Apple SwiftData.</li>
          <li>The only outbound network call the app makes is to Google&apos;s Gemini API, and only when you tap a
            Generate button to create a deck or a practice scenario.</li>
        </ul>
      </Section>

      <Section title="Data we do not collect">
        <p>
          We do not collect, transmit or store: your name, email, address, phone number, location, contacts,
          calendar, photos, advertising identifiers, device identifiers, crash reports linked to your identity,
          or any usage analytics.
        </p>
      </Section>

      <Section title="Data stored on your device">
        <p>
          The following information is created and kept on your device only, inside the app&apos;s SwiftData store:
          flashcard decks, individual cards, practice scenarios, study history, streak counts, exam-date settings,
          spaced-repetition scheduling state, and any audio recordings you make of your own interpreting practice.
          None of this information leaves your device unless you explicitly export it.
        </p>
      </Section>

      <Section title="Data sent to Google Gemini">
        <p>
          The app integrates Google&apos;s Gemini 2.5 Flash model for two optional features: AI-generated flashcard
          decks and AI-generated practice scenarios. When, and only when, you tap a Generate button:
        </p>
        <ul>
          <li>The text of your prompt (for example a topic such as &quot;witness intimidation&quot; and a difficulty
            level) is sent over HTTPS to <code>https://generativelanguage.googleapis.com</code>.</li>
          <li>Google returns generated content which the app stores locally as the new deck or scenario.</li>
          <li>No personal identifiers, no device identifiers and no location data are attached to the request.</li>
        </ul>
        <p>
          Google&apos;s handling of these requests is governed by Google&apos;s own terms and privacy policies, which you
          should review:
        </p>
        <ul>
          <li><a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Gemini API Terms of Service</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
        </ul>
      </Section>

      <Section title="Microphone and speech">
        <p>
          The practice player uses Apple&apos;s on-device <code>AVSpeechSynthesizer</code> to read scenario lines aloud and
          can record your spoken interpretation through the iPhone microphone. Microphone access is requested only on
          first use of the record feature; you can revoke it at any time in iOS Settings &rarr; Privacy &amp; Security
          &rarr; Microphone. Recordings are stored locally and never transmitted off your device.
        </p>
      </Section>

      <Section title="Children">
        <p>
          The app is not directed to children under 13 and does not knowingly collect any information from children.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Because the app does not collect personal data on our servers, there is no account to access, export or
          delete on our side. To remove all of your local app data simply delete the app from your device. Under UK
          GDPR you retain the rights of access, rectification, erasure, restriction, portability and objection in
          respect of any data we may hold; if you have any questions or wish to exercise these rights you can contact
          us at <a href="mailto:jramini12@gmail.com">jramini12@gmail.com</a>.
        </p>
      </Section>

      <Section title="Security">
        <p>
          All requests to Google Gemini are made over TLS. Local data is protected by iOS&apos;s standard data
          protection class. We do not operate a server that holds user data.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If this policy changes materially we will update the &quot;Last updated&quot; date at the top of this page and,
          where appropriate, surface a notice in a future version of the app.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold tracking-tight text-stone-900">{title}</h2>
      <div className="mt-3 text-stone-700 leading-relaxed space-y-3 [&_a]:text-teal-700 [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_code]:rounded [&_code]:bg-stone-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em]">
        {children}
      </div>
    </section>
  );
}
