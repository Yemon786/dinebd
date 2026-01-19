import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RiderSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center order-2 md:order-1">
            <img
              src="/rider_us.jpg"
              alt="Delivery Rider"
              className="w-full max-w-md rounded-2xl p-8"
            />
          </div>

          {/* Right Content */}
          <div className="order-1 md:order-2 ">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-right">
              Become a <span className="text-orange-500">Rider</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 text-right">
              Grow your restaurant with our delivery and table booking platform.
            </p>
            <div className="flex justify-end">
              <Link href="/rider">
                <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
