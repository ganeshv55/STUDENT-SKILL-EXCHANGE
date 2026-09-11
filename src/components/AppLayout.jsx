import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const { currentUser } = useApp()
  const [open, setOpen] = useState(false)
  if (!currentUser) return <Navigate to="/login" replace />

  return (
    <div className="app-layout">
      <div className={`mobile-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div>
        <Navbar onMenu={() => setOpen(true)} />
        <Outlet />
      </div>
    </div>
  )
}
