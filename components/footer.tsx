"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, X, Instagram, Linkedin, Youtube } from "lucide-react";
import Logo from "./ui/logo";
import GooglePlay from "./ui/google-play";
import Apple from "./ui/apple";

export default function Footer() {
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribeStatus("success");
  };

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "FAQ", href: "/faq" },
      { label: "Career", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
    partners: [
      { label: "Partner With Us", href: "/partner-with-us" },
      { label: "Ride With Us", href: "/rider" },
      { label: "Partner Terms", href: "#" },
      { label: "Order Timeout Policy", href: "#" },
      { label: "Review Policy", href: "#" },
      { label: "Food Allergy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Left — Logo, description, store badges */}
          <div className="flex flex-col gap-5">
            <Logo width={120} height={120} />
            <p className="text-sm text-gray-500 leading-relaxed">
              Dining made easy. Food delivery, table booking, takeaways,
              catering and homemade food — all in one place, across Bangladesh.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="https://qr1.be/6UYZ"
                className="inline-flex items-center gap-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors shadow-sm"
              >
                <GooglePlay />
                Google Play
              </Link>
              <Link
                href="https://qr1.be/6UYZ"
                className="inline-flex items-center gap-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors shadow-sm"
              >
                <Apple />
                App Store
              </Link>
            </div>
          </div>

          {/* Middle — Newsletter + Social */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                Get Exclusive Deals
              </h3>
              <p className="text-sm text-gray-500">
                Subscribe to receive offers in your email.
              </p>
            </div>

            {subscribeStatus === "success" ? (
              <p className="text-sm text-green-700 font-medium bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                You&apos;re subscribed! Check your inbox for deals.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={subscribeStatus === "loading"}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
                  />
                  <Button
                    type="submit"
                    disabled={subscribeStatus === "loading"}
                    className="rounded-lg bg-[#ED7319] hover:bg-orange-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60 transition-colors"
                  >
                    {subscribeStatus === "loading" ? "..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            )}

            <div className="flex gap-4 mt-1">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: X, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-200 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Links */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  Company
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  Partners
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.partners.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-gray-900 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Dinebd Limited is registered in Bangladesh under registration number
            C-202938/2025. Registration or use of this site constitutes
            acceptance of our Privacy Policy &amp; Terms and Conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
