'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import Navbar from "@/components/navbar"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.password) newErrors.password = 'Password is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      setErrorMessage(null)
      setSuccessMessage(null)

      try {
        const response = await axios.post("hello-health-backend.vercel.app/api/auth/login", formData, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Enable if backend uses cookies
        })

        if (response.status === 200) {
          // Store token in local storage
          localStorage.setItem('token', response.data.data.token)

          // Display success message and redirect
          setSuccessMessage("Login successful!")
          setTimeout(() => {
            router.push('/') // Redirect to homepage or dashboard
          }, 1000)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Handle the error as an instance of Error
          console.log((error as Error).message);
        } else {
          // Handle the error as an unknown type
          console.log('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
              {successMessage && <p className="text-sm text-green-500 text-center">{successMessage}</p>}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-red-600 hover:underline">
                  Register here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
