import { TestTube, GiftIcon as Massage, Activity } from 'lucide-react'

const services = [
  {
    title: "Blood Tests",
    description: "Comprehensive blood analysis in the comfort of your home.",
    icon: TestTube
  },
  {
    title: "Massage Therapy",
    description: "Relax and rejuvenate with our professional massage services.",
    icon: Massage
  },
  {
    title: "Physiotherapy",
    description: "Personalized treatment plans to improve mobility and reduce pain.",
    icon: Activity
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <service.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

