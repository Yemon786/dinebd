"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />

            {/* <span className="font-bold text-lg text-gray-900">Dinebd</span> */}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-gray-700" : "text-gray-400"
              } hover:text-[#ED7319] font-medium`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`${
                pathname === "/about-us" ? "text-gray-700" : "text-gray-400"
              } hover:text-[#ED7319] font-medium`}
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className={`${
                pathname === "/privacy-policy"
                  ? "text-gray-700"
                  : "text-gray-400"
              } hover:text-[#ED7319] font-medium`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-us"
              className={`${
                pathname === "/contact-us" ? "text-gray-700" : "text-gray-400"
              } hover:text-[#ED7319] font-medium`}
            >
              Contact Us
            </Link>

            <Link
              href="/faq"
              className={`${
                pathname === "/faq" ? "text-gray-700" : "text-gray-400"
              } hover:text-[#ED7319] font-medium`}
            >
              FAQ
            </Link>
          </nav>

          {/* Download Button */}
          <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5">
            Download
          </Button>
        </div>
      </div>
    </header>
  );
}
