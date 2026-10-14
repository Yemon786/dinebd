"use client";

import React from "react";
import { Text } from "@react-pdf/renderer";
import "./pdf-fonts";

// Helvetica has no Taka (৳) glyph, so the symbol is rendered with Noto Sans Bengali.

export const TakaSign = ({ bold = false }: { bold?: boolean }) => (
  <Text
    style={{
      fontFamily: "NotoSansBengali",
      fontWeight: bold ? "bold" : "normal",
    }}
  >
    ৳
  </Text>
);

export const taka = (n: number, bold = false) => (
  <>
    <TakaSign bold={bold} />
    {(isNaN(n) ? 0 : n).toFixed(2)}
  </>
);

export const bdt = (value: string, bold = false) =>
  taka(parseFloat(value), bold);
