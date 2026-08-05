"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Lock, Eye, EyeOff } from "lucide-react";
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

    const missing: string[] = [];
    if (!formData.registration.declarationAgreed) missing.push("Rider Registration Form declaration");
    if (!formData.contract.agreed) missing.push("Rider Contract & Terms and Conditions");
    if (!formData.dataProtection.agreed) missing.push("Rider Data Protection Policy");
    if (!formData.insurance.declarationAgreed) missing.push("Rider Insurance Registration Form declaration");
    if (!formData.payment.agreed) missing.push("Rider Payment Form terms");

    if (missing.length > 0) {
      alert(`Please accept all required terms before submitting:\n\n${missing.join("\n")}`);
      return;
    }

    const missingSignatures: string[] = [];
    if (!formData.registration.signature) missingSignatures.push("Rider Registration Form");
    if (!formData.contract.signature) missingSignatures.push("Rider Contract & Terms and Conditions");
    if (!formData.dataProtection.signature) missingSignatures.push("Rider Data Protection Policy");
    if (!formData.equipment.signature) missingSignatures.push("Equipment Policy");
    if (!formData.insurance.signature) missingSignatures.push("Rider Insurance Registration Form");
    if (!formData.payment.signature) missingSignatures.push("Rider Payment Form");

    if (missingSignatures.length > 0) {
      alert(`Please provide your signature on:\n\n${missingSignatures.join("\n")}`);
      return;
    }

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Rider Contract Portal</h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter your access password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="access-password" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg"
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
    <div className="flex gap-6">
      <button
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg print:hidden"
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
        className="flex-1 p-4 sm:p-8 md:p-12 min-w-0"
      >
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
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
        <h1 className="text-lg sm:text-2xl font-bold text-primary mb-8">
          DINEBD RIDER ONBOARDING &amp; CONTRACT
        </h1>

        {SECTIONS.map((section, index) => (
          <FormSection
            key={section.id}
            id={section.id}
            title={`${index + 1}. ${section.title}`}
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

        <div className="pt-8 border-t border-gray-200">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg"
          >
            Submit &amp; Download Contract PDF
          </Button>
        </div>
      </form>
    </div>
  );
}
