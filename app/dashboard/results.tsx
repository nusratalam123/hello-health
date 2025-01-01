'use client'

import { Card } from "@/components/ui"
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react'

interface HealthResult {
  risk: 'low' | 'moderate' | 'high'
  message: string
  recommendations: string[]
}

export default function HealthResults({ result }: { result: HealthResult }) {
  const colors = {
    low: 'text-green-600',
    moderate: 'text-orange-500',
    high: 'text-red-600'
  }

  const icons = {
    low: <CheckCircle className="w-8 h-8 text-green-600" />,
    moderate: <AlertTriangle className="w-8 h-8 text-orange-500" />,
    high: <Heart className="w-8 h-8 text-red-600" />
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          {icons[result.risk]}
          <div>
            <h3 className={`text-xl font-semibold ${colors[result.risk]}`}>
              {result.risk.charAt(0).toUpperCase() + result.risk.slice(1)} Risk
            </h3>
            <p className="text-gray-600">{result.message}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Recommendations:</h4>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-red-600">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

