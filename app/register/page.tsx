'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Switch } from "@/components/ui"
import Navbar from "@/components/navbar"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    diabetes: false,
    cholesterol: '',
    bloodPressure: '',
    smoking: false,
    heartRate: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.age) newErrors.age = 'Age is required'
    if (!formData.cholesterol) newErrors.cholesterol = 'Cholesterol rate is required'
    if (!formData.bloodPressure) newErrors.bloodPressure = 'Blood pressure is required'
    if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Cholesterol Rate *</Label>
                  <Input
                    id="cholesterol"
                    type="number"
                    value={formData.cholesterol}
                    onChange={(e) => setFormData({...formData, cholesterol: e.target.value})}
                    className={errors.cholesterol ? "border-red-500" : ""}
                  />
                  {errors.cholesterol && <p className="text-sm text-red-500">{errors.cholesterol}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure *</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                    className={errors.bloodPressure ? "border-red-500" : ""}
                  />
                  {errors.bloodPressure && <p className="text-sm text-red-500">{errors.bloodPressure}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (BPM) *</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    className={errors.heartRate ? "border-red-500" : ""}
                  />
                  {errors.heartRate && <p className="text-sm text-red-500">{errors.heartRate}</p>}
                </div>

                <div className="space-y-2 flex items-center">
                  <div className="flex-1">
                    <Label>Diabetes</Label>
                    <Switch
                      checked={formData.diabetes}
                      onCheckedChange={(checked) => setFormData({...formData, diabetes: checked})}
                    />
                  </div>
                </div>

                <div className="space-y-2 flex items-center">
                  <div className="flex-1">
                    <Label>Smoking</Label>
                    <Switch
                      checked={formData.smoking}
                      onCheckedChange={(checked) => setFormData({...formData, smoking: checked})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Register
              </Button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-red-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

