'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button } from "@/components/ui";
import { Quote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

interface Testimonial {
  _id: string;
  message: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of testimonials to show initially
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/testimonial/list');
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more testimonials each time
  };

  return (
    <section className="py-20 bg-white">
        <Navbar></Navbar>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Patients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, visibleCount).map((testimonial) => (
            <Card key={testimonial._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-red-600 mb-4" />
                <p className="text-gray-600 mb-4">{testimonial.message}</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <div className="text-center mt-8">
            <Button onClick={handleLoadMore} className="bg-red-600 hover:bg-red-700">
              Load More
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <Button
            onClick={() => router.push('/add-testimonial')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Your Testimonial
          </Button>
        </div>
      </div>
    </section>
  );
}
