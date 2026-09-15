import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Dinebd",
  description:
    "Stories, insights, and food thinking from the Dinebd team. Covering food culture, industry news, and life behind the delivery.",
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
