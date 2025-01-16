'use client'

import { useState } from 'react'
import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (searchParams: { location: string; hospital: string; designation: string }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('')
  const [hospital, setHospital] = useState('')
  const [designation, setDesignation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ location, hospital, designation })
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="Hospital Name"
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  )
}

