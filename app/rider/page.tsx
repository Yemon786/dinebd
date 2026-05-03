"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, TrendingUp, Target, Zap, CreditCard, BarChart2, Headphones, Smartphone, Bike, Map, IdCard } from "lucide-react";

export default function RiderPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                Join Our Rider Network
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ride With{" "}
                <span className="text-primary">Dinebd</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Earn money on your own schedule. Join thousands of riders
                delivering across Bangladesh with flexible hours and
                competitive pay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors">
                  Apply Now
                </button>
                <a href="#learn-more">
                  <button className="border-2 border-white/30 hover:border-white text-white px-8 py-3.5 rounded-lg font-semibold transition-colors">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/rider_us.jpg"
                  alt="Dinebd Delivery Rider"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Become a Rider */}
      <div id="learn-more" />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Why Become a Rider?
            </h2>
            <p className="text-gray-500 text-lg">
              Everything you need to earn more and grow faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "High Earnings",
                description: "Competitive per-delivery pay with bonus incentives and peak-hour rates.",
              },
              {
                icon: Target,
                title: "Wide Reach",
                description: "Expand your delivery range and reach more customers across your city.",
              },
              {
                icon: Zap,
                title: "Easy Onboarding",
                description: "Start within hours with our simple verification process.",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description: "Weekly payouts processed directly and securely to your bank account.",
              },
              {
                icon: BarChart2,
                title: "Rider Dashboard",
                description: "Track your earnings, orders, and performance in real time.",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Full support available throughout your shift via chat and phone.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="text-primary" size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">
              Four simple steps to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Fill out Application", desc: "Provide your basic information online" },
              { num: "2", title: "Upload Documents", desc: "Submit your ID, vehicle, and required docs" },
              { num: "3", title: "We Verify Your Info", desc: "We review and activate your account" },
              { num: "4", title: "Start Delivering", desc: "Go live and begin earning immediately" },
            ].map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] right-0 h-px border-t-2 border-dashed border-orange-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What You Need
            </h2>
            <p className="text-gray-500">
              Simple requirements to get you on the road.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { icon: IdCard, title: "Valid National ID" },
              { icon: Smartphone, title: "Smartphone with internet" },
              { icon: Bike, title: "Bicycle, Bike, or Scooter" },
              { icon: Map, title: "Basic knowledge of local maps" },
            ].map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <span className="font-semibold text-gray-900">{title}</span>
                </div>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Required
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Earnings Information
            </h2>
            <p className="text-gray-500 text-lg">
              Transparent pay with multiple ways to earn more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Competitive Rates
              </h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>Per-delivery payment</li>
                <li>Bonus incentives</li>
                <li>Peak hour premium rates</li>
              </ul>
            </div>
            <div className="bg-primary rounded-xl p-8 text-center shadow-md">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Weekend Bonus
              </h3>
              <p className="text-5xl font-bold text-white mb-2">+20%</p>
              <p className="text-orange-100 text-sm">Extra earnings on weekends</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Peak Hours
              </h3>
              <p className="text-3xl font-bold text-primary mb-2">
                Premium
              </p>
              <p className="text-sm text-gray-500">High earnings + extra tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of riders already growing with Dinebd.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors">
            Apply as a Rider
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: "How long does the approval process take?", a: "Typically 3–5 business days after all required documents are submitted." },
              { q: "Does it cost anything to join?", a: "No. Joining is completely free — no registration fees or hidden charges." },
              { q: "How do payouts work?", a: "Weekly payments are processed directly to your bank account every Sunday." },
              { q: "Can I manage multiple orders?", a: "Yes, you can accept and deliver multiple orders in sequence." },
              { q: "What support do you provide?", a: "24/7 support via chat, phone, and email throughout your shift." },
              { q: "Can I change my delivery area?", a: "Yes — update your preferred zones anytime from your rider dashboard." },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-primary transition-transform flex-shrink-0 ml-3 ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
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
