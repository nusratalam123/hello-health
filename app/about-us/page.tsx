import Image from 'next/image'
import { Card, CardContent } from "@/components/ui"
import Navbar from "@/components/navbar"
import { Heart, Award, Users, Clock, Phone, Mail, MapPin } from 'lucide-react'
import Footer from '@/components/footer'

export default function AboutPage() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Patients Served"
    },
    {
      icon: Award,
      value: "50+",
      label: "Specialist Doctors"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Available Support"
    }
  ]

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/team/Chen_Michael.jpg?height=400&width=400",
      description: "20+ years of experience in cardiology"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Cardiology",
      image: "/team/doctor4.jpeg?height=400&width=400",
      description: "Leading expert in preventive cardiology"
    },
    {
      name: "Dr. Emily Williams",
      role: "Senior Cardiologist",
      image: "/team/EmilyWilliams3.jpg?height=400&width=400",
      description: "Specialist in interventional cardiology"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=500&width=1920"
            alt="Medical team"
            fill
            className="object-cover"
          />
          <div className="bg-red-50 py-20" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-black">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Caring for Your Heart, Every Beat Matters
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Leading the way in cardiovascular care with compassion, expertise, and innovation
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-lg">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600">
              At HeartCare, our mission is to provide exceptional cardiovascular care through 
              innovative treatments, compassionate service, and a commitment to improving heart 
              health in our community. We envision a future where heart disease is prevented 
              before it begins.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Excellence in Care</h3>
                  <p className="text-gray-600">Delivering the highest standard of cardiac care</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Patient-Centered Approach</h3>
                  <p className="text-gray-600">Focusing on individual needs and comfort</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/team/medicalfacalty.jpg?height=400&width=600"
              alt="Medical facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-red-600 font-medium">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Contact Section */}
      <section className="bg-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <Phone className="h-8 w-8 text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <Mail className="h-8 w-8 text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600">contact@heartcare.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Medical Center Dr.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
   
    </div>
  )
}

