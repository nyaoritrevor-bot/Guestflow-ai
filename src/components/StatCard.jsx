export default function StatCard({ label, value, color }) {

  const colors = {
    gray:   'bg-gray-100 text-gray-700 border-gray-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue:   'bg-blue-50 text-blue-700 border-blue-200',
    red:    'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-1 ${colors[color] || colors.gray}`}>
      <span className="text-3xl font-bold">{value ?? '–'}</span>
      <span className="text-xs uppercase tracking-widest font-medium opacity-70">{label}</span>
    </div>
  )
}
