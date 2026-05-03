"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo-white";

export default function Home() {
  const [formData, setFormData] = useState({
    // Vendor Information
    businessName: "",
    legalName: "",
    registeredAddress: "",
    companyRegNumber: "",
    taxId: "",
    representativeName: "",
    phone: "",
    mobile: "",
    email: "",

    // Vendor Service Type
    serviceType: [] as string[],
    cuisineType: "",

    // Operating Hours
    operatingHours: {
      sunday: { opening: "", closing: "" },
      monday: { opening: "", closing: "" },
      tuesday: { opening: "", closing: "" },
      wednesday: { opening: "", closing: "" },
      thursday: { opening: "", closing: "" },
      friday: { opening: "", closing: "" },
      saturday: { opening: "", closing: "" },
    },

    // Billing Information
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground ">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-center">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Logo width={180} height={180} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-6 space-y-8"
        >
          {/* Agreement Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-primary">
              DINEBD & VENDOR CONTRACT/PARTNERSHIP AGREEMENT
            </h1>
            <p className="text-sm text-muted-foreground">
              This Vendor Partnership ("Agreement") made and entered into on the
              Effective Date (date of signing) by and between:
            </p>
          </div>

          {/* Introduction Section */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-semibold">
              Dinebd Limited, a company duly incorporated under the laws of
              Bangladesh, registered under Reg. No: C-202938/2025, having its
              registered office at Level 4, 34 Awal Centre, Kamal Ataturk
              Avenue, Banani, Dhaka 1213, Bangladesh, hereinafter referred to as
              “Dinebd”,
            </p>
            <p className="text-sm font-semibold">AND</p>
            <p className="text-sm font-semibold">
              <span className="font-bold"> Vendor Information: </span>This
              section provides vendor’s information. This information will be
              used for official records, communication, and processing in
              accordance with this contract. It is important that all details
              are accurate and complete
            </p>
          </div>

          {/* Vendor Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary pb-2">
              Vendor Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business/Restaurant Name:
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Legal Name:
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter legal name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Registered Office Address:
                </label>
                <input
                  type="text"
                  name="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter registered address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Registration Number:
                </label>
                <input
                  type="text"
                  name="companyRegNumber"
                  value={formData.companyRegNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tax ID:
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter tax ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Representative Name:
                </label>
                <input
                  type="text"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter representative name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile:
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          {/* Vendor Service Type Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary pb-2">
              Vendor Service Type
            </h2>

            <div>
              <p className="text-sm font-medium mb-4">
                Collectively referred to as "The Parties", and individually as a
                "Party"
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
                      checked={formData.serviceType.includes(service)}
                      onChange={handleCheckboxChange}
                      className="mr-3 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm cursor-pointer">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Vendor Cuisine Type (e.g., Banida, Indian, etc.):
              </label>
              <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter cuisine type"
              />
            </div>
          </div>

          {/* Operating Hours Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary pb-2">
              Vendor Opening Time and Closing Time
            </h2>

            <p className="text-sm text-muted-foreground">
              Below listed the vendor's opening and closing times. This is
              important to handle accurate information, as these times will be
              displayed on the Dinebd platform for customer notifications and
              deliveries.
            </p>

            <div className="space-y-4">
              {days.map((day) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium capitalize mb-2">
                      {day}:
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary border-b-2 border-primary pb-2">
              Billing Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Please provide accurate and complete billing details. This
              information will be used to process payments, commissions, and
              reimbursements. All fields must be filled carefully to ensure
              timely and correct payment processing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Billing Contact Name:
                </label>
                <input
                  type="text"
                  name="billingContactName"
                  value={formData.billingContactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter billing contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone:</label>
                <input
                  type="tel"
                  name="billingPhone"
                  value={formData.billingPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile:
                </label>
                <input
                  type="tel"
                  name="billingMobile"
                  value={formData.billingMobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  name="billingEmail"
                  value={formData.billingEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bkash Number:
                </label>
                <input
                  type="text"
                  name="bkashNumber"
                  value={formData.bkashNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Bkash number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bkash Type (Merchant or Personal):
                </label>
                <select
                  name="bkashType"
                  value={formData.bkashType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Merchant">Merchant</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Billing Address:
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter billing address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bank Account Owner:
                </label>
                <input
                  type="text"
                  name="bankAccountOwner"
                  value={formData.bankAccountOwner}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter bank account owner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bank Name:
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bank Account Number:
                </label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter bank account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Swift Code (if applicable):
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Swift code"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-md font-semibold"
            >
              Next
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
