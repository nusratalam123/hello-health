'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'

export default function HealthManagement() {
  const router = useRouter()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Health Management</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <h3 className="text-xl font-semibold mb-2">Health Suggestions</h3>
            <p className="text-red-100 mb-4">Get personalized health suggestions based on your metrics and diet.</p>
            <Button 
              onClick={() => router.push('/health-food')}
              className=" text-red-600 hover:bg-blue-600"
            >
              Get Suggestions
            </Button>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <h3 className="text-xl font-semibold mb-2">Medication Notifications</h3>
            <p className="text-blue-100 mb-4">Set up reminders for your medications.</p>
            <Button 
              onClick={() => router.push('/medication-notifications')}
              className=" text-blue-600 hover:bg-blue-100 "
            >
              Set Notifications
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

