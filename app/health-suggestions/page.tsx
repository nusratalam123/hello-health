'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Textarea, Label } from '@/components/ui'
import Navbar from "@/components/navbar"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function HealthSuggestionsPage() {
  const router = useRouter()
  const [healthData, setHealthData] = useState({
    userID: '',
    age: '',
    cholesterol: '',
    bloodPressure: '',
    diabetes: '',
    temperature: '',
    heartRate: ''
  })
  const [reportFile, setReportFile] = useState<File | null>(null)
  const [suggestion, setSuggestion] = useState('')
  const [condition, setCondition] = useState('')
  const [feedback, setFeedback] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch existing health data on component mount
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token",token)
        let userID: string | undefined; // Declare userID once

        if (token) {
          const decodedToken = jwtDecode(token) as { id: string };
          userID = decodedToken.id; // Assign to the existing userID variable
          console.log("Decoded UserID:", userID);
        }

        if (!userID) {
          console.error("User ID is undefined. Cannot make the request.");
          throw new Error("User ID not found in token");
        }
        const response = await axios.get(`http://localhost:7000/api/health-data/single/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
          }
        })

  
        if (response.status === 200 && response.data.data.length > 0) {
          const healthInfo = response.data.data[0] 
          console.log("healthdata",healthInfo)
          setHealthData({
            userID: healthInfo.userID,
            age: healthInfo.age.toString(),
            cholesterol: healthInfo.cholesterol.toString(),
            bloodPressure: healthInfo.bloodPressure.toString(),
            diabetes: healthInfo.diabetes ? 'true' : 'false',
            temperature: healthInfo.temperature.toString(),
            heartRate: healthInfo.heartRate.toString()
          })
          

        }
      } catch (error) {
        console.error('Error fetching health data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHealthData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthData({ ...healthData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const formData = new FormData()
      console.log("healthdata1",healthData)

      // Append health data to formData
      Object.keys(healthData).forEach((key) => {
        formData.append(key, healthData[key as keyof typeof healthData])
      })

      // Append report file if available
      if (reportFile) {
        formData.append('report', reportFile)
      }

      const decodedToken: { userId: string } = jwtDecode(localStorage.getItem('token') || '');  
      console.log("decode",decodedToken.userId)

      // const token = localStorage.getItem('token');
      // if (token) {
      //    const decodedToken = jwtDecode(token) as { userId: string };
      //    const userID = decodedToken.userId; 
      //    setHealthData((prev) => ({ ...prev, userID })); 
      // }

      if (decodedToken && decodedToken.userId) {
        formData.append('userID', decodedToken.userId);
      }

      const response = await axios.post('http://localhost:7000/api/health-data/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        },
        body: formData
      })

      const data = response.data

      // Update states with the response data
      setSuggestion(data.message)
      setCondition(data.condition)
      setFeedback(data.feedback || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Health Suggestions</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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

          <div className="space-y-2">
            <Label htmlFor="reportFile">Upload Medical Report (Optional)</Label>
            <Input 
              id="reportFile" 
              type="file" 
              onChange={(e) => setReportFile(e.target.files ? e.target.files[0] : null)} 
              accept=".pdf,.png,.jpg,.jpeg"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isUploading}>
            {isUploading ? 'Submitting...' : 'Get Suggestion'}
          </Button>
        </form>

        {condition && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-red-600">Condition: {condition}</h3>
            <h4 className="text-lg font-semibold mt-4">Feedback:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {feedback.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {suggestion && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <Label>Health Suggestion</Label>
            <Textarea className="mt-1" value={suggestion} readOnly rows={6} />
          </div>
        )}

        <Button onClick={() => router.push('/')} className="mt-6">
          Back to Home
        </Button>
      </main>
    </div>
  )
}
