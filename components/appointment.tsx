'use client'

import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { Textarea } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { useRouter } from 'next/navigation';

export default function Appointment() {
  const router = useRouter();
  return (
    <section id="appointments" className="py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Make An Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone Number" type="tel" />
                <Input placeholder="Preferred Date" type="date" />
              </div>
              <Textarea placeholder="Additional Information" className="min-h-[100px]" />
              
            </form>
            <Button
                 onClick={() => router.push('/appointments')}
                 className="w-full bg-red-600 hover:bg-red-700"
                >
                  Book Appointment
              </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

