import { Button } from "@/components/ui/button"

export default function RiderSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center order-2 md:order-1">
            <img
              src="/delivery-rider-on-scooter.jpg"
              alt="Delivery Rider"
              className="w-full max-w-md rounded-2xl bg-blue-100 p-8"
            />
          </div>

          {/* Right Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Become a <span className="text-orange-500">Rider</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Grow your restaurant with our delivery and table booking platform.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg">Register Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
