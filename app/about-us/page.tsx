// export default function AboutUs() {
//   return <h1 className="text-center">Hi About Us Page</h1>;
// }
import { Button } from "@/components/ui/button";
import { Heart, Zap, TrendingUp, Users, Shield, Bell } from "lucide-react";

export const metadata = {
  title: "Dinebd - Connect Food Lovers With Restaurants",
  description: "Delivering convenience, quality, and reliability since 2020",
};

export default function AboutUs() {
  return (
    <main className="bg-white text-gray-800">
      {/* Center Title Section */}
      <div className="text-center max-w-3xl mx-auto px-4 pt-16">
        <h1 className="text-5xl md:text-6xl font-bold text-[#ED7319] leading-tight">
          Connect Food Lovers With Restaurants
        </h1>
        <p className="text-gray-600 text-lg">
          Delivering convenience, quality, and reliability since 2020
        </p>
      </div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* LEFT: Plate Image */}
          <div className="flex justify-center">
            <div className="ml-30 w-[420px] h-[420px] bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden">
              <img
                src="plate.jpg"
                alt="Salmon salad plate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-sm ml-auto">
            {/* BIG FIRST BUTTON */}
            <Button
              variant="outline"
              className="border-2  text-[#ED7319] hover:bg-[#ED7319] hover:py-10 hover:text-2xl hover:text-white font-semibold py-7 text-lg rounded-l-full rounded-r-none w-full transform translate-x-7 hover:translate-x-0 transition-all duration-300"
            >
              ORDER NOW
            </Button>

            {/* Other buttons (same shape but smaller) */}
            <Button
              variant="outline"
              className="border-2 text-[#ED7319] hover:bg-[#ED7319] hover:py-10 hover:text-2xl hover:text-white font-semibold py-7 text-lg rounded-l-full rounded-r-none w-full transform translate-x-7 hover:translate-x-0 transition-all duration-300"
            >
              BOOK A TABLE
            </Button>

            <Button
              variant="outline"
              className="border-2 text-[#ED7319] hover:bg-[#ED7319] hover:py-10 hover:text-2xl hover:text-white font-semibold py-7 text-lg rounded-l-full rounded-r-none w-full transform translate-x-7 hover:translate-x-0 transition-all duration-300"
            >
              TAKEAWAY
            </Button>

            <Button
              variant="outline"
              className="border-2  text-[#ED7319] hover:bg-[#ED7319] hover:py-10 hover:text-2xl hover:text-white font-semibold py-7 text-lg rounded-l-full rounded-r-none w-full transform translate-x-7 hover:translate-x-0 transition-all duration-300"
            >
              CATERING
            </Button>

            <Button
              variant="outline"
              className="border-2 text-[#ED7319] hover:bg-[#ED7319] hover:py-10 hover:text-2xl hover:text-white font-semibold py-7 text-lg rounded-l-full rounded-r-none w-full transform translate-x-7 hover:translate-x-0 transition-all duration-300"
            >
              HOMEMADE
            </Button>
          </div>
        </div>
      </section>
      <div className="h-10"></div> {/* Spacer */}
      {/* Our Story Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-700 mb-8">Our Story</h2>
          <p className="text-gray-600 leading-relaxed w-full text-justify">
            Dinebd was founded with a simple idea: everyone deserves fast,
            reliable, and enjoyable food delivery. We connect thousands of
            customers with trusted restaurants, home chefs, and catering
            services across Bangladesh. Our mission is to transform food
            delivery into a thriving community of food lovers, restaurant
            partners, and dedicated riders working together to bring quality
            meals to your doorstep.Dinebd was founded with a simple idea:
            everyone deserves fast, reliable, and enjoyable food delivery. We
            connect thousands of customers with trusted restaurants, home chefs,
            and catering services across Bangladesh. Our mission is to transform
            food delivery into a thriving community of food lovers, restaurant
            partners, and dedicated riders working together to bring quality
            meals to your doorstep.Dinebd was founded with a simple idea:
            everyone deserves fast, reliable, and enjoyable food delivery. We
            connect thousands of customers with trusted restaurants, home chefs,
            and catering services across Bangladesh. Our mission is to transform
            food delivery into a thriving community of food lovers, restaurant
            partners, and dedicated riders working together to bring quality
            meals to your doorstep.Dinebd was founded with a simple idea:
            everyone deserves fast, reliable, and enjoyable food delivery. We
            connect thousands of customers with trusted restaurants, home chefs,
            and catering services across Bangladesh. Our mission is to transform
            food delivery into a thriving community of food lovers, restaurant
            partners, and dedicated riders working together to bring quality
            meals to your doorstep.
          </p>
        </div>
      </section>
      <div className="h-10"></div> {/* Spacer */}
      {/* Our Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-700 mb-3">Our Mission</h2>

        <p className="text-[#ED7319] font-bold text-lg mb-0">
          To make food delivery faster, easier, and more accessible for everyone
        </p>
        <p className="text-gray-700">
          We believe in empowering restaurants through technology and building a
          community that values quality, trust, and convenience.We believe in
          empowering restaurants through technology and building a community
          that values quality, trust, and convenience.
        </p>
      </section>
      <div className="h-10"></div> {/* Spacer */}
      {/* Our Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-700 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Customer First */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Users className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                Every feature is built to make the experience smoother and more
                delightful.
              </p>
            </div>

            {/* Quality & Trust */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Bell className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Quality & Trust
              </h3>
              <p className="text-gray-600">
                Only verified restaurants and genuine reviews to ensure you get
                the best.
              </p>
            </div>

            {/* Innovation */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Constantly improving our technology and service to stay ahead.
              </p>
            </div>

            {/* Community Support */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Empowering local restaurants and home chefs to grow their
                business.
              </p>
            </div>

            {/* Growth */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <TrendingUp className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Growth</h3>
              <p className="text-gray-600">
                Creating opportunities for our partners and team members to
                thrive.
              </p>
            </div>

            {/* Reliability */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Shield className="w-10 h-10 text-[#ED7319]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Reliability
              </h3>
              <p className="text-gray-600">
                Consistent, on-time delivery you can depend on every single
                time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-10"></div> {/* Spacer */}
      {/* Community Section */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Be Part of Our Growing Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Want to grow with us? Join thousands of partners, riders, and team
            members transforming how people get their food.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="border-2 border-[#ED7319] text-[#ED7319] hover:bg-[#ED7319]  hover:text-white font-bold px-6 py-2 rounded-full bg-transparent"
            >
              Become a Partner
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#ED7319] text-[#ED7319] hover:bg-[#ED7319]  hover:text-white font-bold px-6 py-2 rounded-full bg-transparent"
            >
              Join as a Rider
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#ED7319] text-[#ED7319] hover:bg-[#ED7319] hover:text-white font-bold px-6 py-2 rounded-full bg-transparent"
            >
              Explore Careers
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
