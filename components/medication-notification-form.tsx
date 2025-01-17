'use client'

import { useState, useEffect } from 'react'
import { Button, Input, Label } from '@/components/ui'
import axios from 'axios';

export function MedicationNotificationForm() {
  const [medications, setMedications] = useState<{ name: string; time: string }[]>([])
  const [newMedication, setNewMedication] = useState({ name: '', time: '' })

  useEffect(() => {
    fetchMedications()
  }, [])

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medication/list')
      const data = response.data
      setMedications(data)
    } catch (error) {
      console.error('Error fetching medications:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedication({ ...newMedication, [e.target.name]: e.target.value })
  }

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication.name && newMedication.time) {
      try {
        await fetch('http://localhost:5000/api/medication/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMedication),
        })
        setNewMedication({ name: '', time: '' })
        fetchMedications()
      } catch (error) {
        console.error('Error adding medication:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
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
      <div>
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
  )
}

