"use client";

import { useEffect, useState } from "react";

export default function SectionNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2.5">
          {items.map(({ id, label }) => (
            <li key={id} className="flex-shrink-0">
              <a
                href={`#${id}`}
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active === id
                    ? "bg-[#ED7319] text-white shadow-sm"
                    : "text-gray-500 hover:text-[#ED7319] hover:bg-orange-50"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
