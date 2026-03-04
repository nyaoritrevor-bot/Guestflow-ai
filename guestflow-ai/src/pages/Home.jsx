import ChatWidget from '../components/ChatWidget'
import BookingForm from '../components/BookingForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">GuestFlow <span className="text-emerald-500">AI</span></h1>
          <p className="text-gray-500 mt-2">Smarter guest communication, effortless bookings</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <BookingForm />
          <ChatWidget />
        </div>

      </div>
    </div>
  )
}