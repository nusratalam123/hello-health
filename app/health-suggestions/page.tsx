// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button, Input, Textarea, Label } from '@/components/ui'
// import Navbar from "@/components/navbar"

// export default function HealthSuggestionsPage() {
//   const router = useRouter()
//   const [healthData, setHealthData] = useState({
//     age: '',
//     cholesterol: '',
//     bloodPressure: '',
//     diabetes: '',
//     temperature: '',
//     heartRate: ''
//   })
//   const [foodImage, setFoodImage] = useState<File | null>(null)
//   const [suggestion, setSuggestion] = useState('')

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setHealthData({ ...healthData, [e.target.name]: e.target.value })
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFoodImage(e.target.files[0])
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setSuggestion(`Based on your health metrics (Age: ${healthData.age}, Cholesterol: ${healthData.cholesterol}, Blood Pressure: ${healthData.bloodPressure}, Diabetes: ${healthData.diabetes}, Temperature: ${healthData.temperature}, Heart Rate: ${healthData.heartRate}), we recommend maintaining a balanced diet and regular exercise. ${foodImage ? "We've received your food image and recommend consulting with a nutritionist for personalized dietary advice." : ""}`)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="container mx-auto px-4 pt-24 pb-12">
//         <h1 className="text-3xl font-bold mb-8">Health Suggestions</h1>
//         <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="age">Age</Label>
//               <Input id="age" name="age" value={healthData.age} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="cholesterol">Cholesterol</Label>
//               <Input id="cholesterol" name="cholesterol" value={healthData.cholesterol} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="bloodPressure">Blood Pressure</Label>
//               <Input id="bloodPressure" name="bloodPressure" value={healthData.bloodPressure} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="diabetes">Diabetes</Label>
//               <Input id="diabetes" name="diabetes" value={healthData.diabetes} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="temperature">Temperature</Label>
//               <Input id="temperature" name="temperature" value={healthData.temperature} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="heartRate">Heart Rate</Label>
//               <Input id="heartRate" name="heartRate" value={healthData.heartRate} onChange={handleInputChange} />
//             </div>
//           </div>
//           <div>
//             <Label htmlFor="foodImage">Upload Food Image</Label>
//             <Input 
//               id="foodImage" 
//               type="file" 
//               onChange={handleImageUpload} 
//               accept="image/*" 
//               className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
//             />
//           </div>
//           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Get Suggestion</Button>
//         </form>
//         {suggestion && (
//           <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//             <Label>Suggestion</Label>
//             <Textarea className="mt-1" value={suggestion} readOnly rows={4} />
//           </div>
//         )}
//         <Button onClick={() => router.push('/')} className="mt-6">Back to Home</Button>
//       </main>
//     </div>
//   )
// }

