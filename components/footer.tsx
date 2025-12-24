"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./ui/logo";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle email subscription here
    alert("Thank you for subscribing!");
  };

  const footerLinks = {
    links: [
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "User terms and conditions", href: "#" },
      { label: "Refund policy", href: "#" },
      { label: "Privacy policy", href: "#" },
    ],
    partners: [
      { label: "Partners terms and conditions", href: "#" },
      { label: "Order timeout policy", href: "#" },
      { label: "Customer Support Centre Policy", href: "#" },
      { label: "Review policy", href: "#" },
      { label: "Food allergy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Section - Logo & Download */}
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-orange-600">
              <Logo width={128} height={128} />
            </div>
            <p className="text-sm text-gray-600">
              Dining made easy. Food delivery service. Book a table, takeaways,
              catering and homemade food available. "All in one place - in
              Bangladesh"
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                <span>🔗</span> Google Play
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                <span>🍎</span> App Store
              </Link>
            </div>
            <p className="text-xs font-semibold text-gray-700">Download Now</p>
          </div>

          {/* Middle Section - Newsletter */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h3 className="font-bold text-gray-800">
                Get Exclusive Deals in you email
              </h3>
            </div>
            <form onSubmit={handleSubscribe} className="w-full max-w-sm">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  required
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            <div className="flex gap-4 self-start">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Section - Links */}
          <div>
            <h4 className="mb-4 font-bold text-gray-800">Links</h4>
            <div className="flex text-sm">
              <div className="flex flex-col gap-2">
                {footerLinks.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {footerLinks.partners.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-gray-600 hover:text-orange-600 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 bg-gray-900 px-4 py-4 text-gray-300 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 text-center text-xs md:flex-row md:justify-between">
            {/* <p>Copyright © 2025 Dinebd | All rights Reserved |</p> */}
            <p>
              Dinebd is registered in Bangladesh under the trade licence number:
              TRAD/DHCC/18059/2024. Registration or use of this site constitutes
              acceptance of Privacy Policy & Terms and Condition
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
