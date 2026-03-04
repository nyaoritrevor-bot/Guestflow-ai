import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function BookingForm() {
  const [form, setForm] = useState({
    guest_name: '',
    guest_email: '',
    service: '',
    booking_date: '',
    booking_time: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()  // stops page from refreshing
    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('bookings')
      .insert([form])

    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) return (
    <div className="text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-200">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="text-xl font-bold text-emerald-700">Booking Confirmed!</h3>
      <p className="text-gray-500 mt-2 text-sm">We'll send a confirmation to {form.guest_email}</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800">Book a Service</h2>

      <input
        name="guest_name" required placeholder="Your full name"
        value={form.guest_name} onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
      />

      <input
        name="guest_email" type="email" required placeholder="Your email"
        value={form.guest_email} onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
      />

      <select
        name="service" required value={form.service} onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 bg-white"
      >
        <option value="">Select a service</option>
        <option value="consultation">Consultation</option>
        <option value="full-service">Full Service</option>
        <option value="follow-up">Follow-up</option>
      </select>

      <input
        name="booking_date" type="date" required
        value={form.booking_date} onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
      />

      <input
        name="booking_time" type="time" required
        value={form.booking_time} onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
      />

      <textarea
        name="notes" placeholder="Any special requests? (optional)"
        value={form.notes} onChange={handleChange} rows={3}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 resize-none"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit" disabled={loading}
        className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </form>
  )
}