import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | DineBD",
  description:
    "Find answers to frequently asked questions about DineBD — ordering, delivery, partnerships, and more.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
