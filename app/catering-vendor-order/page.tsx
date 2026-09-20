"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Menu, Lock, Eye, EyeOff, Download, CheckCircle2, Plus, Trash2 } from "lucide-react";
import FormSection from "@/components/forms/FormSection";
import CateringVendorOrderSidebar from "@/components/catering-vendor-order-sidebar";
import CateringVendorOrderPDF, {
  type CateringVendorOrderPDFData,
  type DateMealEntry,
} from "@/components/catering-vendor-order-pdf";
import { pdf } from "@react-pdf/renderer";

const SECTIONS = [
  { id: "order-vendor-details", letter: "A", title: "Dinebd & Vendor Order Details" },
  { id: "catering-order-details", letter: "B", title: "Catering Order Details" },
  { id: "meal-schedule", letter: "C", title: "Daily Meal Schedule" },
  { id: "dietary-requirements", letter: "D", title: "Dietary & Food Preparation Requirements" },
  { id: "finance-vendor-payout", letter: "D", title: "Finance & Vendor Payout" },
  { id: "delivery-handover", letter: "E", title: "Delivery & Food Handover" },
  { id: "vendor-terms", letter: "F", title: "Dinebd Catering Vendor Terms" },
];

const VAT_RATE = 0.05;

const genId = () => Math.random().toString(36).slice(2, 10);

const createEmptyDateEntry = (): DateMealEntry => ({
  id: genId(),
  date: "",
  lunch: false,
  dinner: false,
  lunchItems: "",
  lunchQuantity: "",
  lunchInstructions: "",
  dinnerItems: "",
  dinnerQuantity: "",
  dinnerInstructions: "",
});

const PACKAGING_OPTIONS = [
  "Individual Portions",
  "Office Catering Packaging",
  "Catering / Event Packaging",
  "Other",
];

const PAYMENT_STATUS_OPTIONS = [
  "Next Day Payment",
  "Daily Payment",
  "Full Advance Payment",
];

const DELIVERY_OPTIONS = [
  "Dinebd Delivery Rider",
  "Other Arrangement Authorised by Dinebd",
];

type CateringVendorOrderData = CateringVendorOrderPDFData;

const initialData: CateringVendorOrderData = {
  orderDetails: {
    dinebdOrderId: "",
    vendorName: "",
    vendorReferenceNumber: "",
    vendorContactPerson: "",
    vendorContactNumber: "",
    confirmationDate: "",
    dinebdRepresentative: "",
  },
  cateringDetails: {
    packageName: "",
    totalLunches: "",
    handoverTime: "",
  },
  dateEntries: [createEmptyDateEntry()],
  weeklySummary: {
    week1: { dates: "", days: "", lunches: "", foodValue: "" },
    week2: { dates: "", days: "", lunches: "", foodValue: "" },
    week3: { dates: "", days: "", lunches: "", foodValue: "" },
  },
  additionalItems: "",
  packaging: { selected: [], otherText: "" },
  dietary: {
    dietaryRequirements: "",
    prepInstructions: "",
    packagingLabelling: "",
    otherInstructions: "",
  },
  finance: {
    totalFoodValue: "",
    platformFee: "",
    paymentStatus: [],
  },
  delivery: { selected: [] },
};

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

const DateEntryCard = ({
  entry,
  onChange,
  onRemove,
  canRemove,
}: {
  entry: DateMealEntry;
  onChange: (patch: Partial<DateMealEntry>) => void;
  onRemove: () => void;
  canRemove: boolean;
}) => (
  <div className="rounded-xl border border-gray-200 p-4 space-y-4 bg-white">
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <Label htmlFor={`date-${entry.id}`}>Date</Label>
        <Input
          id={`date-${entry.id}`}
          type="date"
          value={entry.date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </div>
      {canRemove && (
        <Button
          type="button"
          variant="outline"
          onClick={onRemove}
          className="shrink-0 px-3 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          title="Remove this date"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>

    <div className="flex flex-wrap gap-5">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={entry.lunch}
          onChange={(e) => onChange({ lunch: e.target.checked })}
          className="w-4 h-4 cursor-pointer accent-orange-500"
        />
        <span className="text-sm font-medium text-gray-700">Lunch</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={entry.dinner}
          onChange={(e) => onChange({ dinner: e.target.checked })}
          className="w-4 h-4 cursor-pointer accent-orange-500"
        />
        <span className="text-sm font-medium text-gray-700">Dinner</span>
      </label>
    </div>

    {entry.lunch && (
      <div className="rounded-lg bg-orange-50/50 border border-orange-100 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2.5">
          Lunch
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`lunch-items-${entry.id}`}>Meal / Food Items</Label>
            <Input
              id={`lunch-items-${entry.id}`}
              value={entry.lunchItems}
              onChange={(e) => onChange({ lunchItems: e.target.value })}
              placeholder="e.g. Chicken biryani, salad"
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor={`lunch-qty-${entry.id}`}>Quantity / People</Label>
            <Input
              id={`lunch-qty-${entry.id}`}
              value={entry.lunchQuantity}
              onChange={(e) => onChange({ lunchQuantity: e.target.value })}
              placeholder="e.g. 25"
              className="bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor={`lunch-instructions-${entry.id}`}>
              Special Instructions
            </Label>
            <Input
              id={`lunch-instructions-${entry.id}`}
              value={entry.lunchInstructions}
              onChange={(e) => onChange({ lunchInstructions: e.target.value })}
              placeholder="e.g. Extra spicy, no onions"
              className="bg-white"
            />
          </div>
        </div>
      </div>
    )}

    {entry.dinner && (
      <div className="rounded-lg bg-orange-50/50 border border-orange-100 p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2.5">
          Dinner
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`dinner-items-${entry.id}`}>Meal / Food Items</Label>
            <Input
              id={`dinner-items-${entry.id}`}
              value={entry.dinnerItems}
              onChange={(e) => onChange({ dinnerItems: e.target.value })}
              placeholder="e.g. Grilled chicken, rice"
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor={`dinner-qty-${entry.id}`}>Quantity / People</Label>
            <Input
              id={`dinner-qty-${entry.id}`}
              value={entry.dinnerQuantity}
              onChange={(e) => onChange({ dinnerQuantity: e.target.value })}
              placeholder="e.g. 25"
              className="bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor={`dinner-instructions-${entry.id}`}>
              Special Instructions
            </Label>
            <Input
              id={`dinner-instructions-${entry.id}`}
              value={entry.dinnerInstructions}
              onChange={(e) => onChange({ dinnerInstructions: e.target.value })}
              placeholder="e.g. Extra spicy, no onions"
              className="bg-white"
            />
          </div>
        </div>
      </div>
    )}

    {!entry.lunch && !entry.dinner && (
      <p className="text-xs text-gray-400">
        Select Lunch, Dinner, or both for this date.
      </p>
    )}
  </div>
);

export default function CateringVendorOrderPortal() {
  const [formData, setFormData] = useState<CateringVendorOrderData>(initialData);
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

  const vendorPayout = useMemo(() => {
    const total = parseFloat(formData.finance.totalFoodValue) || 0;
    const fee = parseFloat(formData.finance.platformFee) || 0;
    return total - fee;
  }, [formData.finance.totalFoodValue, formData.finance.platformFee]);

  const vatAmount = useMemo(() => {
    const total = parseFloat(formData.finance.totalFoodValue) || 0;
    return total * VAT_RATE;
  }, [formData.finance.totalFoodValue]);

  const totalCateringDays = useMemo(() => {
    return new Set(
      formData.dateEntries
        .filter((entry) => entry.date && (entry.lunch || entry.dinner))
        .map((entry) => entry.date),
    ).size;
  }, [formData.dateEntries]);

  const addDateEntry = () => {
    setFormData((prev) => ({
      ...prev,
      dateEntries: [...prev.dateEntries, createEmptyDateEntry()],
    }));
  };

  const removeDateEntry = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      dateEntries: prev.dateEntries.filter((entry) => entry.id !== id),
    }));
  };

  const updateDateEntry = (id: string, patch: Partial<DateMealEntry>) => {
    setFormData((prev) => ({
      ...prev,
      dateEntries: prev.dateEntries.map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const blob = await pdf(<CateringVendorOrderPDF data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Dinebd-Catering-Vendor-Order-${
        formData.orderDetails.dinebdOrderId.replace(/\s+/g, "-") || "Order"
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
                Vendor Order Portal
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

        <CateringVendorOrderSidebar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <form onSubmit={handleSubmit} className="flex-1 min-w-0">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-lg sm:text-3xl font-extrabold text-primary tracking-tight">
              DINEBD CATERING | VENDOR ORDER CONFIRMATION
            </h1>
            <p className="text-sm text-gray-600 mt-3 max-w-3xl">
              Thank you for partnering with Dinebd Catering. This document
              contains the catering order information required by the
              restaurant/catering vendor to prepare and fulfil the order.
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
                    Order Confirmation Generated Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your vendor order confirmation PDF has been downloaded.
                    Please check your downloads folder.
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
                    <Label htmlFor="dinebdOrderId">Dinebd Catering Order ID</Label>
                    <Input
                      id="dinebdOrderId"
                      value={formData.orderDetails.dinebdOrderId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: { ...prev.orderDetails, dinebdOrderId: e.target.value },
                        }))
                      }
                      placeholder="Enter Dinebd catering order ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorName">Restaurant / Catering Vendor Name</Label>
                    <Input
                      id="vendorName"
                      value={formData.orderDetails.vendorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: { ...prev.orderDetails, vendorName: e.target.value },
                        }))
                      }
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorReferenceNumber">Vendor Reference Number</Label>
                    <Input
                      id="vendorReferenceNumber"
                      value={formData.orderDetails.vendorReferenceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: {
                            ...prev.orderDetails,
                            vendorReferenceNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor reference number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorContactPerson">Vendor Contact Person</Label>
                    <Input
                      id="vendorContactPerson"
                      value={formData.orderDetails.vendorContactPerson}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: {
                            ...prev.orderDetails,
                            vendorContactPerson: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor contact person"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorContactNumber">Vendor Contact Number</Label>
                    <Input
                      id="vendorContactNumber"
                      type="tel"
                      value={formData.orderDetails.vendorContactNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: {
                            ...prev.orderDetails,
                            vendorContactNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter vendor contact number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmationDate">Order Confirmation Date</Label>
                    <Input
                      id="confirmationDate"
                      type="date"
                      value={formData.orderDetails.confirmationDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: {
                            ...prev.orderDetails,
                            confirmationDate: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dinebdRepresentative">Dinebd Representative</Label>
                    <Input
                      id="dinebdRepresentative"
                      value={formData.orderDetails.dinebdRepresentative}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDetails: {
                            ...prev.orderDetails,
                            dinebdRepresentative: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter Dinebd representative name"
                    />
                  </div>
                </div>
              )}

              {section.id === "catering-order-details" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="packageName">Package / Catering Plan Name</Label>
                      <Input
                        id="packageName"
                        value={formData.cateringDetails.packageName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cateringDetails: {
                              ...prev.cateringDetails,
                              packageName: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter package / catering plan name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalCateringDays">
                        Total Number of Catering Days
                      </Label>
                      <Input
                        id="totalCateringDays"
                        value={totalCateringDays}
                        disabled
                        className="bg-gray-50 text-gray-600"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Automatically calculated from the catering dates
                        added below.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="totalLunches">Total Number of People / Quantity</Label>
                      <Input
                        id="totalLunches"
                        inputMode="numeric"
                        value={formData.cateringDetails.totalLunches}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cateringDetails: {
                              ...prev.cateringDetails,
                              totalLunches: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter total number of lunches"
                      />
                    </div>
                    <div>
                      <Label htmlFor="handoverTime">Required Food Handover Time</Label>
                      <Input
                        id="handoverTime"
                        type="time"
                        value={formData.cateringDetails.handoverTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cateringDetails: {
                              ...prev.cateringDetails,
                              handoverTime: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-orange-50/60 border border-orange-100 p-4">
                    <p className="text-xs sm:text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Important notice:
                      </span>{" "}
                      For multi-day or multi-week catering, each catering day
                      is treated as a separate order for quotation,
                      fulfilment, and settlement purposes.
                    </p>
                  </div>
                </div>
              )}

              {section.id === "meal-schedule" && (
                <div className="space-y-10">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 mb-4 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
                      Catering Dates
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Add each catering date and choose Lunch, Dinner, or
                      both. Dates do not need to be consecutive or form a
                      full week.
                    </p>
                    <div className="space-y-4">
                      {formData.dateEntries.map((entry) => (
                        <DateEntryCard
                          key={entry.id}
                          entry={entry}
                          canRemove={formData.dateEntries.length > 1}
                          onChange={(patch) => updateDateEntry(entry.id, patch)}
                          onRemove={() => removeDateEntry(entry.id)}
                        />
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDateEntry}
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4" />
                      Add Date
                    </Button>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 pb-2.5 mb-4 border-b border-gray-200 before:content-[''] before:w-1 before:h-4 before:rounded-full before:bg-primary">
                      Weekly Order Summary
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full min-w-[640px]">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="px-4 py-3 text-left text-sm font-semibold w-24">Week</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Catering Dates</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold w-32">Number of Days</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold w-32">Lunches / People</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold w-32">Food Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(["week1", "week2", "week3"] as const).map((key, idx) => {
                            const label = key === "week1" ? "Week 1" : key === "week2" ? "Week 2" : "Week 3";
                            const row = formData.weeklySummary[key];
                            return (
                              <tr
                                key={key}
                                className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-orange-50/40" : "bg-white"}`}
                              >
                                <td className="px-4 py-2.5 text-sm font-medium text-gray-700 align-top pt-4">
                                  {label}
                                </td>
                                <td className="px-4 py-2 min-w-[180px]">
                                  <Input
                                    value={row.dates}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        weeklySummary: {
                                          ...prev.weeklySummary,
                                          [key]: { ...prev.weeklySummary[key], dates: e.target.value },
                                        },
                                      }))
                                    }
                                    placeholder="e.g. 1-7 Oct 2026"
                                    className="bg-white"
                                  />
                                </td>
                                <td className="px-4 py-2 min-w-[110px]">
                                  <Input
                                    value={row.days}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        weeklySummary: {
                                          ...prev.weeklySummary,
                                          [key]: { ...prev.weeklySummary[key], days: e.target.value },
                                        },
                                      }))
                                    }
                                    placeholder="e.g. 7"
                                    className="bg-white"
                                  />
                                </td>
                                <td className="px-4 py-2 min-w-[110px]">
                                  <Input
                                    value={row.lunches}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        weeklySummary: {
                                          ...prev.weeklySummary,
                                          [key]: { ...prev.weeklySummary[key], lunches: e.target.value },
                                        },
                                      }))
                                    }
                                    placeholder="e.g. 25"
                                    className="bg-white"
                                  />
                                </td>
                                <td className="px-4 py-2 min-w-[110px]">
                                  <Input
                                    value={row.foodValue}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        weeklySummary: {
                                          ...prev.weeklySummary,
                                          [key]: { ...prev.weeklySummary[key], foodValue: e.target.value },
                                        },
                                      }))
                                    }
                                    placeholder="e.g. 500.00"
                                    className="bg-white"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalItems">Additional Food Items / Beverages</Label>
                    <Textarea
                      id="additionalItems"
                      value={formData.additionalItems}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, additionalItems: e.target.value }))
                      }
                      placeholder="e.g. Bottled water, soft drinks, dessert"
                      className="min-h-24"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      Packaging Requirements
                    </h3>
                    <div className="space-y-2.5">
                      {PACKAGING_OPTIONS.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.packaging.selected.includes(option)}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                packaging: {
                                  ...prev.packaging,
                                  selected: toggleInArray(prev.packaging.selected, option),
                                },
                              }))
                            }
                            className="mr-3 w-4 h-4 cursor-pointer accent-orange-500"
                          />
                          <span className="text-sm text-gray-700 cursor-pointer">{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.packaging.selected.includes("Other") && (
                      <div className="mt-3">
                        <Label htmlFor="packagingOtherText">Please specify</Label>
                        <Input
                          id="packagingOtherText"
                          value={formData.packaging.otherText}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packaging: { ...prev.packaging, otherText: e.target.value },
                            }))
                          }
                          placeholder="Describe the packaging requirement"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {section.id === "dietary-requirements" && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="dietaryRequirements">
                      Dietary Requirements / Allergens / Intolerances
                    </Label>
                    <Textarea
                      id="dietaryRequirements"
                      value={formData.dietary.dietaryRequirements}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dietary: { ...prev.dietary, dietaryRequirements: e.target.value },
                        }))
                      }
                      placeholder="e.g. No nuts, halal only, vegetarian options required"
                      className="min-h-28"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prepInstructions">Food Preparation Instructions</Label>
                    <Textarea
                      id="prepInstructions"
                      value={formData.dietary.prepInstructions}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dietary: { ...prev.dietary, prepInstructions: e.target.value },
                        }))
                      }
                      placeholder="Enter food preparation instructions"
                      className="min-h-28"
                    />
                  </div>
                  <div>
                    <Label htmlFor="packagingLabelling">Packaging / Labelling Instructions</Label>
                    <Textarea
                      id="packagingLabelling"
                      value={formData.dietary.packagingLabelling}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dietary: { ...prev.dietary, packagingLabelling: e.target.value },
                        }))
                      }
                      placeholder="Enter packaging / labelling instructions"
                      className="min-h-28"
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherInstructions">Other Catering Instructions</Label>
                    <Textarea
                      id="otherInstructions"
                      value={formData.dietary.otherInstructions}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dietary: { ...prev.dietary, otherInstructions: e.target.value },
                        }))
                      }
                      placeholder="Enter any other catering instructions"
                      className="min-h-28"
                    />
                  </div>

                  <div className="rounded-xl bg-orange-50/60 border border-orange-100 p-4">
                    <p className="text-xs sm:text-sm text-gray-700">
                      The vendor must review all dietary and special food
                      requirements and notify Dinebd immediately if any
                      requirement cannot be safely or accurately fulfilled.
                    </p>
                  </div>
                </div>
              )}

              {section.id === "finance-vendor-payout" && (
                <div className="space-y-8">
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[480px]">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Finance Details
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 bg-orange-50/40">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Total Food / Catering Order Value
                          </td>
                          <td className="px-4 py-2 w-48">
                            <Input
                              value={formData.finance.totalFoodValue}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, totalFoodValue: e.target.value },
                                }))
                              }
                              placeholder="0.00"
                              className="text-right bg-white"
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-white">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            VAT: 5%
                          </td>
                          <td className="px-4 py-2 w-48 text-right text-sm text-gray-700 font-medium">
                            {vatAmount.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-orange-50/40">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Dinebd Platform Fee
                          </td>
                          <td className="px-4 py-2 w-48">
                            <Input
                              value={formData.finance.platformFee}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  finance: { ...prev.finance, platformFee: e.target.value },
                                }))
                              }
                              placeholder="0.00"
                              className="text-right bg-white"
                            />
                          </td>
                        </tr>
                        <tr className="bg-primary/10">
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">
                            TOTAL VENDOR PAYOUT
                          </td>
                          <td className="px-4 py-3 text-right text-base font-bold text-primary">
                            {vendorPayout.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-xl bg-primary/5 border border-primary/15 p-5 space-y-2">
                    <p className="text-xs text-gray-500">
                      Total Vendor Payout = Total Food / Catering Order Value
                      − Dinebd Platform Fee.
                    </p>
                    <p className="text-xs text-gray-500">
                      VAT (5%) is shown for reference only and does not
                      affect the Total Vendor Payout calculation.
                    </p>
                    <p className="text-xs text-gray-500">
                      The rider / delivery fee is paid by the customer and
                      managed separately by Dinebd. It is not included in the
                      vendor payout calculation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      Payment Status
                    </h3>
                    <div className="space-y-2.5">
                      {PAYMENT_STATUS_OPTIONS.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.finance.paymentStatus.includes(option)}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                finance: {
                                  ...prev.finance,
                                  paymentStatus: toggleInArray(prev.finance.paymentStatus, option),
                                },
                              }))
                            }
                            className="mr-3 w-4 h-4 cursor-pointer accent-orange-500"
                          />
                          <span className="text-sm text-gray-700 cursor-pointer">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    The amount shown as TOTAL VENDOR PAYOUT is the amount the
                    restaurant/vendor will receive for the food/catering
                    order, subject to the applicable Dinebd payment terms.
                  </p>
                </div>
              )}

              {section.id === "delivery-handover" && (
                <div className="space-y-6">
                  <div className="space-y-2.5">
                    {DELIVERY_OPTIONS.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.delivery.selected.includes(option)}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              delivery: { selected: toggleInArray(prev.delivery.selected, option) },
                            }))
                          }
                          className="mr-3 w-4 h-4 cursor-pointer accent-orange-500"
                        />
                        <span className="text-sm text-gray-700 cursor-pointer">{option}</span>
                      </label>
                    ))}
                  </div>

                  <div className="rounded-xl bg-orange-50/60 border border-orange-100 p-4 space-y-2">
                    <p className="text-xs sm:text-sm text-gray-700">
                      Food must only be released to an authorised Dinebd
                      rider or person authorised by Dinebd. Before handover,
                      the rider will confirm the order/payment status with
                      Dinebd.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Vendors must not collect payment or additional charges
                      directly from customers.
                    </p>
                  </div>
                </div>
              )}

              {section.id === "vendor-terms" && (
                <div className="space-y-6 text-sm leading-relaxed text-gray-700">
                  <p>
                    The vendor confirms that all catering orders are subject
                    to the Dinebd Catering Vendor Terms &amp; Conditions
                    previously agreed and signed by the vendor.
                  </p>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      The vendor is responsible for:
                    </h4>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Preparing the confirmed food and quantities.</li>
                      <li>Following the confirmed catering schedule.</li>
                      <li>
                        Maintaining appropriate food safety and packaging
                        standards.
                      </li>
                      <li>Meeting the confirmed preparation and handover time.</li>
                      <li>Reporting any fulfilment issue to Dinebd immediately.</li>
                      <li>
                        Releasing food only to an authorised Dinebd delivery
                        rider or person approved by Dinebd.
                      </li>
                      <li>
                        Not collecting direct payment or additional charges
                        from customers.
                      </li>
                    </ul>
                  </div>

                  <p>
                    The rider / delivery fee is managed by Dinebd and is not
                    part of the vendor payout.
                  </p>
                  <p>
                    Customer personal information is managed by Dinebd and
                    will only be shared with the vendor where necessary for
                    fulfilment.
                  </p>
                  <p>
                    The vendor's previously signed Dinebd Catering Vendor
                    Terms &amp; Conditions remain applicable to this order.
                  </p>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Partner Support
                    </h3>
                    <p className="text-sm text-gray-700">📞 +880 1940 68 9356</p>
                    <p className="text-sm text-gray-700">📞 +880 1333 15 8929</p>
                    <p className="text-sm text-gray-700">
                      ✉️{" "}
                      <a
                        href="mailto:info@dinebd.com"
                        className="text-primary hover:underline"
                      >
                        info@dinebd.com
                      </a>
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-200 rounded-xl bg-gray-50 p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Policy Acknowledgement
                    </h3>
                    <p className="text-sm text-gray-700">
                      This order is subject to the Dinebd Catering Vendor
                      Terms &amp; Conditions previously agreed and signed by
                      the vendor.
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      No additional vendor signature is required for this
                      order confirmation.
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
              Submit &amp; Download Order Confirmation PDF
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
