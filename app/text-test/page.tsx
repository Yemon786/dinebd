"use client";

import type React from "react";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    businessName: "",
    legalName: "",
    registeredAddress: "",
    companyRegNumber: "",
    taxId: "",
    representativeName: "",
    phone: "",
    mobile: "",
    email: "",
    serviceType: [] as string[],
    cuisineType: "",
    operatingHours: {
      sunday: { opening: "", closing: "" },
      monday: { opening: "", closing: "" },
      tuesday: { opening: "", closing: "" },
      wednesday: { opening: "", closing: "" },
      thursday: { opening: "", closing: "" },
      friday: { opening: "", closing: "" },
      saturday: { opening: "", closing: "" },
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
    bankAccountNumber: "",
    swiftCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      serviceType: checked
        ? [...prev.serviceType, name]
        : prev.serviceType.filter((item) => item !== name),
    }));
  };

  const handleTimeChange = (day: string, type: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [type]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const sidebarItems = [
    "Vendor Information",
    "Commercial Terms &",
    "Commnitments",
    "Unsuccessful food deliveries",
    "Payment and Earnings Policy",
    "Duration of Partnership",
    "Confidentiality",
    "Governing Law",
    "Dinebd - Data protection & privacy policy",
    "Dinebd Vendor Agreement Terms and Conditions",
    "Terms and Conditions Acceptance",
    "Contract signature",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 text-white py-6 px-8 text-center">
        <div className="text-4xl mb-2">🍽️</div>
        <h1 className="text-2xl font-bold">Dinebd</h1>
      </header>

      {/* Title Section */}
      <div className="border-b border-gray-200 bg-gray-50 py-4 px-8 text-center">
        <h2 className="text-sm font-bold text-orange-500">
          DINEBD & VENDOR CONTRACT/PARTNERSHIP AGREEMENT
        </h2>
        <p className="text-xs text-gray-600 mt-2">
          This Vendor Partnership ("Agreement") made and entered into on the
          Effective Date (date of signing) by and between:
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-4"
          />
          <nav className="space-y-0">
            {sidebarItems.map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="block px-4 py-2 text-sm text-orange-500 hover:bg-orange-50 font-medium transition-colors"
              >
                {item} →
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
            {/* Company Info */}
            <div className="space-y-2 text-sm">
              <p className="font-semibold">
                Dinebd Limited, a company duly incorporated under the laws of
                Bangladesh, registered under Reg. No-C-202836/2025, having its
                registered office at Level 4, 34 Ahad Centre, Gulshan Avenue,
                Banani, Dhaka 1213, Bangladesh, hereinafter referred to as
                "Dinebd".
              </p>
              <p className="font-semibold">AND</p>
              <p className="font-semibold">
                Vendor Information: This section provides vendor's information.
                This information will be used for official records,
                communication, and processing in accordance with this contract.
                It is important that all details are accurate.
              </p>
            </div>

            {/* Vendor Information Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-4">
                Vendor Information:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Business/Restaurant Name:
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Legal Name:
                  </label>
                  <input
                    type="text"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Registered Office Address:
                  </label>
                  <input
                    type="text"
                    name="registeredAddress"
                    value={formData.registeredAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company Registration Number:
                  </label>
                  <input
                    type="text"
                    name="companyRegNumber"
                    value={formData.companyRegNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tax ID:
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Representative Name:
                  </label>
                  <input
                    type="text"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mobile:
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vendor Service Type */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Vendor Service Type:
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Collectively referred to as "The Parties", and individually as a
                "Party"
              </p>
              <div className="space-y-2">
                {[
                  "Food delivery",
                  "Takeaway/pick-up",
                  "Book a table",
                  "Catering service",
                  "Homemade food",
                ].map((service) => (
                  <label key={service} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      name={service}
                      checked={formData.serviceType.includes(service)}
                      onChange={handleCheckboxChange}
                      className="mr-2 w-4 h-4"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendor Cuisine Type */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Vendor Cuisine Type (e.g., Banida, Indian, etc.):
              </label>
              <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Vendor opening time and closing time:
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Below listed the vendor's opening and closing times. It is
                important to handle accurate information, as these times will be
                displayed on the Dinebd platform for customer notifications and
                deliveries.
              </p>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day} className="grid grid-cols-3 gap-4 items-end">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {day}
                    </label>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Opening time
                      </label>
                      <input
                        type="time"
                        value={
                          formData.operatingHours[
                            day as keyof typeof formData.operatingHours
                          ].opening
                        }
                        onChange={(e) =>
                          handleTimeChange(day, "opening", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Closing time
                      </label>
                      <input
                        type="time"
                        value={
                          formData.operatingHours[
                            day as keyof typeof formData.operatingHours
                          ].closing
                        }
                        onChange={(e) =>
                          handleTimeChange(day, "closing", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Information */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Billing Information:
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Please provide accurate and complete billing details. This
                information will be used for processing payments, commissions,
                and reimbursements. All fields must be filled carefully to
                ensure smooth operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Billing Contact Name:
                  </label>
                  <input
                    type="text"
                    name="billingContactName"
                    value={formData.billingContactName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    name="billingPhone"
                    value={formData.billingPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mobile:
                  </label>
                  <input
                    type="tel"
                    name="billingMobile"
                    value={formData.billingMobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bkash Number:
                  </label>
                  <input
                    type="text"
                    name="bkashNumber"
                    value={formData.bkashNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bkash Type (Merchant or Personal):
                  </label>
                  <select
                    name="bkashType"
                    value={formData.bkashType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="Merchant">Merchant</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Billing Address:
                  </label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bank Account Owner:
                  </label>
                  <input
                    type="text"
                    name="bankAccountOwner"
                    value={formData.bankAccountOwner}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bank Name:
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Bank Account Number:
                  </label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Swift Code (if applicable):
                  </label>
                  <input
                    type="text"
                    name="swiftCode"
                    value={formData.swiftCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded"
              >
                Next
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
