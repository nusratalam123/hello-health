import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import HealthManagement from "../components/health-management"
import Events from "@/components/events"
import Appointment from "@/components/appointment"
import Newsletter from "@/components/newsletter"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from '../components/ui'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Services />
        <HealthManagement />
        <Events />
        <div className="text-center mt-8">
          <Link href="/events">
            <Button className="bg-red-600 hover:bg-red-700">View All Events</Button>
          </Link>
        </div>
        <Appointment />
        <div className="text-center mt-8">
          <Link href="/appointments">
            <Button className="bg-red-600 hover:bg-red-700">Find a Doctor</Button>
          </Link>
        </div>
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

