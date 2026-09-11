import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppLayout from './components/AppLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DiscoverSkills from './pages/DiscoverSkills'
import StudentProfile from './pages/StudentProfile'
import MySkills from './pages/MySkills'
import Requests from './pages/Requests'
import Messages from './pages/Messages'
import Schedule from './pages/Schedule'
import Ratings from './pages/Ratings'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<DiscoverSkills />} />
            <Route path="/student/:id" element={<StudentProfile />} />
            <Route path="/my-skills" element={<MySkills />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
