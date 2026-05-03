import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Regular Customer, Dhaka",
    text: "Dinebd is the only food app I use now. Delivery is always on time and the food arrives hot. Booking a table for family dinners has never been easier.",
    rating: 5,
    initials: "RU",
  },
  {
    name: "Nadia Hossain",
    role: "Home Chef, Mirpur",
    text: "As a home chef, Dinebd gave me a platform to reach customers I never could before. My orders tripled within the first month of joining.",
    rating: 5,
    initials: "NH",
  },
  {
    name: "Karim Khan",
    role: "Restaurant Owner, Banani",
    text: "Partnering with Dinebd was the best decision for my restaurant. The onboarding was smooth and the dashboard makes managing orders completely simple.",
    rating: 5,
    initials: "KK",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          What Our <span className="text-primary">Community</span> Says
        </h2>
        <p className="text-gray-400 text-lg mb-16 text-center">
          Trusted by customers, restaurants, and riders across Bangladesh
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-primary fill-primary"
                  />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
