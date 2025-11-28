import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Dinebd</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              About Us
            </Link>
            <Link href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Contact Us
            </Link>
          </nav>

          {/* Download Button */}
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">Download</Button>
        </div>
      </div>
    </header>
  )
}
