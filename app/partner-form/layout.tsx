import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Registration | DineBD",
  description:
    "Register your restaurant with DineBD. Fill out the partnership application to start receiving orders and grow your business.",
};

export default function PartnerFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
