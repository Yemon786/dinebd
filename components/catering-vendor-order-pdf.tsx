"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const ORANGE = "#ED7319";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.35,
  },
  header: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    textAlign: "left",
    marginBottom: 4,
    color: ORANGE,
  },
  intro: {
    fontSize: 9,
    color: "#555",
    marginBottom: 14,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    marginTop: 4,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: ORANGE,
    paddingBottom: 3,
  },
  subsectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    marginTop: 8,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    width: 160,
    fontFamily: "Helvetica-Bold",
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  paragraph: {
    marginBottom: 4,
    textAlign: "justify",
    color: "#333",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  listItem: {
    marginBottom: 3,
    paddingLeft: 6,
    color: "#444",
  },
  noticeBox: {
    marginTop: 6,
    marginBottom: 6,
    padding: 8,
    backgroundColor: "#fff5e6",
    borderLeftWidth: 2,
    borderLeftColor: ORANGE,
  },
  noticeText: {
    fontSize: 8.5,
    color: "#7a4a10",
  },
  table: {
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: ORANGE,
    padding: 5,
  },
  tableHeaderText: {
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
    color: "#333",
  },
  financeRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  financeLabel: {
    flex: 2,
    fontSize: 9,
    color: "#444",
  },
  financeValue: {
    flex: 1,
    fontSize: 9,
    textAlign: "right",
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#fff5e6",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  totalLabel: {
    flex: 2,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#222",
  },
  totalValue: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    color: ORANGE,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checkboxGlyph: {
    fontSize: 9,
    marginRight: 6,
    fontFamily: "Helvetica-Bold",
    width: 22,
  },
  footerNote: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
  },
});

export interface DateMealEntry {
  id: string;
  date: string;
  lunch: boolean;
  dinner: boolean;
  lunchItems: string;
  lunchQuantity: string;
  lunchInstructions: string;
  dinnerItems: string;
  dinnerQuantity: string;
  dinnerInstructions: string;
}

export interface SummaryRow {
  dates: string;
  days: string;
  lunches: string;
  foodValue: string;
}

export interface CateringVendorOrderPDFData {
  orderDetails: {
    dinebdOrderId: string;
    vendorName: string;
    vendorReferenceNumber: string;
    vendorContactPerson: string;
    vendorContactNumber: string;
    confirmationDate: string;
    dinebdRepresentative: string;
  };
  cateringDetails: {
    packageName: string;
    totalLunches: string;
    handoverTime: string;
  };
  dateEntries: DateMealEntry[];
  weeklySummary: {
    week1: SummaryRow;
    week2: SummaryRow;
    week3: SummaryRow;
  };
  additionalItems: string;
  packaging: {
    selected: string[];
    otherText: string;
  };
  dietary: {
    dietaryRequirements: string;
    prepInstructions: string;
    packagingLabelling: string;
    otherInstructions: string;
  };
  finance: {
    totalFoodValue: string;
    platformFee: string;
    paymentStatus: string[];
  };
  delivery: {
    selected: string[];
  };
}

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

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const num = (value: string): string => {
  if (!value) return "N/A";
  const n = parseFloat(value);
  if (isNaN(n)) return value;
  return n.toFixed(2);
};

const computeVendorPayout = (finance: CateringVendorOrderPDFData["finance"]): number => {
  const total = parseFloat(finance.totalFoodValue) || 0;
  const fee = parseFloat(finance.platformFee) || 0;
  return total - fee;
};

const VAT_RATE = 0.05;

const computeVat = (totalFoodValue: string): number => {
  return (parseFloat(totalFoodValue) || 0) * VAT_RATE;
};

const CheckboxRowGroup: React.FC<{
  options: string[];
  selected: string[];
  selectedOnly?: boolean;
}> = ({ options, selected, selectedOnly }) => {
  if (selectedOnly) {
    if (selected.length === 0) {
      return <Text style={styles.paragraph}>N/A</Text>;
    }
    return (
      <>
        {options
          .filter((option) => selected.includes(option))
          .map((option) => (
            <View key={option} style={styles.checkboxRow}>
              <Text style={[styles.checkboxGlyph, { color: ORANGE }]}>
                [ X ]
              </Text>
              <Text>{option}</Text>
            </View>
          ))}
      </>
    );
  }

  return (
    <>
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <View key={option} style={styles.checkboxRow}>
            <Text
              style={[
                styles.checkboxGlyph,
                { color: checked ? ORANGE : "#666" },
              ]}
            >
              {checked ? "[ X ]" : "[    ]"}
            </Text>
            <Text>{option}</Text>
          </View>
        );
      })}
    </>
  );
};

const CateringVendorOrderPDF: React.FC<{ data: CateringVendorOrderPDFData }> = ({
  data,
}) => {
  const {
    orderDetails,
    cateringDetails,
    dateEntries,
    weeklySummary,
    additionalItems,
    packaging,
    dietary,
    finance,
    delivery,
  } = data;
  const vendorPayout = computeVendorPayout(finance);

  const cateringDaysCount = new Set(
    dateEntries
      .filter((entry) => entry.date && (entry.lunch || entry.dinner))
      .map((entry) => entry.date),
  ).size;

  const scheduleRows = dateEntries.flatMap((entry) => {
    const rows: {
      date: string;
      mealType: string;
      items: string;
      quantity: string;
      instructions: string;
    }[] = [];
    if (entry.lunch) {
      rows.push({
        date: entry.date,
        mealType: "Lunch",
        items: entry.lunchItems,
        quantity: entry.lunchQuantity,
        instructions: entry.lunchInstructions,
      });
    }
    if (entry.dinner) {
      rows.push({
        date: entry.date,
        mealType: "Dinner",
        items: entry.dinnerItems,
        quantity: entry.dinnerQuantity,
        instructions: entry.dinnerInstructions,
      });
    }
    if (!entry.lunch && !entry.dinner) {
      rows.push({
        date: entry.date,
        mealType: "N/A",
        items: "",
        quantity: "",
        instructions: "",
      });
    }
    return rows;
  });

  return (
    <Document>
      {/* Page 1 - Header, Section A, Section B */}
      <Page size="A4" style={styles.page} wrap>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <Text style={styles.header}>
          DINEBD CATERING | VENDOR ORDER CONFIRMATION
        </Text>
        <Text style={styles.intro}>
          Thank you for partnering with Dinebd Catering. This document
          contains the catering order information required by the
          restaurant/catering vendor to prepare and fulfil the order.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            A. DINEBD & VENDOR ORDER DETAILS
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dinebd Catering Order ID:</Text>
            <Text style={styles.value}>
              {orderDetails.dinebdOrderId || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Restaurant / Catering Vendor Name:</Text>
            <Text style={styles.value}>
              {orderDetails.vendorName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Reference Number:</Text>
            <Text style={styles.value}>
              {orderDetails.vendorReferenceNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Contact Person:</Text>
            <Text style={styles.value}>
              {orderDetails.vendorContactPerson || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Contact Number:</Text>
            <Text style={styles.value}>
              {orderDetails.vendorContactNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Confirmation Date:</Text>
            <Text style={styles.value}>
              {formatDate(orderDetails.confirmationDate)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dinebd Representative:</Text>
            <Text style={styles.value}>
              {orderDetails.dinebdRepresentative || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>B. CATERING ORDER DETAILS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Package / Catering Plan Name:</Text>
            <Text style={styles.value}>
              {cateringDetails.packageName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Number of Catering Days:</Text>
            <Text style={styles.value}>
              {cateringDaysCount || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Number of People / Quantity:</Text>
            <Text style={styles.value}>
              {cateringDetails.totalLunches || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Required Food Handover Time:</Text>
            <Text style={styles.value}>
              {cateringDetails.handoverTime || "N/A"}
            </Text>
          </View>
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              Important notice: For multi-day or multi-week catering, each
              catering day is treated as a separate order for quotation,
              fulfilment, and settlement purposes.
            </Text>
          </View>
        </View>
      </Page>

      {/* Page 2 - Section C: Daily Meal Schedule */}
      <Page size="A4" style={styles.page} wrap>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>C. DAILY MEAL SCHEDULE</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Date</Text>
              <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>
                Meal Type
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1.6 }]}>
                Meal / Food Items
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 0.9 }]}>
                Quantity / People
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1.6 }]}>
                Special Instructions
              </Text>
            </View>
            {scheduleRows.length === 0 ? (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 5.9 }]}>
                  No catering dates added.
                </Text>
              </View>
            ) : (
              scheduleRows.map((row, index) => (
                <View
                  key={`${row.date}-${row.mealType}-${index}`}
                  wrap={false}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 0 ? "#fff5e6" : "#fff" },
                  ]}
                >
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {formatDate(row.date)}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 0.8 }]}>
                    {row.mealType}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1.6 }]}>
                    {row.items || "N/A"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 0.9 }]}>
                    {row.quantity || "N/A"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1.6 }]}>
                    {row.instructions || "N/A"}
                  </Text>
                </View>
              ))
            )}
          </View>

          <Text style={styles.subsectionTitle}>Weekly Order Summary</Text>
          <View style={styles.table} wrap={false}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 0.8 }]}>Week</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.4 }]}>
                Catering Dates
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                Number of Days
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                Lunches / People
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                Food Value
              </Text>
            </View>
            {(["week1", "week2", "week3"] as const).map((key, index) => {
              const row = weeklySummary[key];
              const label =
                key === "week1" ? "Week 1" : key === "week2" ? "Week 2" : "Week 3";
              return (
                <View
                  key={key}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 0 ? "#fff5e6" : "#fff" },
                  ]}
                >
                  <Text style={[styles.tableCell, { flex: 0.8 }]}>{label}</Text>
                  <Text style={[styles.tableCell, { flex: 1.4 }]}>
                    {row.dates || "N/A"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {row.days || "N/A"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {row.lunches || "N/A"}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    {row.foodValue ? num(row.foodValue) : "N/A"}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.subsectionTitle}>
            Additional Food Items / Beverages
          </Text>
          <Text style={styles.paragraph}>{additionalItems || "N/A"}</Text>

          <Text style={styles.subsectionTitle}>Packaging Requirements</Text>
          <CheckboxRowGroup
            options={PACKAGING_OPTIONS}
            selected={packaging.selected}
            selectedOnly
          />
          {packaging.selected.includes("Other") && (
            <View style={styles.row}>
              <Text style={styles.label}>Other (specify):</Text>
              <Text style={styles.value}>{packaging.otherText || "N/A"}</Text>
            </View>
          )}
        </View>
      </Page>

      {/* Page 3 - Section D: Dietary + Finance */}
      <Page size="A4" style={styles.page} wrap>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            D. DIETARY & FOOD PREPARATION REQUIREMENTS
          </Text>
          <Text style={styles.subsectionTitle}>
            Dietary Requirements / Allergens / Intolerances
          </Text>
          <Text style={styles.paragraph}>
            {dietary.dietaryRequirements || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle}>
            Food Preparation Instructions
          </Text>
          <Text style={styles.paragraph}>
            {dietary.prepInstructions || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle}>
            Packaging / Labelling Instructions
          </Text>
          <Text style={styles.paragraph}>
            {dietary.packagingLabelling || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle}>
            Other Catering Instructions
          </Text>
          <Text style={styles.paragraph}>
            {dietary.otherInstructions || "N/A"}
          </Text>

          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              The vendor must review all dietary and special food
              requirements and notify Dinebd immediately if any requirement
              cannot be safely or accurately fulfilled.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>D. FINANCE & VENDOR PAYOUT</Text>
          <View style={styles.table} wrap={false}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>
                Finance Details
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { flex: 1, textAlign: "right" },
                ]}
              >
                Amount
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>
                Total Food / Catering Order Value
              </Text>
              <Text style={styles.financeValue}>
                {num(finance.totalFoodValue)}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>VAT: 5%</Text>
              <Text style={styles.financeValue}>
                {computeVat(finance.totalFoodValue).toFixed(2)}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Dinebd Platform Fee</Text>
              <Text style={styles.financeValue}>{num(finance.platformFee)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL VENDOR PAYOUT</Text>
              <Text style={styles.totalValue}>{vendorPayout.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={[styles.paragraph, { fontSize: 8, color: "#777" }]}>
            Total Vendor Payout = Total Food / Catering Order Value − Dinebd
            Platform Fee.
          </Text>
          <Text style={[styles.paragraph, { fontSize: 8, color: "#777" }]}>
            VAT (5%) is shown for reference only and does not affect the
            Total Vendor Payout calculation.
          </Text>
          <Text style={styles.paragraph}>
            The rider / delivery fee is paid by the customer and managed
            separately by Dinebd. It is not included in the vendor payout
            calculation.
          </Text>

          <Text style={styles.subsectionTitle}>Payment Status</Text>
          <CheckboxRowGroup
            options={PAYMENT_STATUS_OPTIONS}
            selected={finance.paymentStatus}
            selectedOnly
          />
          <Text style={[styles.paragraph, { marginTop: 4 }]}>
            The amount shown as TOTAL VENDOR PAYOUT is the amount the
            restaurant/vendor will receive for the food/catering order,
            subject to the applicable Dinebd payment terms.
          </Text>
        </View>
      </Page>

      {/* Page 4 - Section E + F + Support + Acknowledgement */}
      <Page size="A4" style={styles.page} wrap>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E. DELIVERY & FOOD HANDOVER</Text>
          <CheckboxRowGroup
            options={DELIVERY_OPTIONS}
            selected={delivery.selected}
            selectedOnly
          />
          <Text style={[styles.paragraph, { marginTop: 4 }]}>
            Food must only be released to an authorised Dinebd rider or
            person authorised by Dinebd. Before handover, the rider will
            confirm the order/payment status with Dinebd.
          </Text>
          <Text style={styles.paragraph}>
            Vendors must not collect payment or additional charges directly
            from customers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            F. DINEBD CATERING VENDOR TERMS
          </Text>
          <Text style={styles.paragraph}>
            The vendor confirms that all catering orders are subject to the
            Dinebd Catering Vendor Terms & Conditions previously agreed and
            signed by the vendor.
          </Text>
          <Text style={styles.subsectionTitle}>
            The vendor is responsible for:
          </Text>
          <Text style={styles.listItem}>
            - Preparing the confirmed food and quantities.
          </Text>
          <Text style={styles.listItem}>
            - Following the confirmed catering schedule.
          </Text>
          <Text style={styles.listItem}>
            - Maintaining appropriate food safety and packaging standards.
          </Text>
          <Text style={styles.listItem}>
            - Meeting the confirmed preparation and handover time.
          </Text>
          <Text style={styles.listItem}>
            - Reporting any fulfilment issue to Dinebd immediately.
          </Text>
          <Text style={styles.listItem}>
            - Releasing food only to an authorised Dinebd delivery rider or
            person approved by Dinebd.
          </Text>
          <Text style={styles.listItem}>
            - Not collecting direct payment or additional charges from
            customers.
          </Text>
          <Text style={[styles.paragraph, { marginTop: 6 }]}>
            The rider / delivery fee is managed by Dinebd and is not part of
            the vendor payout.
          </Text>
          <Text style={styles.paragraph}>
            Customer personal information is managed by Dinebd and will only
            be shared with the vendor where necessary for fulfilment.
          </Text>
          <Text style={styles.paragraph}>
            The vendor's previously signed Dinebd Catering Vendor Terms &
            Conditions remain applicable to this order.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PARTNER SUPPORT</Text>
          <Text style={styles.paragraph}>Phone: +880 1940 68 9356</Text>
          <Text style={styles.paragraph}>Phone: +880 1333 15 8929</Text>
          <Text style={styles.paragraph}>Email: info@dinebd.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>POLICY ACKNOWLEDGEMENT</Text>
          <Text style={styles.paragraph}>
            This order is subject to the Dinebd Catering Vendor Terms &
            Conditions previously agreed and signed by the vendor.
          </Text>
          <Text style={[styles.paragraph, styles.bold]}>
            No additional vendor signature is required for this order
            confirmation.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CateringVendorOrderPDF;
