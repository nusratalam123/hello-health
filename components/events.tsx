'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Image from "next/image";
import axios from 'axios';


interface Event {
  _id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://hello-health-backend.vercel.app/api/event/list');
        setEvents(response.data.events.slice(0, 3)); // Show only the first 3 events
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Events and News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="text-red-600 font-bold">{event.date}</div>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          {/* <Button onClick={() => router.push('/events')} className="bg-red-600 hover:bg-red-700">
            View All Events
          </Button> */}
        </div>
      </div>
    </section>
  );
}
