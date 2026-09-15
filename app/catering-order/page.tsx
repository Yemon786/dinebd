"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Menu, Lock, Eye, EyeOff, Download, CheckCircle2, Calculator } from "lucide-react";
import FormSection from "@/components/forms/FormSection";
import CheckboxAgreement from "@/components/forms/CheckboxAgreement";
import { RadioOptionGroup } from "@/components/onboarding/radio-group";
import CateringOrderSidebar from "@/components/catering-order-sidebar";
import CateringOrderPDF from "@/components/catering-order-pdf";
import { pdf } from "@react-pdf/renderer";

const SECTIONS = [
  { id: "order-vendor-details", letter: "A", title: "Order & Vendor Details" },
  { id: "customer-details", letter: "B", title: "Customer Details" },
  { id: "lunch-service-details", letter: "C", title: "Lunch Service Details" },
  { id: "finance", letter: "D", title: "Finance" },
  { id: "catering-terms", letter: "E", title: "Catering Terms & Conditions" },
  {
    id: "confirmation-acceptance",
    letter: "F",
    title: "Customer Order Confirmation & Acceptance",
  },
];

const DAYS: { key: string; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

interface DaySchedule {
  items: string;
  quantity: string;
}

interface CateringOrderData {
  orderVendor: {
    cateringOrderId: string;
    vendorName: string;
    vendorReferenceNumber: string;
    vendorContactNumber: string;
    orderDate: string;
    date: string;
  };
  customer: {
    customerName: string;
    customerContactNumber: string;
    officeAddress: string;
  };
  lunchService: {
    packageName: string;
    mealSchedule: Record<string, DaySchedule>;
    additionalItems: string;
    lunchStartDate: string;
    lunchEndDate: string;
    numberOfDays: string;
    deliveryTime: string;
    totalLunchesPerDay: string;
    dietaryRequirements: string;
    otherInformation: string;
  };
  finance: {
    numberOfDays: string;
    lunchesPerDay: string;
    subtotal: string;
    vatAmount: string;
    deliveryFee: string;
    otherCosts: string;
    paymentPreference: "advance" | "daily" | "";
    paymentReference: string;
    amountPaid: string;
  };
  acceptance: boolean;
  signOff: {
    customerName: string;
    customerDate: string;
    representativeName: string;
    representativeDate: string;
  };
}

const initialMealSchedule: Record<string, DaySchedule> = DAYS.reduce(
  (acc, day) => {
    acc[day.key] = { items: "", quantity: "" };
    return acc;
  },
  {} as Record<string, DaySchedule>,
);

const initialData: CateringOrderData = {
  orderVendor: {
    cateringOrderId: "",
    vendorName: "",
    vendorReferenceNumber: "",
    vendorContactNumber: "",
    orderDate: "",
    date: "",
  },
  customer: {
    customerName: "",
    customerContactNumber: "",
    officeAddress: "",
  },
  lunchService: {
    packageName: "",
    mealSchedule: initialMealSchedule,
    additionalItems: "",
    lunchStartDate: "",
    lunchEndDate: "",
    numberOfDays: "",
    deliveryTime: "",
    totalLunchesPerDay: "",
    dietaryRequirements: "",
    otherInformation: "",
  },
  finance: {
    numberOfDays: "",
    lunchesPerDay: "",
    subtotal: "",
    vatAmount: "",
    deliveryFee: "",
    otherCosts: "",
    paymentPreference: "",
    paymentReference: "",
    amountPaid: "",
  },
  acceptance: false,
  signOff: {
    customerName: "",
    customerDate: "",
    representativeName: "",
    representativeDate: "",
  },
};

const CurrencyInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
      £
    </span>
    <Input
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "0.00"}
      className="pl-7"
    />
  </div>
);

export default function CateringOrderPortal() {
  const [formData, setFormData] = useState<CateringOrderData>(initialData);
  const [activeSection, setActiveSection] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "DineBD@2026") {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please contact DineBD for access.");
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const total = useMemo(() => {
    const subtotal = parseFloat(formData.finance.subtotal) || 0;
    const vat = parseFloat(formData.finance.vatAmount) || 0;
    const delivery = parseFloat(formData.finance.deliveryFee) || 0;
    const other = parseFloat(formData.finance.otherCosts) || 0;
    return subtotal + vat + delivery + other;
  }, [
    formData.finance.subtotal,
    formData.finance.vatAmount,
    formData.finance.deliveryFee,
    formData.finance.otherCosts,
  ]);

  const outstandingBalance = useMemo(() => {
    const amountPaid = parseFloat(formData.finance.amountPaid) || 0;
    return total - amountPaid;
  }, [total, formData.finance.amountPaid]);

  const calculateLunchDays = () => {
    const { lunchStartDate, lunchEndDate } = formData.lunchService;
    if (!lunchStartDate || !lunchEndDate) return;
    const start = new Date(lunchStartDate);
    const end = new Date(lunchEndDate);
    const diffDays =
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays > 0) {
      setFormData((prev) => ({
        ...prev,
        lunchService: {
          ...prev.lunchService,
          numberOfDays: String(diffDays),
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptance) {
      alert(
        "Please accept the Catering Terms & Conditions before submitting.",
      );
      return;
    }

    try {
      const blob = await pdf(
        <CateringOrderPDF
          data={{
            ...formData,
            finance: {
              ...formData.finance,
            },
          }}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Dinebd-Catering-Order-${
        formData.orderVendor.cateringOrderId.replace(/\s+/g, "-") || "Order"
      }.pdf`;
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
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Catering Order Portal
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter your access password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="access-password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
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
                Access Order Form
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              This form is restricted to authorized DineBD staff and catering
              partners only.
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

        <CateringOrderSidebar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <form onSubmit={handleSubmit} className="flex-1 min-w-0">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-lg sm:text-3xl font-extrabold text-primary tracking-tight">
              DIENBD CATERING
            </h1>
            <p className="text-sm text-gray-600 mt-3 max-w-3xl">
              Thank you for choosing Dienbd Catering for your office lunch
              service. To confirm and process your order, kindly complete the
              following details.
            </p>
          </div>

          {showSuccess && (
            <div className="mb-8 p-4 sm:p-5 bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Order Form Generated Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your order confirmation PDF has been downloaded. Please
                    check your downloads folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {SECTIONS.map((section) => (
            <FormSection
              key={section.id}
              id={section.id}
              title={`${section.letter}. ${section.title}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-8 md:p-10 scroll-mt-24"
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            >
              {section.id === "order-vendor-details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cateringOrderId">Catering Order ID</Label>
                    <Input
                      id="cateringOrderId"
                      value={formData.orderVendor.cateringOrderId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            cateringOrderId: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter catering order ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorName">Vendor Name</Label>
                    <Input
                      id="vendorName"
                      value={formData.orderVendor.vendorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            vendorName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorReferenceNumber">
                      Vendor Reference Number
                    </Label>
                    <Input
                      id="vendorReferenceNumber"
                      value={formData.orderVendor.vendorReferenceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            vendorReferenceNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor reference number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorContactNumber">
                      Vendor Contact Number
                    </Label>
                    <Input
                      id="vendorContactNumber"
                      type="tel"
                      value={formData.orderVendor.vendorContactNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            vendorContactNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor contact number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderDate">Order Date</Label>
                    <Input
                      id="orderDate"
                      type="date"
                      value={formData.orderVendor.orderDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            orderDate: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderVendorDate">Date</Label>
                    <Input
                      id="orderVendorDate"
                      type="date"
                      value={formData.orderVendor.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderVendor: {
                            ...prev.orderVendor,
                            date: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              {section.id === "customer-details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={formData.customer.customerName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customer: {
                            ...prev.customer,
                            customerName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerContactNumber">
                      Customer Contact Number
                    </Label>
                    <Input
                      id="customerContactNumber"
                      type="tel"
                      value={formData.customer.customerContactNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customer: {
                            ...prev.customer,
                            customerContactNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter customer contact number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="officeAddress">
                      Office / Delivery Address
                    </Label>
                    <Textarea
                      id="officeAddress"
                      value={formData.customer.officeAddress}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customer: {
                            ...prev.customer,
                            officeAddress: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter full office / delivery address"
                      className="min-h-28"
                    />
                  </div>
                </div>
              )}

              {section.id === "lunch-service-details" && (
                <div className="space-y-8">
                  <div>
                    <Label htmlFor="packageName">Package Name</Label>
                    <Input
                      id="packageName"
                      value={formData.lunchService.packageName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lunchService: {
                            ...prev.lunchService,
                            packageName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter package name"
                    />
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 mb-4 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
                      Weekly Meal Schedule
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full min-w-[560px]">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="px-4 py-3 text-left text-sm font-semibold w-28">
                              Day
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                              Meal / Food Items
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold w-40">
                              Quantity / People
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {DAYS.map((day, idx) => (
                            <tr
                              key={day.key}
                              className={`border-b border-gray-100 ${
                                idx % 2 === 0 ? "bg-orange-50/40" : "bg-white"
                              }`}
                            >
                              <td className="px-4 py-2.5 text-sm font-medium text-gray-700">
                                {day.label}
                              </td>
                              <td className="px-4 py-2 min-w-[220px]">
                                <Input
                                  value={
                                    formData.lunchService.mealSchedule[day.key]
                                      ?.items ?? ""
                                  }
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      lunchService: {
                                        ...prev.lunchService,
                                        mealSchedule: {
                                          ...prev.lunchService.mealSchedule,
                                          [day.key]: {
                                            ...prev.lunchService.mealSchedule[
                                              day.key
                                            ],
                                            items: e.target.value,
                                          },
                                        },
                                      },
                                    }))
                                  }
                                  placeholder="e.g. Chicken biryani, salad"
                                  className="bg-white"
                                />
                              </td>
                              <td className="px-4 py-2 min-w-[120px]">
                                <Input
                                  value={
                                    formData.lunchService.mealSchedule[day.key]
                                      ?.quantity ?? ""
                                  }
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      lunchService: {
                                        ...prev.lunchService,
                                        mealSchedule: {
                                          ...prev.lunchService.mealSchedule,
                                          [day.key]: {
                                            ...prev.lunchService.mealSchedule[
                                              day.key
                                            ],
                                            quantity: e.target.value,
                                          },
                                        },
                                      },
                                    }))
                                  }
                                  placeholder="e.g. 25"
                                  className="bg-white"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalItems">
                      Additional Food Items / Beverages
                    </Label>
                    <Textarea
                      id="additionalItems"
                      value={formData.lunchService.additionalItems}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lunchService: {
                            ...prev.lunchService,
                            additionalItems: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g. Bottled water, soft drinks, dessert"
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lunchStartDate">Lunch Start Date</Label>
                      <Input
                        id="lunchStartDate"
                        type="date"
                        value={formData.lunchService.lunchStartDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lunchService: {
                              ...prev.lunchService,
                              lunchStartDate: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lunchEndDate">Lunch End Date</Label>
                      <Input
                        id="lunchEndDate"
                        type="date"
                        value={formData.lunchService.lunchEndDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lunchService: {
                              ...prev.lunchService,
                              lunchEndDate: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="numberOfDays">Number of Days</Label>
                      <div className="flex gap-2">
                        <Input
                          id="numberOfDays"
                          inputMode="numeric"
                          value={formData.lunchService.numberOfDays}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              lunchService: {
                                ...prev.lunchService,
                                numberOfDays: e.target.value,
                              },
                            }))
                          }
                          placeholder="Enter number of days"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={calculateLunchDays}
                          className="shrink-0 px-3"
                          title="Calculate from start and end dates"
                        >
                          <Calculator className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Enter manually, or use the calculator to fill it in
                        from the start/end dates.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime">
                        Preferred Food Delivery Time
                      </Label>
                      <Input
                        id="deliveryTime"
                        type="time"
                        value={formData.lunchService.deliveryTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lunchService: {
                              ...prev.lunchService,
                              deliveryTime: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalLunchesPerDay">
                        Total Number of Lunches / People per Day
                      </Label>
                      <Input
                        id="totalLunchesPerDay"
                        type="number"
                        min="0"
                        value={formData.lunchService.totalLunchesPerDay}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lunchService: {
                              ...prev.lunchService,
                              totalLunchesPerDay: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. 25"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dietaryRequirements">
                      Dietary Requirements / Special Instructions
                    </Label>
                    <Textarea
                      id="dietaryRequirements"
                      value={formData.lunchService.dietaryRequirements}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lunchService: {
                            ...prev.lunchService,
                            dietaryRequirements: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g. No nuts, halal only, vegetarian options required"
                      className="min-h-28"
                    />
                  </div>

                  <div>
                    <Label htmlFor="otherInformation">
                      Any Other Information
                    </Label>
                    <Textarea
                      id="otherInformation"
                      value={formData.lunchService.otherInformation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lunchService: {
                            ...prev.lunchService,
                            otherInformation: e.target.value,
                          },
                        }))
                      }
                      placeholder="Any other information for the catering partner"
                      className="min-h-28"
                    />
                  </div>
                </div>
              )}

              {section.id === "finance" && (
                <div className="space-y-8">
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[480px]">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Description
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 bg-orange-50/40">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Number of Days
                          </td>
                          <td className="px-4 py-2 w-48">
                            <Input
                              inputMode="numeric"
                              value={formData.finance.numberOfDays}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: {
                                    ...prev.finance,
                                    numberOfDays: e.target.value,
                                  },
                                }))
                              }
                              placeholder="e.g. 5"
                              className="text-right bg-white"
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Number of Lunches / People per Day
                          </td>
                          <td className="px-4 py-2 w-48">
                            <Input
                              inputMode="numeric"
                              value={formData.finance.lunchesPerDay}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: {
                                    ...prev.finance,
                                    lunchesPerDay: e.target.value,
                                  },
                                }))
                              }
                              placeholder="e.g. 25"
                              className="text-right bg-white"
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-orange-50/40">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Subtotal
                          </td>
                          <td className="px-4 py-2 w-48">
                            <CurrencyInput
                              value={formData.finance.subtotal}
                              onChange={(v) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, subtotal: v },
                                }))
                              }
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            VAT Amount
                          </td>
                          <td className="px-4 py-2 w-48">
                            <CurrencyInput
                              value={formData.finance.vatAmount}
                              onChange={(v) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, vatAmount: v },
                                }))
                              }
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-orange-50/40">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Delivery Fee
                          </td>
                          <td className="px-4 py-2 w-48">
                            <CurrencyInput
                              value={formData.finance.deliveryFee}
                              onChange={(v) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, deliveryFee: v },
                                }))
                              }
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Other Costs
                          </td>
                          <td className="px-4 py-2 w-48">
                            <CurrencyInput
                              value={formData.finance.otherCosts}
                              onChange={(v) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, otherCosts: v },
                                }))
                              }
                            />
                          </td>
                        </tr>
                        <tr className="bg-primary/10">
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">
                            TOTAL
                          </td>
                          <td className="px-4 py-3 text-right text-base font-bold text-primary">
                            £{total.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 mb-4 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
                      Payment Preference
                    </h3>
                    <RadioOptionGroup
                      name="paymentPreference"
                      options={[
                        "Advance Payment / Full Paid",
                        "Daily Payment / Partial Payment",
                      ]}
                      value={
                        formData.finance.paymentPreference === "advance"
                          ? "Advance Payment / Full Paid"
                          : formData.finance.paymentPreference === "daily"
                            ? "Daily Payment / Partial Payment"
                            : ""
                      }
                      onChange={(v) =>
                        setFormData((prev) => ({
                          ...prev,
                          finance: {
                            ...prev.finance,
                            paymentPreference:
                              v === "Advance Payment / Full Paid"
                                ? "advance"
                                : "daily",
                          },
                        }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paymentReference">
                        Payment Reference
                      </Label>
                      <Input
                        id="paymentReference"
                        value={formData.finance.paymentReference}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            finance: {
                              ...prev.finance,
                              paymentReference: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter payment reference"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amountPaid">Amount Paid</Label>
                      <CurrencyInput
                        value={formData.finance.amountPaid}
                        onChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            finance: { ...prev.finance, amountPaid: v },
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        TOTAL AMOUNT
                      </span>
                      <span className="text-lg font-bold text-primary">
                        £{total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Subtotal + VAT Amount + Delivery Fee + Other Costs =
                      TOTAL
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                      <span className="text-sm font-semibold text-gray-700">
                        Amount Paid
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        £{(parseFloat(formData.finance.amountPaid) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        Outstanding Balance
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        £{outstandingBalance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {section.id === "catering-terms" && (
                <div className="space-y-6 text-sm leading-relaxed text-gray-700">
                  <p className="font-semibold text-gray-800">
                    Please read and accept the following conditions before
                    placing or confirming your catering order.
                  </p>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      1. Order at Least 24 Hours in Advance
                    </h4>
                    <p>
                      Catering orders should be placed at least 24 hours in
                      advance. Late orders may be cancelled, partially
                      delivered, or unavailable, subject to catering partner
                      availability.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      2. Multiple-Day Catering
                    </h4>
                    <p>
                      For weekly or monthly catering, each delivery day may
                      be treated as a separate daily order, with its own
                      delivery date and time.
                    </p>
                    <p className="mt-1 italic text-gray-600">
                      Example: 7 days of catering = 7 separate daily orders.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      3. Quotation &amp; Delivery Charges
                    </h4>
                    <p>
                      The catering partner will confirm availability and
                      provide the final quotation. Delivery charges, VAT
                      where applicable, and other applicable costs may apply
                      per day/order. All applicable charges will be shown
                      before confirmation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      4. Order Confirmation
                    </h4>
                    <p>
                      Once the quotation is accepted and the required
                      payment is made, the catering partner may begin food
                      preparation. Changes or cancellations may therefore no
                      longer be possible.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      5. Payment &amp; Remaining Balance
                    </h4>
                    <p>
                      Customers may choose one of the following payment
                      arrangements:
                    </p>
                    <ul className="mt-2 space-y-1.5 list-disc list-inside">
                      <li>
                        <span className="font-semibold">
                          Pay in Advance:
                        </span>{" "}
                        Pay the remaining balance through a secure Dinebd
                        payment link.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Pay on Delivery:
                        </span>{" "}
                        Pay the remaining balance on each delivery day
                        through a secure Dinebd payment link.
                      </li>
                      <li>
                        <span className="font-semibold">Mix &amp; Match:</span>{" "}
                        Pay some days in advance and the remaining days on
                        delivery.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Food will be delivered only after payment for that
                      day's order has been confirmed by Dinebd.
                    </p>
                    <p className="mt-2 font-bold text-gray-900">
                      Do not give cash to the delivery rider. Payments must
                      be made through the secure Dinebd payment link.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      6. Food Allergies &amp; Dietary Requirements
                    </h4>
                    <p>
                      Customers must inform the catering partner of any
                      allergies, intolerances, dietary restrictions, or
                      other dietary requirements and should confirm
                      ingredients and preparation details directly with the
                      catering partner before ordering.
                    </p>
                    <p className="mt-2">
                      Dinebd does not guarantee that any food supplied by a
                      catering partner is free from allergens and, to the
                      extent permitted by applicable law, accepts no
                      responsibility or liability for allergic reactions,
                      food-related health issues, or other consequences
                      arising from food supplied by the catering partner.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      7. Dinebd's Role &amp; Liability
                    </h4>
                    <p>
                      Dinebd provides the platform and service that
                      facilitates communication, ordering, quotation, and
                      payment between customers and catering partners.
                    </p>
                    <p className="mt-2">
                      Dinebd does not prepare, manufacture, or directly
                      supply the food. Responsibility for the catering
                      service rests with the relevant catering partner.
                    </p>
                    <p className="mt-2">
                      To the extent permitted by applicable law, Dinebd
                      shall not be responsible for food quality,
                      ingredients, allergens, preparation, quantity,
                      delivery of the food, or other issues arising directly
                      from the catering service provided by the catering
                      partner.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      8. Delivery
                    </h4>
                    <p>
                      Delivery times are estimates and may be affected by
                      traffic, weather, road conditions, food preparation
                      time, or other circumstances outside Dinebd's
                      reasonable control.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      9. Support &amp; Complaints
                    </h4>
                    <p>
                      Customers can contact Dinebd Support through the App
                      for assistance with their catering order.
                    </p>
                    <p className="mt-2">
                      Catering-related complaints should be raised as soon
                      as possible so that Dinebd can review the matter with
                      the relevant catering partner.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">
                      10. Why These Guidelines Matter
                    </h4>
                    <p>
                      These guidelines help maintain food quality, reliable
                      delivery, accurate orders, and smooth catering
                      operations.
                    </p>
                  </div>
                </div>
              )}

              {section.id === "confirmation-acceptance" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      I confirm and acknowledge the following:
                    </h3>
                    <ul className="space-y-2.5 text-sm text-gray-700 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I have reviewed and accepted the catering order
                          details and quotation.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I have read and understood the Catering Terms &amp;
                          Conditions above.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I understand that once the quotation is accepted
                          and the required payment is made, the catering
                          partner may begin food preparation, and changes or
                          cancellations may therefore no longer be possible.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I confirm that I have provided any known
                          allergies, intolerances, dietary requirements, or
                          special dietary instructions, and understand that
                          I should confirm ingredients and preparation
                          details directly with the catering partner.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I understand Dinebd's role as a platform and
                          service facilitator, and that the catering partner
                          is responsible for preparing and supplying the
                          food and catering service.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I understand that delivery times are estimates and
                          may be affected by circumstances outside Dinebd's
                          reasonable control.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          I understand that payments must be made through
                          the secure Dinebd payment link and that cash
                          should not be given to the delivery rider.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <CheckboxAgreement
                    checked={formData.acceptance}
                    onChange={(checked) =>
                      setFormData((prev) => ({ ...prev, acceptance: checked }))
                    }
                    label="By ticking the box, I accept these above Catering Terms & Conditions and agree to proceed with the catering order."
                  />

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4">
                      Customer / Dinebd Representative Sign-Off
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="signOffCustomerName">
                            Customer Name
                          </Label>
                          <Input
                            id="signOffCustomerName"
                            value={formData.signOff.customerName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                signOff: {
                                  ...prev.signOff,
                                  customerName: e.target.value,
                                },
                              }))
                            }
                            placeholder="Enter customer name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="signOffCustomerDate">Date</Label>
                          <Input
                            id="signOffCustomerDate"
                            type="date"
                            value={formData.signOff.customerDate}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                signOff: {
                                  ...prev.signOff,
                                  customerDate: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="signOffRepName">
                            Dinebd Representative Name
                          </Label>
                          <Input
                            id="signOffRepName"
                            value={formData.signOff.representativeName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                signOff: {
                                  ...prev.signOff,
                                  representativeName: e.target.value,
                                },
                              }))
                            }
                            placeholder="Enter representative name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="signOffRepDate">Date</Label>
                          <Input
                            id="signOffRepDate"
                            type="date"
                            value={formData.signOff.representativeDate}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                signOff: {
                                  ...prev.signOff,
                                  representativeDate: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 rounded-xl bg-gray-50 p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Need Help?
                    </h3>
                    <p className="font-semibold text-gray-800">
                      Dinebd Customer Service
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      📞 +880 1940 68 9356
                    </p>
                    <p className="text-sm text-gray-700">
                      📞 +880 1333 15 8929
                    </p>
                    <p className="text-sm text-gray-700">
                      ✉️{" "}
                      <a
                        href="mailto:info@dinebd.com"
                        className="text-primary hover:underline"
                      >
                        info@dinebd.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-3">
                      Thank you for choosing Dinebd Catering.
                    </p>
                  </div>
                </div>
              )}
            </FormSection>
          ))}

          <div className="pt-8 mt-2 border-t border-gray-200 flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Submit &amp; Download Order PDF
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
