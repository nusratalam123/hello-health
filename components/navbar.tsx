'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import { Heart } from 'lucide-react'
import { jwtDecode } from "jwt-decode"

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null)
  const router = useRouter()

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode<{ name: string }>(token)
        setUserName(decodedToken.name) // Set the username from token
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token') // Remove token from storage
    setUserName(null) // Clear username state
    router.push('/login') // Redirect to login page
  }

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
          <Link href="/health-food" className="text-gray-600 hover:text-red-600">Health Suggestion</Link>
          <Link href="/appointments" className="text-gray-600 hover:text-red-600">Appointments</Link>
        </div>

        <div className="flex items-center space-x-4">
          {userName ? (
            <>
              <span className="text-gray-600">Hello, {userName}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-red-600 hover:bg-red-700">Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
