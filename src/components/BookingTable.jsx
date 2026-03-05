const STATUS_STYLES = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default function BookingTable({ bookings, onSelect }) {

  if (bookings.length === 0) return (
    <div className="text-center py-16 text-gray-400 text-sm">
      No bookings yet. They'll appear here automatically.
    </div>
  )

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-sm">

        {/* Column headers */}
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-5 py-3 font-medium">Guest</th>
            <th className="text-left px-5 py-3 font-medium">Service</th>
            <th className="text-left px-5 py-3 font-medium">Date</th>
            <th className="text-left px-5 py-3 font-medium">Time</th>
            <th className="text-left px-5 py-3 font-medium">Status</th>
            <th className="text-left px-5 py-3 font-medium"></th>
          </tr>
        </thead>

        {/* Rows — one per booking */}
        <tbody className="divide-y divide-gray-50">
          {bookings.map(booking => (
            <tr key={booking.id} className="bg-white hover:bg-gray-50 transition-colors">

              <td className="px-5 py-4">
                <p className="font-medium text-gray-800">{booking.guest_name}</p>
                <p className="text-gray-400 text-xs">{booking.guest_email}</p>
              </td>

              <td className="px-5 py-4 capitalize text-gray-700">{booking.service}</td>

              <td className="px-5 py-4 text-gray-700">{formatDate(booking.booking_date)}</td>

              <td className="px-5 py-4 text-gray-700">{booking.booking_time || '—'}</td>

              <td className="px-5 py-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[booking.status]}`}>
                  {booking.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <button
                  onClick={() => onSelect(booking)}
                  className="text-xs text-emerald-600 font-semibold hover:underline"
                >
                  View →
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
