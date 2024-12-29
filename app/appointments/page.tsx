'use client'

import { useState } from 'react'
import Navbar from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { DoctorCard } from "@/components/doctor-card"
import { Button } from "@/components/ui"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui"

// Mock data for doctors
const doctors = Array(24).fill(null).map((_, i) => ({
  id: i + 1,
  name: `Dr. John Doe ${i + 1}`,
  specialty: 'Cardiologist',
  hospital: 'Heart Care Hospital',
  image: '/placeholder.svg',
}))

export default function AppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)

  const doctorsPerPage = 12
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage)

  const handleSearch = (searchParams: { location: string; hospital: string; designation: string }) => {
    const filtered = doctors.filter(doctor => 
      doctor.hospital.toLowerCase().includes(searchParams.hospital.toLowerCase()) &&
      doctor.specialty.toLowerCase().includes(searchParams.designation.toLowerCase())
      // Note: We don't have location data in our mock data, so we're not filtering by it
    )
    setFilteredDoctors(filtered)
    setCurrentPage(1)
  }

  const handleBookAppointment = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor)
    setIsBookingModalOpen(true)
  }

  const confirmBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed for:', selectedDoctor)
    setIsBookingModalOpen(false)
  }

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Find a Doctor</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              hospital={doctor.hospital}
              image={doctor.image}
              onBookAppointment={() => handleBookAppointment(doctor)}
            />
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
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              You are about to book an appointment with {selectedDoctor?.name}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmBooking} className="bg-red-600 hover:bg-red-700">Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

