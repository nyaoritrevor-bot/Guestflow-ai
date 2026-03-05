import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import StatCard from '../components/StatCard'
import BookingTable from '../components/BookingTable'
import BookingModal from '../components/BookingModal'

export default function BusinessDashboard() {
  const [bookings, setBookings] = useState([])       // all bookings
  const [stats, setStats] = useState({})             // counts per status
  const [selected, setSelected] = useState(null)     // booking currently open in modal
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')        // status filter
  const [search, setSearch] = useState('')           // search box text

  // Run fetchData when the page first loads
  useEffect(() => {
    fetchData()
    subscribeToChanges()
  }, [])

  async function fetchData() {
    setLoading(true)

    // Get all bookings, newest first
    const { data: bookingData } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    // Get stats (the view we created in SQL)
    const { data: statsData } = await supabase
      .from('booking_stats')
      .select('*')
      .single()  // only returns one row

    if (bookingData) setBookings(bookingData)
    if (statsData) setStats(statsData)
    setLoading(false)
  }

  // Listen for real-time changes — new bookings appear instantly
  function subscribeToChanges() {
    supabase
      .channel('bookings-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchData()  // re-fetch everything when anything changes
      })
      .subscribe()
  }

  // Filter bookings based on selected tab and search text
  const filteredBookings = bookings
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => {
      const q = search.toLowerCase()
      return (
        b.guest_name?.toLowerCase().includes(q) ||
        b.guest_email?.toLowerCase().includes(q) ||
        b.service?.toLowerCase().includes(q)
      )
    })

  const TABS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            GuestFlow <span className="text-emerald-500">AI</span>
          </h1>
          <p className="text-xs text-gray-400">Business Dashboard</p>
        </div>
        <button
          onClick={fetchData}
          className="text-xs text-emerald-600 font-semibold hover:underline"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Bookings" value={stats.total}     color="gray"   />
          <StatCard label="Pending"         value={stats.pending}   color="yellow" />
          <StatCard label="Confirmed"       value={stats.confirmed} color="green"  />
          <StatCard label="Completed"       value={stats.completed} color="blue"   />
        </div>

        {/* Bookings section */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          {/* Section header with search */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <h2 className="font-bold text-gray-800">All Bookings</h2>
            <input
              type="text"
              placeholder="Search by name, email, service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-400 w-full md:w-64"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 px-6 py-3 border-b border-gray-100 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-colors whitespace-nowrap ${
                  filter === tab
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table or loading state */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-16 text-gray-400 text-sm">Loading bookings...</div>
            ) : (
              <BookingTable
                bookings={filteredBookings}
                onSelect={setSelected}
              />
            )}
          </div>

        </div>
      </div>

      {/* Booking detail modal — only shows when a booking is selected */}
      <BookingModal
        booking={selected}
        onClose={() => setSelected(null)}
        onUpdate={fetchData}
      />

    </div>
  )
}