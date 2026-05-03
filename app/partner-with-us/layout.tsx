import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us | DineBD",
  description:
    "Grow your restaurant business with DineBD. Join thousands of partners receiving online orders and delivery across Bangladesh.",
};

export default function PartnerWithUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
