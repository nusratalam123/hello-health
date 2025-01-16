'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { Plus, Clock, X, Bell } from 'lucide-react'

interface Medication {
  id: string;
  name: string;
  times: string[];
}

export default function MedicationSchedule() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState<Omit<Medication, 'id'>>({
    name: '',
    times: ['']
  })

  const handleAddTime = () => {
    setNewMedication(prev => ({
      ...prev,
      times: [...prev.times, '']
    }))
  }

  const handleRemoveTime = (index: number) => {
    setNewMedication(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }))
  }

  const handleTimeChange = (value: string, index: number) => {
    setNewMedication(prev => ({
      ...prev,
      times: prev.times.map((time, i) => i === index ? value : time)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMedication.name && newMedication.times.every(time => time)) {
      const newMed: Medication = {
        id: Date.now().toString(),
        ...newMedication
      }
      setMedications(prev => [...prev, newMed])
      setNewMedication({ name: '', times: [''] })
    }
  }

  const handleDelete = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Medication Schedule</h2>
            <p className="text-gray-600">Set up reminders for your medications</p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Medication</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="medicationName">Medication Name</Label>
                  <Input
                    id="medicationName"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter medication name"
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Reminder Times</Label>
                  {newMedication.times.map((time, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => handleTimeChange(e.target.value, index)}
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleRemoveTime(index)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTime}
                    className="w-full mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Time
                  </Button>
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Save Medication
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-red-600 mr-2" />
                      <h3 className="font-semibold text-lg">{medication.name}</h3>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 sm:text-sm"
                      onClick={() => handleDelete(medication.id)}
                      >
                    <X className="h-4 w-4" />
                   </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {medication.times.map((time, timeIndex) => (
                      <span
                        key={timeIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-50 text-red-700"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {time}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {medications.length === 0 && (
            <Card className="bg-gray-50 border-dashed">
              <CardContent className="p-6 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No medications scheduled yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

