import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, CalendarPlus, Compass, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import StatCard from '../components/StatCard'
import StudentCard from '../components/StudentCard'
import { computeMatch } from '../utils/match'

export default function Dashboard() {
  const { currentUser, peers, data, sendRequest } = useApp()
  const navigate = useNavigate()
  const recommended = [...peers]
    .map((s) => ({ student: s, match: computeMatch(currentUser, s) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 4)

  const active = data.requests.filter((r) => r.status === 'Active').length
  const upcoming = data.sessions.filter((s) => s.status === 'Upcoming').length

  return (
    <main className="page">
      <section className="welcome">
        <h1>Welcome back, {currentUser.name} 👋</h1>
        <p className="muted">Find someone who can teach you something new today.</p>
      </section>

      <section className="stats">
        <StatCard label="Skills I Teach" value={currentUser.teachSkills.length} icon={<Sparkles size={18} />} />
        <StatCard label="Skills I Want to Learn" value={currentUser.learnSkills.length} icon={<BookOpen size={18} />} color="#FF7F50" />
        <StatCard label="Active Exchanges" value={active} icon={<Compass size={18} />} color="#06D6A0" />
        <StatCard label="Upcoming Sessions" value={upcoming} icon={<CalendarPlus size={18} />} color="#FFD166" />
      </section>

      <section className="grid-2">
        <div>
          <h3>Recommended Students</h3>
          <div className="student-grid">
            {recommended.map(({ student, match }) => (
              <StudentCard
                key={student.id}
                student={student}
                match={match}
                onRequest={(s) => {
                  sendRequest({
                    studentId: s.id,
                    offerSkill: currentUser.teachSkills[0]?.name || 'Communication',
                    wantSkill: s.teachSkills[0]?.name || 'Skill',
                  })
                  navigate('/requests')
                }}
              />
            ))}
          </div>
        </div>
        <aside className="card" style={{ padding: 16, height: 'fit-content' }}>
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link className="btn btn-primary" to="/my-skills">Add Skill</Link>
            <Link className="btn btn-coral" to="/discover">Find a Skill</Link>
            <Link className="btn btn-ghost" to="/requests">View Requests</Link>
            <Link className="btn btn-ghost" to="/schedule">Schedule Session</Link>
          </div>
        </aside>
      </section>
    </main>
  )
}
