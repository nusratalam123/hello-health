'use client'

import Link from "next/link"
import { Button } from "@/components/ui"
import { Heart } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-red-600" />
          <span className="font-bold text-xl">HelloHeart</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-red-600">Home</Link>
          <Link href="/about-us" className="text-gray-600 hover:text-red-600">About Us</Link>
          <Link href="/service" className="text-gray-600 hover:text-red-600">Services</Link>
          <Link href="/events" className="text-gray-600 hover:text-red-600">Events</Link>
          <Link href="/health-food" className="text-gray-600 hover:text-red-600">Events</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-red-600">Appointments</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-red-600 hover:bg-red-700">Register</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

