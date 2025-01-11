import { Heart } from 'lucide-react'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">HeartCare</span>
            </div>
            <p className="text-gray-400">
              Providing comprehensive heart health monitoring and care services.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 Health Street</p>
              <p>City, State 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@heartcare.com</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-white">About Us</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">Services</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">Appointments</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-white">Facebook</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">Twitter</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">LinkedIn</Link>
              <Link href="#" className="block text-gray-400 hover:text-white">Instagram</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HeartCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

