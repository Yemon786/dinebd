import GooglePlay from "./ui/google-play";
import Apple from "./ui/apple";

export default function AppDownload() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-3 block">
              Mobile App
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Download the{" "}
              <span className="text-orange-500">Dinebd App</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Order food, book tables, and discover great restaurants — all from
              your pocket. Fast, easy, and always available.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://qr1.be/6UYZ"
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-xl transition-colors"
              >
                <GooglePlay />
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-0.5">
                    Get it on
                  </p>
                  <p className="text-sm font-semibold leading-none">
                    Google Play
                  </p>
                </div>
              </a>
              <a
                href="https://qr1.be/6UYZ"
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-xl transition-colors"
              >
                <Apple />
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-0.5">
                    Download on the
                  </p>
                  <p className="text-sm font-semibold leading-none">
                    App Store
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — App Mockup */}
          <div className="flex justify-center">
            <img
              src="/app.png"
              alt="Dinebd App"
              className="w-full max-w-xs md:max-w-sm drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
