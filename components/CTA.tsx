export default function CTA() {
  return (
    <section id="book" className="bg-brand py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Book Your Appointment?
        </h2>
        <p className="text-xl text-sky-100 mb-8">
          Our medical professionals are available 24/7 to serve you.
        </p>
        <a
          href="tel:+5157181691"
          className="bg-white text-sky-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-sky-50 transition duration-300"
        >
          Call Now: 515-718-1691
        </a>
      </div>
    </section>
  );
}
