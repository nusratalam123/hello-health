'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Heart, Activity, Thermometer, Droplet, AlertCircle } from 'lucide-react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface HealthData {
  age: number;
  cholesterol: number;
  bloodPressure: string;
  diabetes: boolean;
  temperature: number;
  heartRate: number;
}

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState<HealthData>({
    age: 0,
    cholesterol: 0,
    bloodPressure: '0/0',
    diabetes: false,
    temperature: 0,
    heartRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("User not logged in.");
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }
  
        setIsLoggedIn(true);
        const decodedToken = jwtDecode(token) as { id: string };
        const userID = decodedToken?.id;
  
        if (!userID) {
          console.error("User ID is undefined.");
          throw new Error("User ID not found in token.");
        }
  
        const response = await axios.get(
          `http://localhost:7000/api/health-suggestion/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.healthData) {
          const healthInfo = response.data.healthData;
          setHealthData({
            age: healthInfo.age,
            cholesterol: healthInfo.cholesterol,
            bloodPressure: healthInfo.bloodPressure,
            diabetes: healthInfo.diabetes,
            temperature: healthInfo.temperature,
            heartRate: healthInfo.heartRate,
          });
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 403) {
          setError('Access forbidden. Please log in again.');
          localStorage.removeItem('token'); // Clear the token
          setIsLoggedIn(false);
        } else {
          setError('Failed to load health data');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHealthData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error || !healthData) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error || 'No health data available'}
      </div>
    )
  }

  const metrics = [
    {
      icon: Heart,
      title: "Heart Rate",
      value: `${healthData.heartRate} BPM`,
      status: healthData.heartRate >= 60 && healthData.heartRate <= 100 ? "Normal" : "Review",
      color: healthData.heartRate >= 60 && healthData.heartRate <= 100 ? "green" : "yellow"
    },
    {
      icon: Activity,
      title: "Blood Pressure",
      value: healthData.bloodPressure,
      status: healthData.bloodPressure === "120/80" ? "Optimal" : "Review",
      color: healthData.bloodPressure === "120/80" ? "green" : "yellow"
    },
    {
      icon: Thermometer,
      title: "Temperature",
      value: `${healthData.temperature}°F`,
      status: healthData.temperature >= 97 && healthData.temperature <= 99 ? "Normal" : "Review",
      color: healthData.temperature >= 97 && healthData.temperature <= 99 ? "green" : "yellow"
    },
    {
      icon: Droplet,
      title: "Cholesterol",
      value: `${healthData.cholesterol} mg/dL`,
      status: healthData.cholesterol < 200 ? "Good" : "Review",
      color: healthData.cholesterol < 200 ? "green" : "yellow"
    }
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Health Dashboard</h2>
          {isLoggedIn ? (
            <p className="text-gray-600">
              Age: {healthData.age} years | {healthData.diabetes ? 'Diabetic' : 'Non-Diabetic'}
            </p>
          ) : (
            <p className="text-gray-600">Please log in to view your health data.</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <metric.icon className="h-8 w-8 text-red-600" />
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      metric.color === 'green'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {metric.status}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

