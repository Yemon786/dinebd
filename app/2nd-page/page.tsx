"use client";

import { useState } from "react";
import {
  ChevronRight,
  FileText,
  DollarSign,
  Clock,
  Lock,
  Scale,
  AlertCircle,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Logo from "@/components/ui/logo-white";

const navigationItems = [
  { label: "Vendor Information" },
  { label: "Commercial Terms" },
  { label: "Commendments" },
  { label: "Unsuccessful food deliveries" },
  { label: "Payment and Earnings Policy" },
  { label: "Duration of Partnership" },
  { label: "Confidentiality" },
  { label: "Governing Law" },
  { label: "Dinebd - Data protection & privacy policy" },
  { label: "Dinebd Vendor Agreement Terms and Conditions" },
  { label: "Terms and Conditions Acceptance" },
  { label: "Contract signature" },
];

export default function VendorAgreement() {
  const [activeSection, setActiveSection] = useState("vendor-info");

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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Left Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 mt-6 border border-gray-300 rounded text-sm mb-4"
          />
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveSection(item.label)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors text-sm font-medium ${
                  activeSection === item.label
                    ? "text-[#FF8C00]"
                    : "text-[#FF8C00]/70 hover:text-[#FF8C00]"
                }`}
              >
                <span className="flex-1">{item.label}</span>
                {activeSection === item.label && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-lg">
            {/* Header */}
            <div className=" p-6">
              <h2 className="text-2xl font-bold text-[#FF8C00] mb-4">
                DINEBD & VENDOR CONTRACT/PARTNERSHIP AGREEMENT
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>2. Commercial Terms</strong>
                  <p className="text-gray-700 mt-1">
                    The Vendor agrees to pay Dinebd Limited the applicable
                    Commission Fees in accordance with the attached Terms and
                    Conditions and the selected service options.
                  </p>
                </div>
                <div>
                  <strong>2.1 Commission Fees</strong>
                  <p className="text-gray-700 mt-1">
                    Commission fees are calculated as a percentage of the
                    Vendor’s revenue generated through the Dinebd platform.
                    Maximum Commission Deduction: 25%.<br></br>
                    <br></br>
                    <strong>Note:</strong> Dinebd reserves the right to adjust
                    commission rates in the future, subject to the maximum cap
                    of 25%. Any such changes will be communicated to the Vendor
                    in advance before implementation, ensuring that Vendors have
                    prior notice of any updates to the applicable commission
                    percentages.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 space-y-6">
              {/* Note Section */}
              <div className=" ">
                <p className="text-sm text-gray-700">
                  <strong>Agreed Dinebd Platform Fee Percentages</strong> The
                  following platform fee percentages have been agreed between
                  the Vendor and Dinebd Limited based on this contract:
                  <br />
                  <br />
                  <strong>
                    (Please fill in the boxes in Agreed Percentage section)
                  </strong>
                </p>
              </div>

              {/* Platform Fee Section */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4"></h3>
                <p className="text-sm text-gray-600 mb-4"></p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FF8C00] text-white">
                        <th className="px-4 py-3 text-left">Service type</th>
                        <th className="px-4 py-3 text-left">
                          Standard Percentage
                        </th>
                        <th className="px-4 py-3 text-left">
                          Agreed Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          category: "Food delivery",
                          delivery: "12%",
                          percentage: "",
                        },
                        {
                          category: "Takeaway",
                          delivery: "15%",
                          percentage: "",
                        },
                        {
                          category: "Homemade food",
                          delivery: "18%",
                          percentage: "",
                        },
                        {
                          category: "Catering service",
                          delivery: "10%",
                          percentage: "",
                        },
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className={`border-b ${
                            idx % 2 === 0 ? "bg-[#FFE4CC]" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {row.category}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {row.delivery}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-[#FF8C00]">
                            {row.percentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Booking Discounts */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">
                  2.2 Table Booking Discounts
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Vendors agree to provide a{" "}
                  <strong>minimum 10% discount </strong>(or an agreed-upon
                  amount) to customers who make table reservations through the
                  Dinebd app.
                  <br />
                  <br />
                  <strong>
                    (Please fill in the boxes in Agreed Percentage section)
                  </strong>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FF8C00] text-white">
                        <th className="px-4 py-3 text-left">Service type</th>
                        <th className="px-4 py-3 text-left">Discount</th>
                        <th className="px-4 py-3 text-left">
                          Agreed Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#FFE4CC]">
                        <td className="px-4 py-3 text-sm text-gray-700">
                          Table Booking Discount
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">10%</td>
                        <td className="px-4 py-3 text-sm font-medium text-[#FF8C00]"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terms of Agreement */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">
                  2.3 Terms of Agreement
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className=" font-bold">•</span>
                    <span>
                      Commission rates and discounts will remain in effect until
                      further notice.
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
                policy regarding the payment and responsibility for government
                taxes as it pertains to Dinebd and its vendors.
              </div>

              {/* Government Taxes */}
              <div>
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
                      Dinebd: Dinebd will be responsible for paying income tax
                      on the commission it collects from the platform fee
                      profit.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="">•</span>
                    <span>
                      Vendors: Vendors will be responsible for paying income tax
                      on their total revenue, excluding the platform fee and
                      delivery fee.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="">•</span>
                    <span>
                      Compliance Both Dinebd and vendors must ensure compliance
                      with this policy and adhere to the relevant tax
                      regulations according to Bangladesh Government Law.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Amendments */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">C. Amendments:</h3>
                <p className="text-sm text-gray-700">
                  This policy may be amended or updated as necessary. Any
                  changes will be communicated in writing. For further
                  information or clarification, please contact info@dinebd.com.
                </p>
              </div>

              {/* Contract Dates */}
              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  This Contract Start Date:
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C00]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      End Date:
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C00]"
                    />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-center pt-6">
                <button className="bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold py-3 px-12 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
