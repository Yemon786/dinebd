import { Button } from "@/components/ui/button"

export default function AppDownload() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Download the <span className="text-orange-500">Dinebd App</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Find the perfect moment, enjoy your favorite food and preferences!
            </p>

            <div className="flex gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg bg-transparent"
              >
                Explore
              </Button>
            </div>
          </div>

          {/* Right - App Mockup */}
          <div className="flex justify-center">
            <img
              src="/mobile-app-mockup-dinebd.jpg"
              alt="Dinebd App"
              className="w-full max-w-xs rounded-3xl shadow-2xl border-8 border-gray-800"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
