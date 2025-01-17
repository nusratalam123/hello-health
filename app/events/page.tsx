'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import { SearchBar } from "@/components/search-bar";
import { Card, CardContent, Button } from "@/components/ui";
import Image from "next/image";
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const eventsPerPage = 12;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://hello-health-backend.vercel.app/api/event/list');
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (searchParams: { location: string; hospital: string; designation: string }) => {
    const filtered = events.filter(event =>
      event.location.toLowerCase().includes(searchParams.location.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedEvents.map((event) => (
            <Card key={event._id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className={currentPage === page ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
