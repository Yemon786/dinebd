"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, Lock, Eye, EyeOff } from "lucide-react";
import FormSection from "@/components/forms/FormSection";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VendorOnboardingSidebar from "@/components/vendor-onboarding-sidebar";
import VendorContractPDF from "@/components/vendor-contract-pdf";
import { pdf } from "@react-pdf/renderer";

// Service type → platform fee percentage mapping
const SERVICE_TYPE_PLATFORM_FEE: Record<string, string> = {
  "Food delivery": "15%",
  "Takeaway/pick-up": "10%",
  "Book a table": "12%",
  "Catering service": "18%",
  "Homemade food": "8%",
};

// Service type → minimum discount mapping (all default to 10%)
const SERVICE_TYPE_MIN_DISCOUNT: Record<string, string> = {
  "Food delivery": "10%",
  "Takeaway/pick-up": "10%",
  "Book a table": "10%",
  "Catering service": "10%",
  "Homemade food": "10%",
};

// Form sections definition
const SECTIONS = [
  { id: "vendor-information", title: "Vendor Information", type: "form" },
  { id: "commercial-terms", title: "Commercial Terms", type: "form" },
  { id: "commitments", title: "Commitments", type: "content-checkbox" },
  {
    id: "unsuccessful-food-deliveries",
    title: "Unsuccessful food deliveries",
    type: "content",
  },
  {
    id: "payment-and-earnings-policy",
    title: "Payment and Earnings Policy",
    type: "content-checkbox",
  },
  {
    id: "duration-of-partnership",
    title: "Duration of Partnership",
    type: "content-checkbox",
  },
  { id: "confidentiality", title: "Confidentiality", type: "content-checkbox" },
  { id: "governing-law", title: "Governing Law", type: "content-checkbox" },
  {
    id: "data-protection-privacy-policy",
    title: "Data protection & privacy policy",
    type: "content",
  },
  {
    id: "vendor-agreement-terms-and-conditions",
    title: "Vendor Agreement Terms and Conditions",
    type: "content",
  },
  {
    id: "terms-and-conditions-acceptance",
    title: "Terms and Conditions Acceptance",
    type: "content-checkbox",
  },
  { id: "contract-signature", title: "Contract signature", type: "form" },
];

// Form state interfaces
interface VendorOnboardingData {
  vendorInfo: {
    businessName: string;
    legalName: string;
    registeredOfficeAddress: string;
    companyRegistrationNumber: string;
    taxId: string;
    representativeName: string;
    phone: string;
    mobile: string;
    email: string;
    serviceTypes: string[];
    cuisineType: string;
    operatingHours: {
      [key: string]: { open: string; close: string };
    };
    billingContactName: string;
    billingPhone: string;
    billingMobile: string;
    billingEmail: string;
    bkashNumber: string;
    bkashType: string;
    billingAddress: string;
    bankAccountOwner: string;
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  commercialTerms: {
    platformFees: Array<{
      serviceType: string;
      standardPercentage: string;
      agreedPercentage: string;
    }>;
    bookingDiscounts: Array<{
      serviceType: string;
      minimumDiscount: string;
      agreedPercentage: string;
    }>;
    contractStartDate: string;
    contractEndDate: string;
  };
  agreements: {
    commitments: boolean;
    paymentPolicy: boolean;
    duration: boolean;
    confidentiality: boolean;
    governingLaw: boolean;
    finalAcceptance: boolean;
  };
  signatures: {
    vendor: {
      representativeName: string;
      position: string;
      signature: File | null;
      date: string;
    };
    dinebd: {
      representativeName: string;
      position: string;
      signature: File | null;
      date: string;
    };
  };
}

export default function VendorOnboarding() {
  const [formData, setFormData] = useState<VendorOnboardingData>({
    vendorInfo: {
      businessName: "",
      legalName: "",
      registeredOfficeAddress: "",
      companyRegistrationNumber: "",
      taxId: "",
      representativeName: "",
      phone: "",
      mobile: "",
      email: "",
      serviceTypes: [],
      cuisineType: "",
      operatingHours: {
        sunday: { open: "", close: "" },
        monday: { open: "", close: "" },
        tuesday: { open: "", close: "" },
        wednesday: { open: "", close: "" },
        thursday: { open: "", close: "" },
        friday: { open: "", close: "" },
        saturday: { open: "", close: "" },
      },
      billingContactName: "",
      billingPhone: "",
      billingMobile: "",
      billingEmail: "",
      bkashNumber: "",
      bkashType: "Merchant",
      billingAddress: "",
      bankAccountOwner: "",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
    },
    commercialTerms: {
      platformFees: [],
      bookingDiscounts: [],
      contractStartDate: "",
      contractEndDate: "",
    },
    agreements: {
      commitments: false,
      paymentPolicy: false,
      duration: false,
      confidentiality: false,
      governingLaw: false,
      finalAcceptance: false,
    },
    signatures: {
      vendor: {
        representativeName: "",
        position: "",
        signature: null,
        date: "",
      },
      dinebd: {
        representativeName: "",
        position: "",
        signature: null,
        date: "",
      },
    },
  });

  const [activeSection, setActiveSection] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fixed password gate
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

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intersection Observer for active section tracking
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

  // Sync platform fee and booking discount tables when service types change
  useEffect(() => {
    setFormData((prev) => {
      const selectedServices = prev.vendorInfo.serviceTypes;

      const newPlatformFees = selectedServices
        .filter((service) => service !== "Book a table")
        .map((service) => {
          const existing = prev.commercialTerms.platformFees.find(
            (r) => r.serviceType === service,
          );
          return {
            serviceType: service,
            standardPercentage: existing?.standardPercentage ?? "",
            agreedPercentage: existing?.agreedPercentage ?? "",
          };
        });

      const hasBookATable = selectedServices.includes("Book a table");
      const bookATableExisting = prev.commercialTerms.bookingDiscounts.find(
        (r) => r.serviceType === "Book a table",
      );
      const newBookingDiscounts = hasBookATable
        ? [
            {
              serviceType: "Book a table",
              minimumDiscount: bookATableExisting?.minimumDiscount ?? "",
              agreedPercentage: bookATableExisting?.agreedPercentage ?? "",
            },
          ]
        : [];

      const unchanged =
        JSON.stringify(prev.commercialTerms.platformFees) ===
          JSON.stringify(newPlatformFees) &&
        JSON.stringify(prev.commercialTerms.bookingDiscounts) ===
          JSON.stringify(newBookingDiscounts);

      if (unchanged) return prev;

      return {
        ...prev,
        commercialTerms: {
          ...prev.commercialTerms,
          platformFees: newPlatformFees,
          bookingDiscounts: newBookingDiscounts,
        },
      };
    });
  }, [formData.vendorInfo.serviceTypes]);

  // Convert File to base64
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required agreements
    const requiredAgreements = [
      "commitments",
      "paymentPolicy",
      "duration",
      "confidentiality",
      "governingLaw",
      "finalAcceptance",
    ];

    const missingAgreements = requiredAgreements.filter(
      (key) => !formData.agreements[key as keyof typeof formData.agreements],
    );

    if (missingAgreements.length > 0) {
      alert(
        "Please accept all required terms and conditions before submitting.",
      );
      return;
    }

    // Validate signatures
    if (
      !formData.signatures.vendor.signature ||
      !formData.signatures.dinebd.signature
    ) {
      alert("Both vendor and Dinebd signatures are required");
      return;
    }

    try {
      // Convert signature files to base64
      const vendorSignatureBase64 = await fileToBase64(
        formData.signatures.vendor.signature as File,
      );
      const dinebdSignatureBase64 = await fileToBase64(
        formData.signatures.dinebd.signature as File,
      );

      // Create formData copy with base64 signatures
      const pdfFormData = {
        ...formData,
        signatures: {
          ...formData.signatures,
          vendor: {
            ...formData.signatures.vendor,
            signature: vendorSignatureBase64,
          },
          dinebd: {
            ...formData.signatures.dinebd,
            signature: dinebdSignatureBase64,
          },
        },
      };

      // Generate and download PDF
      const blob = await pdf(
        <VendorContractPDF data={pdfFormData as any} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `DineBD-Vendor-Contract-${formData.vendorInfo.representativeName.replace(/\s+/g, "-") || "Vendor"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success message
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate PDF");
    }
  };

  // Password gate screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Contract Portal</h1>
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
              This form is restricted to authorized DineBD partners only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Mobile menu toggle button */}
      <button
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg print:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Vendor Onboarding Sidebar */}
      <VendorOnboardingSidebar
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Form Content */}
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
          DINEBD & VENDOR CONTRACT/PARTNERSHIP AGREEMENT
        </h1>

        {/* Form Sections */}
        {SECTIONS.map((section) => (
          <FormSection
            key={section.id}
            id={section.id}
            title={`${SECTIONS.indexOf(section) + 1}. ${section.title}`}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            {/* Vendor Information Section */}
            {section.type === "form" && section.id === "vendor-information" && (
              <div className="space-y-8">
                {/* Agreement Header */}
                <div className="text-center space-y-2 mb-8">
                  <p className="text-sm text-gray-600">
                    This Vendor Partnership ("Agreement") made and entered into
                    on Effective Date (date of signing) by and between:
                  </p>
                </div>

                {/* Introduction Section */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold">
                    Dinebd Limited, a company duly incorporated under laws of
                    Bangladesh, registered under Reg. No: C-202938/2025, having
                    its registered office at Level 4, 34 Awal Centre, Kamal
                    Ataturk Avenue, Banani, Dhaka 1213, Bangladesh, hereinafter
                    referred to as "Dinebd",
                  </p>
                  <p className="text-sm font-semibold">AND</p>
                  <p className="text-sm font-semibold">
                    <span className="font-bold"> Vendor Information: </span>This
                    section provides vendor's information. This information will
                    be used for official records, communication, and processing
                    in accordance with this contract. It is important that all
                    details are accurate and complete
                  </p>
                </div>

                {/* Basic Info Fields */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-2">
                    Vendor Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">
                        Business/Restaurant Name *
                      </Label>
                      <Input
                        id="businessName"
                        value={formData.vendorInfo.businessName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              businessName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter business name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalName">Legal Name *</Label>
                      <Input
                        id="legalName"
                        value={formData.vendorInfo.legalName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              legalName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter legal name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registeredOfficeAddress">
                        Registered Office Address *
                      </Label>
                      <Input
                        id="registeredOfficeAddress"
                        value={formData.vendorInfo.registeredOfficeAddress}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              registeredOfficeAddress: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter registered address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyRegistrationNumber">
                        Company Registration Number *
                      </Label>
                      <Input
                        id="companyRegistrationNumber"
                        value={formData.vendorInfo.companyRegistrationNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              companyRegistrationNumber: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID *</Label>
                      <Input
                        id="taxId"
                        value={formData.vendorInfo.taxId}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              taxId: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter tax ID"
                      />
                    </div>
                    <div>
                      <Label htmlFor="representativeName">
                        Representative Name *
                      </Label>
                      <Input
                        id="representativeName"
                        value={formData.vendorInfo.representativeName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              representativeName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter representative name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.vendorInfo.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              phone: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.vendorInfo.mobile}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              mobile: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.vendorInfo.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              email: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Vendor Service Type Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-2">
                    Vendor Service Type
                  </h3>

                  <div>
                    <p className="text-sm font-medium mb-4">
                      Collectively referred to as "The Parties", and
                      individually as a "Party"
                    </p>
                    <div className="space-y-3">
                      {[
                        "Food delivery",
                        "Takeaway/pick-up",
                        "Book a table",
                        "Catering service",
                        "Homemade food",
                      ].map((service) => (
                        <label key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            name={service}
                            checked={formData.vendorInfo.serviceTypes.includes(
                              service,
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  vendorInfo: {
                                    ...prev.vendorInfo,
                                    serviceTypes: [
                                      ...prev.vendorInfo.serviceTypes,
                                      service,
                                    ],
                                  },
                                }));
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  vendorInfo: {
                                    ...prev.vendorInfo,
                                    serviceTypes:
                                      prev.vendorInfo.serviceTypes.filter(
                                        (s: string) => s !== service,
                                      ),
                                  },
                                }));
                              }
                            }}
                            className="mr-3 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm cursor-pointer">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cuisineType">
                      Vendor Cuisine Type (e.g., Bangladeshi, Indian, etc.) *
                    </Label>
                    <Input
                      id="cuisineType"
                      value={formData.vendorInfo.cuisineType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          vendorInfo: {
                            ...prev.vendorInfo,
                            cuisineType: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter cuisine type"
                    />
                  </div>
                </div>

                {/* Operating Hours Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-2">
                    Vendor Opening Time and Closing Time
                  </h3>

                  <p className="text-sm text-gray-600">
                    Below listed the vendor's opening and closing times. This is
                    important to handle accurate information, as these times
                    will be displayed on the Dinebd platform for customer
                    notifications and deliveries.
                  </p>

                  <div className="space-y-4">
                    {Object.keys(formData.vendorInfo.operatingHours).map(
                      (day) => (
                        <div
                          key={day}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-end"
                        >
                          <div>
                            <Label className="capitalize">{day}:</Label>
                          </div>
                          <div>
                            <Label>Opening time</Label>
                            <Input
                              type="time"
                              value={
                                formData.vendorInfo.operatingHours[day].open
                              }
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  vendorInfo: {
                                    ...prev.vendorInfo,
                                    operatingHours: {
                                      ...prev.vendorInfo.operatingHours,
                                      [day]: {
                                        ...prev.vendorInfo.operatingHours[day],
                                        open: e.target.value,
                                      },
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Closing time</Label>
                            <Input
                              type="time"
                              value={
                                formData.vendorInfo.operatingHours[day].close
                              }
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  vendorInfo: {
                                    ...prev.vendorInfo,
                                    operatingHours: {
                                      ...prev.vendorInfo.operatingHours,
                                      [day]: {
                                        ...prev.vendorInfo.operatingHours[day],
                                        close: e.target.value,
                                      },
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Billing Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-2">
                    Billing Information
                  </h3>

                  <p className="text-sm text-gray-600">
                    Please provide accurate and complete billing details. This
                    information will be used to process payments, commissions,
                    and reimbursements. All fields must be filled carefully to
                    ensure timely and correct payment processing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingContactName">
                        Billing Contact Name *
                      </Label>
                      <Input
                        id="billingContactName"
                        value={formData.vendorInfo.billingContactName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              billingContactName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter billing contact name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingPhone">Phone *</Label>
                      <Input
                        id="billingPhone"
                        type="tel"
                        value={formData.vendorInfo.billingPhone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              billingPhone: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingMobile">Mobile *</Label>
                      <Input
                        id="billingMobile"
                        type="tel"
                        value={formData.vendorInfo.billingMobile}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              billingMobile: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingEmail">Email Address *</Label>
                      <Input
                        id="billingEmail"
                        type="email"
                        value={formData.vendorInfo.billingEmail}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              billingEmail: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bkashNumber">Bkash Number *</Label>
                      <Input
                        id="bkashNumber"
                        value={formData.vendorInfo.bkashNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              bkashNumber: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter Bkash number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bkashType">Bkash Type *</Label>
                      <select
                        id="bkashType"
                        value={formData.vendorInfo.bkashType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              bkashType: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Merchant">Merchant</option>
                        <option value="Personal">Personal</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="billingAddress">Billing Address *</Label>
                      <Input
                        id="billingAddress"
                        value={formData.vendorInfo.billingAddress}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              billingAddress: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter billing address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bankAccountOwner">
                        Bank Account Owner *
                      </Label>
                      <Input
                        id="bankAccountOwner"
                        value={formData.vendorInfo.bankAccountOwner}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              bankAccountOwner: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter bank account owner"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={formData.vendorInfo.bankName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              bankName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">
                        Bank Account Number *
                      </Label>
                      <Input
                        id="accountNumber"
                        value={formData.vendorInfo.accountNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              accountNumber: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter bank account number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="swiftCode">
                        Swift Code (if applicable)
                      </Label>
                      <Input
                        id="swiftCode"
                        value={formData.vendorInfo.swiftCode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            vendorInfo: {
                              ...prev.vendorInfo,
                              swiftCode: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter Swift code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Commercial Terms Section */}
            {section.type === "form" && section.id === "commercial-terms" && (
              <div className="space-y-6">
                <div className=" p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4"></h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-700 mt-1">
                        The Vendor agrees to pay Dinebd Limited the applicable
                        Commission Fees in accordance with the attached Terms
                        and Conditions and the selected service options.
                      </p>
                    </div>
                    <div>
                      <strong>2.1 Commission Fees</strong>
                      <p className="text-gray-700 mt-1">
                        Commission fees are calculated as a percentage of the
                        Vendor's revenue generated through the Dinebd platform.
                        Maximum Commission Deduction: 25%.<br></br>
                        <br></br>
                        <strong>Note:</strong> Dinebd reserves the right to
                        adjust commission rates in the future, subject to the
                        maximum cap of 25%. Any such changes will be
                        communicated to the Vendor in advance before
                        implementation, ensuring that Vendors have prior notice
                        of any updates to the applicable commission percentages.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-6 space-y-6">
                  {/* Note Section */}
                  <div className=" ">
                    <p className="text-sm text-gray-700">
                      <strong>Agreed Dinebd Platform Fee Percentages</strong>{" "}
                      The following platform fee percentages have been agreed
                      between the Vendor and Dinebd Limited based on this
                      contract:
                      <br />
                      <br />
                      <strong>
                        (Please fill in the boxes in Agreed Percentage section)
                      </strong>
                    </p>
                  </div>

                  {/* Platform Fee Section */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">
                      2.1.1 Dinebd Platform Fee
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      The following platform fees percentages have been agreed
                      between the Vendor and Dinebd Limited based on cuisine:
                    </p>
                    {formData.commercialTerms.platformFees.length === 0 ? (
                      <p className="text-sm text-gray-400 italic py-3">
                        Select one or more service types above to populate this
                        table.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="px-4 py-3 text-left">
                                Service type
                              </th>
                              <th className="px-4 py-3 text-left">
                                Standard Percentage
                              </th>
                              <th className="px-4 py-3 text-left">
                                Agreed Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.commercialTerms.platformFees.map(
                              (row, idx) => (
                                <tr
                                  key={row.serviceType}
                                  className={`border-b ${
                                    idx % 2 === 0
                                      ? "bg-primary/20"
                                      : "bg-white"
                                  }`}
                                >
                                  <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                    {row.serviceType}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    <Input
                                      value={row.standardPercentage}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          commercialTerms: {
                                            ...prev.commercialTerms,
                                            platformFees:
                                              prev.commercialTerms.platformFees.map(
                                                (r, i) =>
                                                  i === idx
                                                    ? {
                                                        ...r,
                                                        standardPercentage:
                                                          e.target.value,
                                                      }
                                                    : r,
                                              ),
                                          },
                                        }));
                                      }}
                                      placeholder="Enter %"
                                      className="w-24 h-8 text-sm border-gray-300"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    <Input
                                      value={row.agreedPercentage}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          commercialTerms: {
                                            ...prev.commercialTerms,
                                            platformFees:
                                              prev.commercialTerms.platformFees.map(
                                                (r, i) =>
                                                  i === idx
                                                    ? {
                                                        ...r,
                                                        agreedPercentage:
                                                          e.target.value,
                                                      }
                                                    : r,
                                              ),
                                          },
                                        }));
                                      }}
                                      placeholder="Enter %"
                                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary font-medium text-primary bg-white"
                                    />
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Table Booking Discounts */}
                  {formData.vendorInfo.serviceTypes.includes("Book a table") && <div>
                    <h3 className="font-bold text-gray-800 mb-3">
                      2.2 Table Booking Discounts
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Vendors agree to provide minimum 10% discount (on
                      agreed-upon amount) to through the platform discount
                      section.
                    </p>
                    {formData.commercialTerms.bookingDiscounts.length === 0 ? (
                      <p className="text-sm text-gray-400 italic py-3">
                        Select one or more service types above to populate this
                        table.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="px-4 py-3 text-left">
                                Service type
                              </th>
                              <th className="px-4 py-3 text-left">
                                Minimum discount
                              </th>
                              <th className="px-4 py-3 text-left">
                                Agreed Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.commercialTerms.bookingDiscounts.map(
                              (row, idx) => (
                                <tr
                                  key={row.serviceType}
                                  className={`border-b ${
                                    idx % 2 === 0
                                      ? "bg-primary/20"
                                      : "bg-white"
                                  }`}
                                >
                                  <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                    {row.serviceType}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    <Input
                                      value={row.minimumDiscount}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          commercialTerms: {
                                            ...prev.commercialTerms,
                                            bookingDiscounts:
                                              prev.commercialTerms.bookingDiscounts.map(
                                                (r, i) =>
                                                  i === idx
                                                    ? {
                                                        ...r,
                                                        minimumDiscount:
                                                          e.target.value,
                                                      }
                                                    : r,
                                              ),
                                          },
                                        }));
                                      }}
                                      placeholder="Enter %"
                                      className="w-24 h-8 text-sm border-gray-300"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    <Input
                                      value={row.agreedPercentage}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          commercialTerms: {
                                            ...prev.commercialTerms,
                                            bookingDiscounts:
                                              prev.commercialTerms.bookingDiscounts.map(
                                                (r, i) =>
                                                  i === idx
                                                    ? {
                                                        ...r,
                                                        agreedPercentage:
                                                          e.target.value,
                                                      }
                                                    : r,
                                              ),
                                          },
                                        }));
                                      }}
                                      placeholder="Enter %"
                                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary font-medium text-primary bg-white"
                                    />
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>}

                  {/* Terms of Agreement */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">
                      2.3 Terms of Agreement
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex gap-3">
                        <span className=" font-bold">•</span>
                        <span>
                          Commission rates and discounts will remain in effect
                          until further notice.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className=" font-bold">•</span>
                        <span>
                          Dinebd reserves the right to adjust commission
                          percentages, subject to a maximum of 25%.
                        </span>
                        <br />
                        <br />
                      </li>
                    </ul>
                    <strong>Taxation Policy:</strong> This section outlines the
                    policy regarding the payment and responsibility for
                    government taxes as it pertains to Dinebd and its vendors.
                  </div>

                  {/* Government Taxes */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">
                      A. Government Tax Payments:
                    </h3>
                    <p className="text-sm text-gray-700">
                      All government taxes will be handled separately by each
                      involved party as outlined below.
                    </p>
                  </div>

                  {/* Income Tax Responsibilities */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">
                      B. Income Tax Responsibilities:
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-3">
                        <span className="">•</span>
                        <span>
                          Dinebd: Dinebd will be responsible for paying income
                          tax on the commission it collects from the platform
                          fee profit.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="">•</span>
                        <span>
                          Vendors: Vendors will be responsible for paying income
                          tax on their total revenue, excluding the platform fee
                          and delivery fee.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="">•</span>
                        <span>
                          Compliance Both Dinebd and vendors must ensure
                          compliance with this policy and adhere to the relevant
                          tax regulations according to Bangladesh Government
                          Law.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Amendments */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">
                      C. Amendments:
                    </h3>
                    <p className="text-sm text-gray-700">
                      This policy may be amended or updated as necessary. Any
                      changes will be communicated in writing. For further
                      information or clarification, please contact
                      info@dinebd.com.
                    </p>
                  </div>

                  {/* Contract Dates */}
                  <div className="border-t-2 border-gray-200 pt-6">
                    <h3 className="font-bold text-gray-800 mb-4">
                      This Contract Start Date:
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 block mb-2">
                          Start Date:
                        </Label>
                        <Input
                          type="date"
                          value={formData.commercialTerms.contractStartDate}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              commercialTerms: {
                                ...prev.commercialTerms,
                                contractStartDate: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contract Signature Section */}
            {section.type === "form" && section.id === "contract-signature" && (
              <div className="space-y-8">
                <p className="text-gray-700 mb-6">
                  IN WITNESS WHEREOF, Parties have executed this Vendor
                  Partnership Agreement as of the Effective Date below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Vendor Representative
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="vendorRepName">
                          Representative Name *
                        </Label>
                        <Input
                          id="vendorRepName"
                          value={formData.signatures.vendor.representativeName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                vendor: {
                                  ...prev.signatures.vendor,
                                  representativeName: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="Enter representative name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vendorPosition">Position *</Label>
                        <Input
                          id="vendorPosition"
                          value={formData.signatures.vendor.position}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                vendor: {
                                  ...prev.signatures.vendor,
                                  position: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="Enter position"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vendorSignature">Signature *</Label>
                        <Input
                          id="vendorSignature"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData((prev) => ({
                                ...prev,
                                signatures: {
                                  ...prev.signatures,
                                  vendor: {
                                    ...prev.signatures.vendor,
                                    signature: file,
                                  },
                                },
                              }));
                            }
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="vendorDate">Date *</Label>
                        <Input
                          id="vendorDate"
                          type="date"
                          value={formData.signatures.vendor.date}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                vendor: {
                                  ...prev.signatures.vendor,
                                  date: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Dinebd Representative
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dinebdRepName">
                          Representative Name *
                        </Label>
                        <Input
                          id="dinebdRepName"
                          value={formData.signatures.dinebd.representativeName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                dinebd: {
                                  ...prev.signatures.dinebd,
                                  representativeName: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="Enter representative name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dinebdPosition">Position *</Label>
                        <Input
                          id="dinebdPosition"
                          value={formData.signatures.dinebd.position}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                dinebd: {
                                  ...prev.signatures.dinebd,
                                  position: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="Enter position"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dinebdSignature">Signature *</Label>
                        <Input
                          id="dinebdSignature"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData((prev) => ({
                                ...prev,
                                signatures: {
                                  ...prev.signatures,
                                  dinebd: {
                                    ...prev.signatures.dinebd,
                                    signature: file,
                                  },
                                },
                              }));
                            }
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dinebdDate">Date *</Label>
                        <Input
                          id="dinebdDate"
                          type="date"
                          value={formData.signatures.dinebd.date}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              signatures: {
                                ...prev.signatures,
                                dinebd: {
                                  ...prev.signatures.dinebd,
                                  date: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Commitments Section */}
            {section.type === "content-checkbox" &&
              section.id === "commitments" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-6"></h3>
                  </div>

                  {/* Vendor's Commitments */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      a. Vendor's Commitments:
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The information below confirms the Vendor's commitments
                      and their agreed operational, commercial, and compliance
                      obligations.
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          Agree to use Dinebd's platform for listing and
                          promoting services.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          Maintain accurate and updated information about the
                          establishment on the Dinebd platform.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          Adhere to food safety, hygiene, and allergy
                          contamination guidelines.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Dinebd's Commitments */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      b. Dinebd's Commitments:
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The details below confirm what Dinebd agrees to provide,
                      including platform access, promotional support, and
                      operational guidance to ensure smooth transactions and
                      positive customer experience.
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          Dinebd will provide advertising tools and features to
                          enhance the visibility of the Vendor.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          Uphold Dinebd's goal of provide accurate information
                          and improve the overall dining experience.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Checkbox */}
                  <CheckboxAgreement
                    checked={formData.agreements.commitments}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreements: {
                          ...prev.agreements,
                          commitments: checked,
                        },
                      }))
                    }
                    label="I read and understand the terms and conditions"
                  />
                </div>
              )}

            {/* Payment and Earnings Policy Section */}
            {section.type === "content-checkbox" &&
              section.id === "payment-and-earnings-policy" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-800 mb-4"></h3>

                  {/* Earnings Structure */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        Earnings Structure and Payment Policy
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Earnings for completed deliveries or orders will
                        generally be processed every two to three days. (some
                        cases even earlier) and transferred directly to your
                        registered bank account or bKash account. It is your
                        responsibility to ensure that your bank account
                        information is accurate and up to date to receive timely
                        payments.
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      Please note that payment days may vary due to factors such
                      as weekends, public holidays, festive periods, or other
                      circumstances like bank closures. While we at Dinebd aim
                      to provide timely payments to you as quickly as possible,
                      some delays may occur due to factors beyond our control,
                      such as bank operating hours, public holidays, or when the
                      payment date falls outside of regular banking hours.
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      In general, we aim to make payments within two to three
                      days. However, the processing of payments may take
                      additional time due to the complexities of the banking
                      system in Bangladesh. We want to be transparent with you,
                      as openness and honesty are core values of our business.
                      Our goal is to provide you with clear communication and
                      support, and we are committed to ensuring you receive your
                      payments as soon as they reach us.
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      While we strive to meet the agreed service level, we will
                      always make an effort to send your payments as soon as
                      possible. If you have any questions or require further
                      support, please do not hesitate to contact our dedicated
                      customer support team for more information.
                    </p>
                  </div>

                  {/* Payment Policy Section */}
                  <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-800">
                      Payment Policy for Cash and Partial Payment Orders
                    </h4>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        Food Delivery Orders (Cash or Partial Payment):
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        At the time of cash food delivery order pickup, you are
                        responsible for collecting the order amount from the
                        rider, minus the platform fee, delivery fees, and any
                        applicable discounts. The amount to be collected will be
                        shown in the Dinebd Partner App during pickup. Any
                        amounts due from Dinebd, such as discounts or other
                        charges, will be paid to you later according to the
                        payment disbursement policy. You are only responsible
                        for collecting the amount from rider indicated in the
                        partner app.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        Takeaway Orders:
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        At the time of cash order pickup, the customer will pay
                        you the cash amount excluding the Dinebd platform fee
                        and any applicable discounts. You are responsible for
                        accepting the amount as indicated in the app. Any
                        outstanding amounts due from Dinebd will be paid to you
                        later according to the payment disbursement policy. The
                        subtotal plus tax will be the total amount, from which
                        Dinebd will deduct the platform fee and any applicable
                        discounts. Any remaining balance due from Dinebd will be
                        transferred to you later.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        Table Booking Orders:
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        For table bookings, the customer will arrive at the
                        agreed-upon time shown in the app, and you are
                        responsible for ensuring the customer receives the table
                        according to the contract. Additionally, you must
                        provide any agreed-upon discounts to the customer as per
                        Dinebd's policy. Please note you will not receive any
                        direct payment from Dinebd for tablebookings as the
                        customer will pay you after the food is served. You are
                        responsible for offering customer the discount agreed
                        upon according to your contract with Dinebd.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        Homemade Pickup Orders:
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        At the time of pickup, you will pay you the cash amount
                        excluding the Dinebd platform fee and any discounts
                        offered by Dinebd. You are responsible for accepting the
                        amount shown in the app. Any remaining balance due from
                        Dinebd will be paid to you later as per Dinebd's payment
                        disbursement policy. As with takeaway orders, you will
                        get the subtotal plus tax from the total amount, and
                        Dinebd will deduct the platform fee and any applicable
                        discounts. Any remaining balance due from Dinebd will be
                        paid you later, if applicable.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        Catering Orders:
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        After the customer accepts the quotation for a catering
                        order, they will confirm the order in the Dinebd app by
                        paying the agreed platform fee. Dinebd will collect the
                        platform fee during booking. Once the order is
                        confirmed, the remaining balance will be paid by the
                        customer either in cash or online, as per your
                        preference. Dinebd is not responsible for collecting the
                        remaining amount; it is your responsibility to arrange
                        payment collection with the customer based on your own
                        business policy. We do not take responsibility for any
                        discrepancies or conflicts related to payment. However,
                        if the customer cancels the order in accordance with
                        Dinebd's cancellation policy, the platform fee will be
                        refunded to the customer by Dinebd. No further payment
                        will be made by Dinebd to the vendor, as Dinebd is only
                        collecting the platform fee during the order initiation.
                        The vendor is fully responsible for collecting payments
                        from the customer and must comply with Dinebd's policy
                        to ensure smooth operations. All Dinebd terms and
                        conditions apply to protect customer rights according to
                        Bangladeshi government laws.
                      </p>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <CheckboxAgreement
                    checked={formData.agreements.paymentPolicy}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreements: {
                          ...prev.agreements,
                          paymentPolicy: checked,
                        },
                      }))
                    }
                    label="I read and understand the terms and conditions"
                  />
                </div>
              )}

            {/* Duration of Partnership Section */}
            {section.type === "content-checkbox" &&
              section.id === "duration-of-partnership" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4"></h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        This partnership shall commence on the Effective Date as
                        signed below and will continue until terminated by
                        either party with 30 days' written notice, unless
                        otherwise agreed in writing.
                      </p>
                    </div>
                  </div>

                  <CheckboxAgreement
                    checked={formData.agreements.duration}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreements: { ...prev.agreements, duration: checked },
                      }))
                    }
                    label="I read and understand the terms and conditions"
                  />
                </div>
              )}

            {/* Confidentiality Section */}
            {section.type === "content-checkbox" &&
              section.id === "confidentiality" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4"></h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Both parties agree to maintain the confidentiality of
                        any proprietary or sensitive information shared during
                        this partnership. This obligation shall survive the
                        termination of the agreement.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* Governing Law Section */}
            {section.type === "content-checkbox" &&
              section.id === "governing-law" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4"></h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        This Agreement shall be governed by and construed in
                        accordance with the laws of Bangladesh.
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Any disputes arising out of or in connection with this
                      Agreement shall be resolved through arbitration in
                      accordance with the rules of the Arbitration Act, 2001
                      (Bangladesh) before a single arbitrator appointed in
                      accordance with those rules. The place (or seat) of
                      arbitration shall be Dhaka, Bangladesh.
                    </p>
                  </div>
                </div>
              )}

            {section.type === "content-checkbox" &&
              section.id === "confidentiality" && (
                <CheckboxAgreement
                  checked={formData.agreements.confidentiality}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreements: {
                        ...prev.agreements,
                        confidentiality: checked,
                      },
                    }))
                  }
                  label="I read and understand the confidentiality terms"
                />
              )}

            {section.type === "content-checkbox" &&
              section.id === "governing-law" && (
                <CheckboxAgreement
                  checked={formData.agreements.governingLaw}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreements: { ...prev.agreements, governingLaw: checked },
                    }))
                  }
                  label="I read and understand the governing law terms"
                />
              )}

            {/* Terms and Conditions Acceptance Section */}
            {section.type === "content-checkbox" &&
              section.id === "terms-and-conditions-acceptance" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-900 mb-2 mt-5 text-sm">
                      The Vendor further acknowledges that:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        All information provided to Dinebd Limited is true and
                        accurate to the best of their knowledge.
                      </li>
                      <li>
                        They will comply with all operational, commercial, and
                        legal obligations mentioned herein.
                      </li>
                      <li>
                        They have had the opportunity to review of Agreement and
                        seek independent legal advice before signing.
                      </li>
                      <li>
                        The terms and conditions contained in this Agreement
                        shall be binding upon both Dinebd Limited and Vendor
                        from the Effective Date.
                      </li>
                    </ul>
                  </div>

                  <CheckboxAgreement
                    checked={formData.agreements.finalAcceptance}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreements: {
                          ...prev.agreements,
                          finalAcceptance: checked,
                        },
                      }))
                    }
                    label="By signing this Agreement, Vendor hereby confirms that they have read, understood, and agreed to all of the terms and conditions set forth in this Dinebd Limited Vendor Partnership Agreement."
                  />
                </div>
              )}

            {/* Unsuccessful Food Deliveries Section */}
            {section.type === "content" &&
              section.id === "unsuccessful-food-deliveries" && (
                <div className="space-y-6">
                  <h2 className="font-bold text-gray-900"></h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Customer not found
                      </h3>
                      <p className="text-gray-700">
                        In the rare event that the delivery rider is unable to
                        locate the customer, the rider must return the food to
                        the vendor in good condition.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">Rider refund</h3>
                      <p className="text-gray-700 font-semibold">
                        For cash or partial payment orders:
                      </p>
                      <p className="text-gray-700">
                        If the order was paid by the rider during pick up (cash
                        or partial payment), the vendor is required to refund
                        the rider for the full amount once the food is returned.
                        Since the rider pays for the food when picking it up,
                        the vendor must refund the rider in case of an
                        unsuccessful delivery.
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-700 font-semibold">
                        For online payment orders:
                      </p>
                      <p className="text-gray-700">
                        For orders paid online, the rider will return the food
                        to the vendor in good condition. No refund is needed for
                        the rider, as the payment was made online.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        Reporting unsuccessful deliveries
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>
                          The rider or vendor must report any unsuccessful
                          delivery or transaction to Dinebd immediately to
                          ensure compliance and for record-keeping purposes.
                        </li>
                        <li>
                          Dinebd may investigate any reported incidents and take
                          necessary actions to prevent future issues and improve
                          the process.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">Support</h3>
                      <p className="text-gray-700">
                        For assistance or to report any issues, riders and
                        vendors can reach out to the Dinebd support team through
                        the app or via email at{" "}
                        <a
                          href="mailto:info@dinebd.com"
                          className="text-orange-500 hover:underline"
                        >
                          info@dinebd.com
                        </a>{" "}
                        or{" "}
                        <a
                          href="mailto:support@dinebd.com"
                          className="text-orange-500 hover:underline"
                        >
                          support@dinebd.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* Data Protection & Privacy Policy Section */}
            {section.type === "content" &&
              section.id === "data-protection-privacy-policy" && (
                <div className="space-y-8">
                  <section>
                    <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                      {/* What information do we collect */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          What information do we collect?
                        </h4>
                        <p className="mb-3">
                          Dinebd collects information about businesses from a
                          variety of sources, including publicly available
                          information, information provided by vendors during
                          the onboarding process. Information may also be
                          gathered via manual marketing efforts or other
                          moveable sources.
                        </p>
                        <p className="mb-3">
                          Additionally, vendors can provide information directly
                          through registration on the Dinebd platform. This may
                          include business and legal information, financial
                          information, bank account details, such as bank
                          account and payment method information, and photos.
                        </p>
                        <p>
                          All information held by Dinebd consists primarily of
                          publicly available data. Any personal information
                          voluntarily shared by vendors will be kept secure and
                          handled confidentially.
                        </p>
                      </div>

                      {/* What can we use information for */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          What can we use information for?
                        </h4>
                        <p className="mb-3">
                          Any of the information we collect from you may be used
                          in one of the following ways:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            To personalize your experience; your information
                            helps us to better respond to your individual needs
                          </li>
                          <li>
                            To improve our website(s) (we continually strive to
                            improve our website offers based on the information
                            and feedback we receive from you)
                          </li>
                          <li>
                            To improve customer service (your information helps
                            us to more effectively respond to your customer and
                            support requests)
                          </li>
                          <li>
                            To process transactions (your information, whether
                            public or private, will not be sold, exchanged,
                            transferred, or given to any other third party for
                            any reason whatsoever, without your consent, other
                            than for the purpose of delivering the desired
                            product or service requested by the customer)
                          </li>
                          <li>
                            To administer a contest, promotion, survey or other
                            site features
                          </li>
                          <li>
                            To send periodic emails (the email address you
                            provide may be used to send you information and
                            updates pertaining to your order, in addition to
                            receiving occasional company news, updates, related
                            product or service information, etc.)
                          </li>
                          <li>
                            To allow you to access our services and make
                            transactions
                          </li>
                          <li>
                            To allow us to better serve you in responding to
                            your customer and support requests
                          </li>
                          <li>Security and efficiency</li>
                          <li>
                            Enable you to maintain your profile, preferences,
                            and save information for faster future use or
                            otherwise
                          </li>
                        </ul>
                      </div>

                      {/* How do we protect your information */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          How do we protect your information?
                        </h4>
                        <p className="mb-3">
                          Dinebd deploys a variety of security, administrative,
                          and physical security measures to protect your
                          information against unauthorized access, alteration,
                          disclosure, or destruction. These include:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Secure storage of personal and business information
                            using encryption and access controls
                          </li>
                          <li>
                            Regular monitoring and updating of security measures
                            to address security vulnerabilities
                          </li>
                          <li>
                            Secure handling of sensitive financial and business
                            information
                          </li>
                        </ul>
                      </div>

                      {/* Do we disclose any information to outside parties */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Do we disclose any information to outside parties?
                        </h4>
                        <p>
                          We do not sell, trade, or transfer your personal
                          information, except to trusted third parties who help
                          operate our website or services and are bound by
                          confidentiality. We may also disclose information to
                          comply with the law, enforce site policies, or protect
                          ours and others' rights and safety. Please note that
                          we are not responsible for the content but welcome
                          feedback.
                        </p>
                      </div>

                      {/* Data Retention */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Data Retention
                        </h4>
                        <p>
                          Dinebd retains personal and business data only as long
                          as necessary to provide services, comply with legal
                          obligations, resolve disputes, and enforce agreements.
                          When data is no longer required, it will be securely
                          deleted.
                        </p>
                      </div>

                      {/* Your Rights */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Your Rights
                        </h4>
                        <p className="mb-3">All vendors have the right to:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Request access to their personal data held by Dinebd
                          </li>
                          <li>Request correction of inaccurate data</li>
                          <li>
                            Request deletion of personal data was permitted
                            under applicable law
                          </li>
                          <li>
                            Withdraw consent for data collection or processing
                            where applicable
                          </li>
                          <li>
                            Requests can be submitted to info@dinebd.com and
                            will be assessed promptly
                          </li>
                        </ul>
                      </div>

                      {/* Your Consent */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Your Consent
                        </h4>
                        <p className="mb-3">
                          By providing you to test your business information,
                          you give consent to this privacy policy.
                        </p>
                      </div>

                      {/* Changes to our Privacy Policy */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Changes to our Privacy Policy
                        </h4>
                        <p className="mb-3">
                          Dinebd may update this Privacy Policy periodically.
                          All changes will be posted on the website and app with
                          the effective date clearly indicated. Vendors are
                          encouraged to review this policy regularly.
                        </p>
                      </div>

                      {/* Contact Us */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          Contact Us
                        </h4>
                        <p>
                          If there are any questions regarding this Dinebd data
                          protection and privacy policy you may contact us on
                          our website www.dinebd.com or email us at
                          info@dinebd.com.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              )}

            {/* Vendor Agreement Terms and Conditions Section */}
            {section.type === "content" &&
              section.id === "vendor-agreement-terms-and-conditions" && (
                <div className="space-y-8">
                  <section>
                    <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                      {/* Services Provided by Dinebd */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          1. Services Provided by Dinebd
                        </h4>
                        <p className="mb-3">
                          1.1 Dinebd agrees to provide the Vendor with access to
                          its platform for the purpose of listing, promoting,
                          and facilitating reservations, takeaway orders,
                          homemade food orders, and catering services.
                          <br />
                          <br />
                          1.2 The Vendor acknowledges that Dinebd's platform
                          includes features such as table booking, takeaway
                          orders, homemade food orders, and catering services
                          and that Dinebd will promote the Vendor's services
                          through its platform.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          2. Commission Fees{" "}
                        </h4>
                        <p className="mb-3">
                          2.1 The Vendor agrees to pay Dinebd a commission fee
                          based on a percentage of the Vendor's revenue
                          generated through the Dinebd platform. The specific
                          commission percentage and payment terms are outlined
                          in the Commercial Terms section of the Vendor
                          Registration Form.
                          <br />
                          <br />
                          2.2 Dinebd reserves the right to adjust the commission
                          percentage and payment terms upon providing reasonable
                          notice to the Vendor.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          3. Vendor's Obligations{" "}
                        </h4>
                        <p className="mb-3">
                          3.1 The Vendor shall provide accurate and up-to-date
                          information about its establishment, including menu
                          details, pricing, and business hours, on the Dinebd
                          platform.
                          <br />
                          <br />
                          3.2 The Vendor agrees to maintain food safety and
                          hygiene standards as per industry regulations and
                          adheres to allergy contamination guidelines.
                          <br />
                          <br />
                          3.3 The Vendor shall notify Dinebd promptly of any
                          changes in its business details, including but not
                          limited to contact information, menu, and business
                          hours.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          4. Unsuccessful Food Deliveries{" "}
                        </h4>
                        <p className="mb-3">
                          4.1 As a vendor, in the event of an unsuccessful food
                          delivery where the rider is unable to locate the
                          customer, the food will be returned to you. For cash
                          or partial payment orders, you are required to refund
                          the rider in full once the food is returned, as the
                          rider has already paid for the food at the time of
                          pickup.
                          <br />
                          <br />
                          4.2 However, for online payment orders, you are not
                          obligated to refund the rider for an unsuccessful
                          delivery, as the payment was made online. In this
                          case, the rider is only required to return the food in
                          good condition. Furthermore, both riders and vendors
                          advised to report any unsuccessful deliveries to
                          Dinebd immediately to ensure compliance and maintain
                          accurate records. Dinebd may investigate the reported
                          incidents and take necessary actions to prevent future
                          issues. For any assistance or to report problems,
                          riders and vendors can contact Dinebd support via the
                          app or email at info@dinebd.com or support@dinebd.com.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          5. Payment and Earnings Policy Summary for
                          Restaurants{" "}
                        </h4>
                        <div className="mb-3">
                          By agreeing to partner with Dinebd, you acknowledge
                          and accept the following payment and earnings
                          structure:
                          <br />
                          <br />
                          <h4 className="font-bold text-gray-800 mb-2">
                            Earnings Structure & Payment Timeline:{" "}
                          </h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li>
                              Payments for completed orders or deliveries are
                              processed every 2-3 days, transferred to your
                              registered bank or Bkash account
                            </li>
                            <li>
                              Payment days may vary due to weekends, holidays,
                              or bank closures. While we aim for quick
                              processing, delays can occur due to factors like
                              banking hours.
                            </li>
                            <li>
                              Any outstanding amounts from Dinebd will be paid
                              later, in accordance with our payment disbursement
                              policy.
                            </li>
                          </ul>
                          <br />
                          <br />
                          <h4 className="font-bold text-gray-800 mb-2">
                            Payment Policy for Cash and Partial Payment Orders:
                          </h4>
                          Please read this section carefully, as it outlines how
                          Dinebd processes payments for orders involving cash or
                          partial payments.
                          <ul className="list-disc list-inside space-y-2">
                            <li>
                              Food Delivery (Cash/Partial Payment): You are
                              responsible for collecting the order amount from
                              the rider (after deducting platform fees and
                              discounts or other charges). Any outstanding
                              amounts from Dinebd will be paid to you later.
                            </li>
                            <li>
                              Takeaway Orders: Customers will pay you the amount
                              due at pickup, minus platform fees and discounts
                              or other charges. Any remaining balance will be
                              paid to you by Dinebd later.
                            </li>
                            <li>
                              Table Booking Orders: You are responsible for
                              providing any agreed discounts to the customer.
                              Dinebd will not make direct payments for table
                              bookings. Payment will be made by customer after
                              the food is served.
                            </li>
                            <li>
                              Homemade Pickup Orders: for homemade takeaway
                              orders, the customer will pay cash minus platform
                              fees, discounts or other charges and any
                              outstanding amounts from Dinebd will be paid
                              later.
                            </li>
                            <li>
                              Catering Orders: Dinebd collects the platform fee
                              during booking. You are responsible for collecting
                              the remaining payment directly from the customer,
                              either in cash or online. Dinebd is not
                              responsible for collecting the remaining balance.
                            </li>
                          </ul>
                          <br />
                          <br />
                          By agreeing to this policy, you (vendor) confirm that
                          you will adhere to the outlined payment conditions and
                          understand your responsibilities as a Dinebd partner.
                        </div>

                        <h4 className="font-bold text-gray-800 mb-2">
                          6. Duration and Termination
                        </h4>
                        <p className="mb-3">
                          6.1 This partnership agreement shall commence on the
                          Effective Date as signed below and will continue until
                          terminated by either party with 30 days' written
                          notice, unless otherwise agreed in writing.
                          <br />
                          <br />
                          6.2 Either party may terminate this agreement
                          immediately in the event of a material breach by the
                          other party.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          7. Confidentiality
                        </h4>
                        <p className="mb-3">
                          7.1 Both Parties agree to treat as strictly
                          confidential all proprietary, technical, financial,
                          and business information disclosed by one Party to the
                          other in connection with this Agreement ("Confidential
                          Information"). This includes, but is not limited to,
                          trade secrets, business strategies, pricing
                          structures, marketing plans, operational procedures,
                          financial data, customer lists, technical data, and
                          any other information marked or reasonably understood
                          to be confidential.
                          <br />
                          <br />
                          7.2 The confidentiality obligations shall survive the
                          termination of this agreement. Upon termination or
                          expiration of this Agreement, or upon written request
                          by the disclosing Party, each Party shall promptly
                          return or permanently destroy all Confidential
                          Information in its possession, except where retention
                          is required by law or regulatory authority.
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          8. Governing Law and Dispute Resolution
                        </h4>
                        <p className="mb-3">
                          8.1 Governing Law This Agreement shall be governed by
                          and construed in accordance with the laws of the
                          People's Republic of Bangladesh. All rights,
                          obligations, and remedies of Parties shall be subject
                          to Bangladeshi jurisdiction.
                          <br />
                          <br />
                          8.2 Dispute Resolution Process In the event of any
                          dispute, controversy, or claim arising out of or
                          relating to this Agreement, Parties shall first
                          attempt to resolve the matter amicably and in good
                          faith. The Vendor must notify Dinebd Limited in
                          writing within seven (7) business days of the
                          dispute's occurrence. Dinebd will review and attempt
                          to resolve issue internally before any formal
                          proceedings are initiated.
                          <br />
                          <br />
                          8.3 Arbitration If a dispute cannot be resolved
                          amicably, it shall be referred to binding arbitration
                          under the Arbitration Act, 2001 (Bangladesh). The
                          arbitration shall be conducted by a single arbitrator
                          appointed by Dinebd Limited, unless otherwise required
                          by law. The seat and venue shall be Dhaka, Bangladesh,
                          and the proceedings shall be in English. The arbitral
                          award shall be final and binding on both Parties and
                          enforceable in any court of competent jurisdiction.
                          Dinebd reserves right to suspend services, withhold
                          payments, or take interim measures during the dispute
                          process to protect its operational or financial
                          interests.
                          <br />
                          <br />
                          8.4 Costs, Obligations, and Injunctive Relief Unless
                          otherwise directed by the arbitrator, each Party shall
                          bear its own costs; however, the Vendor shall
                          reimburse Dinebd for any reasonable legal,
                          administrative, or enforcement expenses incurred in
                          protecting its rights. During the dispute resolution
                          process, both Parties shall continue performing their
                          obligations under this Agreement unless such
                          performance is impossible or Dinebd instructs
                          otherwise in writing. Dinebd also reserves the right
                          to seek immediate injunctive, equitable, or interim
                          relief from a court of competent jurisdiction in
                          Bangladesh to safeguard its confidential information,
                          intellectual property, or business interests.
                        </p>
                      </div>

                      {/* Miscellaneous */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          9. Miscellaneous
                        </h4>

                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            This section outlines general provisions that
                            clarify and support this Agreement.
                          </li>
                          <li>
                            Any changes to this Agreement must be made in
                            writing and signed by both Parties.
                          </li>
                          <li>
                            This document represents the full and final
                            understanding between Parties and supersedes all
                            prior discussions or agreements.
                          </li>
                          <li>
                            All formal notices must be sent in writing to the
                            addresses or email contacts provided by each Party.
                          </li>
                          <li>
                            Neither Party shall be liable for delays or
                            non-performance caused by circumstances beyond their
                            reasonable control, including natural disasters,
                            strikes, or government actions.
                          </li>
                          <li>
                            If any provision of this Agreement is found invalid
                            or unenforceable, the remaining provisions shall
                            remain in full effect.
                          </li>
                          <li>
                            Failure or delay in enforcing any right shall not
                            constitute a waiver unless confirmed in writing.
                          </li>
                          <li>
                            The Vendor may not assign or transfer its rights or
                            obligations under this Agreement without Dinebd's
                            prior written consent. However, Dinebd may assign
                            its rights to an affiliate or successor company
                            without Vendor consent.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              )}

            {/* Placeholder for unimplemented sections */}
            {!(
              section.id === "vendor-information" ||
              section.id === "commercial-terms" ||
              section.id === "contract-signature" ||
              section.id === "commitments" ||
              section.id === "payment-and-earnings-policy" ||
              section.id === "duration-of-partnership" ||
              section.id === "confidentiality" ||
              section.id === "governing-law" ||
              section.id === "terms-and-conditions-acceptance" ||
              section.id === "unsuccessful-food-deliveries" ||
              section.id === "data-protection-privacy-policy" ||
              section.id === "vendor-agreement-terms-and-conditions"
            ) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[200px]">
                <p className="text-gray-600 text-center">
                  Section content for "{section.title}" will be implemented
                  here.
                </p>
                <p className="text-gray-500 text-sm text-center mt-2">
                  ({section.type})
                </p>
              </div>
            )}
          </FormSection>
        ))}

        {/* Submit Button */}
        <div className="mt-12 text-center">
          <Button
            type="submit"
            size="lg"
            className="bg-primary hover:bg-[#FF7700] text-white px-12 py-4 text-lg font-bold"
          >
            Submit Complete Agreement
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
