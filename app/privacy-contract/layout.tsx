import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Contract | DineBD",
  description:
    "Review and sign the DineBD vendor partnership agreement. Terms, conditions, and service expectations for restaurant partners.",
};

export default function PrivacyContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
