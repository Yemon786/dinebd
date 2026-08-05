import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rider Contract Portal | DineBD",
  description:
    "Complete the DineBD rider onboarding paperwork. Fill in your registration, contract, data protection, equipment, insurance, and payment details, then download your signed contract PDF.",
};

export default function RiderContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
