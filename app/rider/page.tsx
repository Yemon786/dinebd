"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Rider With Dinebd
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-8 leading-relaxed">
                Grow your income as a delivery rider. Start earning with
                flexible hours and become part of thousands of successful
                riders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                  Apply Now
                </button>
                <a href="#learn-more">
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-orange-400 to-orange-300 rounded-3xl p-8 w-full max-w-sm aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src="/rider_us.jpg"
                  alt="Delivery Rider"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Become a Rider */}
      <div id="learn-more"></div>
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Become a Rider?
            </h2>
            <p className="text-lg text-gray-600">
              Be a growing community of successful riders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📈",
                title: "Increase Sales",
                description:
                  "High earning potential with flexible shift options",
              },
              {
                icon: "🎯",
                title: "Expected Reach",
                description:
                  "Expand your delivery range and reach more customers",
              },
              {
                icon: "⚡",
                title: "Easy Onboarding",
                description: "Start within hours with our simple verification",
              },
              {
                icon: "💳",
                title: "Secure Payments",
                description: "Receive timely payments securely to your account",
              },
              {
                icon: "📊",
                title: "Business Dashboard",
                description: "Track your earnings and performance real-time",
              },
              {
                icon: "🚚",
                title: "Delivery Support",
                description: "Complete support available throughout your shift",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: "1",
                title: "Fill out Application",
                desc: "Provide your basic information",
              },
              {
                num: "2",
                title: "Upload Required Documents",
                desc: "Submit necessary documents",
              },
              {
                num: "3",
                title: "We Verify Your Info",
                desc: "We review your application",
              },
              {
                num: "4",
                title: "Start Delivering Orders",
                desc: "Begin earning money",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-orange-500 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need & How It Works Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What You Need */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What You Need
            </h3>
            <div className="space-y-4">
              {[
                { icon: "🆔", title: "Valid ID", label: "Required" },
                { icon: "📱", title: "Smartphone", label: "Required" },
                {
                  icon: "🚲",
                  title: "Bicycle / Bike / Scooter",
                  label: "Required",
                },
                {
                  icon: "📚",
                  title: "Basic knowledge of maps",
                  label: "Required",
                },
              ].map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-orange-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{req.icon}</span>
                    <span className="font-semibold text-gray-900">
                      {req.title}
                    </span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-semibold">
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How It Works
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: "✓",
                  title: "Sign Up",
                  desc: "Create your account and submit documents",
                },
                {
                  icon: "✓",
                  title: "Verification",
                  desc: "We verify your information and activate account",
                },
                {
                  icon: "✓",
                  title: "Earn Money",
                  desc: "Accept deliveries and start earning",
                },
                {
                  icon: "✓",
                  title: "Get Payment",
                  desc: "Receive weekly payments to your bank account",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Information */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Earnings Information
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "Competitive Rates",
                icon: "💰",
                items: [
                  "Per delivery payment",
                  "Bonus incentives",
                  "Peak hour rates",
                ],
              },
              {
                label: "Weekend Bonus",
                icon: "🎁",
                value: "+20%",
                detail: "Extra earnings on weekends",
              },
              {
                label: "Peak Hours",
                icon: "⚡",
                value: "Premium",
                detail: "High earnings + Extra tips",
              },
            ].map((earning, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition text-center"
              >
                <div className="text-5xl mb-4">{earning.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {earning.label}
                </h3>
                {earning.value && (
                  <p className="text-3xl font-bold text-orange-500 mb-2">
                    {earning.value}
                  </p>
                )}
                {earning.detail && (
                  <p className="text-sm text-gray-600">{earning.detail}</p>
                )}
                {earning.items && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    {earning.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivering Opportunities */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delivering Opportunities
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Join thousands of riders and growing with Dinebd
          </p>
          <button className="bg-orange-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition inline-block">
            Grow Your Restaurant
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get questions? We have answers. Check out FAQs below.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How long does the approval process take?",
                a: "It typically takes 3-5 business days from submission of all required documents.",
              },
              {
                q: "Does it cost anything to join?",
                a: "No, joining is completely free. No registration fees or hidden charges.",
              },
              {
                q: "How do payouts work?",
                a: "We process weekly payments directly to your bank account every Sunday.",
              },
              {
                q: "Can I manage multiple orders?",
                a: "Yes, you can accept multiple orders and deliver them in sequence.",
              },
              {
                q: "What support do you provide?",
                a: "We provide 24/7 customer support through chat, phone, and email.",
              },
              {
                q: "Can I change my delivery areas?",
                a: "Yes, you can update your preferred delivery zones anytime from your dashboard.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-orange-500 transition flex-shrink-0 ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-600 leading-relaxed">
                    {faq.a}
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
