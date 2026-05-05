"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
  },
  header: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "left",
    marginBottom: 15,
    color: "#ED7319",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    marginTop: 10,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ED7319",
    paddingBottom: 3,
  },
  subsectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    marginTop: 8,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: 130,
    fontFamily: "Helvetica-Bold",
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  table: {
    marginTop: 6,
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ED7319",
    padding: 4,
  },
  tableHeaderText: {
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 4,
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
  },
  agreementText: {
    marginBottom: 4,
    textAlign: "justify",
    color: "#444",
  },
  paragraph: {
    marginBottom: 4,
    textAlign: "justify",
    color: "#333",
  },
  listItem: {
    marginBottom: 2,
    paddingLeft: 5,
  },
  signatureBlock: {
    marginTop: 15,
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
  signatureImage: {
    width: 120,
    height: 40,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 6,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 3,
    paddingBottom: 2,
  },
  signatureName: {
    fontFamily: "Helvetica-Bold",
    color: "#333",
  },
  signatureDate: {
    color: "#555",
    fontSize: 8,
  },
  operatingHoursTable: {
    marginTop: 6,
    marginBottom: 6,
  },
  operatingHoursRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 3,
  },
  dayColumn: {
    width: 70,
  },
  timeColumn: {
    flex: 1,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

interface VendorInfo {
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
  operatingHours: { [key: string]: { open: string; close: string } };
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
}

interface CommercialTerms {
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
}

interface Signatures {
  vendor: {
    representativeName: string;
    position: string;
    signature: string | File | null;
    date: string;
  };
  dinebd: {
    representativeName: string;
    position: string;
    signature: string | File | null;
    date: string;
  };
}

interface Agreements {
  commitments: boolean;
  paymentPolicy: boolean;
  duration: boolean;
  confidentiality: boolean;
  governingLaw: boolean;
  finalAcceptance: boolean;
}

interface VendorOnboardingData {
  vendorInfo: VendorInfo;
  commercialTerms: CommercialTerms;
  agreements: Agreements;
  signatures: Signatures;
}

interface VendorContractPDFProps {
  data: VendorOnboardingData;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const VendorContractPDF: React.FC<VendorContractPDFProps> = ({ data }) => {
  const { vendorInfo, commercialTerms, agreements, signatures } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          fixed
          style={{
            position: "absolute",
            bottom: 20,
            left: 40,
            right: 40,
            textAlign: "center",
            fontSize: 8,
            color: "#999",
          }}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <Text style={styles.header}>
          DINEBD & VENDOR CONTRACT/PARTNERSHIP AGREEMENT
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. PARTIES TO THIS AGREEMENT</Text>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.paragraph}>
              This Vendor Partnership Agreement ("Agreement") made and entered
              into on {formatDate(signatures.vendor.date)} by and between:
            </Text>
          </View>

          <View
            style={{ backgroundColor: "#f9f9f9", padding: 8, marginBottom: 8 }}
          >
            <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 3 }}>
              Dinebd Limited
            </Text>
            <Text style={styles.paragraph}>
              Dinebd Limited, a company duly incorporated under laws of
              Bangladesh, registered under Reg. No: C-202938/2025, having its
              registered office at Level 4, 34 Awal Centre, Kamal Ataturk
              Avenue, Banani, Dhaka 1213, Bangladesh, hereinafter referred to as
              "Dinebd",
            </Text>
            <Text style={{ marginTop: 3 }}>AND</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", marginTop: 3 }}>
              Vendor Information: This section provides vendor's information.
              This information will be used for official records, communication,
              and processing in accordance with this contract. It is important
              that all details are accurate and complete
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}> VENDOR INFORMATION :</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Business Name:</Text>
            <Text style={styles.value}>{vendorInfo.businessName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Legal Name:</Text>
            <Text style={styles.value}>{vendorInfo.legalName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registered Address:</Text>
            <Text style={styles.value}>
              {vendorInfo.registeredOfficeAddress || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company Reg. No:</Text>
            <Text style={styles.value}>
              {vendorInfo.companyRegistrationNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tax ID:</Text>
            <Text style={styles.value}>{vendorInfo.taxId || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Representative:</Text>
            <Text style={styles.value}>
              {vendorInfo.representativeName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{vendorInfo.phone || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{vendorInfo.mobile || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{vendorInfo.email || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cuisine Type:</Text>
            <Text style={styles.value}>{vendorInfo.cuisineType || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Service Types:</Text>
            <Text style={styles.value}>
              {vendorInfo.serviceTypes.filter((s) => s !== "Book a table")
                .length > 0
                ? vendorInfo.serviceTypes
                    .filter((s) => s !== "Book a table")
                    .join(", ")
                : "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {" "}
            Vendor Opening Time and Closing Time
          </Text>
          <Text style={styles.paragraph}>
            Please provide accurate and complete billing details. This
            information will be used to process payments, commissions, and
            reimbursements. All fields must be filled carefully to ensure timely
            and correct payment processing.
          </Text>
          <View style={styles.operatingHoursTable}>
            <View style={styles.operatingHoursRow}>
              <Text
                style={[styles.dayColumn, { fontFamily: "Helvetica-Bold" }]}
              >
                Day
              </Text>
              <Text style={styles.timeColumn}>Opening Time</Text>
              <Text style={styles.timeColumn}>Closing Time</Text>
            </View>
            {Object.entries(vendorInfo.operatingHours).map(([day, hours]) => (
              <View key={day} style={styles.operatingHoursRow}>
                <Text style={styles.dayColumn}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Text>
                <Text style={styles.timeColumn}>{hours.open || "Closed"}</Text>
                <Text style={styles.timeColumn}>{hours.close || "Closed"}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text break />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}> BILLING INFORMATION</Text>
          <Text style={styles.paragraph}>
            Please provide accurate and complete billing details. This
            information will be used to process payments, commissions, and
            reimbursements. All fields must be filled carefully to ensure timely
            and correct payment processing.{"\n\n"}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Billing Contact:</Text>
            <Text style={styles.value}>
              {vendorInfo.billingContactName || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{vendorInfo.billingPhone || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>
              {vendorInfo.billingMobile || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{vendorInfo.billingEmail || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bkash Number:</Text>
            <Text style={styles.value}>{vendorInfo.bkashNumber || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bkash Type:</Text>
            <Text style={styles.value}>{vendorInfo.bkashType || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Billing Address:</Text>
            <Text style={styles.value}>
              {vendorInfo.billingAddress || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bank Account Owner:</Text>
            <Text style={styles.value}>
              {vendorInfo.bankAccountOwner || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bank Name:</Text>
            <Text style={styles.value}>{vendorInfo.bankName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>
              {vendorInfo.accountNumber || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SWIFT Code:</Text>
            <Text style={styles.value}>{vendorInfo.swiftCode || "N/A"}</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. COMMERCIAL TERMS</Text>

          <Text style={styles.paragraph}>
            The Vendor agrees to pay Dinebd Limited the applicable Commission
            Fees in accordance with the attached Terms and Conditions and the
            selected service options.
          </Text>

          <Text style={styles.subsectionTitle}>2.1 Commission Fees</Text>
          <Text style={styles.paragraph}>
            Commission fees are calculated as a percentage of the Vendor's
            revenue generated through the Dinebd platform. Maximum Commission
            Deduction: 25%.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Note:</Text> Dinebd reserves the right to
            adjust commission rates in the future, subject to the maximum cap of
            25%. Any such changes will be communicated to the Vendor in advance
            before implementation, ensuring that Vendors have prior notice of
            any updates to the applicable commission percentages.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              Agreed Dinebd Platform Fee Percentages
            </Text>{" "}
            The following platform fee percentages have been agreed between the
            Vendor and Dinebd Limited based on this contract:
          </Text>

          <Text style={styles.sectionTitle}>2.1.1 Dinebd Platform Fee</Text>

          <Text style={styles.paragraph}>
            The following platform fees percentages have been agreed between the
            Vendor and Dinebd Limited based on cuisine:
          </Text>

          {commercialTerms.platformFees.length > 0 &&
            commercialTerms.platformFees[0].serviceType && (
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                    Service type
                  </Text>
                  <Text style={styles.tableCell}>Standard Percentage</Text>
                  <Text style={styles.tableCell}>Agreed Percentage %</Text>
                </View>
                {commercialTerms.platformFees.map((fee, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      { backgroundColor: index % 2 === 0 ? "#fff5e6" : "#fff" },
                    ]}
                  >
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {fee.serviceType}
                    </Text>
                    <Text style={styles.tableCell}>{fee.standardPercentage}</Text>
                    <Text style={styles.tableCell}>
                      {fee.agreedPercentage}%
                    </Text>
                  </View>
                ))}
              </View>
            )}

          {vendorInfo.serviceTypes.includes("Book a table") && (
            <View>
              <Text style={styles.subsectionTitle}>
                2.2 Table Booking Discounts
              </Text>
              <Text style={styles.paragraph}>
                Vendors agree to provide minimum 10% discount (on agreed-upon
                amount) to through the platform discount section.
              </Text>
              {commercialTerms.bookingDiscounts.length > 0 &&
                commercialTerms.bookingDiscounts[0].serviceType && (
                  <View style={styles.table}>
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableCell, { flex: 2 }]}>
                        Service Type
                      </Text>
                      <Text style={styles.tableCell}>Minimum discount</Text>
                      <Text style={styles.tableCell}>Agreed %</Text>
                    </View>
                    {commercialTerms.bookingDiscounts.map((discount, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#fff5e6" : "#fff",
                          },
                        ]}
                      >
                        <Text style={[styles.tableCell, { flex: 2 }]}>
                          {discount.serviceType}
                        </Text>
                        <Text style={styles.tableCell}>
                          {discount.minimumDiscount}
                        </Text>
                        <Text style={styles.tableCell}>
                          {discount.agreedPercentage}%
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          )}

          <Text style={styles.subsectionTitle}>2.3 Terms of Agreement</Text>
          <Text style={styles.listItem}>
            - Commission rates and discounts will remain in effect until further
            notice.
          </Text>
          <Text style={styles.listItem}>
            - Dinebd reserves the right to adjust commission percentages,
            subject to a maximum of 25%.
          </Text>

          <Text style={styles.subsectionTitle}>2.4 Taxation Policy</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>A. Government Tax Payments:</Text> All
            government taxes will be handled separately by each involved party
            as outlined below.
            {"\n\n"}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>B. Income Tax Responsibilities:</Text>
          </Text>
          <Text style={styles.listItem}>
            - Dinebd: Dinebd will be responsible for paying income tax on the
            commission it collects from the platform fee profit.
          </Text>
          <Text style={styles.listItem}>
            - Vendors: Vendors will be responsible for paying income tax on
            their total revenue, excluding the platform fee and delivery fee.
          </Text>
          <Text style={styles.listItem}>
            - Compliance Both Dinebd and vendors must ensure compliance with
            this policy and adhere to the relevant tax regulations according to
            Bangladesh Government Law.
            {"\n\n"}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>C. Amendments:</Text> This policy may be
            amended or updated as necessary. Any changes will be communicated in
            writing. For further information or clarification, please contact
            info@dinebd.com.
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Contract Start Date:</Text>
            <Text style={styles.value}>
              {formatDate(commercialTerms.contractStartDate)}
            </Text>
          </View>
          <View style={styles.row}></View>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. COMMITMENTS</Text>

          <Text style={styles.subsectionTitle}>a. Vendor's Commitments:</Text>
          <Text style={styles.paragraph}>
            The information below confirms the Vendor's commitments and their
            agreed operational, commercial, and compliance obligations:
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Agree to use Dinebd's platform for listing and promoting services.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Maintain accurate and updated information about the establishment
              on the Dinebd platform.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Adhere to food safety, hygiene, and allergy contamination
              guidelines.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>b. Dinebd's Commitments:</Text>
          <Text style={styles.paragraph}>
            The details below confirm what Dinebd agrees to provide, including
            platform access, promotional support, and operational guidance to
            ensure smooth transactions and positive customer experience.
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Dinebd will provide advertising tools and features to enhance the
              visibility of the Vendor.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Uphold Dinebd's goal of provide accurate information and improve
              the overall dining experience
            </Text>
          </View>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.commitments ? "Accepted" : "Not Accepted"}
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. UNSUCCESSFUL FOOD DELIVERIES
          </Text>

          <Text style={styles.subsectionTitle}>Customer not found</Text>
          <Text style={styles.paragraph}>
            In the rare event that the delivery rider is unable to locate the
            customer, the rider must return the food to the vendor in good
            condition.
          </Text>

          <Text style={styles.subsectionTitle}>Rider refund</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>For cash or partial payment orders:</Text>{" "}
            If the order was paid by the rider during pick up (cash or partial
            payment), the vendor is required to refund the rider for the full
            amount once the food is returned. Since the rider pays for the food
            when picking it up, the vendor must refund the rider in case of an
            unsuccessful delivery.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>For online payment orders:</Text> For
            orders paid online, the rider will return the food to the vendor in
            good condition. No refund is needed for the rider, as the payment
            was made online.
          </Text>

          <Text style={styles.subsectionTitle}>
            Reporting unsuccessful deliveries
          </Text>
          <Text style={styles.paragraph}>
            - The rider or vendor must report any unsuccessful delivery or
            transaction to Dinebd immediately to ensure compliance and for
            record-keeping purposes.
          </Text>
          <Text style={styles.paragraph}>
            - Dinebd may investigate any reported incidents and take necessary
            actions to prevent future issues and improve the process.
          </Text>

          <Text style={styles.subsectionTitle}>Support</Text>
          <Text style={styles.paragraph}>
            For assistance or to report any issues, riders and vendors can reach
            out to the Dinebd support team through the app or via email at
            info@dinebd.com or support@dinebd.com.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. PAYMENT AND EARNINGS POLICY
          </Text>

          <Text style={styles.subsectionTitle}>
            Earnings Structure and Payment Policy
          </Text>
          <Text style={styles.paragraph}>
            Earnings for completed deliveries or orders will generally be
            processed every two to three days. (some cases even earlier) and
            transferred directly to your registered bank account or bKash
            account. It is your responsibility to ensure that your bank account
            information is accurate and up to date to receive timely payments.
          </Text>
          <Text style={styles.paragraph}>
            Please note that payment days may vary due to factors such as
            weekends, public holidays, festive periods, or other circumstances
            like bank closures. While we at Dinebd aim to provide timely
            payments to you as quickly as possible, some delays may occur due to
            factors beyond our control, such as bank operating hours, public
            holidays, or when the payment date falls outside of regular banking
            hours
          </Text>
          <Text style={styles.paragraph}>
            In general, we aim to make payments within two to three days.
            However, the processing of payments may take additional time due to
            the complexities of the banking system in Bangladesh. We want to be
            transparent with you, as openness and honesty are core values of our
            business. Our goal is to provide you with clear communication and
            support, and we are committed to ensuring you receive your payments
            as soon as they reach us.
          </Text>
          <Text style={styles.paragraph}>
            While we strive to meet the agreed service level, we will always
            make an effort to send your payments as soon as possible. If you
            have any questions or require further support, please do not
            hesitate to contact our dedicated customer support team for more
            information.
          </Text>

          <Text style={styles.subsectionTitle}>
            Payment Policy for Cash and Partial Payment Orders
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              Food Delivery Orders (Cash or Partial Payment):
            </Text>{" "}
            At the time of cash food delivery order pickup, you are responsible
            for collecting the order amount from the rider, minus the platform
            fee, delivery fees, and any applicable discounts. The amount to be
            collected will be shown in the Dinebd Partner App during pickup. Any
            amounts due from Dinebd, such as discounts or other charges, will be
            paid to you later according to the payment disbursement policy. You
            are only responsible for collecting the amount from rider indicated
            in the partner app.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Takeaway Orders:</Text> At the time of
            cash order pickup, the customer will pay you the cash amount
            excluding the Dinebd platform fee and any applicable discounts. You
            are responsible for accepting the amount as indicated in the app.
            Any outstanding amounts due from Dinebd will be paid to you later
            according to the payment disbursement policy. The subtotal plus tax
            will be the total amount, from which Dinebd will deduct the platform
            fee and any applicable discounts. Any remaining balance due from
            Dinebd will be transferred to you later.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Table Booking Orders:</Text> For table
            bookings, the customer will arrive at the agreed-upon time shown in
            the app, and you are responsible for ensuring the customer receives
            the table according to the contract. Additionally, you must provide
            any agreed-upon discounts to the customer as per Dinebd's policy.
            Please note you will not receive any direct payment from Dinebd for
            tablebookings as the customer will pay you after the food is served.
            You are responsible for offering customer the discount agreed upon
            according to your contract with Dinebd.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Homemade Pickup Orders:</Text> At the time
            of pickup, you will receive the cash amount excluding the Dinebd
            platform fee and any discounts offered by Dinebd. You are
            responsible for accepting the amount shown in the app. Any remaining
            balance due from Dinebd will be paid to you later as per Dinebd's
            payment disbursement policy.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Homemade Pickup Orders:</Text> At the time
            of pickup, you will pay you the cash amount excluding the Dinebd
            platform fee and any discounts offered by Dinebd. You are
            responsible for accepting the amount shown in the app. Any remaining
            balance due from Dinebd will be paid to you later as per Dinebd's
            payment disbursement policy. As with takeaway orders, you will get
            the subtotal plus tax from the total amount, and Dinebd will deduct
            the platform fee and any applicable discounts. Any remaining balance
            due from Dinebd will be paid you later, if applicable.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Catering Orders:</Text> After the customer
            accepts the quotation for a catering order, they will confirm the
            order in the Dinebd app by paying the agreed platform fee. Dinebd
            will collect the platform fee during booking. Once the order is
            confirmed, the remaining balance will be paid by the customer either
            in cash or online, as per your preference. Dinebd is not responsible
            for collecting the remaining amount; it is your responsibility to
            arrange payment collection with the customer based on your own
            business policy. We do not take responsibility for any discrepancies
            or conflicts related to payment. However, if the customer cancels
            the order in accordance with Dinebd's cancellation policy, the
            platform fee will be refunded to the customer by Dinebd. No further
            payment will be made by Dinebd to the vendor, as Dinebd is only
            collecting the platform fee during the order initiation. The vendor
            is fully responsible for collecting payments from the customer and
            must comply with Dinebd's policy to ensure smooth operations. All
            Dinebd terms and conditions apply to protect customer rights
            according to Bangladeshi government laws.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.paymentPolicy ? "Accepted" : "Not Accepted"}
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. DURATION OF PARTNERSHIP</Text>

          <Text style={styles.paragraph}>
            This partnership shall commence on the Effective Date as signed
            below and will continue until terminated by either party with 30
            days' written notice, unless otherwise agreed in writing.
          </Text>
          <Text style={styles.paragraph}></Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.duration ? "Accepted" : "Not Accepted"}
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. CONFIDENTIALITY</Text>

          <Text style={styles.paragraph}>
            Both parties agree to maintain the confidentiality of any
            proprietary or sensitive information shared during this partnership.
            This obligation shall survive the termination of the agreement.
          </Text>
          <Text style={styles.paragraph}></Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.confidentiality ? "Accepted" : "Not Accepted"}
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. GOVERNING LAW</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Governing Law:</Text> This Agreement shall
            be governed by and construed in accordance with the laws of
            Bangladesh.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}></Text>Any disputes arising out of or in
            connection with this Agreement shall be resolved through arbitration
            in accordance with the rules of the Arbitration Act, 2001
            (Bangladesh) before a single arbitrator appointed in accordance with
            those rules. The place (or seat) of arbitration shall be Dhaka,
            Bangladesh.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}></Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}></Text>
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.governingLaw ? "Accepted" : "Not Accepted"}
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            9. DATA PROTECTION & PRIVACY POLICY
          </Text>

          <Text style={styles.subsectionTitle}>
            What information do we collect?
          </Text>
          <Text style={styles.paragraph}>
            Dinebd collects information about businesses from a variety of
            sources, including publicly available information, information
            provided by vendors during the onboarding process. Information may
            also be gathered via manual marketing efforts or other moveable
            sources.
          </Text>
          <Text style={styles.paragraph}>
            Additionally, vendors can provide information directly through
            registration on the Dinebd platform. This may include business and
            legal information, financial information, bank account details, such
            as bank account and payment method information, and photos.
          </Text>
          <Text style={styles.paragraph}>
            All information held by Dinebd consists primarily of publicly
            available data. Any personal information voluntarily shared by
            vendors will be kept secure and handled confidentially.
          </Text>

          <Text style={styles.subsectionTitle}>
            What can we use information for?
          </Text>
          <Text style={styles.paragraph}>
            Any of the information we collect from you may be used in one of the
            following ways:
          </Text>
          <Text style={styles.listItem}>
            - To personalize your experience; your information helps us to
            better respond to your individual needs
          </Text>
          <Text style={styles.listItem}>
            - To improve our website offers based on the information and
            feedback we receive from you
          </Text>
          <Text style={styles.listItem}>
            - To improve customer service (your information helps us to more
            effectively respond to your customer and support requests)
          </Text>
          <Text style={styles.listItem}>
            - To process transactions (your information, whether public or
            private, will not be sold, exchanged, transferred, or given to any
            other third party for any reason whatsoever, without your consent,
            other than for the purpose of delivering the desired product or
            service requested by the customer)
          </Text>
          <Text style={styles.listItem}>
            - To administer a contest, promotion, survey or other site features
          </Text>
          <Text style={styles.listItem}>
            - To send periodic emails (the email address you provide may be used
            to send you information and updates pertaining to your order, in
            addition to receiving occasional company news, updates, related
            product or service information, etc.)
          </Text>
          <Text style={styles.listItem}>
            - To allow you to access our services and make transactions
          </Text>
          <Text style={styles.listItem}>
            - To allow us to better serve you in responding to your customer and
            support requests
          </Text>
          <Text style={styles.listItem}>- Security and efficiency</Text>
          <Text style={styles.listItem}>
            - Enable you to maintain your profile, preferences, and save
            information for faster future use or otherwise
          </Text>

          <Text style={styles.subsectionTitle}>
            How do we protect your information?
          </Text>
          <Text style={styles.paragraph}>
            Dinebd deploys a variety of security, administrative, and physical
            security measures to protect your information against unauthorized
            access, alteration, disclosure, or destruction. These include:
          </Text>
          <Text style={styles.listItem}>
            - Secure storage of personal and business information using
            encryption and access controls
          </Text>
          <Text style={styles.listItem}>
            - Regular monitoring and updating of security measures to address
            security vulnerabilities
          </Text>
          <Text style={styles.listItem}>
            - Secure handling of sensitive financial and business information
          </Text>

          <Text style={styles.subsectionTitle}>
            Do we disclose any information to outside parties?
          </Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or transfer your personal information, except
            to trusted third parties who help operate our website or services
            and are bound by confidentiality. We may also disclose information
            to comply with the law, enforce site policies, or protect ours and
            others' rights and safety.
          </Text>

          <Text style={styles.subsectionTitle}>Data Retention</Text>
          <Text style={styles.paragraph}>
            Dinebd retains personal and business data only as long as necessary
            to provide services, comply with legal obligations, resolve
            disputes, and enforce agreements. When data is no longer required,
            it will be securely deleted.
          </Text>

          <Text style={styles.subsectionTitle}>Your Rights</Text>
          <Text style={styles.paragraph}>All vendors have the right to:</Text>
          <Text style={styles.listItem}>
            - Request access to their personal data held by Dinebd
          </Text>
          <Text style={styles.listItem}>
            - Request correction of inaccurate data
          </Text>
          <Text style={styles.listItem}>
            - Request deletion of personal data was permitted under applicable
            law
          </Text>
          <Text style={styles.listItem}>
            - Withdraw consent for data collection or processing where
            applicable
          </Text>
          <Text style={styles.listItem}>
            - Requests can be submitted to info@dinebd.com and will be assessed
            promptly
          </Text>

          <Text style={styles.subsectionTitle}>Your Consent</Text>
          <Text style={styles.paragraph}>
            By providing you to test your business information, you give consent
            to this privacy policy.
          </Text>
          <Text break />
          <Text style={styles.subsectionTitle}>
            Changes to our Privacy Policy
          </Text>
          <Text style={styles.paragraph}>
            Dinebd may update this Privacy Policy periodically. All changes will
            be posted on the website and app with the effective date clearly
            indicated. Vendors are encouraged to review this policy regularly.
          </Text>

          <Text style={styles.subsectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If there are any questions regarding this Dinebd data protection and
            privacy policy you may contact us on our website www.dinebd.com or
            email us at info@dinebd.com.
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            10. VENDOR AGREEMENT TERMS AND CONDITIONS
          </Text>

          <Text style={styles.subsectionTitle}>
            1. Services Provided by Dinebd
          </Text>
          <Text style={styles.paragraph}>
            1.1 Dinebd agrees to provide the Vendor with access to its platform
            for the purpose of listing, promoting, and facilitating
            reservations, takeaway orders, homemade food orders, and catering
            services.
          </Text>
          <Text style={styles.paragraph}>
            1.2 The Vendor acknowledges that Dinebd's platform includes features
            such as table booking, takeaway orders, homemade food orders, and
            catering services and that Dinebd will promote the Vendor's services
            through its platform.
          </Text>

          <Text style={styles.subsectionTitle}>2. Commission Fees</Text>
          <Text style={styles.paragraph}>
            2.1 The Vendor agrees to pay Dinebd a commission fee based on a
            percentage of the Vendor's revenue generated through the Dinebd
            platform. The specific commission percentage and payment terms are
            outlined in the Commercial Terms section of the Vendor Registration
            Form.
          </Text>
          <Text style={styles.paragraph}>
            2.2 Dinebd reserves the right to adjust the commission percentage
            and payment terms upon providing reasonable notice to the Vendor.
          </Text>

          <Text style={styles.subsectionTitle}>3. Vendor's Obligations</Text>
          <Text style={styles.paragraph}>
            3.1 The Vendor shall provide accurate and up-to-date information
            about its establishment, including menu details, pricing, and
            business hours, on the Dinebd platform.
          </Text>
          <Text style={styles.paragraph}>
            3.2 The Vendor agrees to maintain food safety and hygiene standards
            as per industry regulations and adheres to allergy contamination
            guidelines.
          </Text>
          <Text style={styles.paragraph}>
            3.3 The Vendor shall notify Dinebd promptly of any changes in its
            business details, including but not limited to contact information,
            menu, and business hours.
          </Text>

          <Text style={styles.subsectionTitle}>
            4. Unsuccessful Food Deliveries
          </Text>
          <Text style={styles.paragraph}>
            4.1 As a vendor, in the event of an unsuccessful food delivery where
            the rider is unable to locate the customer, the food will be
            returned to you. For cash or partial payment orders, you are
            required to refund the rider in full once the food is returned, as
            the rider has already paid for the food at the time of pickup.
          </Text>
          <Text style={styles.paragraph}>
            4.2 However, for online payment orders, you are not obligated to
            refund the rider for an unsuccessful delivery, as the payment was
            made online. In this case, the rider is only required to return the
            food in good condition. Furthermore, both riders and vendors advised
            to report any unsuccessful deliveries to Dinebd immediately to
            ensure compliance and maintain accurate records. Dinebd may
            investigate the reported incidents and take necessary actions to
            prevent future issues. For any assistance or to report problems,
            riders and vendors can contact Dinebd support via the app or email
            at info@dinebd.com or support@dinebd.com.
          </Text>

          <Text style={styles.subsectionTitle}>
            5. Payment and Earnings Policy Summary
          </Text>
          <Text style={styles.paragraph}>
            By agreeing to partner with Dinebd, you acknowledge and accept the
            following payment and earnings structure:
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              Earnings Structure & Payment Timeline:
            </Text>
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Payments for completed orders or deliveries are processed every
              2-3 days, transferred to your registered bank or Bkash account
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Payment days may vary due to weekends, holidays, or bank closures.
              While we aim for quick processing, delays can occur due to factors
              like banking hours.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Any outstanding amounts from Dinebd will be paid later, in
              accordance with our payment disbursement policy.
            </Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 4 }]}>
            <Text style={styles.bold}>
              Payment Policy for Cash and Partial Payment Orders:
            </Text>
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Food Delivery (Cash/Partial Payment): You are responsible for
              collecting the order amount from the rider (after deducting
              platform fees and discounts or other charges). Any outstanding
              amounts from Dinebd will be paid to you later.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Takeaway Orders: Customers will pay you the amount due at pickup,
              minus platform fees and discounts or other charges. Any remaining
              balance will be paid to you by Dinebd later.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Table Booking Orders: You are responsible for providing any agreed
              discounts to the customer. Dinebd will not make direct payments
              for table bookings. Payment will be made by customer after the
              food is served.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Homemade Pickup Orders: for homemade takeaway orders, the customer
              will pay cash minus platform fees, discounts or other charges and
              any outstanding amounts from Dinebd will be paid later.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <Text
              style={{
                color: "#ED7319",
                fontFamily: "Helvetica-Bold",
                marginRight: 5,
              }}
            >
              •
            </Text>
            <Text style={{ flex: 1, color: "#444" }}>
              Catering Orders: Dinebd collects the platform fee during booking.
              You are responsible for collecting the remaining payment directly
              from the customer, either in cash or online. Dinebd is not
              responsible for collecting the remaining balance.
            </Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 4 }]}>
            By agreeing to this policy, you (vendor) confirm that you will
            adhere to the outlined payment conditions and understand your
            responsibilities as a Dinebd partner.
          </Text>
          <Text break />
          <Text style={styles.subsectionTitle}>
            6. Duration and Termination
          </Text>
          <Text style={styles.paragraph}>
            6.1 This partnership agreement shall commence on the Effective Date
            as signed below and will continue until terminated by either party
            with 30 days' written notice, unless otherwise agreed in writing.
          </Text>
          <Text style={styles.paragraph}>
            6.2 Either party may terminate this agreement immediately in the
            event of a material breach by the other party.
          </Text>

          <Text style={styles.subsectionTitle}>7. Confidentiality</Text>
          <Text style={styles.paragraph}>
            7.1 Both Parties agree to treat as strictly confidential all
            proprietary, technical, financial, and business information
            disclosed by one Party to the other in connection with this
            Agreement ("Confidential Information"). This includes, but is not
            limited to, trade secrets, business strategies, pricing structures,
            marketing plans, operational procedures, financial data, customer
            lists, technical data, and any other information marked or
            reasonably understood to be confidential.
          </Text>
          <Text style={styles.paragraph}>
            7.2 The confidentiality obligations shall survive the termination of
            this agreement. Upon termination or expiration of this Agreement, or
            upon written request by the disclosing Party, each Party shall
            promptly return or permanently destroy all Confidential Information
            in its possession, except where retention is required by law or
            regulatory authority.
          </Text>

          <Text style={styles.subsectionTitle}>
            8. Governing Law and Dispute Resolution
          </Text>
          <Text style={styles.paragraph}>
            8.1 Governing Law This Agreement shall be governed by and construed
            in accordance with the laws of the People's Republic of Bangladesh.
            All rights, obligations, and remedies of Parties shall be subject to
            Bangladeshi jurisdiction.
          </Text>
          <Text style={styles.paragraph}>
            8.2 Dispute Resolution Process In the event of any dispute,
            controversy, or claim arising out of or relating to this Agreement,
            Parties shall first attempt to resolve the matter amicably and in
            good faith. The Vendor must notify Dinebd Limited in writing within
            seven (7) business days of the dispute's occurrence. Dinebd will
            review and attempt to resolve issue internally before any formal
            proceedings are initiated.
          </Text>
          <Text style={styles.paragraph}>
            8.3 Arbitration If a dispute cannot be resolved amicably, it shall
            be referred to binding arbitration under the Arbitration Act, 2001
            (Bangladesh). The arbitration shall be conducted by a single
            arbitrator appointed by Dinebd Limited, unless otherwise required by
            law. The seat and venue shall be Dhaka, Bangladesh, and the
            proceedings shall be in English. The arbitral award shall be final
            and binding on both Parties and enforceable in any court of
            competent jurisdiction. Dinebd reserves right to suspend services,
            withhold payments, or take interim measures during the dispute
            process to protect its operational or financial interests.
          </Text>
          <Text style={styles.paragraph}>
            8.4 Costs, Obligations, and Injunctive Relief Unless otherwise
            directed by the arbitrator, each Party shall bear its own costs;
            however, the Vendor shall reimburse Dinebd for any reasonable legal,
            administrative, or enforcement expenses incurred in protecting its
            rights. During the dispute resolution process, both Parties shall
            continue performing their obligations under this Agreement unless
            such performance is impossible or Dinebd instructs otherwise in
            writing. Dinebd also reserves the right to seek immediate
            injunctive, equitable, or interim relief from a court of competent
            jurisdiction in Bangladesh to safeguard its confidential
            information, intellectual property, or business interests.
          </Text>

          <Text style={styles.subsectionTitle}>9. Miscellaneous</Text>
          <Text style={styles.listItem}>
            1. This section outlines general provisions that clarify and support
            this Agreement.
          </Text>
          <Text style={styles.listItem}>
            2. Any changes to this Agreement must be made in writing and signed
            by both Parties.
          </Text>
          <Text style={styles.listItem}>
            3. This document represents the full and final understanding between
            Parties and supersedes all prior discussions or agreements.
          </Text>
          <Text style={styles.listItem}>
            4. All formal notices must be sent in writing to the addresses or
            email contacts provided by each Party.
          </Text>
          <Text style={styles.listItem}>
            5. Neither Party shall be liable for delays or non-performance
            caused by circumstances beyond their reasonable control, including
            natural disasters, strikes, or government actions.
          </Text>
          <Text style={styles.listItem}>
            6. If any provision of this Agreement is found invalid or
            unenforceable, the remaining provisions shall remain in full effect.
          </Text>
          <Text style={styles.listItem}>
            7. Failure or delay in enforcing any right shall not constitute a
            waiver unless confirmed in writing.
          </Text>
          <Text style={styles.listItem}>
            8. The Vendor may not assign or transfer its rights or obligations
            under this Agreement without Dinebd's prior written consent.
            However, Dinebd may assign its rights to an affiliate or successor
            company without Vendor consent.
          </Text>
        </View>

        <Text break />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            11. TERMS AND CONDITIONS ACCEPTANCE
          </Text>

          <Text style={styles.paragraph}>
            By signing this Agreement, the Vendor confirms that they have read,
            understood, and agreed to all the terms and conditions set forth in
            this Dinebd Limited Vendor Partnership Agreement.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              The Vendor further acknowledges that:
            </Text>
          </Text>
          <Text style={styles.listItem}>
            - All information provided to Dinebd Limited is true and accurate to
            the best of their knowledge.
          </Text>
          <Text style={styles.listItem}>
            - They will comply with all operational, commercial, and legal
            obligations mentioned herein.
          </Text>
          <Text style={styles.listItem}>
            - They have had the opportunity to review of Agreement and seek
            independent legal advice before signing.
          </Text>
          <Text style={styles.listItem}>
            - The terms and conditions contained in this Agreement shall be
            binding upon both Dinebd Limited and Vendor from the Effective Date.
            {"\n\n"}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Status:</Text>{" "}
            {agreements.finalAcceptance ? "Accepted" : "Not Accepted"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. SIGNATURES</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Contact signature</Text>
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>IN WITNESS WHEREOF, </Text>the Parties
            have executed this Vendor Partnership Agreement as of the Effective
            Date below.
          </Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Vendor Representative</Text>
              {signatures.vendor.signature && (
                <>
                  {typeof signatures.vendor.signature === "string" ? (
                    <Image
                      src={signatures.vendor.signature}
                      style={styles.signatureImage}
                    />
                  ) : (
                    <Text style={styles.agreementText}>
                      [Signature Image:{" "}
                      {signatures.vendor.signature instanceof File
                        ? signatures.vendor.signature.name
                        : "Signature provided"}
                      ]
                    </Text>
                  )}
                </>
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                Name:
                {signatures.vendor.representativeName || "N/A"}
              </Text>
              <Text>Position: {signatures.vendor.position || "N/A"}</Text>
              <Text style={styles.signatureDate}>
                Date: {formatDate(signatures.vendor.date)}
              </Text>
            </View>

            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Dinebd Representative</Text>
              {signatures.dinebd.signature && (
                <>
                  {typeof signatures.dinebd.signature === "string" ? (
                    <Image
                      src={signatures.dinebd.signature}
                      style={styles.signatureImage}
                    />
                  ) : (
                    <Text style={styles.agreementText}>
                      [Signature Image:{" "}
                      {signatures.dinebd.signature instanceof File
                        ? signatures.dinebd.signature.name
                        : "Signature provided"}
                      ]
                    </Text>
                  )}
                </>
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                Name:
                {signatures.dinebd.representativeName || "N/A"}
              </Text>
              <Text>Position: {signatures.dinebd.position || "N/A"}</Text>
              <Text style={styles.signatureDate}>
                Date: {formatDate(signatures.dinebd.date)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default VendorContractPDF;
