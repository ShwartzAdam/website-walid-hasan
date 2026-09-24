import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

export const alt = "Walid Hasan — Infrastructure · Development · Earthworks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Latin-only artwork so it renders identically for every locale without shipping RTL fonts to the OG renderer.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#0c0d0e",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: "#f6f5f1",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#d8d3c8", display: "flex" }}>
          INFRASTRUCTURE · DEVELOPMENT · EARTHWORKS
        </div>
        <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, marginTop: 24, display: "flex" }}>WALID HASAN</div>
        <div style={{ width: 160, height: 8, background: "#e3a82b", marginTop: 48, display: "flex" }} />
      </div>
    ),
    size,
  );
}
