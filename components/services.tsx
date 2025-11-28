import { UtensilsCrossed, Layout as Takeout, Users, Home } from "lucide-react"

const services = [
  {
    icon: UtensilsCrossed,
    title: "Book a table",
    description: "Book your perfect venue from a selection of restaurants and cuisines",
  },
  {
    icon: Takeout,
    title: "Takeaway",
    description: "Reserve your order from a restaurant of your choice",
  },
  {
    icon: Users,
    title: "Catering",
    description: "We cater corporate meetings, family gatherings and more",
  },
  {
    icon: Home,
    title: "Homemade food",
    description: "Order meals prepared fresh from chefs at your locality",
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">
          <span className="text-orange-500">Our</span> Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="text-orange-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
