'use client'

import { useState } from 'react'
import Navbar from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent } from "@/components/ui"
import { Button } from "@/components/ui"
import Image from "next/image"

// Mock data for events
const events = Array(24).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Health Seminar ${i + 1}`,
  date: new Date(2023, 6, i + 1).toLocaleDateString(),
  location: 'City Medical Center',
  image: '/placeholder.svg',
}))

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredEvents, setFilteredEvents] = useState(events)

  const eventsPerPage = 12
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  const handleSearch = (searchParams: { location: string; hospital: string; designation: string }) => {
    const filtered = events.filter(event => 
      event.location.toLowerCase().includes(searchParams.location.toLowerCase()) ||
      event.location.toLowerCase().includes(searchParams.hospital.toLowerCase())
      // Note: We don't have designation data for events, so we're not filtering by it
    )
    setFilteredEvents(filtered)
    setCurrentPage(1)
  }

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
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
  )
}

