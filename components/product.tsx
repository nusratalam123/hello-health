'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui"
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(' hello-health-backend.vercel.app/api/product/list')
        setProducts(response.data.products)
        setLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
        setLoading(false)
      }
    }
  
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error}
      </div>
    )
  }

  return (
 
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Heart Health Products</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="flex flex-col">
              <CardHeader>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">Price: ${product.price.toFixed(2)}</p>
                <p className="text-lg font-bold mt-2">Quantity: {product.quantity.toFixed(2)}</p>

              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={`/book/${product._id}`} className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
  )
}
