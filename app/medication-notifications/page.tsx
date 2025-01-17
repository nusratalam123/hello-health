'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@/components/ui';
import Navbar from "@/components/navbar";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the Medication type
type Medication = {
  name: string;
  times: string[];
};

// Function to fetch medications from the backend
const fetchMedications = async (
  userID: string,
  setMedications: (medications: Medication[]) => void
): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://hello-health-backend.vercel.app/api/medications/list/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMedications(response.data.medications);
  } catch (error) {
    console.log('Error fetching medications:', error);
  }
};

// Function to add medications to the backend
const addMedications = async (
  userID: string,
  medications: Medication[],
  setMedications: (medications: Medication[]) => void
): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(
      ` hello-health-backend.vercel.app/api/medications/add/${userID}`,
      { medications },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert('Medications added successfully!');
    fetchMedications(userID, setMedications);
  } catch (error) {
    console.error('Error adding medications:', error);
  }
};

export default function MedicationNotificationsPage() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState<Medication>({ name: '', times: [''] });
  const [userID, setUserID] = useState<string | null>(null);

  // Retrieve token and decode user ID on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<{ id: string }>(storedToken);
        setUserID(decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Fetch medications when userID is available
  useEffect(() => {
    if (userID) {
      fetchMedications(userID, setMedications);
    }
  }, [userID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === 'times' && index !== undefined) {
      const updatedTimes = [...newMedication.times];
      updatedTimes[index] = value;
      setNewMedication({ ...newMedication, times: updatedTimes });
    } else {
      setNewMedication({ ...newMedication, [name]: value });
    }
  };

  const handleAddTime = () => {
    setNewMedication({ ...newMedication, times: [...newMedication.times, ''] });
  };

  const handleRemoveTime = (index: number) => {
    const updatedTimes = newMedication.times.filter((_, i) => i !== index);
    setNewMedication({ ...newMedication, times: updatedTimes });
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedication.name && newMedication.times.length > 0 && userID) {
      addMedications(userID, [...medications, newMedication], setMedications);
      setNewMedication({ name: '', times: [''] });
    }
  };

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
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter medication name"
              />
            </div>
            <div>
              <Label>Times</Label>
              {newMedication.times.map((time, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    name="times"
                    type="time"
                    value={time}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveTime(index)}
                      className="bg-red-500"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={handleAddTime} className="bg-green-500">
                Add Another Time
              </Button>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add Medication
            </Button>
          </form>
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg">Scheduled Medications:</h3>
            {medications.length > 0 ? (
              <ul className="space-y-2">
                {medications.map((med, index) => (
                  <li key={index} className="bg-blue-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{med.name}</span>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold">Times:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {med.times.map((time, i) => (
                          <li key={i}>{time}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No medications scheduled yet.</p>
            )}
          </div>
        </div>
        <Button onClick={() => router.push('/')} className="mt-6">
          Back to Home
        </Button>
      </main>
    </div>
  );
}
