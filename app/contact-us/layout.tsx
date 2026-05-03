import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DineBD",
  description:
    "Get in touch with DineBD — we're here to help with orders, partnerships, and support across Bangladesh.",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
