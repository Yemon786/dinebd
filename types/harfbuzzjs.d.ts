declare module "harfbuzzjs/hb.js" {
  const createHarfBuzz: (options?: { wasmBinary?: ArrayBuffer }) => Promise<unknown>;
  export default createHarfBuzz;
}

declare module "harfbuzzjs/hbjs.js" {
  import type { HarfBuzz } from "@/components/pdf-bengali-shaping";
  const hbjs: (instance: unknown) => HarfBuzz;
  export default hbjs;
}
