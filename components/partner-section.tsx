import { Button } from "@/components/ui/button"

export default function PartnerSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partner with Us</h2>
            <p className="text-gray-600 text-lg mb-8">
              Grow your restaurant with our delivery and table booking platform.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg">Register Now</Button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img src="/business-handshake-partnership.png" alt="Partnership" className="w-full max-w-md rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
