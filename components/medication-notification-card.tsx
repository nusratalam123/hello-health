'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"
import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { Label } from "@/components/ui"

export function MedicationNotificationCard() {
  const [medications, setMedications] = useState<{ name: string; time: string }[]>([])
  const [newMedication, setNewMedication] = useState({ name: '', time: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedication({ ...newMedication, [e.target.name]: e.target.value })
  }

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication.name && newMedication.time) {
      setMedications([...medications, newMedication])
      setNewMedication({ name: '', time: '' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddMedication} className="space-y-4">
          <div>
            <Label htmlFor="medicationName">Medication Name</Label>
            <Input 
              id="medicationName" 
              name="name" 
              value={newMedication.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <Label htmlFor="medicationTime">Time</Label>
            <Input 
              id="medicationTime" 
              name="time" 
              type="time" 
              value={newMedication.time} 
              onChange={handleInputChange} 
            />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Add Medication</Button>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Scheduled Medications:</h3>
          <ul className="space-y-2">
            {medications.map((med, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded">
                {med.name} - {med.time}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

