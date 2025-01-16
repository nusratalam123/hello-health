import { Button } from "@/components/ui"
import HealthDashboard from "./health-dashbroad"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-red-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Heart Health Monitoring & Care
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Comprehensive heart health services with advanced monitoring and personalized care plans for your cardiovascular well-being.
            </p>
            <div className="space-x-4">
              <Link href="/product-book">
                <Button className="bg-red-600 hover:bg-red-700">Buy Now</Button>
              </Link>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <HealthDashboard></HealthDashboard>
          </div>
        </div>
      </div>
    </section>
  )
}

