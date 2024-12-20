import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montser = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="bg-brand shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center bg-brand">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="StarPlus - Centre de Diagnostique et Traitement"
            width={180}
            height={50}
            className="h-14 w-auto"
            priority
          />
          <h1 className="ml-1 text-xl" style={{ letterSpacing: "1px" }}>
            <span className={montser.className} style={{ color: "white" }}>
              STARPLUS
            </span>
          </h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="#services"
              className={`${montser.className} text-white hover:text-gray-200`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className={`${montser.className} text-white hover:text-gray-200`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="#book"
              className={`${montser.className} bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700`}
            >
              Book Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
