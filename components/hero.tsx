import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url('hero.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Delicious food delivered fast
            </h1>
            <p className="text-grey-500 text-lg mb-8">
              Or reserve a table at your favorite restaurants
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search restaurants or dishes"
                  className="w-full px-4 py-3 rounded-lg text-white-900 pl-4 placeholder-grey-100 bg-white"
                />
              </div>
              <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg flex items-center gap-2">
                Search
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg transition">
                Order Now
              </Button>

              <Button className="bg-[#ED7319] hover:bg-[#ED7319] text-white hover:font-bold px-9 py-5 rounded-lg transition">
                Book a Table
              </Button>
            </div>

            {/* Info Text */}
            <p className="text-sm text-white mt-6">
              ⚡Unlock discounts on big orders. delivery 25 mins 🚚
            </p>
          </div>

          {/* Right Image */}
          {/* <div className="hidden md:block">
            <img src="/delivery-person-with-food.jpg" alt="Delivery person" className="w-full rounded-lg" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
