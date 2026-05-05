"use client";
import { ChevronRight, X } from "lucide-react";

const navigationItems = [
  { id: "vendor-information", label: "Vendor Information" },
  { id: "commercial-terms", label: "Commercial Terms" },
  { id: "commitments", label: "Commitments" },
  { id: "unsuccessful-food-deliveries", label: "Unsuccessful food deliveries" },
  { id: "payment-and-earnings-policy", label: "Payment and Earnings Policy" },
  { id: "duration-of-partnership", label: "Duration of Partnership" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "governing-law", label: "Governing Law" },
  { id: "data-protection-privacy-policy", label: "Data protection & privacy policy" },
  { id: "vendor-agreement-terms-and-conditions", label: "Vendor Agreement Terms and Conditions" },
  { id: "terms-and-conditions-acceptance", label: "Terms and Conditions Acceptance" },
  { id: "contract-signature", label: "Contract signature" }
];

interface VendorOnboardingSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function VendorOnboardingSidebar({ activeSection, onSectionClick, isOpen, onClose }: VendorOnboardingSidebarProps) {
  const handleClick = (sectionId: string) => {
    onSectionClick(sectionId);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white z-40 shadow-xl overflow-y-auto transition-transform duration-300 print:hidden
          lg:static lg:h-auto lg:w-64 lg:shadow-none lg:overflow-visible lg:translate-x-0 lg:shrink-0 lg:bg-transparent lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <span className="font-semibold text-primary">Sections</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 p-2 lg:p-0 lg:space-y-2 lg:sticky lg:top-6 lg:mt-9">
          {navigationItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer flex items-center transition-colors text-sm font-medium ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-primary/70 hover:text-primary"
              }`}
            >
              <span className="flex-1">
                {index + 1}. {item.label}
              </span>
              {activeSection === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}