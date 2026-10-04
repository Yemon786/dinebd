"use client";

import React from "react";
import { Svg, Rect, Polyline } from "@react-pdf/renderer";

// Helvetica has no ☑ / ☐ / ✓ glyphs, so the checkbox is drawn as vector graphics.
export const PdfCheckbox = ({
  checked,
  size = 9,
  color = "#ED7319",
  uncheckedColor = "#666",
  style,
}: {
  checked: boolean;
  size?: number;
  color?: string;
  uncheckedColor?: string;
  style?: React.ComponentProps<typeof Svg>["style"];
}) => {
  const stroke = checked ? color : uncheckedColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" style={style}>
      <Rect
        x={0.6}
        y={0.6}
        width={10.8}
        height={10.8}
        rx={1.5}
        fill="none"
        stroke={stroke}
        strokeWidth={1.2}
      />
      {checked && (
        <Polyline
          points="2.8,6.3 5,8.6 9.3,3.6"
          fill="none"
          stroke={stroke}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};
