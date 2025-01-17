'use client';

import React, { useState, useEffect } from 'react'; // Ensure React is imported
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Label } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Navbar from "@/components/navbar";
import { Calendar } from 'lucide-react';

// Define form data type
interface AppointmentFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  additionalInfo: string;
}

const BookAppointmentPage: React.FC = () => {  // Ensure it's a React functional component
  const router = useRouter();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<{ name: string; specialty: string; hospital: string } | null>(null);
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    additionalInfo: '',
  });

  useEffect(() => {
    // Fetch doctor details using doctorId
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`hello-health-backend.vercel.app/api/doctor/single/${doctorId}`);

        // const response = await axios.get(`http://localhost:7000/api/doctor/single/${doctorId}`);
        console.log("doctor",response.data.doctor);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      // Send appointment data to the backend
      await axios.post('hello-health-backend.vercel.app/api/appointment/book', {
        ...formData,
        doctorId,
      });

      alert('Appointment booked successfully!');
      router.push('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Make An Appointment</CardTitle>
              {doctor && (
                <p className="text-sm text-gray-500">
                  Booking appointment with <strong>{doctor.name}</strong> ({doctor.specialty}, {doctor.hospital})
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Any specific concerns or requirements..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Book Appointment
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookAppointmentPage;
