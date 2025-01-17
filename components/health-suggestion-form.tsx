'use client'

import { useState } from 'react'
import { Button, Input, Textarea, Label } from '@/components/ui'

export function HealthSuggestionForm() {
  const [healthData, setHealthData] = useState({
    age: '',
    cholesterol: '',
    bloodPressure: '',
    diabetes: false,
    temperature: '',
    heartRate: ''
  })
  const [foodImage, setFoodImage] = useState<File | null>(null)
  const [suggestion, setSuggestion] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setHealthData({ ...healthData, [e.target.name]: value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoodImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/health/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(healthData),
      })
      const data = await response.json()
      setSuggestion(data.suggestion)

      // Submit health data
      await fetch('http://localhost:5000/api/health/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(healthData),
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <Input id="diabetes" name="diabetes" type="checkbox" checked={healthData.diabetes} onChange={handleInputChange} />
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
        <Input 
          id="foodImage" 
          type="file" 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Get Suggestion</Button>
      {suggestion && (
        <div>
          <Label>Suggestion</Label>
          <Textarea className="mt-1" value={suggestion} readOnly rows={4} />
        </div>
      )}
      <div>
    {foodImage && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={URL.createObjectURL(foodImage)} alt="Uploaded Image" />
    )}
  </div>
    </form>
    
  )
}

