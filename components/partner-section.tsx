import Link from "next/link";

export default function PartnerSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            <span className="text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-3 block">
              For Restaurants
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-orange-500">Partner</span> with Us
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Grow your business with online orders and delivery. Reach thousands
              of hungry customers and increase your revenue with our trusted
              platform.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "No upfront joining fee — commission only",
                "Weekly payouts directly to your bank",
                "Dedicated onboarding and account support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-500 text-xs font-bold">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/partner-with-us">
              <button className="bg-[#ED7319] hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Learn More
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center order-1 md:order-2">
            <img
              src="/partner_us.png"
              alt="Partner with Dinebd"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
