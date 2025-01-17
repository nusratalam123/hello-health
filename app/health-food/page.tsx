'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Switch } from '@/components/ui';
import { AlertTriangle, Heart, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { jwtDecode } from 'jwt-decode';

// Define types for health metrics and health condition
interface HealthMetrics {
  age: number;
  cholesterol: number;
  bloodPressure: string;
  normalBloodPressure: string;
  diabetes: number;
  smoking: boolean;
  kidneyDisease: boolean;
  temperature: number;
  heartRate: number;
}

type HealthCondition = 'good' | 'moderate' | 'bad';

export default function HealthSuggestionsPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [healthData, setHealthData] = useState<HealthMetrics>({
    age: 0,
    cholesterol: 0,
    bloodPressure: '',
    normalBloodPressure: '',
    diabetes: 0,
    smoking: false,
    kidneyDisease: false,
    temperature: 0,
    heartRate: 0,
  });
  const [condition, setCondition] = useState<HealthCondition | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [goodFoods, setGoodFoods] = useState<{ name: string; image: string; benefits: string }[]>([]);
  const [riskyFoods, setRiskyFoods] = useState<{ name: string; image: string; benefits: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch token and decode user ID on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken) as { id: string };
        setUserID(decodedToken.id);
        console.log('Decoded UserID:', decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userID) return;

    const fetchHealthData = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/health-suggestion/user/${userID}`);
        if (response.data.healthData) {
          setHealthData(response.data.healthData);
        }
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
  }, [userID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID) {
      console.error('User ID is undefined. Cannot submit data.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/health-suggestion/analyze', {
        userID,
        ...healthData,
      });

      setCondition(response.data.condition);
      setFeedback(response.data.feedback);
      setGoodFoods(response.data.goodFoods);
      setRiskyFoods(response.data.riskyFoods);

      alert('Health data analyzed and updated successfully!');
    } catch (error) {
      console.error('Error submitting health data:', error);
      alert('Failed to analyze health data. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading health data...</p>
      </div>
    );
  }

  if (!token || !userID) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to access your health data.</p>
      </div>
    );
  }

  const getConditionDisplay = () => {
    if (!condition) return null;

    const config = {
      good: {
        icon: ThumbsUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        title: 'Good Condition',
        description: 'Your health metrics look good! Here are some foods to maintain your health:',
      },
      moderate: {
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        title: 'Moderate Risk',
        description: 'Some health metrics need attention. Here are foods to include and avoid:',
      },
      bad: {
        icon: Heart,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        title: 'High Risk',
        description: 'Your health metrics indicate high risk. Please follow these dietary recommendations carefully:',
      },
    };

    const { icon: Icon, color, bgColor, title, description } = config[condition];

    return (
      <div className="mt-8 space-y-6">
        <Card className={bgColor}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display feedback */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Feedback</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Recommended Foods */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">Recommended Foods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {goodFoods.map((food, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={food.image} alt={food.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{food.name}</h4>
                    <p className="text-sm text-gray-600">{food.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Show Risky Foods for moderate and bad conditions */}
          {(condition === 'moderate' || condition === 'bad') && (
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4">Foods to Avoid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {riskyFoods.map((food, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={food.image} alt={food.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{food.name}</h4>
                      <p className="text-sm text-gray-600">{food.benefits}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading health data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
       <Navbar />
      <div className="container mx-auto px-4 pt-24 mb-2">
        <h1 className="text-3xl font-bold text-center mb-8">Health Analysis & Food Suggestions</h1>

        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Enter Your Health Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={healthData.age || ''}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, age: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                  <Input
                    id="cholesterol"
                    type="number"
                    value={healthData.cholesterol || ''}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, cholesterol: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure (systolic/diastolic)</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={healthData.bloodPressure}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, bloodPressure: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="normalBloodPressure">Normal Blood Pressure (systolic/diastolic)</Label>
                  <Input
                    id="normalBloodPressure"
                    placeholder="120/80"
                    value={healthData.normalBloodPressure}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, normalBloodPressure: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={healthData.heartRate || ''}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, heartRate: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={healthData.temperature || ''}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, temperature: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="diabetes">Diabetes Point</Label>
                  <Input
                    id="diabetes"
                    type="number"
                    step="0.1"
                    value={healthData.diabetes || ''}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, diabetes: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="smoking">Smoking</Label>
                  <Switch
                    id="smoking"
                    checked={healthData.smoking}
                    onCheckedChange={(checked) => setHealthData((prev) => ({ ...prev, smoking: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="kidneyDisease">Kidney Disease</Label>
                  <Switch
                    id="kidneyDisease"
                    checked={healthData.kidneyDisease}
                    onCheckedChange={(checked) => setHealthData((prev) => ({ ...prev, kidneyDisease: checked }))}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Analyze Health & Get Food Suggestions
              </Button>
            </form>
          </CardContent>
        </Card>

        {getConditionDisplay()}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
