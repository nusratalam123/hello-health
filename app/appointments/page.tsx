'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import { SearchBar } from "@/components/search-bar";
import { DoctorCard } from "@/components/doctor-card";
import { Button } from "@/components/ui";


// Define Doctor type
interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  hospital: string;
  image: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const doctorsPerPage = 12;
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // Fetch doctors from the backend when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(' hello-health-backend.vercel.app/api/doctor/list');
        setDoctors(response.data.doctors);
        setFilteredDoctors(response.data.doctors); // Set filteredDoctors initially to all doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle search functionality
  const handleSearch = (searchParams: { location: string; hospital: string; designation: string }) => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.hospital.toLowerCase().includes(searchParams.hospital.toLowerCase()) &&
        doctor.specialty.toLowerCase().includes(searchParams.designation.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  // Handle booking appointment - navigate to BookAppointmentPage
  const handleBookAppointment = (doctor: Doctor) => {
    router.push(`/appointments/${doctor._id}`);
  };

  // Paginate doctors
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Find a Doctor</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
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
                variant={currentPage === page ? 'default' : 'outline'}
                className={currentPage === page ? 'bg-red-600 hover:bg-red-700' : ''}
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
