export function SignaturePreview({ value }: { value: File | string | null }) {
  if (typeof value !== "string") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={value}
      alt="Signature"
      className="mt-2 h-16 border border-gray-300 rounded bg-white object-contain"
    />
  );
}
