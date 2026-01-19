"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How long does the approval process take?",
      answer:
        "Our approval process typically takes 3-5 business days. We review your restaurant details and verify all necessary documents.",
    },
    {
      question: "Does it cost anything to join?",
      answer:
        "There are no upfront joining fees. We operate on a commission-based model where we take a percentage of each order.",
    },
    {
      question: "How do payouts work?",
      answer:
        "Payouts are processed weekly directly to your registered bank account. You can track all transactions in your dashboard.",
    },
    {
      question: "Can I manage multiple outlets?",
      answer:
        "Yes, you can manage multiple restaurant outlets from a single account with our advanced dashboard.",
    },
    {
      question: "What support do you provide?",
      answer:
        "We provide 24/7 customer support via phone, email, and chat. Our dedicated account managers assist with onboarding.",
    },
    {
      question: "Can I change my commission rate later?",
      answer:
        "Commission rates can be adjusted after discussions with our sales team based on your performance and requirements.",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Partner With Dinebd
            </h1>
            <p className="text-lg text-orange-100 mb-8">
              Grow your business with online orders and delivery. Reach
              thousands of customers and increase revenue by 40%.
            </p>
            <div className="flex gap-4">
              <Link href="/partner-form">
                <button className="bg-white text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-50 transition">
                  Apply Now
                </button>
              </Link>
              <a href="#learn-more">
                <button className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition">
                  Learn More
                </button>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl h-80 flex items-center justify-center">
              <img
                src="/partner_us.png"
                alt="Delivery Rider"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <div id="learn-more"></div>
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Why Partner With Dinebd?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of restaurants growing their business with Dinebd
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Increase Sales",
                description:
                  "Tap into a growing customer base and expand your revenue.",
              },
              {
                icon: "🎯",
                title: "Instant Online Reach",
                description:
                  "Expand your business beyond your physical location instantly.",
              },
              {
                icon: "⚡",
                title: "Easy Onboarding",
                description:
                  "Get started in minutes with our simple setup process.",
              },
              {
                icon: "💳",
                title: "Secure Payments",
                description:
                  "Secure and transparent commission with instant settlements.",
              },
              {
                icon: "📈",
                title: "Business Dashboard",
                description:
                  "Track orders, analytics, and performance in real-time.",
              },
              {
                icon: "🤝",
                title: "Delivery Support",
                description:
                  "Integrated delivery network or your own logistics.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
            {[
              { number: 1, title: "Fill out the Application" },
              { number: 2, title: "Upload Required Documents" },
              { number: 3, title: "We Verify Your Business" },
              { number: 4, title: "Start Receiving Orders" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                <p className="text-gray-900 font-semibold">{step.title}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute ml-32 text-orange-500 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Do You Need?
            </h2>
            <p className="text-gray-600">
              Document requirements for restaurant registration
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { title: "Trade License", status: "Required" },
              { title: "NID Copy", status: "Required" },
              { title: "Bank Information", status: "Required" },
              { title: "Food Safety Certificate", status: "Required" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  <span className="font-medium text-gray-900">
                    {item.title}
                  </span>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivering Opportunities */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Delivering Opportunities
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Thousands of restaurants are growing their businesses with Dinebd
        </p>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition">
          Grow Your Restaurant
        </button>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Got questions? We have answers. Check out our FAQs below.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
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
