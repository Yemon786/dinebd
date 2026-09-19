import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Order Confirmation | Dinebd Catering",
  description:
    "Complete the Dinebd Catering vendor order confirmation form with catering order, meal schedule, dietary, and finance details, then download the order confirmation PDF.",
};

export default function CateringVendorOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
