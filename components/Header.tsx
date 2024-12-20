import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/starplus-logo.png"
            alt="StarPlus - Centre de Diagnostique et Traitement"
            width={180}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="#services" className="text-gray-600 hover:text-blue-600">Services</Link></li>
          <li><Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
          <li><Link href="#book" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Now</Link></li>
        </ul>
      </nav>
    </header>
  )
}

