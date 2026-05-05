import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Contract Portal | DineBD",
  description:
    "Complete the DineBD vendor partnership agreement. Fill in your business details, review terms, and download your signed contract PDF.",
};

export default function PrivacyContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
