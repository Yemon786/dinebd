import { ArrowRight, Clock, Star, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/hero.png')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/65 to-gray-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — content */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Now delivering across Bangladesh
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              Delicious Food,
              <br />
              <span className="text-[#ED7319]">Delivered Fast</span>
            </h1>

            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-lg">
              Order from your favourite restaurants, book a table, or explore
              homemade meals — all in one app.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="https://qr1.be/6UYZ">
                <button className="bg-[#ED7319] hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center gap-2">
                  Order Now <ArrowRight size={18} />
                </button>
              </a>
              <a href="https://qr1.be/6UYZ">
                <button className="border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
                  Book a Table
                </button>
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Clock size={16} className="text-[#ED7319]" />
                <span>Delivery in 30 min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Star size={16} className="text-[#ED7319]" />
                <span>50,000+ happy customers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <ShieldCheck size={16} className="text-[#ED7319]" />
                <span>Verified restaurants only</span>
              </div>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="bg-[#ED7319] rounded-2xl p-7 flex flex-col justify-center">
              <p className="text-4xl font-bold text-white mb-1">50K+</p>
              <p className="text-orange-100 text-sm">Happy Customers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col justify-center">
              <p className="text-4xl font-bold text-white mb-1">10K+</p>
              <p className="text-gray-300 text-sm">Restaurant Partners</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col justify-center">
              <p className="text-4xl font-bold text-white mb-1">1,500+</p>
              <p className="text-gray-300 text-sm">Active Riders</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col justify-center">
              <p className="text-4xl font-bold text-white mb-1">5</p>
              <p className="text-gray-300 text-sm">Services in One App</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
