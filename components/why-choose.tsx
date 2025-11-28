import { Zap, Clock, MapPin, Star } from "lucide-react"

const reasons = [
  {
    icon: Zap,
    title: "Lightning Delivery",
    description: "Get food or your door in 30 minutes",
  },
  {
    icon: Clock,
    title: "Book Instantly",
    description: "Reserve the best tables in just one tab",
  },
  {
    icon: MapPin,
    title: "Local Restaurants",
    description: "Find trusted restaurants across your area",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Real customer reviews from real diners",
  },
]

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "10,000+", label: "Restaurant Partners" },
  { number: "1,500+", label: "Active Riders" },
]

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">
          Why Millions Choose <span className="text-orange-500">Dinebd</span>
        </h2>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div key={index} className="bg-white p-8 rounded-lg text-center border border-gray-200">
                <div className="flex justify-center mb-4">
                  <Icon className="text-orange-500" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-5xl font-bold text-orange-500 mb-2">{stat.number}</p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
