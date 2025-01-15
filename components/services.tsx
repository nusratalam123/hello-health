import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Heart, Activity, Stethoscope } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: "Heart Monitoring",
      description: "24/7 heart rate and ECG monitoring with real-time alerts"
    },
    {
      icon: Activity,
      title: "Health Tracking",
      description: "Comprehensive health metrics tracking and analysis"
    },
    {
      icon: Stethoscope,
      title: "Professional Care",
      description: "Expert medical consultation and personalized care plans"
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive heart health services designed to keep you healthy and informed
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

