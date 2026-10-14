// react-pdf shapes text with fontkit, whose Indic shaper mishandles Bengali
// (reph, pre-base vowel signs, ya-phala, nukta ordering). This swaps a font's
// layout() for HarfBuzz — the shaper browsers use — whenever the text contains
// Bengali, and returns the result in the shape react-pdf's textkit expects.

type HarfBuzzBuffer = {
  addText: (text: string) => void;
  guessSegmentProperties: () => void;
  json: () => { g: number; cl: number; ax: number; ay: number; dx: number; dy: number }[];
  destroy: () => void;
};

export type HarfBuzz = {
  createBlob: (data: ArrayBuffer) => unknown;
  createFace: (blob: unknown, index: number) => unknown;
  createFont: (face: unknown) => unknown;
  createBuffer: () => HarfBuzzBuffer;
  shape: (font: unknown, buffer: HarfBuzzBuffer) => void;
};

type GlyphRun = { glyphs: unknown[]; positions: unknown[] };

export type FontkitFont = {
  layout: (text: string, ...rest: unknown[]) => GlyphRun;
  getGlyph: (id: number, codePoints?: number[]) => unknown;
  __harfbuzz?: boolean;
};

const BENGALI = /[ঀ-৿]/;

export function attachHarfBuzzShaping(
  hb: HarfBuzz,
  font: FontkitFont,
  fontBytes: ArrayBuffer
) {
  if (font.__harfbuzz) return;
  font.__harfbuzz = true;

  const hbFont = hb.createFont(hb.createFace(hb.createBlob(fontBytes), 0));
  const fontkitLayout = font.layout.bind(font);

  font.layout = (text, ...rest) => {
    if (!BENGALI.test(text)) return fontkitLayout(text, ...rest);

    const buffer = hb.createBuffer();
    buffer.addText(text);
    buffer.guessSegmentProperties();
    hb.shape(hbFont, buffer);
    const shaped = buffer.json();
    buffer.destroy();

    // HarfBuzz merges each Bengali syllable into one cluster (a UTF-16 index).
    // textkit maps glyphs back to the string through glyph.codePoints, so the
    // first glyph of a cluster carries all of its characters, the rest none.
    // fontkit caches one Glyph per id, so codePoints go on a per-use wrapper.
    const withCodePoints = (id: number, codePoints: number[]) =>
      Object.assign(Object.create(font.getGlyph(id) as object), { codePoints });

    const glyphs = shaped.map((info, i) => {
      if (i > 0 && shaped[i - 1].cl === info.cl) return withCodePoints(info.g, []);
      const next = shaped.find((other, j) => j > i && other.cl !== info.cl);
      const chars = Array.from(text.slice(info.cl, next ? next.cl : text.length));
      return withCodePoints(info.g, chars.map((c) => c.codePointAt(0)!));
    });

    const positions = shaped.map((info) => ({
      xAdvance: info.ax,
      yAdvance: info.ay,
      xOffset: info.dx,
      yOffset: info.dy,
    }));

    return { glyphs, positions };
  };
}
