"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ContactUs() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (
    data: Record<string, string>
  ): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!data.subject.trim()) errors.subject = "Subject is required.";
    if (!data.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };

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
      <section className="bg-gray-900 text-white py-20 text-center px-4">
        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          We&apos;re here to help. Reach out with any questions, feedback, or
          support needs.
        </p>
      </section>

      {/* Get In Touch Section */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Get In Touch
          </h2>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Email */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm"> info@dinebd.com </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.24.645.477.935a6.611 6.611 0 003.050 2.685l.77-1.55a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57C6.92 18 3 14.08 3 9.43V5a1 1 0 011-1h2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+8801333-158929</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
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
                Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A, Dhaka – 1213,
                Bangladesh.
              </p>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
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
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button className="border-2 border-orange-500 text-primary hover:bg-primary  hover:text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.24.645.477.935a6.611 6.611 0 003.05 2.685l.77-1.55a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57C6.92 18 3 14.08 3 9.43V5a1 1 0 011-1h2z" />
              </svg>
              Call Now
            </button>
            <button className="border-2 border-orange-500 text-primary hover:bg-primary  hover:text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </button>
            <button className="border-2 border-orange-500 text-primary hover:bg-primary  hover:text-white px-8 py-3 rounded-full font-bold transition">
              Chat With Support
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Send Us a Message
          </h2>
          <p className="text-gray-500 mb-8">
            We&apos;ll get back to you as soon as possible.
          </p>

          {formStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800">
                Message Sent!
              </h3>
              <p className="text-green-700">
                Thank you for reaching out. We&apos;ll get back to you as soon
                as possible.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="text-sm text-orange-600 underline hover:text-orange-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6" noValidate>
              {formStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formErrors.name ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formErrors.email ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="+8801000000000"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formErrors.subject ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Message subject"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                    formErrors.message ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Your message here..."
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
              >
                {formStatus === "loading" ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=Kemal+Ataturk+Avenue+Banani+Dhaka+Bangladesh&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dinebd Office Location — Banani, Dhaka"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Awal Centre, 34, Kemal Ataturk Avenue, Banani C/A, Dhaka – 1213,
            Bangladesh
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-8 bg-white">
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
