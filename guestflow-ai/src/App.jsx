import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import BusinessDashboard from './pages/BusinessDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex gap-4 items-center">
        <span className="font-bold text-gray-900 mr-4">
          GuestFlow <span className="text-emerald-500">AI</span>
        </span>
        <Link to="/"          className="text-sm text-gray-500 hover:text-emerald-600 font-medium">Guest View</Link>
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-emerald-600 font-medium">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/dashboard" element={<BusinessDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}