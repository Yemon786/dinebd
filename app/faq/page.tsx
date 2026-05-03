"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  { id: 1, question: "What is Dinebd?", answer: "Established in 2020, Dinebd is a Bangladeshi-owned food and dining platform connecting users with restaurants, homemade food providers, and catering services across Bangladesh. It offers Food Delivery, Takeaway, Table Booking, Homemade Food, and Catering Services with verified vendors, hygiene standards, affordable pricing, and reliable customer service." },
  { id: 2, question: "What are the benefits of creating a Dinebd account?", answer: "Users can place orders, book tables, access exclusive discounts, discover restaurants, use vouchers, track orders in real time, receive loyalty rewards, leave reviews, and get priority support." },
  { id: 3, question: "How is Dinebd different from other platforms?", answer: "Dinebd combines five services in one app, verifies vendors, ensures hygiene, offers competitive pricing, membership benefits, and is locally owned." },
  { id: 4, question: "Why choose Dinebd?", answer: "Fast delivery, verified vendors, affordable pricing, membership perks, priority support, real-time tracking, and hygiene standards." },
  { id: 5, question: "Does Dinebd charge service fees?", answer: "Prices shown are standard. Additional fees may apply for delivery, catering, or table bookings. Membership may waive certain fees." },
  { id: 6, question: "Is Dinebd safe to use?", answer: "Yes. Dinebd ensures vendor verification, secure payments, and hygiene compliance." },
  { id: 7, question: "How can I contact Dinebd?", answer: "Via email (support@dinebd.com, info@dinebd.com), phone, or in-app support." },
  { id: 8, question: "How do I register a Dinebd account?", answer: "Download the app, enter your name, email, phone number, and create a password." },
  { id: 9, question: "Can I have multiple accounts?", answer: "No. Each account is personal and linked to a single user." },
  { id: 10, question: "What if I forget my password?", answer: "Use the \u201cForgot Password\u201d option to reset via email or SMS." },
  { id: 11, question: "Can I update my profile information?", answer: "Yes. Update it from the \u201cMy Account\u201d section in the app." },
  { id: 12, question: "Is my account secure?", answer: "Yes. Industry-standard security measures are used." },
  { id: 13, question: "Can I delete my account?", answer: "Yes. Delete it from the app or contact support." },
  { id: 14, question: "Can children use Dinebd?", answer: "Users under 18 must be supervised by a guardian." },
  { id: 15, question: "Can I log in using social media?", answer: "Yes. Google login is supported." },
  { id: 16, question: "How do I verify my account?", answer: "Via SMS or email verification." },
  { id: 17, question: "Can I link multiple payment methods?", answer: "Yes. One default payment method is required." },
  { id: 18, question: "How do I receive notifications?", answer: "Through the app. Marketing notifications are optional." },
  { id: 19, question: "Can I deactivate my account temporarily?", answer: "No. Only permanent deletion is available." },
  { id: 20, question: "What are the five Dinebd services?", answer: "Food Delivery, Takeaway, Table Booking, Homemade Food, and Catering." },
  { id: 21, question: "How does food delivery work?", answer: "Select restaurant → choose items → place order → rider delivers with real-time tracking." },
  { id: 22, question: "How does takeaway work?", answer: "Pre-order food and pick it up at the scheduled time." },
  { id: 23, question: "How does table booking work?", answer: "Search restaurant → select date & time → confirm reservation." },
  { id: 24, question: "How do I order homemade food?", answer: "Browse vendors → select meals → place order → track delivery." },
  { id: 25, question: "How does catering work?", answer: "Submit event details → receive quotation → confirm payment → vendor delivers." },
  { id: 26, question: "Can I combine services?", answer: "Yes. Multiple services can be used in one session." },
  { id: 27, question: "Are there location restrictions?", answer: "Yes. Some vendors serve specific areas only." },
  { id: 28, question: "Can I request food customizations?", answer: "Yes, depending on vendor options." },
  { id: 29, question: "How do I place an order?", answer: "Select service → browse vendors → add items → checkout → confirm." },
  { id: 30, question: "What payment methods are accepted?", answer: "Cards, mobile wallets (bKash), and partial cash-on-delivery." },
  { id: 31, question: "Are payments secure?", answer: "Yes. Secure third-party gateways are used." },
  { id: 32, question: "Can I pay on delivery?", answer: "Partial or full payment options are available." },
  { id: 33, question: "What if payment fails?", answer: "The order may be cancelled. Contact support." },
  { id: 34, question: "Can I track my order?", answer: "Yes. Real-time tracking is available." },
  { id: 35, question: "Can I edit or cancel orders?", answer: "Pending orders can be edited or cancelled." },
  { id: 36, question: "How do I report missing or wrong items?", answer: "Contact support within 48 hours." },
  { id: 37, question: "Can I use promo codes?", answer: "Yes, during checkout." },
  { id: 38, question: "Are taxes included?", answer: "VAT or service charges may apply." },
  { id: 39, question: "How do I save payment info?", answer: "Add payment methods in the app." },
  { id: 40, question: "Are refunds available?", answer: "Refunds depend on service type, timing, and vendor status." },
  { id: 41, question: "What is the cancellation policy for table bookings?", answer: "Full refund if cancelled more than 5 hours before reservation." },
  { id: 42, question: "Can I cancel food delivery orders?", answer: "Refunds apply if cancelled during pending status." },
  { id: 43, question: "How about takeaway orders?", answer: "Refunds apply if cancelled while pending." },
  { id: 44, question: "How about homemade food orders?", answer: "Refunds apply if cancelled while pending." },
  { id: 45, question: "What about catering cancellations?", answer: "Cancel 72 hours before event for refund." },
  { id: 46, question: "How long does a refund take?", answer: "Usually 3–7 business days." },
  { id: 47, question: "Are refund vouchers exchangeable for cash?", answer: "No." },
  { id: 48, question: "What if the rider cannot deliver?", answer: "Rider waits 10–15 minutes; refunds may not apply." },
  { id: 49, question: "What is the timeout policy?", answer: "Orders auto-cancel if vendors fail to respond within time limits." },
  { id: 50, question: "What if I miss a catering response window?", answer: "The offer expires automatically." },
  { id: 51, question: "What if the vendor misses the response window?", answer: "Order auto-cancels and refunds apply." },
  { id: 52, question: "Does timeout affect membership benefits?", answer: "No." },
  { id: 53, question: "How are timeout refunds processed?", answer: "Voucher or money refund based on user choice." },
  { id: 54, question: "How long does delivery take?", answer: "Depends on location, traffic, and preparation time." },
  { id: 55, question: "Can I track the rider?", answer: "Yes, real-time rider tracking is available." },
  { id: 56, question: "What if the rider is late?", answer: "Delays may occur due to traffic or weather." },
  { id: 57, question: "Are riders trained?", answer: "Yes. Riders are trained in hygiene and safety." },
  { id: 58, question: "What if food is damaged?", answer: "Report to support for investigation and resolution." },
  { id: 59, question: "Can I tip the rider?", answer: "Yes, in-app or in cash." },
  { id: 60, question: "Can riders refuse delivery?", answer: "Only under safety or operational issues." },
  { id: 61, question: "What if my address is incorrect?", answer: "Failed deliveries due to wrong address may not be refunded." },
  { id: 62, question: "Can I request a specific rider?", answer: "No. Riders are auto-assigned." },
  { id: 63, question: "How are restaurants verified?", answer: "Business documents, hygiene checks, and quality assurance reviews." },
  { id: 64, question: "Can restaurants refuse orders?", answer: "Yes. Refunds apply if refused." },
  { id: 65, question: "What if food is unsafe?", answer: "Report immediately. Refund or replacement may apply." },
  { id: 66, question: "Can I request ingredient details?", answer: "Yes. Confirm directly with restaurants." },
  { id: 67, question: "What if I have food allergies?", answer: "Mention allergies and verify with restaurant." },
  { id: 68, question: "How do restaurants update menus?", answer: "Through the vendor portal or app." },
  { id: 69, question: "Can vendors remove negative reviews?", answer: "No. Reviews are moderated only for compliance." },
  { id: 70, question: "What if vendors violate hygiene rules?", answer: "They may be suspended or removed." },
  { id: 71, question: "What is Dinebd Membership?", answer: "A subscription offering exclusive discounts, free table booking, and priority support." },
  { id: 72, question: "How much is the membership fee?", answer: "Auto-renewable, non-refundable, pricing may change." },
  { id: 73, question: "Who is eligible for membership?", answer: "Verified users with a payment method." },
  { id: 74, question: "Can I cancel membership?", answer: "Yes. Benefits continue until cycle ends." },
  { id: 75, question: "What are delivery & takeaway benefits?", answer: "Member-only discounts and offers." },
  { id: 76, question: "Are table bookings free for members?", answer: "Yes, at participating restaurants." },
  { id: 77, question: "What are catering benefits?", answer: "Exclusive member discounts." },
  { id: 78, question: "Can membership be transferred?", answer: "No." },
  { id: 79, question: "Can Dinebd modify membership benefits?", answer: "Yes, with prior notice." },
  { id: 80, question: "Is priority support guaranteed?", answer: "Faster support, response times may vary." },
  { id: 81, question: "Can membership be suspended?", answer: "Yes, for fraud or misuse." },
  { id: 82, question: "Do partner shops give discounts?", answer: "Yes, depending on partner availability." },
  { id: 83, question: "Are discounts capped?", answer: "Yes, some offers have limits." },
  { id: 84, question: "How do I leave a review?", answer: "After order completion via the app." },
  { id: 85, question: "Can I edit a review?", answer: "Contact support." },
  { id: 86, question: "Are reviews verified?", answer: "Yes. Fake reviews may be removed." },
  { id: 87, question: "Can vendors reply to reviews?", answer: "Yes, professionally." },
  { id: 88, question: "Can I review anonymously?", answer: "No." },
  { id: 89, question: "Can I report a review?", answer: "Yes, via support." },
  { id: 90, question: "How are ratings calculated?", answer: "Based on average user ratings." },
  { id: 91, question: "Can reviews affect vendors?", answer: "Yes. Poor reviews may cause suspension." },
  { id: 92, question: "Are reviews public?", answer: "Yes." },
  { id: 93, question: "How do I redeem promotions?", answer: "Enter promo code at checkout." },
  { id: 94, question: "Are offers transferable?", answer: "No." },
  { id: 95, question: "Do offers expire?", answer: "Yes. Expiry dates are shown." },
  { id: 96, question: "Can offers be withdrawn?", answer: "Yes, anytime." },
  { id: 97, question: "Are all restaurants included in promotions?", answer: "No. Only participating vendors." },
  { id: 98, question: "Can I get membership discounts on promo items?", answer: "Only if allowed." },
  { id: 99, question: "Can I get discounts for multiple orders?", answer: "Yes, if terms allow." },
  { id: 100, question: "How do I contact Dinebd support?", answer: "Via app, email, phone, or website." },
  { id: 101, question: "Can I track support requests?", answer: "Yes, via Support Centre." },
  { id: 102, question: "Does Dinebd send notifications?", answer: "Yes, for updates and promotions." },
  { id: 103, question: "Can I opt out of marketing messages?", answer: "Yes, via unsubscribe link." },
  { id: 104, question: "Can I escalate a complaint?", answer: "Yes, via email or phone." },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Dinebd
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white text-gray-800 transition-colors"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              Found{" "}
              <span className="font-semibold text-primary">
                {filteredItems.length}
              </span>{" "}
              result{filteredItems.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-200 transition-colors"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                    openItems.includes(item.id) ? "bg-orange-50" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-primary transition-transform flex-shrink-0 ml-4 ${
                      openItems.includes(item.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItems.includes(item.id) && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-white">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">
                No results found for &ldquo;{searchTerm}&rdquo;
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 text-center bg-white border border-gray-200 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-500 mb-6">
            Our support team is ready to help with anything else.
          </p>
          <a
            href="mailto:support@dinebd.com"
            className="inline-block px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
