"use client";

import { Font } from "@react-pdf/renderer";
import {
  attachHarfBuzzShaping,
  type FontkitFont,
  type HarfBuzz,
} from "./pdf-bengali-shaping";

// Helvetica has no Bengali glyphs. Each family below falls back to Noto Sans
// Bengali character by character, so Bangla text (and ৳) renders while Latin
// text keeps Helvetica. Noto Sans Bengali has no italic, so italic styles use
// the upright files (react-pdf throws if a requested style is unregistered).
const REGULAR = "/fonts/NotoSansBengali-Regular.ttf";
const BOLD = "/fonts/NotoSansBengali-Bold.ttf";

Font.register({
  family: "NotoSansBengali",
  fonts: [
    { src: REGULAR },
    { src: REGULAR, fontStyle: "italic" },
    { src: BOLD, fontWeight: "bold" },
    { src: BOLD, fontWeight: "bold", fontStyle: "italic" },
  ],
});

Font.register({
  family: "NotoSansBengali-Bold",
  fonts: [{ src: BOLD }, { src: BOLD, fontStyle: "italic" }],
});

export const PDF_FONT = ["Helvetica", "NotoSansBengali"];
export const PDF_FONT_BOLD = ["Helvetica-Bold", "NotoSansBengali-Bold"];
export const PDF_FONT_ITALIC = ["Helvetica-Oblique", "NotoSansBengali"];

const BENGALI_FONTS = (["normal", "italic"] as const).flatMap((fontStyle) => [
  { fontFamily: "NotoSansBengali", fontStyle },
  { fontFamily: "NotoSansBengali", fontWeight: 700, fontStyle },
  { fontFamily: "NotoSansBengali-Bold", fontStyle },
]);

const loadBengaliShaping = async () => {
  const [{ default: createHarfBuzz }, { default: hbjs }, wasmBinary] =
    await Promise.all([
      import("harfbuzzjs/hb.js"),
      import("harfbuzzjs/hbjs.js"),
      fetch("/harfbuzz/hb.wasm").then((res) => res.arrayBuffer()),
    ]);
  const hb: HarfBuzz = hbjs(await createHarfBuzz({ wasmBinary }));

  await Promise.all(
    BENGALI_FONTS.map(async (descriptor) => {
      const source = Font.getFont(descriptor);
      await source.load();
      const bytes = await fetch(source.src).then((res) => res.arrayBuffer());
      attachHarfBuzzShaping(hb, source.data as unknown as FontkitFont, bytes);
    })
  );
};

let bengaliShaping: Promise<void> | null = null;

// Call (and await) before pdf(...).toBlob() so Bangla is shaped by HarfBuzz.
// If loading fails the PDF still renders, with react-pdf's built-in shaping.
export const preparePdfFonts = () =>
  (bengaliShaping ??= loadBengaliShaping().catch((error) => {
    bengaliShaping = null;
    console.error("Bengali PDF shaping unavailable", error);
  }));
