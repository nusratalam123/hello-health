'use client'

import { useState } from "react"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { Card } from "@/components/ui"
import { Switch } from "@/components/ui"

export default function HealthMetricsForm() {
  const [formData, setFormData] = useState({
    heartRate: '',
    ecg: '',
    temperature: '',
    weight: '',
    age: '',
    cholesterol: '',
    bloodPressure: '',
    diabetes: false,
    smoking: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Health Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
            <Input
              id="heartRate"
              type="number"
              value={formData.heartRate}
              onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ecg">ECG Reading</Label>
            <Input
              id="ecg"
              type="text"
              value={formData.ecg}
              onChange={(e) => setFormData({...formData, ecg: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => setFormData({...formData, temperature: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
            <Input
              id="cholesterol"
              type="number"
              value={formData.cholesterol}
              onChange={(e) => setFormData({...formData, cholesterol: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
            <Input
              id="bloodPressure"
              type="text"
              placeholder="120/80"
              value={formData.bloodPressure}
              onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
              className="border-red-200 focus:ring-red-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="diabetes"
                checked={formData.diabetes}
                onCheckedChange={(checked) => setFormData({...formData, diabetes: checked})}
              />
              <Label htmlFor="diabetes">Diabetes</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="smoking"
                checked={formData.smoking}
                onCheckedChange={(checked) => setFormData({...formData, smoking: checked})}
              />
              <Label htmlFor="smoking">Smoking</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Analyze Health Metrics
        </Button>
      </form>
    </Card>
  )
}

