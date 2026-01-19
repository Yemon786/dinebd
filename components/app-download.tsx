import { Button } from "@/components/ui/button";

export default function AppDownload() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6">
              Download the <span className="text-orange-500">Dinebd App</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Find the perfect moment, enjoy your favorite food and preferences!
            </p>

            <div className="flex gap-4">
              <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg transition border border-orange-500">
                Register Now
              </Button>

              <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg transition border border-orange-500">
                Explore
              </Button>
            </div>
          </div>

          {/* Right - App Mockup */}
          <div className="flex justify-center">
            <img src="/app.png" alt="Dinebd App" />
          </div>
        </div>
      </div>
    </section>
  );
}
