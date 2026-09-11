import { Link } from 'react-router-dom'
import SkillBadge from './SkillBadge'
import { skillNames } from '../utils/match'

const colors = ['#118AB2', '#FF7F50', '#06D6A0', '#0d6e8f']

export default function StudentCard({ student, match, onRequest }) {
  const teach = skillNames(student.teachSkills)
  const learn = skillNames(student.learnSkills)
  const color = colors[student.name.length % colors.length]

  return (
    <article className="student-card">
      <div className="person">
        <div className="avatar" style={{ background: color }}>
          {student.avatar}
        </div>
        <div>
          <strong>{student.name}</strong>
          <div className="muted" style={{ fontSize: 13 }}>
            {student.college} · {student.course}
          </div>
        </div>
      </div>
      <div>
        <div className="muted" style={{ fontSize: 12, fontWeight: 700 }}>Can teach</div>
        {teach.map((s) => (
          <SkillBadge key={s} name={s} tone="blue" />
        ))}
      </div>
      <div>
        <div className="muted" style={{ fontSize: 12, fontWeight: 700 }}>Wants to learn</div>
        {learn.map((s) => (
          <SkillBadge key={s} name={s} tone="yellow" />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkillBadge name={student.availability} tone="green" />
        <span className="match">{match}% Match</span>
      </div>
      <div className="card-actions">
        <Link className="btn btn-ghost btn-sm" to={`/student/${student.id}`}>
          View Profile
        </Link>
        <button className="btn btn-coral btn-sm" onClick={() => onRequest(student)}>
          Request Exchange
        </button>
      </div>
    </article>
  )
}
