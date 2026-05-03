import { UtensilsCrossed, ShoppingBag, Truck, Users, Home } from "lucide-react";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Book a Table",
    description: "Reserve your perfect dining experience at top restaurants",
  },
  {
    icon: ShoppingBag,
    title: "Takeaway",
    description: "Pre-order and collect your meal at the restaurant",
  },
  {
    icon: Truck,
    title: "Food Delivery",
    description: "Hot food delivered to your door in under 30 minutes",
  },
  {
    icon: Users,
    title: "Catering",
    description: "Professional catering for events and corporate gatherings",
  },
  {
    icon: Home,
    title: "Homemade",
    description: "Fresh meals crafted by local home chefs near you",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Everything You Need,{" "}
            <span className="text-orange-500">One App</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Five ways to enjoy great food — all seamlessly connected.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-orange-200 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="text-orange-500" size={26} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
