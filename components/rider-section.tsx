import Image from "next/image";
import Link from "next/link";

export default function RiderSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
              src="/rider_us.jpg"
              alt="Become a Dinebd Rider"
              width={500}
              height={500}
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 block">
              For Riders
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Become a <span className="text-orange-500">Rider</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Earn money on your own schedule. Join thousands of riders
              delivering across Bangladesh with Dinebd.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Flexible working hours — you choose when",
                "Competitive per-delivery pay with bonuses",
                "Get started in hours with fast onboarding",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-500 text-xs font-bold">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/rider">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
