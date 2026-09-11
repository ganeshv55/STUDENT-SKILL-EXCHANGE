import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import { computeMatch, skillNames } from '../utils/match'

export default function DiscoverSkills() {
  const { currentUser, peers, sendRequest } = useApp()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [level, setLevel] = useState('All')

  const results = useMemo(() => {
    return peers
      .filter((s) => {
        const hay = [
          s.name,
          s.college,
          ...skillNames(s.teachSkills),
          ...skillNames(s.learnSkills),
        ]
          .join(' ')
          .toLowerCase()
        if (query && !hay.includes(query.toLowerCase())) return false
        if (category !== 'All') {
          const has = s.teachSkills.some((sk) => sk.category === category)
          if (!has) return false
        }
        if (availability !== 'All' && s.availabilityTag !== availability) return false
        if (level !== 'All' && !s.teachSkills.some((sk) => sk.level === level)) return false
        return true
      })
      .map((student) => ({ student, match: computeMatch(currentUser, student) }))
      .sort((a, b) => b.match - a.match)
  }, [peers, query, category, availability, level, currentUser])

  return (
    <main className="page">
      <h1>Find Someone Who Can Teach You</h1>
      <p className="muted">Search by skill, then filter by category, availability, and level.</p>
      <SearchBar value={query} onChange={setQuery} placeholder="Search for a skill..." />

      <div className="filters">
        {['All', 'Technical', 'Non-Technical'].map((c) => (
          <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        {['All', 'Weekend', 'Evenings', 'Flexible'].map((c) => (
          <button key={c} className={`chip ${availability === c ? 'active' : ''}`} onClick={() => setAvailability(c)}>
            {c === 'All' ? 'Availability' : c}
          </button>
        ))}
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((c) => (
          <button key={c} className={`chip ${level === c ? 'active' : ''}`} onClick={() => setLevel(c)}>
            {c === 'All' ? 'Skill level' : c}
          </button>
        ))}
      </div>

      <div className="student-grid">
        {results.map(({ student, match }) => (
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
      {!results.length && <div className="empty card">No students match those filters yet.</div>}
    </main>
  )
}
