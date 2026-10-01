import { ImageResponse } from "next/og";

export const alt = "DPSI Law: Interpreter Prep. Flashcards and courtroom practice for UK DPSI Law candidates.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(180deg, #ccfbf1 0%, #fafaf9 70%)",
          color: "#1c1917",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#0d9488",
              color: "white",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            DL
          </div>
          <div style={{ fontSize: 36, fontWeight: 600 }}>DPSI Law</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Interpreter Prep
          </div>
          <div style={{ fontSize: 34, color: "#57534e", maxWidth: 900 }}>
            Flashcards and karaoke-style courtroom practice for UK DPSI Law candidates.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#0f766e" }}>iPhone · Coming soon to the App Store</div>
      </div>
    ),
    size,
  );
}
