'use client'

import { Button } from "@/components/ui"
import { Input } from "@/components/ui"

export default function Newsletter() {
  return (
    <section className="py-20 bg-red-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Stay updated with the latest heart health tips and news
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <Input placeholder="Your Email Address" type="email" className="flex-1" />
          <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

