'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@/components/ui';
import Navbar from '@/components/navbar';
import axios from 'axios';

// Define the type for the API response
interface ApiResponse {
  food: string;
  confidence: number;
  suitability: string;
  message: string;
}

export default function HealthSuggestionsPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null); // Explicitly typed state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    setResponse(null); // Clear previous response
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const res = await axios.post('http://localhost:7000/api/food-analysis/upload-food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(res.data); // Save the response with the correct type
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to submit. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Health Suggestions</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            <Label htmlFor="reportFile">Upload Food Image</Label>
            <Input
              id="reportFile"
              type="file"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isUploading}>
            {isUploading ? 'Submitting...' : 'Get Suggestion'}
          </Button>
        </form>

        {/* Show the API response */}
        {response && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
            <p><strong>Food:</strong> {response.food}</p>
            <p><strong>Confidence:</strong> {(response.confidence * 100).toFixed(2)}%</p>
            <p><strong>Suitability:</strong> {response.suitability}</p>
            <p><strong>Message:</strong> {response.message}</p>
          </div>
        )}

        <Button onClick={() => router.push('/')} className="mt-6 bg-gray-200 text-gray-700 hover:bg-gray-300">
          Back to Home
        </Button>
      </main>
    </div>
  );
}
