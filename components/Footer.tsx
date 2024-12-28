import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">OnCall Clinic</h3>
            <p className="text-gray-400">
              Professional medical services at your doorstep.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="#book" className="text-gray-400 hover:text-white">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-400">
              501, 998 boulevard de saint Laurent est, H2S 9Y9
            </p>
            <p className="text-gray-400">Email: info@starpluscentre.com</p>
            <p className="text-gray-400">Phone: </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Starplus Centre. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
