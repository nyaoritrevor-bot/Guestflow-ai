import { supabase } from '../services/supabase'
import { useState } from 'react'

// Format date nicely: "2025-03-04" → "Mar 4, 2025"
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

const STATUS_STYLES = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function BookingModal({ booking, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false)

  if (!booking) return null  // if no booking selected, show nothing

  async function updateStatus(newStatus) {
    setLoading(true)
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', booking.id)  // only update THIS booking's row

    if (!error) onUpdate()   // tell the parent to refresh its list
    setLoading(false)
    onClose()
  }

  return (
    // Dark overlay behind the popup
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}  // clicking the dark area closes the modal
    >
      {/* The actual popup box — stopPropagation stops the click-outside-to-close from triggering when clicking inside */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5"
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{booking.guest_name}</h2>
            <p className="text-sm text-gray-400">{booking.guest_email}</p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_STYLES[booking.status]}`}>
            {booking.status}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Service</p>
            <p className="font-medium capitalize">{booking.service}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Date</p>
            <p className="font-medium">{formatDate(booking.booking_date)}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Time</p>
            <p className="font-medium">{booking.booking_time || '—'}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-400 text-xs mb-1">Phone</p>
            <p className="font-medium">{booking.guest_phone || '—'}</p>
          </div>

        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-gray-50 rounded-xl p-3 text-sm">
            <p className="text-gray-400 text-xs mb-1">Notes</p>
            <p className="text-gray-700">{booking.notes}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 flex-wrap">

          {booking.status === 'pending' && (
            <button
              onClick={() => updateStatus('confirmed')}
              disabled={loading}
              className="flex-1 bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              ✓ Confirm
            </button>
          )}

          {booking.status === 'confirmed' && (
            <button
              onClick={() => updateStatus('completed')}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              ✓ Mark Complete
            </button>
          )}

          {(booking.status === 'pending' || booking.status === 'confirmed') && (
            <button
              onClick={() => updateStatus('cancelled')}
              disabled={loading}
              className="flex-1 bg-red-50 text-red-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200"
            >
              ✕ Cancel
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  )
}
