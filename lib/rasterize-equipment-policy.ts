"use client";

import type { EquipmentData } from "@/lib/onboarding-types";

// @react-pdf/renderer's text engine does not perform full Bengali shaping
// (conjuncts, matras, reph), so it renders Bangla glyphs incorrectly. The
// browser's own canvas text renderer does shape Bengali correctly (same
// engine as normal page text), so at submit time we rasterize the Equipment
// Policy page's Bangla content into a PNG here and embed that image in the
// PDF instead of relying on react-pdf to lay out the Bangla text itself.

interface RasterLine {
  text: string;
  label?: string;
  bold?: boolean;
  size?: number;
  gapBefore?: number;
  indent?: number;
  bullet?: boolean;
}

const SCALE = 3;
const WIDTH_PX = 515 * SCALE;
const PADDING = 24;
const HEADING_SIZE = 9.5 * SCALE;
const BODY_SIZE = 9 * SCALE;
const LINE_GAP = 1.5;

const fontFor = (size: number, bold: boolean) =>
  `${bold ? "bold " : ""}${size}px "Noto Sans Bengali", "Nirmala UI", "Vrinda", "Kalpurush", sans-serif`;

function rasterizeLines(lines: RasterLine[]): { dataUrl: string; aspect: number } {
  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d")!;
  const contentWidth = WIDTH_PX - PADDING * 2;

  const positioned: Array<{ text: string; label?: string; x: number; y: number; size: number; bold: boolean }> = [];
  let y = PADDING;

  for (const line of lines) {
    const size = line.size ?? BODY_SIZE;
    const bold = !!line.bold;
    y += line.gapBefore ?? 0;
    const indent = line.indent ?? 0;

    if (line.label) {
      positioned.push({ text: line.text, label: line.label, x: PADDING + indent, y, size, bold: false });
      y += size * LINE_GAP;
      continue;
    }

    mctx.font = fontFor(size, bold);
    const maxWidth = contentWidth - indent;
    const prefix = line.bullet ? "•  " : "";
    const words = (prefix + line.text).split(/\s+/);
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (current && mctx.measureText(test).width > maxWidth) {
        positioned.push({ text: current, x: PADDING + indent, y, size, bold });
        y += size * LINE_GAP;
        current = word;
      } else {
        current = test;
      }
    }
    if (current) {
      positioned.push({ text: current, x: PADDING + indent, y, size, bold });
      y += size * LINE_GAP;
    }
  }
  y += PADDING;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH_PX;
  canvas.height = Math.ceil(y);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#262626";
  ctx.textBaseline = "top";

  for (const pl of positioned) {
    if (pl.label) {
      ctx.font = fontFor(pl.size, true);
      ctx.fillText(`${pl.label}: `, pl.x, pl.y);
      const labelWidth = ctx.measureText(`${pl.label}: `).width;
      ctx.font = fontFor(pl.size, false);
      ctx.fillText(pl.text && pl.text.trim() ? pl.text : "—", pl.x + labelWidth, pl.y);
    } else {
      ctx.font = fontFor(pl.size, pl.bold);
      ctx.fillText(pl.text, pl.x, pl.y);
    }
  }

  return {
    dataUrl: canvas.toDataURL("image/png"),
    aspect: canvas.width / canvas.height,
  };
}

export function rasterizeEquipmentPolicy(data: EquipmentData): { dataUrl: string; aspect: number } {
  const lines: RasterLine[] = [
    { label: "তারিখ", text: data.date, size: BODY_SIZE },
    { label: "রাইডারের নাম", text: data.riderName, size: BODY_SIZE },
    { label: "রাইডারের মোবাইল নম্বর", text: data.mobileNumber, size: BODY_SIZE },
    { label: "জাতীয় পরিচয়পত্র নম্বর", text: data.nidNumber, size: BODY_SIZE },

    { text: "ইকুইপমেন্ট ব্যবহারের শর্তাবলী:", bold: true, size: HEADING_SIZE, gapBefore: BODY_SIZE },
    { text: "ইকুইপমেন্ট শুধুমাত্র প্রতিষ্ঠানের কাজের জন্য ব্যবহার করতে হবে।", bullet: true, indent: 20 },
    { text: "ইকুইপমেন্ট রক্ষণাবেক্ষণ ও নিরাপদে রাখার দায়িত্ব রাইডারের।", bullet: true, indent: 20 },
    { text: "ক্ষতি, হারানো বা চুরি হলে প্রতিষ্ঠানকে তা অবিলম্বে জানাতে হবে।", bullet: true, indent: 20 },

    { text: "ইকুইপমেন্ট নেওয়ার শর্ত:", bold: true, size: HEADING_SIZE, gapBefore: BODY_SIZE },
    {
      text: "রাইডারকে প্রতিষ্ঠানের ইকুইপমেন্ট নেওয়ার জন্য ইকুইপমেন্ট এর মোট মূল্যের সম্পূর্ণ টাকা দিয়ে ইকুইপমেন্ট নিয়ে কাজ শুরু করতে পারবেন।",
      bullet: true,
      indent: 20,
    },

    { text: "ইকুইপমেন্ট ফেরত দেওয়ার শর্ত:", bold: true, size: HEADING_SIZE, gapBefore: BODY_SIZE },
    { text: "চাকরি/চুক্তি শেষ হওয়ার সময় সব ইকুইপমেন্ট ভালো অবস্থায় ফেরত দিতে হবে।", bullet: true, indent: 20 },
    {
      text: "ফেরত না দিলে বা ক্ষতিগ্রস্ত অবস্থায় ফেরত দিলে এর মূল্য রাইডারের পাওনা থেকে কেটে নেওয়া হবে।",
      bullet: true,
      indent: 20,
    },

    { text: "চুক্তির মেয়াদ:", bold: true, size: HEADING_SIZE, gapBefore: BODY_SIZE },
    { text: "এই চুক্তি ইকুইপমেন্ট ফেরত দেওয়া পর্যন্ত কার্যকর থাকবে।" },

    {
      text: "আমি _______________ সম্মতি দিচ্ছি যে, আমি ডাইনবিডির সাথে একনবিষ্ট ভাবে কাজ করবো।",
      gapBefore: BODY_SIZE,
    },
    { label: "নাম", text: data.commitmentName, gapBefore: BODY_SIZE * 0.5 },

    { text: "রাইডারের স্বাক্ষর", bold: true, size: HEADING_SIZE, gapBefore: BODY_SIZE },
    { label: "তারিখ", text: data.signatureDate, gapBefore: BODY_SIZE * 0.3 },
  ];

  return rasterizeLines(lines);
}
