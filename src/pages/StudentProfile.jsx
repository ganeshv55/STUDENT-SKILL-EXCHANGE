import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SkillBadge from '../components/SkillBadge'
import RatingStars from '../components/RatingStars'
import { computeMatch, matchReasons, skillNames } from '../utils/match'

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, getStudent, sendRequest, startConversation } = useApp()
  const student = getStudent(id)

  if (!student) {
    return (
      <main className="page">
        <div className="empty card">Student not found.</div>
      </main>
    )
  }

  const match = computeMatch(currentUser, student)
  const reasons = matchReasons(currentUser, student)

  return (
    <main className="page">
      <section className="card profile-hero">
        <div className="avatar lg">{student.avatar}</div>
        <div style={{ flex: 1 }}>
          <h1>{student.name}</h1>
          <p className="muted">
            {student.college} · {student.course} · {student.year}
          </p>
          <p>{student.about}</p>
          <div>
            <SkillBadge name={student.availability} tone="green" />
            <span className="match">{match}% Match</span>
          </div>
          <div className="cta-row">
            <button
              className="btn btn-coral"
              onClick={() => {
                sendRequest({
                  studentId: student.id,
                  offerSkill: currentUser.teachSkills[0]?.name || 'Communication',
                  wantSkill: student.teachSkills[0]?.name || 'Skill',
                })
                navigate('/requests')
              }}
            >
              Request Skill Exchange
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                const conversationId = startConversation(student.id)
                navigate('/messages', { state: { conversationId } })
              }}
            >
              Message
            </button>
          </div>
        </div>
        <div>
          <div className="muted">Rating</div>
          <RatingStars value={Math.round(student.rating)} />
          <strong>{student.rating.toFixed(1)}</strong>
        </div>
      </section>

      <section className="split" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <h3>Skills they can teach</h3>
          {skillNames(student.teachSkills).map((s) => (
            <SkillBadge key={s} name={s} />
          ))}
          <h3 style={{ marginTop: 18 }}>Skills they want to learn</h3>
          {skillNames(student.learnSkills).map((s) => (
            <SkillBadge key={s} name={s} tone="yellow" />
          ))}
          <h3 style={{ marginTop: 18 }}>Experience</h3>
          <p className="muted">{student.experience}</p>
        </div>
        <aside className="card" style={{ padding: 18 }}>
          <h3>Why you match</h3>
          {reasons.map((r) => (
            <p key={r}>{r}</p>
          ))}
        </aside>
      </section>
    </main>
  )
}
