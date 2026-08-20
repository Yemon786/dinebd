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
import type {
  RegistrationData,
  ContractData,
  DataProtectionData,
  EquipmentData,
  InsuranceData,
  PaymentData,
} from "@/lib/onboarding-types";

// The Equipment Policy page's Bangla content is rasterized to a PNG at
// submit time (see lib/rasterize-equipment-policy.ts) and embedded as an
// <Image> below, rather than laid out here as react-pdf <Text> — react-pdf's
// text engine doesn't shape Bengali conjuncts/matras correctly, which
// produced broken glyphs when the content was rendered as native PDF text.

const styles = StyleSheet.create({
  page: { padding: 44, fontSize: 9, fontFamily: "Helvetica", lineHeight: 1.4, color: "#222" },
  docHeader: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    color: "#ED7319",
  },
  docHeaderRule: {
    borderBottomWidth: 2,
    borderBottomColor: "#ED7319",
    marginBottom: 16,
  },
  header: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    color: "#ED7319",
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ED7319",
  },
  subheader: { fontSize: 9, color: "#666", marginBottom: 16, lineHeight: 1.45 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    marginTop: 0,
    color: "#1a1a1a",
    backgroundColor: "#FFF3E8",
    borderLeftWidth: 3,
    borderLeftColor: "#ED7319",
    paddingVertical: 6,
    paddingLeft: 9,
  },
  subsectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: "#eee",
  },
  subsectionTitleUnderline: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    marginTop: 9,
    color: "#444",
    textDecoration: "underline",
  },
  formCard: {
    borderWidth: 0.75,
    borderColor: "#e6e6e6",
    borderRadius: 6,
    backgroundColor: "#FCFCFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 4,
  },
  row: { flexDirection: "row", paddingVertical: 4.5, borderBottomWidth: 0.5, borderBottomColor: "#f0f0f0" },
  label: { width: 178, fontFamily: "Helvetica-Bold", color: "#555" },
  value: { flex: 1, color: "#181818" },
  mutedValue: { color: "#aaa", fontStyle: "italic" },
  paragraph: { marginBottom: 7, textAlign: "justify", color: "#333", lineHeight: 1.45 },
  bold: { fontFamily: "Helvetica-Bold" },
  list: { marginBottom: 6 },
  listRow: { flexDirection: "row", marginBottom: 4, paddingLeft: 4 },
  listMarker: { width: 14, color: "#ED7319", fontFamily: "Helvetica-Bold" },
  listText: { flex: 1, color: "#333", textAlign: "justify" },
  table: { marginTop: 5, marginBottom: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 4, overflow: "hidden" },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#ED7319" },
  tableHeaderCell: {
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#fff",
  },
  tableDataRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#ddd" },
  tableDataRowAlt: { backgroundColor: "#FAFAFA" },
  tableDataCell: {
    fontSize: 7.5,
    padding: 6,
    color: "#333",
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
  signatureBlock: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderWidth: 0.75,
    borderColor: "#e6e6e6",
    borderRadius: 6,
    padding: 10,
  },
  signatureLabel: { fontFamily: "Helvetica-Bold", marginBottom: 7, color: "#333" },
  signatureImage: {
    width: 120,
    height: 40,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 7,
  },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: "#333", marginBottom: 4, paddingBottom: 2 },
  signatureName: { fontFamily: "Helvetica-Bold", color: "#333" },
  signatureDate: { color: "#555", fontSize: 8 },
  agreementBox: {
    backgroundColor: "#FFF6ED",
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#ED7319",
    padding: 9,
    marginTop: 4,
    marginBottom: 9,
  },
  statusAccepted: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ED7319",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  statusNotAccepted: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#999",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  agreementText: { fontSize: 8.5, color: "#333", lineHeight: 1.35 },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 44,
    right: 44,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5e5",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sx = (...s: Array<any | false | undefined>): any[] => s.filter(Boolean);

type Block =
  | { kind: "h"; text: string; underline?: boolean }
  | { kind: "p"; text: string; bold?: boolean }
  | { kind: "ul"; items: string[]; marker?: (i: number) => string };

const romanMarker = (i: number) => `${["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"][i] ?? i + 1}.`;
const alphaMarker = (i: number) => `${String.fromCharCode(97 + i)}.`;
const numMarker = (i: number) => `${i + 1}.`;

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "h") {
          return (
            <Text key={i} style={b.underline ? styles.subsectionTitleUnderline : styles.subsectionTitle}>
              {b.text}
            </Text>
          );
        }
        if (b.kind === "p") {
          return (
            <Text key={i} style={sx(styles.paragraph, b.bold && styles.bold)}>
              {b.text}
            </Text>
          );
        }
        return (
          <View key={i} style={styles.list}>
            {b.items.map((item, j) => (
              <View key={j} style={styles.listRow}>
                <Text style={styles.listMarker}>{b.marker ? b.marker(j) : "•"}</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
}

function FieldRow({ label, value }: { label: string; value?: string }) {
  const hasValue = !!(value && value.trim());
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={sx(styles.value, !hasValue && styles.mutedValue)}>{hasValue ? value : "N/A"}</Text>
    </View>
  );
}

function FieldCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.formCard}>{children}</View>;
}

function AgreementLine({ checked, text }: { checked: boolean; text: string }) {
  return (
    <View style={styles.agreementBox} wrap={false}>
      <Text style={checked ? styles.statusAccepted : styles.statusNotAccepted}>
        {checked ? "Accepted" : "Not Accepted"}
      </Text>
      <Text style={styles.agreementText}>{text}</Text>
    </View>
  );
}

function SingleSignature({
  label,
  name,
  signature,
  date,
}: {
  label: string;
  name?: string;
  signature: string | File | null;
  date?: string;
}) {
  const hasImage = typeof signature === "string" && signature;
  return (
    <View style={{ marginTop: 12, width: "45%" }} wrap={false} minPresenceAhead={90}>
      <Text style={styles.signatureLabel}>{label}</Text>
      {hasImage ? (
        <Image src={signature as string} style={styles.signatureImage} />
      ) : (
        <Text style={{ marginBottom: 6, fontSize: 8, color: "#999" }}>Not signed</Text>
      )}
      <View style={styles.signatureLine} />
      <Text style={styles.signatureName}>Name: {name || "N/A"}</Text>
      <Text style={styles.signatureDate}>Date: {date || "N/A"}</Text>
    </View>
  );
}

function SignaturePair({
  leftLabel,
  leftName,
  leftSignature,
  leftDate,
  rightLabel,
  rightName,
  rightSignature,
  rightDate,
  rightExtra,
}: {
  leftLabel: string;
  leftName?: string;
  leftSignature: string | File | null;
  leftDate?: string;
  rightLabel: string;
  rightName?: string;
  rightSignature: string | File | null;
  rightDate?: string;
  rightExtra?: string;
}) {
  const renderSig = (sig: string | File | null) =>
    typeof sig === "string" && sig ? (
      <Image src={sig} style={styles.signatureImage} />
    ) : (
      <Text style={{ marginBottom: 6, fontSize: 8, color: "#999" }}>Not signed</Text>
    );

  return (
    <View style={styles.signatureBlock} wrap={false} minPresenceAhead={90}>
      <View style={styles.signatureBox}>
        <Text style={styles.signatureLabel}>{leftLabel}</Text>
        {renderSig(leftSignature)}
        <View style={styles.signatureLine} />
        <Text style={styles.signatureName}>Name: {leftName || "N/A"}</Text>
        <Text style={styles.signatureDate}>Date: {leftDate || "N/A"}</Text>
      </View>
      <View style={styles.signatureBox}>
        <Text style={styles.signatureLabel}>{rightLabel}</Text>
        {renderSig(rightSignature)}
        <View style={styles.signatureLine} />
        <Text style={styles.signatureName}>Name: {rightName || "N/A"}</Text>
        {rightExtra ? <Text style={styles.signatureDate}>{rightExtra}</Text> : null}
        <Text style={styles.signatureDate}>Date: {rightDate || "N/A"}</Text>
      </View>
    </View>
  );
}

function PageFooter() {
  return (
    <Text
      fixed
      style={styles.footer}
      render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Content below is transcribed verbatim from the live section components
// (components/onboarding/*.tsx) — the website is the source of truth. Do not
// summarize, merge, reword, or add headings/translations that aren't in the
// corresponding component.
// ---------------------------------------------------------------------------

const DATA_PROTECTION_BLOCKS: Block[] = [
  { kind: "p", text: "Applies To: All Delivery Riders registered with Dinebd in Bangladesh", bold: true },
  { kind: "h", text: "1. Purpose" },
  { kind: "p", text: "This policy outlines how Dinebd collects, uses, stores, protects, and discloses personal data of riders engaged on its platform. We are committed to safeguarding personal information in accordance with the laws of Bangladesh." },
  { kind: "h", text: "2. Scope" },
  { kind: "p", text: "This policy applies to all personal and sensitive information collected from riders, both during registration and throughout their association with Dinebd." },
  { kind: "h", text: "3. What information we collect" },
  { kind: "p", text: "We collect a wide range of information that helps us verify identity, operate our services efficiently, and comply with legal obligations. The data collected includes:" },
  { kind: "p", text: "a. Personal information", bold: true },
  { kind: "ul", items: ["Full legal name (as per NID/passport)", "National Identification Number (NID) or Passport number and a scanned copy", "Driving license number and scanned copy", "Father's and Mother's name", "Date of birth", "Gender", "Blood group (optional, for emergency use)"] },
  { kind: "p", text: "b. Photographic and biometric data", bold: true },
  { kind: "ul", items: ["Profile photo (mandatory for app and ID)", "Selfie verification during onboarding or fraud checks", "(Optional) Fingerprint or face scan if required by regulation or authentication tools"] },
  { kind: "p", text: "c. Contact information", bold: true },
  { kind: "ul", items: ["Mobile number(s)", "Email address", "Current address (present)", "Permanent address", "Emergency contact details (e.g., next of kin)"] },
  { kind: "p", text: "d. Professional and operational data", bold: true },
  { kind: "ul", items: ["Employment history (if collected)", "Rider ID number (internal)", "Registration date", "Work schedule and shift logs", "Order delivery history and performance metrics", "App login times and GPS tracking logs"] },
  { kind: "p", text: "e. Vehicle information", bold: true },
  { kind: "ul", items: ["Vehicle type (bike, bicycle, car, etc.)", "Vehicle registration number", "Vehicle fitness and tax token documents (if applicable)", "Insurance documents"] },
  { kind: "p", text: "f. Financial & banking information", bold: true },
  { kind: "ul", items: ["Bank account details for salary/incentive disbursement", "Mobile Financial Service (MFS) numbers (bKash, Nagad, etc.)", "Payment transaction history"] },
  { kind: "p", text: "g. Technical and app usage information", bold: true },
  { kind: "ul", items: ["IP address", "Device type and model", "Operating system", "App version and crash logs", "Location data (GPS tracking during delivery hours)", "Activity logs and login/logout records"] },
  { kind: "h", text: "4. Why we collect your information" },
  { kind: "p", text: "We collect and process rider data for the following reasons:" },
  { kind: "ul", items: ["Identity verification & background checks", "Compliance with local traffic and labour regulations", "Delivery and order management", "Performance monitoring, rating, and feedback", "Payment processing (salary, incentives, reimbursements)", "Emergency contact & safety response", "Legal dispute resolution, fraud investigation", "Communication of policy updates, training, and support"] },
  { kind: "h", text: "5. How we protect your data" },
  { kind: "p", text: "Dinebd applies robust technical and organizational security practices, including:" },
  { kind: "ul", items: ["Data Encryption: All sensitive data (NID, license, bank info) is encrypted in transit and at rest.", "Restricted Access: Only authorized HR, compliance, and finance team members can access sensitive records.", "Firewall and Intrusion Detection: Data is hosted on secure, firewalled servers with continuous monitoring.", "Regular Audits: Internal audits are conducted to detect unauthorized access or misuse.", "Data Minimization: We only collect the data necessary for specific operational or legal purposes."] },
  { kind: "h", text: "6. Data retention policy" },
  { kind: "ul", items: ["Rider personal data is retained for the duration of the rider's association with Dinebd and up to 3 years after termination (or as legally required).", "Data related to financial transactions may be stored longer per regulatory and audit requirements.", "Riders can request deletion of their data (unless restricted by law) by contacting support."] },
  { kind: "h", text: "7. Your rights" },
  { kind: "p", text: "Under this policy and applicable Bangladeshi law, riders have the right to:" },
  { kind: "ul", items: ["Access the personal data we hold about them", "Correct or update inaccurate or outdated information", "Request the deletion or restriction of their data", "Object to data processing under certain conditions", "Withdraw consent for optional data uses (e.g., marketing)"] },
  { kind: "h", text: "8. Disclosure of data" },
  { kind: "p", text: "We do not sell or rent rider data. However, information may be shared:" },
  { kind: "ul", items: ["With government or law enforcement agencies when legally required", "With financial partners (e.g., banks, MFS providers) for payment processing", "With insurance or emergency services during incidents", "With third-party service providers under strict confidentiality obligations"] },
  { kind: "h", text: "9. Policy updates" },
  { kind: "p", text: "This policy may be updated periodically. Riders will be informed of major changes via:" },
  { kind: "ul", items: ["In-app notifications", "Email or SMS", "Platform announcements"] },
  { kind: "p", text: "The latest version will always be available at: the app and https://dinebd.com/privacy-policy" },
  { kind: "h", text: "10. Contact us" },
  { kind: "p", text: "If you have any questions or requests related to your personal data, please contact:" },
  { kind: "p", text: "Email: support@dinebd.com | riders@dinebd.com" },
  { kind: "p", text: "Phone: +8801339865044" },
  { kind: "p", text: "Office Address: Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A, Dhaka 1213." },
  { kind: "h", text: "11. Acknowledgment" },
  { kind: "p", text: "By registering as a rider and using the Dinebd platform, you acknowledge that you have read and agreed to the terms of this Rider Data Protection Policy." },
];

const CONTRACT_BLOCKS: Block[] = [
  { kind: "h", text: "1. Introduction" },
  { kind: "p", text: "Welcome to Dinebd. By becoming a food delivery rider with Dinebd, you agree to comply with the following Terms and Conditions. These terms are designed to ensure safe, efficient, and professional services for both our customers and partners (vendors/restaurants). By accepting these conditions, you acknowledge that your services will be conducted in line with the company's values and operational guidelines." },

  { kind: "h", text: "2. Eligibility and Registration" },
  { kind: "p", text: "Eligibility:", bold: true },
  { kind: "ul", items: ["You must be at least 18 years old.", "You must possess a valid driver's license for motorcycles, bicycles, or any other applicable vehicle used for delivery.", "You must own a smartphone with reliable internet access to use the Dinebd Rider App."] },
  { kind: "p", text: "Registration:", bold: true },
  { kind: "ul", items: ["You must provide accurate personal information, including: a valid National ID; a recent photograph; proof of vehicle ownership or lease documents.", "Any incorrect or misleading information provided during registration may result in termination or disqualification from using Dinebd services."] },

  { kind: "h", text: "3. Vehicle Requirements" },
  { kind: "p", text: "Vehicle Condition:", bold: true },
  { kind: "ul", items: ["Your vehicle must be well-maintained, roadworthy, and meet all applicable local traffic regulations.", "Regular maintenance of the vehicle is your responsibility. This includes ensuring your vehicle is clean and fit for service at all times."] },
  { kind: "p", text: "Insurance:", bold: true },
  { kind: "ul", items: ["Your vehicle must be insured as required by local laws and regulations.", "Proof of insurance may be requested at any time. You must provide updated insurance documents if any changes occur. Failure to provide valid insurance can result in suspension from Dinebd services."] },

  { kind: "h", text: "4. Rider Responsibilities" },
  { kind: "p", text: "Timeliness:", bold: true },
  { kind: "ul", items: ["You must promptly accept delivery requests through the Dinebd Rider App and complete the delivery within the estimated time frame."] },
  { kind: "p", text: "Professional Conduct:", bold: true },
  { kind: "ul", items: ["You must maintain professional conduct at all times. Respect customers, restaurant staff, and fellow road users. Harassment, inappropriate behavior, or offensive language will not be tolerated.", "Misconduct or any unprofessional actions may result in immediate termination of your contract."] },
  { kind: "p", text: "Safety:", bold: true },
  { kind: "ul", items: ["Always adhere to traffic laws and safety regulations.", "Wear appropriate safety gear (e.g., helmet, protective clothing). Ensure your vehicle is in good working condition before each shift.", "Failure to comply with safety regulations could result in penalties or termination."] },
  { kind: "p", text: "Food Handling:", bold: true },
  { kind: "ul", items: ["It is your responsibility to keep food orders warm and in good condition by using the Dinebd-approved delivery bag.", "The delivery bag must be clean and suitable for maintaining food safety standards, ensuring that the food reaches customers in optimal condition.", "If the food is damaged during transit due to rider negligence, it is the rider's responsibility to immediately notify Dinebd.", "Riders will not be paid for deliveries involving damaged food, and Dinebd reserves the right to hold an investigation into the cause of the damage. Based on the investigation's findings, Dinebd may take further action, including but not limited to withholding payment for the order or applying penalties."] },

  { kind: "h", text: "5. Payment and Earnings" },
  { kind: "p", text: "Earnings Structure:", bold: true },
  { kind: "ul", items: ["Your earnings are determined by factors such as delivery distance, delivery time, and surge pricing during high-demand periods. Details about these factors can be found in your Dinebd Rider App."] },
  { kind: "p", text: "Payment Method:", bold: true },
  { kind: "ul", items: ["Payments for completed deliveries will be processed on a weekly basis, and earnings will be transferred directly to your registered bank account.", "It is your responsibility to ensure that your bank account information is correct to receive timely payments."] },
  { kind: "p", text: "Additional Compensation:", bold: true },
  { kind: "ul", items: ["During peak hours or high-demand periods, Dinebd may implement surge pricing, where you can earn more for deliveries in specific locations. Surge pricing information will be provided through the app."] },

  { kind: "h", text: "6. App Usage" },
  { kind: "p", text: "Account Security:", bold: true },
  { kind: "ul", items: ["You are responsible for maintaining the confidentiality of your login credentials.", "Report any unauthorized use or suspected security breach of your account to Dinebd support immediately."] },
  { kind: "p", text: "App Updates:", bold: true },
  { kind: "ul", items: ["You are required to regularly update the Dinebd Rider App to access the latest features, performance enhancements, and security improvements. Failure to do so may result in service disruptions."] },

  { kind: "h", text: "7. Delivery Procedures" },
  { kind: "p", text: "Order Pickup:", bold: true },
  { kind: "ul", items: ["When picking up orders, verify the accuracy of the order with the vendor (restaurant) before departing. Ensure all items are included and in good condition."] },
  { kind: "p", text: "Communication with Customers:", bold: true },
  { kind: "ul", items: ["Contact customers only as necessary, using the app's built-in messaging or call functions.", "Do not exchange personal contact information with customers. Ensure all communication is limited to delivery-related matters."] },
  { kind: "p", text: "Delivery Process:", bold: true },
  { kind: "ul", items: ["Deliver the food to the customer's specified address in a timely manner.", "Use the approved delivery bag to maintain food quality during transit."] },

  { kind: "h", text: "8. Policy on Food Delivery Cash/Partial Payment and Collection" },
  { kind: "p", text: "Order Payment:", bold: true },
  { kind: "ul", items: ["At the time of pickup, you are responsible for paying the vendor the full order amount, minus the platform and delivery fees.", "Upon delivery, you will collect the same amount from the customer, ensuring the transaction is accurate."] },
  { kind: "p", text: "Unsuccessful Deliveries & Rider Payment", bold: true },
  { kind: "p", text: "In the unlikely event that an order is not successfully delivered after the rider reaches the drop-off destination:" },
  { kind: "ul", items: ["If you are unable to locate the customer, you must return the food to the vendor, who may refund you for the order payment.", "Both the rider and vendor must report any unsuccessful deliveries to Dinebd immediately to resolve the issue.", "The rider may be entitled to receive the full delivery fee.", "The rider may also be entitled to reimbursement of up to 15% or less of the amount paid to the restaurant. In certain cases, the rider may receive no reimbursement, while in other cases they may receive the full amount paid at pickup. All such reimbursements are subject to Dinebd's investigation.", "If the same issue is repeatedly reported by the same rider, Dinebd reserves the right to withhold the delivery fee and treat the matter as subject to further investigation.", "All such cases will be carefully reviewed under Dinebd's investigation process to determine the appropriate resolution."] },

  { kind: "h", text: "9. Dispute Resolution" },
  { kind: "p", text: "Customer Issues:", bold: true },
  { kind: "ul", items: ["In the event of a delivery dispute or complaint, address the issue professionally and follow Dinebd's policies for dispute resolution.", "For unresolved disputes, report the situation to Dinebd support for further assistance."] },
  { kind: "p", text: "Support:", bold: true },
  { kind: "ul", items: ["Riders can contact Dinebd support through the app or via email for help with any app-related or delivery issues."] },

  { kind: "h", text: "10. Termination of Agreement" },
  { kind: "p", text: "Voluntary Termination:", bold: true },
  { kind: "ul", items: ["You may choose to terminate your contract at any time by notifying Dinebd in writing.", "Upon termination, any outstanding payments due to you will be processed within the usual payment cycle."] },
  { kind: "p", text: "Company Termination:", bold: true },
  { kind: "ul", items: ["Dinebd reserves the right to terminate your agreement if you fail to adhere to these Terms and Conditions, violate local traffic laws, or exhibit unprofessional behaviour."] },

  { kind: "h", text: "11. Employment Status" },
  { kind: "ul", items: ["As a rider for Dinebd, you are classified as self-employed. This means you are not an employee of Dinebd and are responsible for managing and paying your taxes on delivery earnings.", "This is a zero-hour contract, and Dinebd has no obligation to provide a specific number of delivery requests."] },

  { kind: "h", text: "12. Changes to Terms" },
  { kind: "ul", items: ["Dinebd reserves the right to modify these Terms and Conditions as needed. You will be notified of any significant changes to the terms.", "Continued use of the Dinebd platform following such changes constitutes acceptance of the revised terms."] },

  { kind: "h", text: "13. Dinebd rider community guidelines" },
  { kind: "p", text: "At Dinebd, our goal is to maintain a safe, respectful, and reliable platform for everyone: customers, restaurants, and riders. These Community Guidelines outline the behaviours and standards we expect all riders to uphold while using the Dinebd platform." },
  { kind: "p", text: "Respect everyone", bold: true },
  { kind: "ul", items: ["Be courteous: Treat customers, restaurant staff, and fellow riders with professionalism and kindness.", "Zero tolerance for discrimination: Any discriminatory behaviour based on religion, gender, race, caste, nationality, or disability is strictly prohibited.", "No harassment or violence: Any threatening, abusive, or violent behaviour will result in immediate account deactivation."] },
  { kind: "p", text: "Be reliable and professional", bold: true },
  { kind: "ul", items: ["Timely deliveries: Always aim to pick up and deliver orders promptly, following the instructions in the app.", "Dress appropriately: Wear clean and presentable clothing. Dinebd-branded gear is preferred when available.", "Stay sober: Riders must never operate under the influence of alcohol, drugs, or any substance that could impair judgment or performance."] },
  { kind: "p", text: "Communicate clearly and respectfully", bold: true },
  { kind: "ul", items: ["Be polite and professional: Use respectful language when interacting with customers or restaurant partners.", "Limit contact: Only contact customers when necessary to complete a delivery."] },
  { kind: "p", text: "Prioritize safety", bold: true },
  { kind: "ul", items: ["Follow traffic laws: Always ride safely, wear a helmet, and follow road rules.", "Protect the food: Ensure food is not tampered with and is delivered in the same condition it was received.", "Report issues: Use the app to report accidents, unsafe conditions, unsuccessful delivery or inappropriate behaviour."] },
  { kind: "p", text: "Use the platform honestly", bold: true },
  { kind: "ul", items: ["No cheating or manipulation: GPS spoofing, false order completions, or handing off orders to unauthorized individuals are strictly forbidden.", "Accept only what you'll complete: Only carry out deliveries you've accepted yourself."] },
  { kind: "p", text: "Maintain account integrity", bold: true },
  { kind: "ul", items: ["Use your own account: Only the registered rider should be using the Dinebd account and the listed vehicle.", "Keep documents up to date: Always upload valid identification, license, and vehicle registration documents."] },
  { kind: "p", text: "Fraud and Misuse", bold: true },
  { kind: "p", text: "Dinebd maintains a zero-tolerance policy toward fraud and dishonest behaviour. Violations may lead to account suspension or permanent deactivation. Examples of fraud include (but are not limited to):" },
  { kind: "ul", items: ["Using false identities or documents", "Faking order completions or GPS locations", "Requesting refunds or fees dishonestly", "Creating fake or duplicate accounts", "Keeping food without delivery", "Misusing promotions or referrals", "Sharing your account with others", "Submitting false claims (e.g. for damages or cleaning)"] },
  { kind: "p", text: "Breaches of terms and guidelines", bold: true },
  { kind: "p", text: "A rider may face serious consequences for any behaviour that, in Dinebd's view, harms users, damages trust or compromises the platform. This includes:" },
  { kind: "ul", items: ["Theft or fraud", "Physical or verbal abuse", "Harassment, bullying, or sexual misconduct", "Discrimination or hate speech", "Reckless or dangerous driving", "Intoxication while delivering", "Sharing private user or merchant data", "Legal or regulatory violations"] },
  { kind: "p", text: "How we enforce these guidelines", bold: true },
  { kind: "p", text: "Violating the Rider Terms or these Community Guidelines may result in:" },
  { kind: "ul", items: ["Warnings", "Temporary suspensions", "Permanent deactivation"] },
  { kind: "p", text: "This applies to all Dinebd accounts you hold, regardless of role (e.g. rider, customer). You can contact Dinebd Support if you believe a decision was made in error and would like a review." },
  { kind: "p", text: "Investigations and reporting", bold: true },
  { kind: "p", text: "We take reports seriously, whether they come from customers, restaurants, other riders, or external sources. Our team may:" },
  { kind: "ul", items: ["Contact you for clarification", "Temporarily suspend your account during an investigation", "Restrict access based on reports from regulators or law enforcement"] },
  { kind: "p", text: "Repeat violations or refusal to cooperate with an investigation may lead to permanent deactivation without further notice." },
  { kind: "p", text: "Immediate deactivation", bold: true },
  { kind: "p", text: "Some actions result in immediate removal from the platform, including:" },
  { kind: "ul", items: ["Acts of violence or threats", "Harassment or sexual misconduct", "Discrimination or hate speech", "Fraud, theft, or illegal activity", "Serious safety violations or reckless behaviour"] },
  { kind: "p", text: "We may also cooperate with law enforcement when required." },
  { kind: "p", text: "Screening and compliance", bold: true },
  { kind: "p", text: "To ensure the safety of our community, Dinebd may conduct background and compliance checks where legally permitted. This includes driving records or criminal history. Violations may result in denial or removal of access to the platform." },
  { kind: "p", text: "A shared responsibility", bold: true },
  { kind: "p", text: "We appreciate the hard work and dedication of every Dinebd rider. By following these guidelines, you help us maintain a platform that is safe, efficient, and trusted by all. Let's work together to make every delivery a positive experience for you, for our customers, and for our partners." },

  { kind: "h", text: "14. Dinebd Rider Payment Policy" },
  { kind: "p", text: "Important Rules", bold: true },
  { kind: "p", text: "Delivery Distance Calculation:", bold: true },
  { kind: "ul", items: ["The delivery distance is calculated from the vendor's location to the customer's address, not from where the rider accepted the delivery.", "Travel to the vendor's location is unpaid. Payment begins once the rider picks up the food from the vendor.", "Upon arrival at the vendor's location, the rider is responsible for making the payment for the food order directly to the vendor. Subsequently, the rider will collect the equivalent amount from the customer upon delivery of the food.", "Riders will receive their accumulated delivery payment on a weekly basis from Dinebd. The specific payment date is outlined in the rider's contract."] },
  { kind: "p", text: "Payment Structure", bold: true },
  { kind: "p", text: "The following example shows how payments may typically be calculated. Please note that this formula is provided for reference purposes only. It should not be treated as the actual formula used in real situations. Its sole purpose is to give riders an illustrative example of how payments could work." },
  { kind: "p", text: "For example:" },
  { kind: "ul", items: ["Base Payment: Riders may receive a minimum payment of 38 Taka for deliveries within 3 km.", "Additional Payment: For distances exceeding 3 km, riders will receive an additional 7.50 Taka per km for the distance beyond 3 km."] },
  { kind: "p", text: "Example 1: Delivery Distance = 5 km", bold: true },
  { kind: "ul", items: ["Base payment: 38 Taka for the first 3 km.", "Additional payment: 7.50 BDT Taka per km for the next 2 km, so 2 km × 7.50 Taka = 15 Taka."] },
  { kind: "p", text: "Total payment: 38 Taka (base) + 15 Taka (additional) = 53 Taka." },
  { kind: "p", text: "Long Distance Payment: For deliveries over 10 km, riders will receive 8.50 Taka per km for every km beyond 10 km." },
  { kind: "p", text: "Example 2: Delivery Distance = 12 km", bold: true },
  { kind: "ul", items: ["Base payment: 38 Taka for the first 3 km.", "Additional payment: 7.50 Taka per km for the next 7 km (from 3 km to 10 km), so 7 km × 7.50 Taka = 52.50 Taka.", "Long-distance payment: 8.50 Taka per km for the remaining 2 km (from 10 km to 12 km), so 2 km × 8.50 Taka = 17 Taka.", "Total payment: 38 Taka (base) + 52.50 Taka (additional) + 17 Taka (long distance) = 107.50 Taka."] },
  { kind: "p", text: "Corrected Payment Structure Summary:", bold: true },
  { kind: "ul", items: ["For a 5 km delivery, the total payment would be 53 Taka.", "For a 12 km delivery, the total payment would be 107.50 Taka."] },
  { kind: "p", text: "Surge Pricing", bold: true },
  { kind: "p", text: "1. Surge Pricing Conditions:", bold: true },
  { kind: "ul", items: ["Dinebd can implement surge pricing based on location and time to meet customer demand during busy periods.", "Surge pricing can increase delivery fares by 1% to 5% or more."] },
  { kind: "p", text: "2. Surge Management:", bold: true },
  { kind: "ul", items: ["Upon demand, Dinebd system will select surge locations and the duration of the surge period.", "Surge pricing will be managed automatically or manually by Dinebd, with the ability to start and stop the surge as needed."] },
  { kind: "p", text: "Unsuccessful Deliveries:", bold: true },
  { kind: "p", text: "1. Customer Not Found:", bold: true },
  { kind: "ul", items: ["If the rider is unable to locate the customer, the rider must return the food to the vendor."] },
  { kind: "p", text: "2. Vendor Refund:", bold: true },
  { kind: "ul", items: ["The vendor is required to refund the rider for the unsuccessful delivery once the food is returned."] },
  { kind: "p", text: "3. Reporting:", bold: true },
  { kind: "ul", items: ["The rider must report any unsuccessful delivery or transaction to Dinebd immediately.", "Dinebd will investigate reported incidents and take necessary measures to prevent future issues."] },
  { kind: "p", text: "4. Compensate Payment:", bold: true },
  { kind: "ul", items: ["After investigating the incident, if Dinebd determines that the customer was genuinely not available, Dinebd may compensate the rider for their time as a delivery fee."] },
  { kind: "p", text: "This process ensures that both riders and vendors have clear instructions and support in handling unexpected circumstances, ensuring smooth operations and customer satisfaction." },
  { kind: "p", text: "Compliance:", bold: true },
  { kind: "ul", items: ["All riders are required to adhere to this policy without exception.", "Non-compliance may result in disciplinary action, up to and including termination of employment."] },
  { kind: "p", text: "Review and future updates:", bold: true },
  { kind: "ul", items: ["This policy will be reviewed periodically and updated as necessary.", "This policy ensures fair compensation for Dinebd riders, considering both the base distance and any additional travel required. The implementation of surge pricing helps meet customer demand while providing riders with increased earnings during peak times. By adhering to this policy, we aim to maintain a seamless and trustworthy process for food payment and delivery."] },

  { kind: "h", text: "16. Governing law" },
  { kind: "ul", items: ["These Terms and Conditions are governed by the laws of Bangladesh.", "Any legal disputes arising from these terms will be subject to the jurisdiction of the courts in Bangladesh."] },

  { kind: "h", text: "17. Contact information" },
  { kind: "p", text: "For any questions, concerns, or support, please contact Dinebd at the following:" },
  { kind: "p", text: "Email: support@dinebd.com | riders@dinebd.com" },
  { kind: "p", text: "Phone: +8801339865044 or +8801333158931" },
  { kind: "p", text: "Office Address: Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A, Dhaka 1213, Bangladesh." },
];

const INSURANCE_BLOCKS_PART1: Block[] = [
  { kind: "p", text: "Annexure 1", bold: true },
  { kind: "p", text: "Applicable for Subscription of Rider Accident Care (The Service)", bold: true },
  { kind: "h", text: "DESCRIPTION OF THE SERVICE", underline: true },
  { kind: "p", text: "This digital service (the \"Service\") facilitates the registration/enrolment of eligible Dinebd Delivery Agents (End Users) under a group life insurance policy managed with a listed life insurance company in Bangladesh. The Service also provides an online platform to the registered/enrolled delivery agents of Dinebd (the End Users become Insured Members) to submit insurance claims digitally. Upon the occurrence of an event covered under the group life insurance policy in relation to an Insured Member shall entitle the insurance coverage benefits to the Insured Member or the legal nominee (in applicable cases)." },
  { kind: "p", text: "The group life insurance policy provides insurance coverage against Accidental Death, and Accidental Hospitalization (including day-care treatment) to the Insured Members who have been registered/enrolled under the group life insurance policy through this Service with certain provisions, limitations, and exclusions as mentioned under the Insurance Policy Details section below." },
  { kind: "h", text: "INSURANCE COVERAGE PROVIDER", underline: true },
  { kind: "p", text: "The insurance risk is underwritten by a listed life insurance company (Insurance Partner) under a group life insurance policy. Insurance coverage and related benefits are provided by the Insurance Partner and any insurance claim payments relating to the coverage is subject to verification and assessment by the Insurance Partner." },
  { kind: "h", text: "SUBSCRIPTION FEE", underline: true },
  { kind: "p", text: "BDT. 349 (taka three hundred and forty-nine only) per Insured Member Per Year." },
  { kind: "h", text: "PAYMENT OF SUBSCRIPTION FEE", underline: true },
  { kind: "p", text: "Subscription fees must be paid in advance on a monthly/yearly basis in order to ensure proper insurance enrolment and claim settlement." },
  { kind: "h", text: "CLAIM SUBMISSION PROCESS", underline: true },
  { kind: "p", text: "Insurance claims can be submitted using the dedicated online claim platform as provided by Bimafy by providing necessary information and by attaching/uploading relevant claim documents (scanned images/clear photographs of the medical and other relevant documents). List of required documents for particular insurance coverages are provided on the Insurance Policy Details section. Customers who availed an insurance coverage through this service may log-in to the Platform (Bimafy Website/Mobile App) using the registered email/phone number to submit a claim." },
  { kind: "p", text: "The following conditions must be met in order to submit an insurance claim:" },
  { kind: "ul", items: ["Insurance claims must be submitted with all required documents within 30 (Thirty) days of the covered event using the claims platform on the Bimafy Website/Mobile App."] },
  { kind: "h", text: "INSURANCE POLICY DETAILS", underline: true },
  { kind: "p", text: "1. Definitions", bold: true },
  { kind: "p", text: "\"Insured Person\" means the person who has been registered or enrolled under this Service of digital insurance subscription." },
  { kind: "p", text: "\"Accident\" means a sudden, unexpected, violent and external specific event which happens during the time of cover, at an identifiable time and place and which causes Bodily Injury." },
  { kind: "p", text: "\"Accidental Death\" means death of an Insured Person due to an Accident within thirty days from the date of Accident." },
  { kind: "p", text: "\"Bodily Injury\" means an identifiable physical injury to an Insured Person's body, caused directly and solely by an Accident and independently of illness, or disease which is verified and certified by a certified medical practitioner. \"Accidental Hospitalization (including day-care treatment)\" means hospital admission or treatment taken by the Insured Person due to an Accidental Injury. \"Covered Event\" means Accidental Hospitalization (including day-care treatment), and Accidental Death of the Insured Person." },
  { kind: "p", text: "\"Insurance Company\" means third party insurance companies with applicable registrations and licenses from the relevant authority who are independent contractors and not Bimafy Ltd." },
  { kind: "p", text: "2. Eligibility and Terms", bold: true },
  { kind: "p", text: "An Accidental Death, and Accidental Hospitalization (including day-care treatment) coverage shall be applicable for the Insured Persons who have been registered or enrolled under the group life insurance policy through this digital insurance subscription (the Service). Only the Insured Persons shall be under the insurance coverage with certain provisions, and limitations as per the following:" },
  { kind: "ul", items: ["Insured Person must be above 18 years of age at the time of registration.", "Insurance coverage shall be applicable within the territory of Bangladesh only.", "All insurance coverage is valid for 365 days from the date of registration."], marker: romanMarker },
  { kind: "p", text: "3. Insurance Benefit Schedule", bold: true },
  { kind: "p", text: "The Insured Person or the legal nominee (in applicable cases) of the Insured Person or the legal nominee shall be able to claim the insurance benefits in case of a Covered Event as per the following table:" },
];

const BENEFIT_SCHEDULE = [
  { coverage: "Accidental Death (occurring within the policy validity)", amount: "BDT. 200,000" },
  { coverage: "Accidental Hospitalization (including day-care treatment) Sub-limits apply as per section 5", amount: "Up to BDT. 50,000" },
];

const INSURANCE_BLOCKS_PART2: Block[] = [
  { kind: "p", text: "4. Waiting Period", bold: true },
  { kind: "p", text: "1 day (24 hours) waiting period from the date of insurance subscription is applicable for coverage commencement. Any accident occurring within this 1 day (24 hours) waiting period is not covered under this policy." },
  { kind: "p", text: "5. Exclusions", bold: true },
  { kind: "p", text: "The following exclusions shall be applicable for the insurance coverage:" },
  { kind: "p", text: "General Exclusions:", bold: true },
  { kind: "ul", items: ["Any pre-existing conditions.", "Any mental, emotional, and psychiatric disorders.", "Any condition/accident due to consuming addictive substances", "Any accident due to performing any illegal activity (i.e., driving without a valid license, participating in competition/races/stunts, etc.)"], marker: romanMarker },
  { kind: "p", text: "Specific Exclusions for Accidental Death:", bold: true },
  { kind: "ul", items: ["Death caused by self-inflicted injury or the commission of or attempted commission of an assault or any unlawful act, or being engaged in any illegal activity or felony;", "Suicide while sane or insane;"], marker: romanMarker },
  { kind: "p", text: "Specific Exclusions for Accidental Hospitalization (including Day-Care Treatment):", bold: true },
  { kind: "ul", items: ["Accidents due to any unlawful activities or due to use of addictive substances by the Insured Person."], marker: romanMarker },
  { kind: "p", text: "6. Sub-Limits for Accidental Hospitalization (Including Day-Care Treatment)", bold: true },
  { kind: "p", text: "Accidental Hospitalization (including day-care treatment) can be further classified under the following different categories with corresponding benefits:" },
];

const SUB_LIMITS = [
  { type: "Head Injury", description: "Severe collision impacts can cause a closed head injury. In that situation, the fluid and tissue inside the skull are damaged because of the sudden movement or impact of the head. Less severe closed head injuries often result in concussions, while the most severe impacts can cause brain damage. Major types of head injuries include Hematoma, Hemorrhage, Concussion, Edema, Skull fracture, Diffuse axonal injury etc.", amount: "BDT. 50,000" },
  { type: "3rd Degree Burn", description: "Third-degree burns destroy the epidermis and dermis. They may go into the innermost layer of skin, the subcutaneous tissue. The burn site may look white or blackened and charred.", amount: "BDT. 37,500" },
  { type: "Chest Injury, Internal Organ Injury", description: "These injuries can be more severe such as broken ribs or internal injuries such as internal bleedings. Blunt trauma occurs when a part of the body collides with something else, particularly at high speed or with great force. When this happens, blood vessels inside the body can be crushed or torn. Penetrating trauma occurs when an object penetrates the body and tears holes in blood vessels, muscle and internal organs. This can happen when someone falls onto a sharp object, as in workplace accidents, or when objects collide with and penetrate the body in motor vehicle accidents.", amount: "BDT. 25,000" },
  { type: "Fracture, Dislocation, Dismemberment, Amputation, 2nd Degree Burn", description: "A fracture is a break, usually in a bone. If the broken bone punctures the skin, it is called an open or compound fracture. A dislocation is an injury to a joint — a place where two or more bones come together — in which the ends of the bones are forced from their normal positions. Dismemberment or amputation is a cut off or disjoin of a limb or a part of a limb. Second-degree burns involve the epidermis and part of the lower layer of skin, the dermis. The burn site looks red, blistered, and may be swollen and painful.", amount: "BDT. 15,000" },
  { type: "Cut injury, Multiple Abrasions, Soft Tissue Injury, 1st Degree Burn", description: "Cuts and scratches are areas of damage on the surface of the skin. A cut is a line of damage that can go through the skin and into the muscle tissues below, whereas a scrape is surface damage that does not penetrate the lower tissues. A soft tissue injury is damage to the body's connective tissue, which means muscles, ligaments and tendons. An abrasion or \"excoriation\" is a wearing away of the upper layer of skin as a result of applied friction force. First-degree burns affect only the outer layer of skin, the epidermis.", amount: "BDT. 5,000" },
];

const INSURANCE_BLOCKS_PART3: Block[] = [
  { kind: "p", text: "7. Claim Documentation", bold: true },
  { kind: "p", text: "The claimant must provide the below mentioned documents in digital formats in order to submit a claim:" },
  { kind: "p", text: "i. For Accidental Death", bold: true },
  { kind: "ul", items: ["Copy of NID/Passport/Birth Certificate of the Insured Person", "Driving license of the Insured Person (in applicable cases)", "Death Certificate from the last attending physician/clinic/hospital mentioning the actual cause of death", "First Incident Report (FIR) from the local law enforcement authority", "Post-mortem report", "Copy of NID/Passport/Birth Certificate of the legal Nominee", "Proof of relationship of Nominee with the Insured Person", "Any other supporting documents (if required)"], marker: alphaMarker },
  { kind: "p", text: "ii. For Accidental Hospitalization (including day-care treatment)", bold: true },
  { kind: "ul", items: ["Copy of NID/Passport/Birth Certificate", "Copy of Driving License (in applicable cases)", "Doctor's prescription/emergency ticket", "Doctor's Advice for hospitalization (in applicable cases)", "Discharge Certificate (in applicable cases)", "All medical bills", "All diagnostic test reports such as X-Ray, City Scan, MRI or such relevant reports", "Any other supporting documents (if required)"], marker: alphaMarker },
  { kind: "p", text: "Claim Decision, and Settlement", bold: true },
  { kind: "p", text: "All claims are subject to verification by the Insurance Company and Insurance Company reserves the right to reject any claim if it is deemed invalid/inappropriate or not applicable under insurance coverage." },
  { kind: "p", text: "Successful claims for insurance coverage shall be settled in favor of the appropriate beneficiary via bank account/mobile wallet within the following timeline after receiving all necessary documents from the Insured Person or legal nominee of the Insured Person (in applicable cases)." },
  { kind: "ul", items: ["Accidental Hospitalization (including day-care treatment) Claims: 10 working days", "Accidental Death Claims: 28 working days"] },
];

function BenefitTable() {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Type of Coverage</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sum Assured/Coverage Amount</Text>
      </View>
      {BENEFIT_SCHEDULE.map((row, i) => (
        <View key={row.coverage} style={sx(styles.tableDataRow, i % 2 === 1 && styles.tableDataRowAlt)} wrap={false}>
          <Text style={[styles.tableDataCell, { flex: 2 }]}>{row.coverage}</Text>
          <Text style={[styles.tableDataCell, { flex: 1, fontFamily: "Helvetica-Bold" }]}>{row.amount}</Text>
        </View>
      ))}
    </View>
  );
}

function SubLimitsTable() {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Types of Accidental Injury</Text>
        <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Description of Accidental Injury due to Accident</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sum Assured/Coverage Amount (BDT.)</Text>
      </View>
      {SUB_LIMITS.map((row, i) => (
        <View key={row.type} style={sx(styles.tableDataRow, i % 2 === 1 && styles.tableDataRowAlt)} wrap={false}>
          <Text style={[styles.tableDataCell, { flex: 1, fontFamily: "Helvetica-Bold" }]}>{row.type}</Text>
          <Text style={[styles.tableDataCell, { flex: 3 }]}>{row.description}</Text>
          <Text style={[styles.tableDataCell, { flex: 1, fontFamily: "Helvetica-Bold" }]}>{row.amount}</Text>
        </View>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------

interface RiderContractPDFProps {
  data: {
    registration: RegistrationData;
    contract: ContractData;
    dataProtection: DataProtectionData;
    equipment: EquipmentData;
    insurance: InsuranceData;
    payment: PaymentData;
  };
}

const formatTime = (value: string) => {
  if (!value) return "";
  const [hourStr, minuteStr] = value.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour) || !minuteStr) return value;
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(hour12).padStart(2, "0")}:${minuteStr} ${period}`;
};

const RiderContractPDF: React.FC<RiderContractPDFProps> = ({ data }) => {
  const { registration: r, contract: c, dataProtection: dp, equipment: eq, insurance: ins, payment: pay } = data;
  const dob = [r.dobDay, r.dobMonth, r.dobYear].filter(Boolean).join("/");

  return (
    <Document>
      {/* Page group 1: Registration */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.docHeader}>DINEBD RIDER ONBOARDING &amp; CONTRACT</Text>
        <View style={styles.docHeaderRule} />
        <Text style={styles.header}>1. Rider Registration Form</Text>
        <Text style={styles.subheader}>
          Please complete this form carefully. All information will remain confidential and used only for official purposes.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section A: Personal Information</Text>
          <FieldCard>
            <FieldRow label="Rider Full Name" value={r.fullName} />
            <FieldRow label="Gender" value={r.gender} />
            <FieldRow label="Date of Birth" value={dob} />
            <FieldRow label="Age" value={r.age} />
            <FieldRow label="NID Number" value={r.nidNumber} />
            <FieldRow label="Passport Number (if available)" value={r.passportNumber} />
            <FieldRow label="Birth Certificate Number" value={r.birthCertificateNumber} />
            <FieldRow label="Blood Group" value={r.bloodGroup} />
            <FieldRow label="Rider Picture Submitted" value={r.riderPictureSubmitted} />
            <FieldRow label="Daily Working Time — Start" value={formatTime(r.workStartTime)} />
            <FieldRow label="Daily Working Time — Finish" value={formatTime(r.workFinishTime)} />
          </FieldCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section B: Contact Details</Text>
          <FieldCard>
            <FieldRow label="Home Address" value={r.homeAddress} />
            <FieldRow label="Mobile Number (+880)" value={r.mobileNumber} />
            <FieldRow label="Email Address" value={r.emailAddress} />
            <FieldRow label="Do you have a smartphone?" value={r.hasSmartphone} />
            <FieldRow label="What phone do you use?" value={r.phoneModel} />
            <FieldRow label="Which area are you interested in working in?" value={r.workAreaInterest} />
          </FieldCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section C: Emergency Contact</Text>
          <FieldCard>
            <FieldRow label="Emergency Contact Name" value={r.emergencyContactName} />
            <FieldRow label="Relation to Rider" value={r.emergencyContactRelation} />
            <FieldRow label="Emergency Contact Number (+880)" value={r.emergencyContactNumber} />
          </FieldCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section D: Vehicle Information</Text>
          <FieldCard>
            <FieldRow label="Vehicle Type" value={r.vehicleType} />
            <FieldRow label="Vehicle Model" value={r.vehicleModel} />
            <FieldRow label="Vehicle Color" value={r.vehicleColor} />
            <FieldRow label="Vehicle Registration Number (if applicable)" value={r.vehicleRegistrationNumber} />
            <FieldRow label="License Number" value={r.licenseNumber} />
            <FieldRow label="Vehicle Picture Submitted" value={r.vehiclePictureSubmitted} />
            <FieldRow label="License Picture Submitted" value={r.licensePictureSubmitted} />
            <FieldRow label="Vehicle Insurance Submitted" value={r.vehicleInsuranceSubmitted} />
          </FieldCard>
        </View>

        <View style={styles.section} break>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section E: Banking / Payment Details (bKash Only)</Text>
          <AgreementLine checked={r.paymentMethodBkash} text="Choose your Payment Method: bKash" />
          <FieldCard>
            <FieldRow label="Confirm your bKash Account Type" value={r.bkashAccountType} />
            <FieldRow label="bKash Number" value={r.bkashNumber} />
            <FieldRow label="bKash Account Relation (Owner / Family Member / Others)" value={r.bkashAccountRelation} />
          </FieldCard>
          <AgreementLine
            checked={r.bkashConfirmed}
            text="I confirm that the bKash account details provided are accurate and authorized for receiving payments, and I agree to Dinebd's terms and conditions."
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section F: Supporting Documents (Submission Status)</Text>
          <FieldCard>
            <FieldRow label="NID / Passport / Birth Certificate Picture Submitted" value={r.nidPictureSubmitted} />
            <FieldRow label="Recent Passport-size Photo Submitted" value={r.photoSubmitted} />
          </FieldCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section G: Additional Information</Text>
          <FieldCard>
            <FieldRow label="How do you know about Dinebd?" value={r.howKnowDinebd} />
            <FieldRow label="Are you working with any other food delivery company?" value={r.workingWithOtherCompany} />
            <FieldRow label="If Yes, please specify the company name" value={r.otherCompanyName} />
            <FieldRow label="Do you have any disabilities?" value={r.hasDisability} />
            <FieldRow label="Any other information about yourself" value={r.otherInfoAboutSelf} />
            <FieldRow label="Any other comments?" value={r.otherComments} />
          </FieldCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Section H: Declaration</Text>
          <Text style={styles.paragraph}>
            I hereby declare that the information provided above is true and accurate. I agree to abide by
            Dinebd's Code of Conduct, Community Guidelines, and Terms of Employment, and authorize Dinebd to
            use the payment details provided for processing payments.
          </Text>
          <AgreementLine
            checked={r.declarationAgreed}
            text="I declare that the information provided above is true and accurate, and I agree to Dinebd's Code of Conduct, Community Guidelines, and Terms of Employment."
          />
          <FieldCard>
            <FieldRow label="Name" value={r.name} />
          </FieldCard>
          <SingleSignature label="Rider Signature" name={r.name} signature={r.signature} date={r.date} />

          <Text style={sx(styles.subsectionTitle, { marginTop: 12 })}>For Office Use Only</Text>
          <FieldCard>
            <FieldRow label="Verified by Dinebd (representative name)" value={r.officeVerifiedBy} />
            <FieldRow label="Remarks (if any)" value={r.officeRemarks} />
          </FieldCard>
          <SingleSignature
            label="Dinebd representative signature"
            name={r.officeVerifiedBy}
            signature={r.officeSignature}
            date={r.officeDate}
          />
        </View>
      </Page>

      {/* Page group 2: Contract & Terms */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.header}>2. Rider Contract &amp; Terms and Conditions</Text>
        <View style={styles.section}>
          <Blocks blocks={CONTRACT_BLOCKS} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Acknowledgment and Signature</Text>
          <Text style={styles.paragraph}>
            By agreeing to these terms, you acknowledge that you have read, understood, and accepted them.
            Thank you for being a part of Dinebd.
          </Text>
          <Text style={styles.paragraph}>
            I, the undersigned, confirm that I have read, understood, and agreed to abide by the Dinebd Rider
            Terms and Conditions, including all related policies and guidelines. I acknowledge that failure to
            comply may result in suspension or termination of my access to the Dinebd platform.
          </Text>
          <Text style={sx(styles.subsectionTitle)}>Rider Information</Text>
          <FieldCard>
            <FieldRow label="Full Name" value={c.fullName} />
            <FieldRow label="National ID Number" value={c.nidNumber} />
          </FieldCard>
          <AgreementLine
            checked={c.agreed}
            text="I have read, understood, and agreed to abide by the Dinebd Rider Terms and Conditions, including all related policies and guidelines."
          />
          <SignaturePair
            leftLabel="Rider Signature"
            leftName={c.fullName}
            leftSignature={c.signature}
            leftDate={c.date}
            rightLabel="For Dinebd Use Only"
            rightName={c.officeVerifiedBy}
            rightSignature={c.officeSignature}
            rightDate={c.officeDate}
            rightExtra={c.officePosition ? `Position: ${c.officePosition}` : undefined}
          />
        </View>
      </Page>

      {/* Page group 3: Data Protection Policy */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.header}>3. Rider Data Protection Policy</Text>
        <View style={styles.section}>
          <Blocks blocks={DATA_PROTECTION_BLOCKS} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Agreement &amp; Signature</Text>
          <Text style={styles.paragraph}>
            I, the undersigned, confirm that I have read, understood, and agreed to abide by the Dinebd Rider
            Data Protection Policy. I acknowledge how my personal data will be collected, used, stored, and
            protected as outlined in this policy.
          </Text>
          <Text style={styles.paragraph}>
            I understand my rights under this policy and applicable Bangladeshi law, including the right to
            access, update, or request deletion of my personal data.
          </Text>
          <Text style={sx(styles.subsectionTitle)}>Rider information</Text>
          <FieldCard>
            <FieldRow label="Full Name" value={dp.fullName} />
            <FieldRow label="National ID Number" value={dp.nidNumber} />
            <FieldRow label="Mobile Number" value={dp.mobileNumber} />
          </FieldCard>
          <AgreementLine
            checked={dp.agreed}
            text="I have read, understood, and agreed to abide by the Dinebd Rider Data Protection Policy."
          />
          <SignaturePair
            leftLabel="Rider Signature"
            leftName={dp.fullName}
            leftSignature={dp.signature}
            leftDate={dp.date}
            rightLabel="For Dinebd use only"
            rightName={dp.officeVerifiedBy}
            rightSignature={dp.officeSignature}
            rightDate={dp.officeDate}
            rightExtra={dp.officePosition ? `Position: ${dp.officePosition}` : undefined}
          />
        </View>
      </Page>

      {/* Page group 4: Equipment Policy (Bangla) */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.header}>4. Equipment Policy</Text>
        <View style={styles.section}>
          {eq.bnImageDataUrl ? (
            <Image
              src={eq.bnImageDataUrl}
              style={{
                width: "100%",
                height: 515 / (eq.bnImageAspect || 1),
              }}
            />
          ) : (
            <Text style={{ fontSize: 8, color: "#999", fontStyle: "italic" }}>
              Bangla policy text unavailable — please regenerate this contract.
            </Text>
          )}
        </View>
        <View style={styles.section}>
          <SingleSignature
            label="Rider Signature"
            name={eq.riderName}
            signature={eq.signature}
            date={eq.signatureDate}
          />
        </View>
      </Page>

      {/* Page group 5: Insurance */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.header}>5. Rider Insurance Registration Form</Text>
        <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 6 }}>
          Dinebd × bimafy
        </Text>
        <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 4, color: "#111" }}>
          Rider Insurance Policy – Employee Registration Form
        </Text>
        <Text style={styles.subheader}>
          This insurance is provided for Dinebd Riders through Bimafy, in collaboration with Dinebd. Coverage
          and benefits are subject to the terms of the group life insurance policy.
        </Text>
        <View style={styles.section}>
          <FieldCard>
            <FieldRow label="Dinebd rider ID" value={ins.riderId} />
            <FieldRow label="Full Name (As per NID)" value={ins.fullName} />
            <FieldRow label="Date of Birth (YYYY-MM-DD)" value={ins.dob} />
            <FieldRow label="Active Mobile Phone Number" value={ins.mobileNumber} />
            <FieldRow label="NID/Birth Certificate Number" value={ins.nidOrBirthCert} />
            <FieldRow label="Address" value={ins.address} />
            <FieldRow label="Other Notes" value={ins.otherNotes} />
          </FieldCard>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Important Notes:</Text>
          <Blocks
            blocks={[
              {
                kind: "ul",
                marker: numMarker,
                items: [
                  "All information is mandatory except for the NID/Birth Certificate number.",
                  "Please provide the Full Name and Date of Birth exactly as per the NID.",
                  "Date of Birth should be in the format: YYYY-MM-DD.",
                  "If a person does not have an NID, provide details as per the Birth Certificate.",
                  "Persons aged below 18 or above 59 are not eligible for insurance coverage.",
                ],
              },
            ]}
          />
        </View>
        <View style={styles.section}>
          <Blocks blocks={INSURANCE_BLOCKS_PART1} />
          <BenefitTable />
          <Blocks blocks={INSURANCE_BLOCKS_PART2} />
          <SubLimitsTable />
          <Blocks blocks={INSURANCE_BLOCKS_PART3} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={36}>Employee Declaration:</Text>
          <Text style={styles.paragraph}>
            I hereby declare that the information provided above is accurate and complete to the best of my
            knowledge. I understand that providing false information may lead to rejection of my insurance
            coverage. I also agree to the full terms and conditions of the insurance policy.
          </Text>
          <AgreementLine
            checked={ins.declarationAgreed}
            text="I confirm the above declaration is accurate and I agree to the full terms and conditions of the insurance policy."
          />
          <FieldCard>
            <FieldRow label="Full Name (as per NID)" value={ins.signatureFullName} />
          </FieldCard>
          <SingleSignature label="Rider Signature" name={ins.signatureFullName} signature={ins.signature} date={ins.date} />
        </View>
      </Page>

      {/* Page group 6: Payment Form */}
      <Page size="A4" style={styles.page} wrap>
        <PageFooter />
        <Text style={styles.header}>6. Rider Payment Form</Text>
        <Text style={styles.subheader}>
          Please provide accurate payment details. Dinebd is not responsible for errors or payments to
          incorrect/unauthorized accounts. Payments cannot be reversed once processed. Please ensure the
          provided Bkash number below is verified and authorized to receive funds.
        </Text>
        <View style={styles.section}>
          <FieldCard>
            <FieldRow label="Rider Name" value={pay.riderName} />
            <FieldRow label="Name of Bkash Account Holder" value={pay.accountHolderName} />
            <FieldRow label="Bkash Number" value={pay.bkashNumber} />
            <FieldRow label="Bkash Account Type" value={pay.accountType} />
            <FieldRow label="Bkash Account Relation (Owner/Family, others)" value={pay.accountRelation} />
            <FieldRow label="Other Information" value={pay.otherInfo} />
          </FieldCard>
        </View>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Terms &amp; Conditions: </Text>
            By signing, the rider confirms that the Bkash account details provided are correct and authorized
            for payment. Payments will be made via Bkash unless agreed otherwise. Personal and financial
            information will be used only for payment processing and kept secure. Dinebd is not liable for
            errors or delays from incorrect details or third-party processing. This agreement is governed by
            the laws of Bangladesh.
          </Text>
          <AgreementLine
            checked={pay.agreed}
            text="I confirm that the Bkash account details provided are correct and authorized for payment."
          />
          <FieldCard>
            <FieldRow label="Rider Name" value={pay.signatureRiderName} />
          </FieldCard>
          <SingleSignature
            label="Rider Signature"
            name={pay.signatureRiderName}
            signature={pay.signature}
            date={pay.date}
          />
        </View>
      </Page>
    </Document>
  );
};

export default RiderContractPDF;
