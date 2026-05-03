import { Zap, Clock, MapPin, Star } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Delivery",
    description: "Food delivered to your doorstep in under 30 minutes",
  },
  {
    icon: Clock,
    title: "Instant Table Booking",
    description: "Reserve the best tables in seconds from the app",
  },
  {
    icon: MapPin,
    title: "Local Restaurants",
    description: "Discover verified restaurants across your area",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Authentic ratings from real, verified customers",
  },
];

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "10,000+", label: "Restaurant Partners" },
  { number: "1,500+", label: "Active Riders" },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Why People Choose{" "}
            <span className="text-primary">Dinebd</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Built for food lovers, trusted by restaurants, powered by riders.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-white p-8 rounded-xl text-center border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-5 transition-colors">
                  <Icon className="text-primary" size={26} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats — contained card with dividers */}
        <div className="bg-white border border-gray-200 rounded-2xl grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 text-center">
              <p className="text-5xl font-bold text-primary mb-2">
                {stat.number}
              </p>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
