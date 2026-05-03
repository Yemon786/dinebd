"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/ui/logo";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="https://qr1.be/6UYZ" target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <button className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Download App
              </button>
            </a>
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-primary bg-orange-50"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100">
            <a href="https://qr1.be/6UYZ" target="_blank" rel="noopener noreferrer">
              <button className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold w-full py-2.5 rounded-lg transition-colors">
                Download App
              </button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
