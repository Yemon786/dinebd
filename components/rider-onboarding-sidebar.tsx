"use client";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "rider-registration", label: "Rider Registration Form" },
  { id: "rider-contract", label: "Rider Contract & Terms and Conditions" },
  { id: "data-protection-policy", label: "Rider Data Protection Policy" },
  { id: "equipment-policy", label: "Equipment Policy" },
  { id: "rider-insurance", label: "Rider Insurance Registration Form" },
  { id: "payment-form", label: "Rider Payment Form" },
];

interface RiderOnboardingSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function RiderOnboardingSidebar({
  activeSection,
  onSectionClick,
  isOpen,
  onClose,
}: RiderOnboardingSidebarProps) {
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
          lg:sticky lg:top-6 lg:self-start lg:h-auto lg:max-h-[calc(100vh-3rem)] lg:w-64 lg:shadow-none lg:overflow-visible lg:translate-x-0 lg:shrink-0 lg:bg-transparent lg:z-auto
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

        <nav className="p-3 lg:p-4 lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm">
          <p className="hidden lg:block px-2 pb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Sections
          </p>
          <div className="space-y-0.5">
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const isLast = index === navigationItems.length - 1;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "relative w-full text-left px-2.5 py-2.5 rounded-xl cursor-pointer flex items-start gap-3 transition-colors text-sm",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                  )}
                >
                  <span className="relative flex flex-col items-center">
                    <span
                      className={cn(
                        "flex items-center justify-center w-6 h-6 shrink-0 rounded-full text-xs font-bold transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {index + 1}
                    </span>
                    {!isLast && (
                      <span className="w-px flex-1 min-h-[14px] bg-gray-200 mt-1" />
                    )}
                  </span>
                  <span className="pt-0.5 leading-snug">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
