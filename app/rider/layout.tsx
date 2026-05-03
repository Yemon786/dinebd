import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Rider | DineBD",
  description:
    "Join the DineBD rider network. Earn money on your own schedule with flexible hours, competitive pay, and fast onboarding.",
};

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
