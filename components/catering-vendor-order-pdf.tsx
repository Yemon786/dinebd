"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PdfCheckbox } from "./pdf-checkbox";

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
  scheduleTable: {
    marginTop: 6,
    marginBottom: 6,
  },
  scheduleGroup: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  scheduleGroupLast: {
    marginBottom: 0,
  },
  scheduleDateHeader: {
    flexDirection: "row",
    backgroundColor: "#fff1e0",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderLeftWidth: 3,
    borderLeftColor: ORANGE,
  },
  scheduleDateHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#333",
  },
  scheduleMealBlock: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f2f2f2",
  },
  scheduleMealRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  scheduleMealType: {
    width: 55,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: ORANGE,
  },
  scheduleMealItems: {
    width: 230,
    paddingRight: 10,
  },
  scheduleMealValue: {
    fontSize: 8,
    color: "#333",
  },
  scheduleMealSubRow: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 55,
  },
  scheduleMealSubLabel: {
    width: 90,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#666",
  },
  scheduleMealSubValue: {
    flex: 1,
    fontSize: 8,
    color: "#333",
  },
  scheduleEmptyRow: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 8,
    fontFamily: "Helvetica-Oblique",
    color: "#999",
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
    marginRight: 6,
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
  lunchPackageName: string;
  lunchPrice: string;
  lunchInstructions: string;
  dinnerItems: string;
  dinnerQuantity: string;
  dinnerPackageName: string;
  dinnerPrice: string;
  dinnerInstructions: string;
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
    dinebdContactNumber: string;
  };
  cateringDetails: {
    totalLunches: string;
    handoverTime: string;
  };
  dateEntries: DateMealEntry[];
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
    paymentPreference: "advance" | "daily" | "";
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
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return dateStr;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
};

const noHyphenation = (word: string) => [word];

const money = (n: number): string => `BDT ${(isNaN(n) ? 0 : n).toFixed(2)}`;

export const PLATFORM_FEE_RATE = 0.2;

export const computePlatformFee = (totalFoodValue: string): number => {
  return (parseFloat(totalFoodValue) || 0) * PLATFORM_FEE_RATE;
};

const computeVendorPayout = (finance: CateringVendorOrderPDFData["finance"]): number => {
  const total = parseFloat(finance.totalFoodValue) || 0;
  return total - computePlatformFee(finance.totalFoodValue);
};

const CheckboxRowGroup: React.FC<{
  options: string[];
  selected: string[];
  selectedOnly?: boolean;
}> = ({ options, selected, selectedOnly }) => {
  if (selectedOnly) {
    if (selected.length === 0) {
      return (
        <Text
          style={styles.paragraph}
          hyphenationCallback={noHyphenation}
        >
          N/A
        </Text>
      );
    }
    return (
      <>
        {options
          .filter((option) => selected.includes(option))
          .map((option) => (
            <View key={option} style={styles.checkboxRow}>
              <PdfCheckbox checked style={styles.checkboxGlyph} />
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
            <PdfCheckbox checked={checked} style={styles.checkboxGlyph} />
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

  type ScheduleMeal = {
    items: string;
    quantity: string;
    packageName: string;
    price: string;
    instructions: string;
  };

  const scheduleDateGroups = (() => {
    const groups = new Map<
      string,
      { date: string; lunches: ScheduleMeal[]; dinners: ScheduleMeal[] }
    >();
    dateEntries.forEach((entry) => {
      if (!entry.date) return;
      const group = groups.get(entry.date) ?? {
        date: entry.date,
        lunches: [],
        dinners: [],
      };
      if (entry.lunch) {
        group.lunches.push({
          items: entry.lunchItems,
          quantity: entry.lunchQuantity,
          packageName: entry.lunchPackageName,
          price: entry.lunchPrice,
          instructions: entry.lunchInstructions,
        });
      }
      if (entry.dinner) {
        group.dinners.push({
          items: entry.dinnerItems,
          quantity: entry.dinnerQuantity,
          packageName: entry.dinnerPackageName,
          price: entry.dinnerPrice,
          instructions: entry.dinnerInstructions,
        });
      }
      groups.set(entry.date, group);
    });
    return Array.from(groups.values()).sort((x, y) =>
      x.date.localeCompare(y.date),
    );
  })();

  const renderMeal = (label: string, meal: ScheduleMeal, key: string) => (
    <View key={key} style={styles.scheduleMealBlock}>
      <View style={styles.scheduleMealRow}>
        <Text style={styles.scheduleMealType}>{label}</Text>
        <Text
          style={[styles.scheduleMealValue, styles.scheduleMealItems]}
          hyphenationCallback={noHyphenation}
        >
          {meal.items || "N/A"}
        </Text>
        <Text style={[styles.scheduleMealValue, { flex: 1 }]}>
          {meal.quantity || "N/A"}
        </Text>
      </View>
      <View style={styles.scheduleMealSubRow}>
        <Text style={styles.scheduleMealSubLabel}>Package Name:</Text>
        <Text
          style={styles.scheduleMealSubValue}
          hyphenationCallback={noHyphenation}
        >
          {meal.packageName || "N/A"}
        </Text>
      </View>
      <View style={styles.scheduleMealSubRow}>
        <Text style={styles.scheduleMealSubLabel}>Price (per Person):</Text>
        <Text
          style={styles.scheduleMealSubValue}
          hyphenationCallback={noHyphenation}
        >
          {meal.price ? money(parseFloat(meal.price)) : "N/A"}
        </Text>
      </View>
      <View style={styles.scheduleMealSubRow}>
        <Text style={styles.scheduleMealSubLabel}>Amount:</Text>
        <Text
          style={styles.scheduleMealSubValue}
          hyphenationCallback={noHyphenation}
        >
          {money(
            (parseFloat(meal.price) || 0) * (parseFloat(meal.quantity) || 0),
          )}
        </Text>
      </View>
      <View style={styles.scheduleMealSubRow}>
        <Text style={styles.scheduleMealSubLabel}>Special Instructions:</Text>
        <Text
          style={styles.scheduleMealSubValue}
          hyphenationCallback={noHyphenation}
        >
          {meal.instructions || "N/A"}
        </Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <Text style={styles.header}>
          Dinebd Catering | Vendor Order Confirmation
        </Text>
        <Text hyphenationCallback={noHyphenation} style={styles.intro}>
          Thank you for partnering with Dinebd Catering. This document
          contains the catering order information required by the
          restaurant/catering vendor to prepare and fulfil the order.
        </Text>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle} minPresenceAhead={60}>
            A. Dinebd & VENDOR ORDER DETAILS
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dinebd Catering Order ID:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.dinebdOrderId || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Restaurant / Catering Vendor Name:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.vendorName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Reference Number:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.vendorReferenceNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Contact Person:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.vendorContactPerson || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Contact Number:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.vendorContactNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Confirmation Date:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {formatDate(orderDetails.confirmationDate)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dinebd Representative:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.dinebdRepresentative || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dinebd Contact Number:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {orderDetails.dinebdContactNumber || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={styles.sectionTitle}
            minPresenceAhead={60}
          >
            B. DAILY MEAL SCHEDULE
          </Text>

          <Text
            style={styles.subsectionTitle}
            minPresenceAhead={30}
          >
            Meal Schedule by Date
          </Text>
          <View style={styles.scheduleTable}>
            <View style={styles.tableHeader} minPresenceAhead={60}>
              <Text style={[styles.tableHeaderText, { width: 55 }]}>
                Meal
              </Text>
              <Text style={[styles.tableHeaderText, { width: 235 }]}>
                Meal / Food Items
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                Quantity / People
              </Text>
            </View>
            {scheduleDateGroups.length === 0 ? (
              <View style={[styles.scheduleGroup, styles.scheduleGroupLast]}>
                <Text style={styles.scheduleEmptyRow}>
                  No catering dates added.
                </Text>
              </View>
            ) : (
              scheduleDateGroups.map((group, index) => (
                <View
                  key={group.date}
                  wrap={false}
                  style={
                    index === scheduleDateGroups.length - 1
                      ? [styles.scheduleGroup, styles.scheduleGroupLast]
                      : styles.scheduleGroup
                  }
                >
                  <View style={styles.scheduleDateHeader}>
                    <Text style={styles.scheduleDateHeaderText}>
                      {formatDate(group.date)}
                    </Text>
                  </View>
                  {group.lunches.map((meal, i) =>
                    renderMeal("Lunch", meal, `lunch-${i}`),
                  )}
                  {group.dinners.map((meal, i) =>
                    renderMeal("Dinner", meal, `dinner-${i}`),
                  )}
                  {group.lunches.length === 0 && group.dinners.length === 0 && (
                    <Text style={styles.scheduleEmptyRow}>
                      No meal selected for this date.
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>

          <Text style={styles.subsectionTitle} minPresenceAhead={30}>
            Additional Food Items / Beverages
          </Text>
          <Text
            style={styles.paragraph}
            hyphenationCallback={noHyphenation}
          >
            {additionalItems || "N/A"}
          </Text>

          <View wrap={false}>
            <Text style={styles.subsectionTitle}>Packaging Requirements</Text>
            <CheckboxRowGroup
              options={PACKAGING_OPTIONS}
              selected={packaging.selected}
              selectedOnly
            />
            {packaging.selected.includes("Other") && (
              <View style={styles.row}>
                <Text style={styles.label}>Other (specify):</Text>
                <Text
                  style={styles.value}
                  hyphenationCallback={noHyphenation}
                >
                  {packaging.otherText || "N/A"}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <Text
            style={styles.sectionTitle}
            minPresenceAhead={60}
          >
            C. CATERING ORDER DETAILS
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Number of Catering Days:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {cateringDaysCount || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Number of People / Quantity:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {cateringDetails.totalLunches || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Required Food Handover Time:</Text>
            <Text hyphenationCallback={noHyphenation} style={styles.value}>
              {cateringDetails.handoverTime || "N/A"}
            </Text>
          </View>
          <View style={styles.noticeBox} wrap={false}>
            <Text hyphenationCallback={noHyphenation} style={styles.noticeText}>
              Important notice: For multi-day or multi-week catering, each
              catering day is treated as a separate order for quotation,
              fulfilment, and settlement purposes.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={60}>
            D. DIETARY & FOOD PREPARATION REQUIREMENTS
          </Text>
          <Text style={styles.subsectionTitle} minPresenceAhead={30}>
            Dietary Requirements / Allergens / Intolerances
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            {dietary.dietaryRequirements || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle} minPresenceAhead={30}>
            Food Preparation Instructions
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            {dietary.prepInstructions || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle} minPresenceAhead={30}>
            Packaging / Labelling Instructions
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            {dietary.packagingLabelling || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle} minPresenceAhead={30}>
            Other Catering Instructions
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            {dietary.otherInstructions || "N/A"}
          </Text>

          <View style={styles.noticeBox} wrap={false}>
            <Text hyphenationCallback={noHyphenation} style={styles.noticeText}>
              The vendor must review all dietary and special food
              requirements and notify Dinebd immediately if any requirement
              cannot be safely or accurately fulfilled.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View wrap={false}>
            <Text style={styles.sectionTitle}>E. FINANCE & VENDOR PAYOUT</Text>
            <View style={styles.table}>
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
                <Text style={styles.financeLabel}>Number of Days</Text>
                <Text style={styles.financeValue}>
                  {cateringDaysCount || "N/A"}
                </Text>
              </View>
              <View style={styles.financeRow}>
                <Text style={styles.financeLabel}>
                  Number of People / Quantity
                </Text>
                <Text style={styles.financeValue}>
                  {cateringDetails.totalLunches || "N/A"}
                </Text>
              </View>
              <View style={styles.financeRow}>
                <Text style={styles.financeLabel}>
                  Total Food / Catering Order Value
                </Text>
                <Text style={styles.financeValue}>
                  {money(parseFloat(finance.totalFoodValue) || 0)}
                </Text>
              </View>
              <View style={styles.financeRow}>
                <Text
                  style={styles.financeLabel}
                >
                  Dinebd Platform Fee (20%)
                </Text>
                <Text style={styles.financeValue}>
                  {money(computePlatformFee(finance.totalFoodValue))}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL VENDOR PAYOUT</Text>
                <Text style={styles.totalValue}>{money(vendorPayout)}</Text>
              </View>
            </View>
          </View>
          <Text
            style={[styles.paragraph, { fontSize: 8, color: "#777" }]}
            hyphenationCallback={noHyphenation}
          >
            Total Vendor Payout = Total Food / Catering Order Value - Dinebd
            Platform Fee (20% of Total Food / Catering Order Value).
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            The rider / delivery fee is paid by the customer and managed
            separately by Dinebd. It is not included in the vendor payout
            calculation.
          </Text>

          <View wrap={false}>
            <Text style={styles.subsectionTitle}>Payment Preference</Text>
            {finance.paymentPreference === "advance" && (
              <View style={styles.checkboxRow}>
                <PdfCheckbox checked style={styles.checkboxGlyph} />
                <Text style={styles.bold}>Advance Payment / Full Paid</Text>
              </View>
            )}
            {finance.paymentPreference === "daily" && (
              <View style={styles.checkboxRow}>
                <PdfCheckbox checked style={styles.checkboxGlyph} />
                <Text style={styles.bold}>Daily Payment / Partial Payment</Text>
              </View>
            )}
            {finance.paymentPreference === "" && (
              <Text
                style={styles.paragraph}
                hyphenationCallback={noHyphenation}
              >
                N/A
              </Text>
            )}
          </View>

          <View wrap={false}>
            <Text style={styles.subsectionTitle}>Payment Status</Text>
            <CheckboxRowGroup
              options={PAYMENT_STATUS_OPTIONS}
              selected={finance.paymentStatus}
              selectedOnly
            />
          </View>
          <Text
            style={[styles.paragraph, { marginTop: 4 }]}
            hyphenationCallback={noHyphenation}
          >
            The amount shown as TOTAL VENDOR PAYOUT is the amount the
            restaurant/vendor will receive for the food/catering order,
            subject to the applicable Dinebd payment terms.
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>F. DELIVERY & FOOD HANDOVER</Text>
          <CheckboxRowGroup
            options={DELIVERY_OPTIONS}
            selected={delivery.selected}
            selectedOnly
          />
          <Text
            style={[styles.paragraph, { marginTop: 4 }]}
            hyphenationCallback={noHyphenation}
          >
            Food must only be released to an authorised Dinebd rider or
            person authorised by Dinebd. Before handover, the rider will
            confirm the order/payment status with Dinebd.
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            Vendors must not collect payment or additional charges directly
            from customers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={60}>
            G. Dinebd CATERING VENDOR TERMS
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            The vendor confirms that all catering orders are subject to the
            Dinebd Catering Vendor Terms & Conditions previously agreed and
            signed by the vendor.
          </Text>
          <View wrap={false}>
            <Text style={styles.subsectionTitle}>
              The vendor is responsible for:
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Preparing the confirmed food and quantities.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Following the confirmed catering schedule.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Maintaining appropriate food safety and packaging standards.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Meeting the confirmed preparation and handover time.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Reporting any fulfilment issue to Dinebd immediately.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Releasing food only to an authorised Dinebd delivery rider or
              person approved by Dinebd.
            </Text>
            <Text hyphenationCallback={noHyphenation} style={styles.listItem}>
              - Not collecting direct payment or additional charges from
              customers.
            </Text>
          </View>
          <Text
            style={[styles.paragraph, { marginTop: 6 }]}
            hyphenationCallback={noHyphenation}
          >
            The rider / delivery fee is managed by Dinebd and is not part of
            the vendor payout.
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            Customer personal information is managed by Dinebd and will only
            be shared with the vendor where necessary for fulfilment.
          </Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            The vendor's previously signed Dinebd Catering Vendor Terms &
            Conditions remain applicable to this order.
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>PARTNER SUPPORT</Text>
          <Text
            style={styles.paragraph}
            hyphenationCallback={noHyphenation}
          >
            Phone: +880 1940 68 9356
          </Text>
          <Text
            style={styles.paragraph}
            hyphenationCallback={noHyphenation}
          >
            Phone: +880 1333 15 8929
          </Text>
          <Text
            style={styles.paragraph}
            hyphenationCallback={noHyphenation}
          >
            Email: info@dinebd.com
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>POLICY ACKNOWLEDGEMENT</Text>
          <Text hyphenationCallback={noHyphenation} style={styles.paragraph}>
            This order is subject to the Dinebd Catering Vendor Terms &
            Conditions previously agreed and signed by the vendor.
          </Text>
          <Text
            style={[styles.paragraph, styles.bold]}
            hyphenationCallback={noHyphenation}
          >
            No additional vendor signature is required for this order
            confirmation.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CateringVendorOrderPDF;
