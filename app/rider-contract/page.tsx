"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Lock, Eye, EyeOff, Download, CheckCircle2 } from "lucide-react";
import FormSection from "@/components/forms/FormSection";
import RiderOnboardingSidebar from "@/components/rider-onboarding-sidebar";
import RiderContractPDF from "@/components/rider-contract-pdf";
import RegistrationSection from "@/components/onboarding/registration-section";
import ContractSection from "@/components/onboarding/contract-section";
import DataProtectionSection from "@/components/onboarding/data-protection-section";
import EquipmentSection from "@/components/onboarding/equipment-section";
import InsuranceSection from "@/components/onboarding/insurance-section";
import PaymentSection from "@/components/onboarding/payment-section";
import { pdf } from "@react-pdf/renderer";
import {
  initialRiderOnboardingData,
  type RiderOnboardingData,
} from "@/lib/onboarding-types";
import { rasterizeEquipmentPolicy } from "@/lib/rasterize-equipment-policy";

const SECTIONS = [
  { id: "rider-registration", title: "Rider Registration Form" },
  { id: "rider-contract", title: "Rider Contract & Terms and Conditions" },
  { id: "data-protection-policy", title: "Rider Data Protection Policy" },
  { id: "equipment-policy", title: "Equipment Policy" },
  { id: "rider-insurance", title: "Rider Insurance Registration Form" },
  { id: "payment-form", title: "Rider Payment Form" },
];

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
};

const resolveSignature = async (
  value: File | string | null,
): Promise<File | string | null> => {
  if (value instanceof File) return fileToBase64(value);
  return value;
};

export default function RiderContractPortal() {
  const [formData, setFormData] = useState<RiderOnboardingData>(
    initialRiderOnboardingData,
  );

  const [activeSection, setActiveSection] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "DineBD@2026") {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please contact DineBD for access.");
    }
  };

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pdfFormData: RiderOnboardingData = {
        registration: {
          ...formData.registration,
          signature: await resolveSignature(formData.registration.signature),
          officeSignature: await resolveSignature(formData.registration.officeSignature),
        },
        contract: {
          ...formData.contract,
          signature: await resolveSignature(formData.contract.signature),
          officeSignature: await resolveSignature(formData.contract.officeSignature),
        },
        dataProtection: {
          ...formData.dataProtection,
          signature: await resolveSignature(formData.dataProtection.signature),
          officeSignature: await resolveSignature(formData.dataProtection.officeSignature),
        },
        equipment: {
          ...formData.equipment,
          signature: await resolveSignature(formData.equipment.signature),
          ...(() => {
            const raster = rasterizeEquipmentPolicy(formData.equipment);
            return { bnImageDataUrl: raster.dataUrl, bnImageAspect: raster.aspect };
          })(),
        },
        insurance: {
          ...formData.insurance,
          signature: await resolveSignature(formData.insurance.signature),
        },
        payment: {
          ...formData.payment,
          signature: await resolveSignature(formData.payment.signature),
        },
      };

      const blob = await pdf(<RiderContractPDF data={pdfFormData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `DineBD-Rider-Contract-${formData.registration.fullName.replace(/\s+/g, "-") || "Rider"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate PDF");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-white px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-orange-900/5 border border-gray-100 p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-1 ring-primary/15">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rider Contract Portal</h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter your access password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="access-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    id="access-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors pr-12"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Access Contract Form
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              This form is restricted to authorized DineBD riders and staff only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 lg:py-10 flex gap-6 lg:gap-10 items-start">
        <button
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-primary text-white p-3.5 rounded-full shadow-xl shadow-primary/30 print:hidden transition-transform hover:scale-105 active:scale-95"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <RiderOnboardingSidebar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <form
          onSubmit={handleSubmit}
          className="flex-1 min-w-0"
        >
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-lg sm:text-3xl font-extrabold text-primary tracking-tight">
              DINEBD RIDER ONBOARDING &amp; CONTRACT
            </h1>
          </div>

          {showSuccess && (
            <div className="mb-8 p-4 sm:p-5 bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Contract Generated Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your contract PDF has been downloaded. Please check your
                    downloads folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {SECTIONS.map((section, index) => (
            <FormSection
              key={section.id}
              id={section.id}
              title={`${index + 1}. ${section.title}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-8 md:p-10 scroll-mt-24"
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            >
            {section.id === "rider-registration" && (
              <RegistrationSection
                data={formData.registration}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    registration: { ...prev.registration, ...patch },
                  }))
                }
              />
            )}
            {section.id === "rider-contract" && (
              <ContractSection
                data={formData.contract}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    contract: { ...prev.contract, ...patch },
                  }))
                }
              />
            )}
            {section.id === "data-protection-policy" && (
              <DataProtectionSection
                data={formData.dataProtection}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    dataProtection: { ...prev.dataProtection, ...patch },
                  }))
                }
              />
            )}
            {section.id === "equipment-policy" && (
              <EquipmentSection
                data={formData.equipment}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    equipment: { ...prev.equipment, ...patch },
                  }))
                }
              />
            )}
            {section.id === "rider-insurance" && (
              <InsuranceSection
                data={formData.insurance}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    insurance: { ...prev.insurance, ...patch },
                  }))
                }
              />
            )}
            {section.id === "payment-form" && (
              <PaymentSection
                data={formData.payment}
                onChange={(patch) =>
                  setFormData((prev) => ({
                    ...prev,
                    payment: { ...prev.payment, ...patch },
                  }))
                }
              />
            )}
          </FormSection>
          ))}

          <div className="pt-8 mt-2 border-t border-gray-200 flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Submit &amp; Download Contract PDF
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
