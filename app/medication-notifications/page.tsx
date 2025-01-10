'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Label } from '@/components/ui'
import Navbar from "@/components/navbar"

export default function MedicationNotificationsPage() {
  const router = useRouter()
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Medication Notifications</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleAddMedication} className="space-y-4">
            <div>
              <Label htmlFor="medicationName">Medication Name</Label>
              <Input 
                id="medicationName" 
                name="name" 
                value={newMedication.name} 
                onChange={handleInputChange} 
                placeholder="Enter medication name"
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
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Add Medication</Button>
          </form>
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg">Scheduled Medications:</h3>
            {medications.length > 0 ? (
              <ul className="space-y-2">
                {medications.map((med, index) => (
                  <li key={index} className="bg-blue-50 p-3 rounded-md flex justify-between items-center">
                    <span className="font-medium">{med.name}</span>
                    <span className="text-gray-600">{med.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No medications scheduled yet.</p>
            )}
          </div>
        </div>
        <Button onClick={() => router.push('/')} className="mt-6">Back to Home</Button>
      </main>
    </div>
  )
}

