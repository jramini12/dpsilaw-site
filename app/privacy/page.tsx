import type { Metadata } from "next";

const description =
  "Privacy policy for DPSI Law: Interpreter Prep. What data the app collects, what is sent to third parties, and how to delete it.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | DPSI Law: Interpreter Prep",
    description,
    url: "/privacy",
    siteName: "DPSI Law: Interpreter Prep",
    type: "website",
    images: "/opengraph-image",
  },
};

const updated = "1 October 2026";

const controller = "Cosmos Platform Ltd";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">Legal</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-stone-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-stone-500">Last updated: {updated}</p>
      </header>

      <Section title="Who we are">
        <p>
          DPSI Law: Interpreter Prep is an independent iOS study application for candidates preparing for the
          UK Diploma in Public Service Interpreting (Law option). The app is published by {controller}, which is the data controller for the purposes of UK data protection law. Questions about this
          policy can be sent to <a href="mailto:jramini12@gmail.com">jramini12@gmail.com</a>.
        </p>
      </Section>

      <Section title="Summary">
        <ul>
          <li>The app does not require an account, sign-in or registration.</li>
          <li>The app does not run third-party analytics or advertising SDKs.</li>
          <li>Your decks, cards, scenarios, recordings and progress are stored on your device.</li>
          <li>The only outbound network request the app makes is to generate an AI deck or practice scenario, and
            only when you tap a Generate button. That request goes to our own server, which passes it on to
            Google Gemini.</li>
        </ul>
      </Section>

      <Section title="Data we do not collect">
        <p>
          We do not collect: your name, email, address, phone number, location, contacts, calendar, photos,
          advertising identifiers, device identifiers, crash reports linked to your identity, or any usage
          analytics. The app does not create an account or user ID for you.
        </p>
      </Section>

      <Section title="Data stored on your device">
        <p>
          The following information is created and kept on your device: flashcard decks, individual cards,
          practice scenarios, study history, streak counts, exam-date settings and spaced-repetition scheduling
          state, held in the app&apos;s on-device database (Apple SwiftData); and any audio recordings you make of
          your own interpreting practice, saved as audio files in the app&apos;s private storage on your device.
        </p>
        <p>
          We never receive this information. The app has no export or sync feature of its own. However, like other
          app data, it is included in your own iCloud or computer backups of your device if you have backups
          turned on. Those backups are handled by Apple (or stored on your computer) under your own account and
          settings, not by us.
        </p>
      </Section>

      <Section title="AI generation (Google Gemini)">
        <p>
          The app can generate flashcard decks and practice scenarios using Google Gemini. This feature is
          optional. Nothing is sent unless you tap a Generate button. When you do, the app sends a single request
          over HTTPS to our own endpoint on this website (<code>/api/generate</code>), which forwards it to the
          Google Gemini API and returns the result.
        </p>
        <p>The request contains only:</p>
        <ul>
          <li>what to generate (a flashcard deck or a practice scenario);</li>
          <li>the topic you type (up to 200 characters), for example “witness intimidation”;</li>
          <li>the number of cards or lines;</li>
          <li>the difficulty level; and</li>
          <li>the source and target languages.</li>
        </ul>
        <p>
          No account, user ID, device identifier or location is included. The generated content is stored on your
          device as a new deck or scenario.
        </p>
        <p>
          <strong>Please do not type personal information</strong> (such as names, case details or anything about
          a real person) into the topic field. It is sent to the services described below.
        </p>
        <h3>Who processes the request</h3>
        <ul>
          <li>
            <strong>Vercel</strong> hosts our website and endpoint and processes each request on our behalf. Like
            any web server, it necessarily receives your IP address along with the request. Our endpoint does not
            log the topics you send, but Vercel may keep standard request logs (such as IP address, time and the
            address requested) for a limited period for operating and securing the service. See the{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Google</strong> receives the request content from our endpoint (not your IP address or any
            identifier from your device) and generates the response. We use the paid tier of the Gemini API. Under
            Google&apos;s Gemini API terms for paid services, Google does not use prompts or responses to improve
            its products, but does retain them for a limited period to detect abuse and enforce its policies. See
            the{" "}
            <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">
              Gemini API Terms of Service
            </a>{" "}
            and the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>.
          </li>
        </ul>
        <p>
          The legal basis for this processing is our legitimate interest in providing the AI generation feature you
          have chosen to use.
        </p>
      </Section>

      <Section title="Microphone and speech">
        <p>
          The practice player uses Apple&apos;s on-device <code>AVSpeechSynthesizer</code> to read scenario lines aloud.
          The app does not use speech recognition. It can record your spoken interpretation through the iPhone
          microphone. Microphone access is requested only on first use of the record feature; you can revoke it at
          any time in iOS Settings &rarr; Privacy &amp; Security &rarr; Microphone. Recordings are saved as files in
          the app&apos;s private storage on your device and are never sent to us or to any third party (other than
          being included in your own device backups, as described above).
        </p>
      </Section>

      <Section title="Children">
        <p>
          The app is not directed to children under 13 and does not knowingly collect any information from children.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          We do not hold an account or profile for you, and we do not keep the topics you send for AI generation. To
          remove all of your local app data, delete the app from your device (and, if you wish, delete any device
          backups that contain it). Under UK GDPR you have the rights of access, rectification, erasure,
          restriction, portability and objection in respect of any personal data we may hold, and the right to
          complain to the Information Commissioner&apos;s Office (
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>). If you have any
          questions or wish to exercise these rights, contact us at{" "}
          <a href="mailto:jramini12@gmail.com">jramini12@gmail.com</a>.
        </p>
      </Section>

      <Section title="Security">
        <p>
          All AI generation requests travel over TLS, both from the app to our endpoint and from our endpoint to
          Google. Local data is protected by iOS&apos;s standard data protection. We do not operate a database that
          holds user data.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If this policy changes materially we will update the “Last updated” date at the top of this page and,
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
      <div className="mt-3 text-stone-700 leading-relaxed space-y-3 [&_a]:text-teal-700 [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_code]:rounded [&_code]:bg-stone-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_h3]:pt-2 [&_h3]:font-semibold [&_h3]:text-stone-900">
        {children}
      </div>
    </section>
  );
}
