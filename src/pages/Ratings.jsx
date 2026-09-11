import { useState } from 'react'
import { useApp } from '../context/AppContext'
import RatingStars from '../components/RatingStars'

export default function Ratings() {
  const { data, peers, getStudent, addRating, currentUser } = useApp()
  const [form, setForm] = useState({
    studentId: peers[0]?.id || '',
    rating: 5,
    feedback: '',
  })
  const [saved, setSaved] = useState(false)

  const avg =
    data.ratings.length === 0
      ? currentUser.rating
      : (
          (data.ratings.reduce((sum, r) => sum + r.rating, 0) + currentUser.rating * 2) /
          (data.ratings.length + 2)
        ).toFixed(1)

  const submit = (e) => {
    e.preventDefault()
    addRating(form)
    setSaved(true)
    setForm({ ...form, feedback: '' })
  }

  return (
    <main className="page">
      <h1>Ratings & Feedback</h1>
      <p className="muted">Rate a completed exchange so other students can trust the match.</p>

      <section className="split">
        <form className="card" style={{ padding: 18 }} onSubmit={submit}>
          <h3>Rate your partner</h3>
          <div className="form-group">
            <label>Student</label>
            <select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
              {peers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Rating</label>
            <RatingStars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
          </div>
          <div className="form-group">
            <label>Feedback</label>
            <textarea
              rows={4}
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-coral" type="submit">
            Submit
          </button>
          {saved && <p className="muted">Your review was saved on this device.</p>}
        </form>

        <aside className="card" style={{ padding: 18 }}>
          <h3>Your Average Rating</h3>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#118AB2' }}>{avg}</div>
          <RatingStars value={Math.round(Number(avg))} />
          <h3 style={{ marginTop: 18 }}>Recent feedback</h3>
          {data.ratings.map((r) => (
            <div className="review" key={r.id}>
              <strong>{getStudent(r.studentId)?.name}</strong>
              <RatingStars value={r.rating} />
              <p>{r.feedback}</p>
              <div className="muted" style={{ fontSize: 12 }}>{r.date}</div>
            </div>
          ))}
        </aside>
      </section>
    </main>
  )
}
