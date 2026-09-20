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
    fontSize: 16,
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
    width: 150,
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
  listItem: {
    marginBottom: 3,
    paddingLeft: 6,
    color: "#444",
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
    fontSize: 8,
  },
  scheduleGroup: {
    marginBottom: 10,
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
  scheduleMealRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f2f2f2",
  },
  scheduleMealType: {
    width: 55,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: ORANGE,
  },
  scheduleMealValue: {
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
    fontSize: 11,
    marginRight: 6,
    fontFamily: "Helvetica-Bold",
  },
  signatureBlock: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
  },
  signatureLabel: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    color: "#333",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 3,
    paddingBottom: 10,
  },
  signatureName: {
    fontFamily: "Helvetica-Bold",
    color: "#333",
  },
  signatureDate: {
    color: "#555",
    fontSize: 8,
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
  dinnerItems: string;
  dinnerQuantity: string;
}

export interface CateringOrderPDFData {
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
    dateEntries: DateMealEntry[];
    additionalItems: string;
    deliveryTime: string;
    totalLunchesPerDay: string;
    dietaryRequirements: string;
    otherInformation: string;
  };
  finance: {
    numberOfDays: string;
    lunchesPerDay: string;
    subtotal: string;
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

const gbp = (value: string): string => {
  const n = parseFloat(value);
  return `£${(isNaN(n) ? 0 : n).toFixed(2)}`;
};

const VAT_RATE = 0.05;

const computeVat = (subtotal: string): number => {
  return (parseFloat(subtotal) || 0) * VAT_RATE;
};

const computeTotal = (finance: CateringOrderPDFData["finance"]): number => {
  const subtotal = parseFloat(finance.subtotal) || 0;
  const vat = computeVat(finance.subtotal);
  const delivery = parseFloat(finance.deliveryFee) || 0;
  const other = parseFloat(finance.otherCosts) || 0;
  return subtotal + vat + delivery + other;
};

const CateringOrderPDF: React.FC<{ data: CateringOrderPDFData }> = ({
  data,
}) => {
  const { orderVendor, customer, lunchService, finance, acceptance, signOff } =
    data;
  const total = computeTotal(finance);
  const amountPaid = parseFloat(finance.amountPaid) || 0;
  const outstanding = total - amountPaid;

  const cateringDaysCount = new Set(
    lunchService.dateEntries
      .filter((entry) => entry.date && (entry.lunch || entry.dinner))
      .map((entry) => entry.date),
  ).size;

  const totalPeoplePerDay = (() => {
    const perDayTotals = new Map<string, number>();
    lunchService.dateEntries.forEach((entry) => {
      if (!entry.date || (!entry.lunch && !entry.dinner)) return;
      let dayTotal = 0;
      if (entry.lunch) dayTotal += parseFloat(entry.lunchQuantity) || 0;
      if (entry.dinner) dayTotal += parseFloat(entry.dinnerQuantity) || 0;
      perDayTotals.set(entry.date, (perDayTotals.get(entry.date) || 0) + dayTotal);
    });
    const dayValues = Array.from(perDayTotals.values());
    if (dayValues.length === 0) return "";
    const average = dayValues.reduce((sum, v) => sum + v, 0) / dayValues.length;
    return String(Math.round(average));
  })();

  const scheduleDateGroups = (() => {
    const groups = new Map<
      string,
      {
        date: string;
        lunch?: { items: string; quantity: string };
        dinner?: { items: string; quantity: string };
      }
    >();
    lunchService.dateEntries.forEach((entry) => {
      if (!entry.date) return;
      const group = groups.get(entry.date) ?? { date: entry.date };
      if (entry.lunch) {
        group.lunch = { items: entry.lunchItems, quantity: entry.lunchQuantity };
      }
      if (entry.dinner) {
        group.dinner = { items: entry.dinnerItems, quantity: entry.dinnerQuantity };
      }
      groups.set(entry.date, group);
    });
    return Array.from(groups.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  })();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <Text style={styles.header}>
          DIENBD CATERING
        </Text>
        <Text style={styles.intro}>
          Thank you for choosing Dienbd Catering for your office catering
          service. To confirm and process your order, kindly complete the
          following details.
        </Text>

        {/* Section A */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A. ORDER & VENDOR DETAILS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Catering Order ID:</Text>
            <Text style={styles.value}>
              {orderVendor.cateringOrderId || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Name:</Text>
            <Text style={styles.value}>{orderVendor.vendorName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Reference Number:</Text>
            <Text style={styles.value}>
              {orderVendor.vendorReferenceNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor Contact Number:</Text>
            <Text style={styles.value}>
              {orderVendor.vendorContactNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Date:</Text>
            <Text style={styles.value}>
              {formatDate(orderVendor.orderDate)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{formatDate(orderVendor.date)}</Text>
          </View>
        </View>

        {/* Section B */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>B. CUSTOMER DETAILS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Name:</Text>
            <Text style={styles.value}>
              {customer.customerName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Contact Number:</Text>
            <Text style={styles.value}>
              {customer.customerContactNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Office / Delivery Address:</Text>
            <Text style={styles.value}>
              {customer.officeAddress || "N/A"}
            </Text>
          </View>
        </View>

        {/* Section C */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>C. CATERING DETAILS</Text>

          <Text style={styles.subsectionTitle}>Meal Schedule by Date</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Package Name:</Text>
            <Text style={styles.value}>
              {lunchService.packageName || "N/A"}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: 55 }]}>
                Meal
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 2.4 }]}>
                Meal / Food Items
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { flex: 1, textAlign: "right" },
                ]}
              >
                Quantity / People
              </Text>
            </View>
            {scheduleDateGroups.length === 0 ? (
              <Text style={styles.scheduleEmptyRow}>
                No catering dates added.
              </Text>
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
                  {group.lunch && (
                    <View style={styles.scheduleMealRow}>
                      <Text style={styles.scheduleMealType}>Lunch</Text>
                      <Text style={[styles.scheduleMealValue, { flex: 2.4 }]}>
                        {group.lunch.items || "N/A"}
                      </Text>
                      <Text
                        style={[
                          styles.scheduleMealValue,
                          { flex: 1, textAlign: "right" },
                        ]}
                      >
                        {group.lunch.quantity || "N/A"}
                      </Text>
                    </View>
                  )}
                  {group.dinner && (
                    <View style={styles.scheduleMealRow}>
                      <Text style={styles.scheduleMealType}>Dinner</Text>
                      <Text style={[styles.scheduleMealValue, { flex: 2.4 }]}>
                        {group.dinner.items || "N/A"}
                      </Text>
                      <Text
                        style={[
                          styles.scheduleMealValue,
                          { flex: 1, textAlign: "right" },
                        ]}
                      >
                        {group.dinner.quantity || "N/A"}
                      </Text>
                    </View>
                  )}
                  {!group.lunch && !group.dinner && (
                    <Text style={styles.scheduleEmptyRow}>
                      No meal selected for this date.
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subsectionTitle}>
            Additional Food Items / Beverages
          </Text>
          <Text style={styles.paragraph}>
            {lunchService.additionalItems || "N/A"}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Total Catering Days:</Text>
            <Text style={styles.value}>
              {cateringDaysCount || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Preferred Food Delivery Time:</Text>
            <Text style={styles.value}>
              {lunchService.deliveryTime || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total People / Quantity Per Day:</Text>
            <Text style={styles.value}>
              {totalPeoplePerDay || "N/A"}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            Dietary Requirements / Special Instructions
          </Text>
          <Text style={styles.paragraph}>
            {lunchService.dietaryRequirements || "N/A"}
          </Text>

          <Text style={styles.subsectionTitle}>Any Other Information</Text>
          <Text style={styles.paragraph}>
            {lunchService.otherInformation || "N/A"}
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>D. FINANCE</Text>

          <View style={styles.table} wrap={false}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>
                Description
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
                {finance.numberOfDays
                  ? `${finance.numberOfDays} days`
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>
                Number of People / Quantity Per Day
              </Text>
              <Text style={styles.financeValue}>
                {finance.lunchesPerDay || "N/A"}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Subtotal</Text>
              <Text style={styles.financeValue}>{gbp(finance.subtotal)}</Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>VAT: 5%</Text>
              <Text style={styles.financeValue}>
                {`£${computeVat(finance.subtotal).toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Delivery Fee</Text>
              <Text style={styles.financeValue}>
                {gbp(finance.deliveryFee)}
              </Text>
            </View>
            <View style={styles.financeRow}>
              <Text style={styles.financeLabel}>Other Costs</Text>
              <Text style={styles.financeValue}>
                {gbp(finance.otherCosts)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>
                {`£${total.toFixed(2)}`}
              </Text>
            </View>
          </View>

          <Text style={styles.subsectionTitle}>Payment Preference</Text>
          <View style={styles.checkboxRow}>
            <Text
              style={[
                styles.checkboxGlyph,
                { color: finance.paymentPreference === "advance" ? ORANGE : "#666" },
              ]}
            >
              {finance.paymentPreference === "advance" ? "☑" : "☐"}
            </Text>
            <Text>Advance Payment / Full Paid</Text>
          </View>
          <View style={styles.checkboxRow}>
            <Text
              style={[
                styles.checkboxGlyph,
                { color: finance.paymentPreference === "daily" ? ORANGE : "#666" },
              ]}
            >
              {finance.paymentPreference === "daily" ? "☑" : "☐"}
            </Text>
            <Text>Daily Payment / Partial Payment</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment Reference:</Text>
            <Text style={styles.value}>
              {finance.paymentReference || "N/A"}
            </Text>
          </View>

          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={[styles.label, styles.bold]}>TOTAL AMOUNT:</Text>
            <Text style={[styles.value, styles.bold]}>
              {`£${total.toFixed(2)}`}
            </Text>
          </View>
          <Text style={[styles.paragraph, { fontSize: 8, color: "#777" }]}>
            Subtotal + VAT (5%) + Delivery Fee + Other Costs = TOTAL
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Paid:</Text>
            <Text style={styles.value}>{`£${amountPaid.toFixed(2)}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Outstanding Balance:</Text>
            <Text style={styles.value}>
              {`£${outstanding.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            E. CATERING TERMS & CONDITIONS
          </Text>
          <Text style={styles.paragraph}>
            Please read and accept the following conditions before placing
            or confirming your catering order.
          </Text>

          <Text style={styles.subsectionTitle}>
            1. Order at Least 24 Hours in Advance
          </Text>
          <Text style={styles.paragraph}>
            Catering orders should be placed at least 24 hours in advance.
            Late orders may be cancelled, partially delivered, or
            unavailable, subject to catering partner availability.
          </Text>

          <Text style={styles.subsectionTitle}>2. Multiple-Day Catering</Text>
          <Text style={styles.paragraph}>
            For weekly or monthly catering, each delivery day may be treated
            as a separate daily order, with its own delivery date and time.
          </Text>
          <Text style={styles.listItem}>
            Example: 7 days of catering = 7 separate daily orders.
          </Text>

          <Text style={styles.subsectionTitle}>
            3. Quotation & Delivery Charges
          </Text>
          <Text style={styles.paragraph}>
            The catering partner will confirm availability and provide the
            final quotation. Delivery charges, VAT where applicable, and
            other applicable costs may apply per day/order. All applicable
            charges will be shown before confirmation.
          </Text>

          <Text style={styles.subsectionTitle}>4. Order Confirmation</Text>
          <Text style={styles.paragraph}>
            Once the quotation is accepted and the required payment is made,
            the catering partner may begin food preparation. Changes or
            cancellations may therefore no longer be possible.
          </Text>

          <Text style={styles.subsectionTitle}>
            5. Payment & Remaining Balance
          </Text>
          <Text style={styles.paragraph}>
            Customers may choose one of the following payment arrangements:
          </Text>
          <Text style={styles.listItem}>
            - Pay in Advance: Pay the remaining balance through a secure
            Dinebd payment link.
          </Text>
          <Text style={styles.listItem}>
            - Pay on Delivery: Pay the remaining balance on each delivery day
            through a secure Dinebd payment link.
          </Text>
          <Text style={styles.listItem}>
            - Mix & Match: Pay some days in advance and the remaining days on
            delivery.
          </Text>
          <Text style={styles.paragraph}>
            Food will be delivered only after payment for that day's order
            has been confirmed by Dinebd.
          </Text>
          <Text style={[styles.paragraph, styles.bold]}>
            Do not give cash to the delivery rider. Payments must be made
            through the secure Dinebd payment link.
          </Text>

          <Text style={styles.subsectionTitle}>
            6. Food Allergies & Dietary Requirements
          </Text>
          <Text style={styles.paragraph}>
            Customers must inform the catering partner of any allergies,
            intolerances, dietary restrictions, or other dietary
            requirements and should confirm ingredients and preparation
            details directly with the catering partner before ordering.
          </Text>
          <Text style={styles.paragraph}>
            Dinebd does not guarantee that any food supplied by a catering
            partner is free from allergens and, to the extent permitted by
            applicable law, accepts no responsibility or liability for
            allergic reactions, food-related health issues, or other
            consequences arising from food supplied by the catering partner.
          </Text>

          <Text style={styles.subsectionTitle}>
            7. Dinebd's Role & Liability
          </Text>
          <Text style={styles.paragraph}>
            Dinebd provides the platform and service that facilitates
            communication, ordering, quotation, and payment between
            customers and catering partners.
          </Text>
          <Text style={styles.paragraph}>
            Dinebd does not prepare, manufacture, or directly supply the
            food. Responsibility for the catering service rests with the
            relevant catering partner.
          </Text>
          <Text style={styles.paragraph}>
            To the extent permitted by applicable law, Dinebd shall not be
            responsible for food quality, ingredients, allergens,
            preparation, quantity, delivery of the food, or other issues
            arising directly from the catering service provided by the
            catering partner.
          </Text>

          <Text style={styles.subsectionTitle}>8. Delivery</Text>
          <Text style={styles.paragraph}>
            Delivery times are estimates and may be affected by traffic,
            weather, road conditions, food preparation time, or other
            circumstances outside Dinebd's reasonable control.
          </Text>

          <Text style={styles.subsectionTitle}>9. Support & Complaints</Text>
          <Text style={styles.paragraph}>
            Customers can contact Dinebd Support through the App for
            assistance with their catering order.
          </Text>
          <Text style={styles.paragraph}>
            Catering-related complaints should be raised as soon as possible
            so that Dinebd can review the matter with the relevant catering
            partner.
          </Text>

          <Text style={styles.subsectionTitle}>
            10. Why These Guidelines Matter
          </Text>
          <Text style={styles.paragraph}>
            These guidelines help maintain food quality, reliable delivery,
            accurate orders, and smooth catering operations.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={styles.footerNote}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            F. CUSTOMER ORDER CONFIRMATION & ACCEPTANCE
          </Text>
          <Text style={styles.subsectionTitle}>
            I confirm and acknowledge the following:
          </Text>
          <Text style={styles.listItem}>
            - I have reviewed and accepted the catering order details and
            quotation.
          </Text>
          <Text style={styles.listItem}>
            - I have read and understood the Catering Terms & Conditions
            above.
          </Text>
          <Text style={styles.listItem}>
            - I understand that once the quotation is accepted and the
            required payment is made, the catering partner may begin food
            preparation, and changes or cancellations may therefore no
            longer be possible.
          </Text>
          <Text style={styles.listItem}>
            - I confirm that I have provided any known allergies,
            intolerances, dietary requirements, or special dietary
            instructions, and understand that I should confirm ingredients
            and preparation details directly with the catering partner.
          </Text>
          <Text style={styles.listItem}>
            - I understand Dinebd's role as a platform and service
            facilitator, and that the catering partner is responsible for
            preparing and supplying the food and catering service.
          </Text>
          <Text style={styles.listItem}>
            - I understand that delivery times are estimates and may be
            affected by circumstances outside Dinebd's reasonable control.
          </Text>
          <Text style={styles.listItem}>
            - I understand that payments must be made through the secure
            Dinebd payment link and that cash should not be given to the
            delivery rider.
          </Text>

          <View style={[styles.checkboxRow, { marginTop: 8 }]}>
            <Text
              style={[
                styles.checkboxGlyph,
                { color: acceptance ? ORANGE : "#666" },
              ]}
            >
              {acceptance ? "☑" : "☐"}
            </Text>
            <Text style={{ flex: 1 }}>
              By ticking the box, I accept these above Catering Terms &
              Conditions and agree to proceed with the catering order.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            CUSTOMER / DINEBD REPRESENTATIVE SIGN-OFF
          </Text>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Customer</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                Name: {signOff.customerName || "N/A"}
              </Text>
              <Text style={styles.signatureDate}>
                Date: {formatDate(signOff.customerDate)}
              </Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>
                Dinebd Representative
              </Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                Name: {signOff.representativeName || "N/A"}
              </Text>
              <Text style={styles.signatureDate}>
                Date: {formatDate(signOff.representativeDate)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEED HELP?</Text>
          <Text style={[styles.paragraph, styles.bold]}>
            Dinebd Customer Service
          </Text>
          <Text style={styles.paragraph}>Phone: +880 1940 68 9356</Text>
          <Text style={styles.paragraph}>Phone: +880 1333 15 8929</Text>
          <Text style={styles.paragraph}>Email: info@dinebd.com</Text>
          <Text style={[styles.paragraph, { marginTop: 6 }]}>
            Thank you for choosing Dinebd Catering.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CateringOrderPDF;
