"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dinebd-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("dinebd-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("dinebd-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          We use cookies to improve your experience, analyse site traffic, and
          personalise content. By continuing to use Dinebd, you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="text-orange-400 underline hover:text-orange-300 transition"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
