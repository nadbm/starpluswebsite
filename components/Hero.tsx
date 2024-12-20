import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional on-call medical services including blood tests, massage therapy, and physiotherapy.
          </p>
          <a href="#book" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Book an Appointment
          </a>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg"
            alt="Medical professionals"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  )
}

