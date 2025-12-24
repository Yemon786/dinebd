"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function contact() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqItems = [
    {
      question: "How to place an order?",
      answer:
        "You can place an order through our mobile app or website. Browse restaurants, select your favorite food, and proceed to checkout.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times vary depending on your location and the restaurant. Typically, deliveries take between 30-45 minutes.",
    },
    {
      question: "Where to contact for partnership?",
      answer:
        "For partnership inquiries, please email us at partnerships@fineed.com or call our partnership team.",
    },
    {
      question: "How to become a rider?",
      answer:
        "Visit our careers page or contact our HR team directly at careers@fineed.com to learn about rider positions.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're here to help reach out with any questions, feedback, or support
          needs.
        </p>
      </section>

      {/* Get In Touch Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Get In Touch
          </h2>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-4 gap-8 mb-16">
            {/* Email */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">support@fineed.com</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.24.645.477.935a6.611 6.611 0 003.050 2.685l.77-1.55a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57C6.92 18 3 14.08 3 9.43V5a1 1 0 011-1h2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+8801000000000</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">
                House 05, Road 00, Dhaka, Bangladesh
              </p>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.415 1.415L9 10.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-600 text-sm">9 AM - 10 PM (Everyday)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mb-16">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.24.645.477.935a6.611 6.611 0 003.05 2.685l.77-1.55a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57C6.92 18 3 14.08 3 9.43V5a1 1 0 011-1h2z" />
              </svg>
              Call Now
            </button>
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </button>
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition">
              Chat With Support
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-8 bg-orange-50">
        <div className="max-w-2xl mx-auto bg-orange-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">
            Send Us a Message
          </h2>
          <p className="text-gray-600 mb-8">
            We'll get back to you as soon as possible
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-orange-600 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-orange-600 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-orange-600 font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="+8801000000000"
              />
            </div>

            <div>
              <label className="block text-orange-600 font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Message subject"
              />
            </div>

            <div>
              <label className="block text-orange-600 font-semibold mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-800">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === index && (
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
