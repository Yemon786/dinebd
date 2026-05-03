import {
  Heart,
  Zap,
  TrendingUp,
  Users,
  Shield,
  BadgeCheck,
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  Home,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us — Dinebd",
  description: "Delivering convenience, quality, and reliability since 2020",
};

export default function AboutUs() {
  return (
    <main className="bg-white text-gray-800">
      {/* Page hero */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Connecting Food Lovers
            <br />
            <span className="text-[#ED7319]">With Restaurants</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Delivering convenience, quality, and reliability across Bangladesh.
          </p>
        </div>
      </section>

      {/* What We Do — service cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Five Services, <span className="text-orange-500">One App</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to enjoy great food — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { icon: UtensilsCrossed, label: "Book a Table" },
              { icon: ShoppingBag, label: "Takeaway" },
              { icon: Truck, label: "Food Delivery" },
              { icon: Users, label: "Catering" },
              { icon: Home, label: "Homemade" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-3 transition-colors">
                  <Icon className="text-orange-500" size={22} />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-base">
            <p>
              Dinebd is a comprehensive dining platform revolutionising the way
              people in Bangladesh enjoy food. We seamlessly connect users with
              thousands of local restaurants, cafes, and home-based food
              providers — offering food delivery, table reservations, takeaways,
              homemade food, and catering services all in one place.
            </p>
            <p>
              Whether you&apos;re ordering your favourite meal for delivery,
              booking a table at a top restaurant, or enjoying the warmth of
              homemade cuisine, Dinebd makes dining easy and accessible for
              everyone.
            </p>
            <p>
              Our vision is to become the leading dining companion in Bangladesh
              — a platform where every culinary need is met, from quick delivery
              to discovering hidden gems in local dining. Through innovation and
              a genuine passion for food, we aspire to be the go-to destination
              for all things dining.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              To redefine the dining experience in Bangladesh by offering an
              all-in-one platform for food delivery, table booking, and more. We
              strive to make every meal convenient, accessible, and
              unforgettable — connecting food lovers with local culinary
              delights at the touch of a button.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Values
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The principles that guide everything we build and every decision
              we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Customer First",
                desc: "Every feature is built to make the experience smoother and more delightful for our users.",
              },
              {
                icon: BadgeCheck,
                title: "Quality & Trust",
                desc: "Only verified restaurants and genuine reviews to ensure you always get the best.",
              },
              {
                icon: Zap,
                title: "Innovation",
                desc: "Constantly improving our technology and service to stay ahead of what you need.",
              },
              {
                icon: Heart,
                title: "Community",
                desc: "Empowering local restaurants, home chefs, and riders to grow their businesses.",
              },
              {
                icon: TrendingUp,
                title: "Growth",
                desc: "Creating real opportunities for our partners, riders, and team to thrive.",
              },
              {
                icon: Shield,
                title: "Reliability",
                desc: "Consistent, on-time delivery and service you can depend on every single time.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="text-orange-500" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Be Part of Our Growing Community
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of partners, riders, and team members transforming
            how people enjoy food in Bangladesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/partner-with-us">
              <button className="bg-[#ED7319] hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Become a Partner
              </button>
            </Link>
            <Link href="/rider">
              <button className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Join as a Rider
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
