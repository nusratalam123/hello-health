import { Card, CardContent, CardFooter } from "@/components/ui"
import { Button } from "@/components/ui"
import Image from "next/image"

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  image: string;
  onBookAppointment: () => void;
}

export function DoctorCard({ name, specialty, hospital, image, onBookAppointment }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{specialty}</p>
        <p className="text-sm text-gray-600">{hospital}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onBookAppointment} className="w-full bg-red-600 hover:bg-red-700">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}

