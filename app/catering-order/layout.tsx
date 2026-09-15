import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Office Lunch Order Form | Dinebd Catering",
  description:
    "Complete the Dinebd Catering office lunch order form. Fill in vendor, customer, and lunch service details, review terms, and download your order confirmation PDF.",
};

export default function CateringOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
