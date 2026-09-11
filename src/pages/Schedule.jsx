import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'

export default function Schedule() {
  const { data, peers, getStudent, addSession } = useApp()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    studentId: peers[0]?.id || '',
    skill: 'React.js',
    date: '',
    time: '',
    type: 'Online',
  })

  const submit = (e) => {
    e.preventDefault()
    addSession(form)
    setOpen(false)
  }

  return (
    <main className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1>Upcoming Sessions</h1>
          <p className="muted">Plan campus or online skill exchanges.</p>
        </div>
        <button className="btn btn-coral" onClick={() => setOpen(true)}>
          Schedule New Session
        </button>
      </div>

      <div className="student-grid" style={{ marginTop: 16 }}>
        {data.sessions.map((session) => {
          const student = getStudent(session.studentId)
          return (
            <article className="card" key={session.id} style={{ padding: 16 }}>
              <div className="person">
                <div className="avatar">{student?.avatar}</div>
                <div>
                  <strong>{student?.name}</strong>
                  <div className="muted">{session.skill}</div>
                </div>
              </div>
              <p>
                {session.date} · {session.time} · {session.type}
              </p>
              <span className={`status ${session.status}`}>{session.status}</span>
            </article>
          )
        })}
      </div>

      <Modal open={open} title="Schedule New Session" onClose={() => setOpen(false)}>
        <form onSubmit={submit}>
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
            <label>Skill</label>
            <input value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Session type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Online</option>
              <option>Campus</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Save Session
          </button>
        </form>
      </Modal>
    </main>
  )
}
