'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"
import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { Label } from "@/components/ui"
import { Textarea } from "@/components/ui"

export function HealthSuggestionCard() {
  const [healthData, setHealthData] = useState({
    age: '',
    cholesterol: '',
    bloodPressure: '',
    diabetes: '',
    temperature: '',
    heartRate: ''
  })
  const [foodImage, setFoodImage] = useState<File | null>(null)
  const [suggestion, setSuggestion] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoodImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend for analysis
    // For demonstration, we'll just set a mock suggestion
    setSuggestion(`Based on your health metrics (Age: ${healthData.age}, Cholesterol: ${healthData.cholesterol}, etc.), we recommend maintaining a balanced diet and regular exercise. ${foodImage ? "Regarding the uploaded food image, please consult with a nutritionist for personalized advice." : ""}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" value={healthData.age} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="cholesterol">Cholesterol</Label>
              <Input id="cholesterol" name="cholesterol" value={healthData.cholesterol} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="bloodPressure">Blood Pressure</Label>
              <Input id="bloodPressure" name="bloodPressure" value={healthData.bloodPressure} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="diabetes">Diabetes</Label>
              <Input id="diabetes" name="diabetes" value={healthData.diabetes} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" name="temperature" value={healthData.temperature} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="heartRate">Heart Rate</Label>
              <Input id="heartRate" name="heartRate" value={healthData.heartRate} onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="foodImage">Upload Food Image</Label>
            <Input id="foodImage" type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Get Suggestion</Button>
        </form>
        {suggestion && (
          <Textarea className="mt-4" value={suggestion} readOnly />
        )}
      </CardContent>
    </Card>
  )
}

