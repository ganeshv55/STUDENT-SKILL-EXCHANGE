import { Bell, Menu } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar({ onMenu }) {
  const { currentUser } = useApp()
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
          <Menu size={18} />
        </button>
        <strong>Student Skill Exchange</strong>
      </div>
      <div className="person">
        <span className="badge badge-yellow" style={{ margin: 0 }}>
          <Bell size={14} /> Demo
        </span>
        <div className="avatar">{currentUser?.avatar}</div>
        <div>
          <strong>{currentUser?.name}</strong>
          <div className="muted" style={{ fontSize: 12 }}>{currentUser?.course}</div>
        </div>
      </div>
    </header>
  )
}
