import { NavLink, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Compass,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Sparkles,
  Star,
  UserRound,
  ArrowLeftRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/discover', label: 'Discover Skills', icon: Compass },
  { to: '/my-skills', label: 'My Skills', icon: Sparkles },
  { to: '/requests', label: 'Exchange Requests', icon: ArrowLeftRight },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/schedule', label: 'Schedule', icon: Calendar },
  { to: '/ratings', label: 'Ratings', icon: Star },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useApp()
  const navigate = useNavigate()

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">S</div>
        Student Skill Exchange
      </div>
      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`} onClick={onClose}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="side-spacer" />
      <button
        className="side-link logout"
        onClick={() => {
          logout()
          navigate('/')
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}
