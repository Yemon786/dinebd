"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, TrendingUp, Target, Zap, CreditCard, BarChart2, Truck } from "lucide-react";
import Link from "next/link";

export default function PartnerWithUs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { question: "How long does the approval process take?", answer: "Our approval process typically takes 3–5 business days. We review your restaurant details and verify all necessary documents." },
    { question: "Does it cost anything to join?", answer: "There are no upfront joining fees. We operate on a commission-based model where we take a percentage of each order." },
    { question: "How do payouts work?", answer: "Payouts are processed weekly directly to your registered bank account. You can track all transactions in your dashboard." },
    { question: "Can I manage multiple outlets?", answer: "Yes, you can manage multiple restaurant outlets from a single account with our advanced dashboard." },
    { question: "What support do you provide?", answer: "We provide 24/7 customer support via phone, email, and chat. Our dedicated account managers assist with onboarding." },
    { question: "Can I change my commission rate later?", answer: "Commission rates can be adjusted after discussions with our sales team based on your performance and requirements." },
  ];

  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-4">
              For Restaurants
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Partner With{" "}
              <span className="text-[#ED7319]">Dinebd</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Grow your business with online orders and delivery. Reach thousands
              of customers and increase your revenue with our trusted platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/partner-form">
                <button className="bg-[#ED7319] hover:bg-orange-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors">
                  Apply Now
                </button>
              </Link>
              <a href="#learn-more">
                <button className="border-2 border-white/30 hover:border-white text-white px-8 py-3.5 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/partner_us.png"
                alt="Partner with Dinebd"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <div id="learn-more" />
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Why Partner With Dinebd?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Join thousands of restaurants already growing their business with
              us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Increase Sales", description: "Tap into a growing customer base and expand your revenue beyond your physical location." },
              { icon: Target, title: "Instant Online Reach", description: "Reach thousands of hungry customers in your area without any extra marketing spend." },
              { icon: Zap, title: "Easy Onboarding", description: "Get started in days with our guided setup process and dedicated onboarding team." },
              { icon: CreditCard, title: "Secure Payments", description: "Transparent commission with weekly settlements directly to your bank account." },
              { icon: BarChart2, title: "Business Dashboard", description: "Track orders, revenue, reviews, and performance analytics all in real time." },
              { icon: Truck, title: "Delivery Network", description: "Use our integrated rider network or manage your own logistics — your choice." },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="text-orange-500" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-500">
              Four simple steps to start receiving orders.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: 1, title: "Fill out the Application" },
              { number: 2, title: "Upload Required Documents" },
              { number: 3, title: "We Verify Your Business" },
              { number: 4, title: "Start Receiving Orders" },
            ].map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 bg-[#ED7319] text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-md">
                  {step.number}
                </div>
                <p className="text-gray-900 font-semibold text-sm">{step.title}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] right-0 h-px border-t-2 border-dashed border-orange-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What Do You Need?
            </h2>
            <p className="text-gray-500">
              Required documents for restaurant registration.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Trade License",
              "NID Copy",
              "Bank Information",
              "Food Safety Certificate",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between bg-white p-5 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  <span className="font-semibold text-gray-900">{item}</span>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                  Required
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gray-900 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Grow Your Restaurant?
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Thousands of restaurants are already growing their businesses with
            Dinebd. Join them today.
          </p>
          <Link href="/partner-form">
            <button className="bg-[#ED7319] hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors">
              Apply Now — It&apos;s Free
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-500 transition-transform flex-shrink-0 ml-3 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
