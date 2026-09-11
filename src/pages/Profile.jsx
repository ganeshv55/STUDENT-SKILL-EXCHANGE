import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { currentUser, updateProfile } = useApp()
  const [form, setForm] = useState({
    name: currentUser.name,
    college: currentUser.college,
    course: currentUser.course,
    year: currentUser.year,
    about: currentUser.about,
    availability: currentUser.availability,
  })
  const [saved, setSaved] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    updateProfile({
      ...form,
      avatar: form.name.trim().charAt(0).toUpperCase(),
    })
    setSaved(true)
  }

  return (
    <main className="page">
      <h1>Profile</h1>
      <p className="muted">Update your campus details. Changes stay in localStorage for this demo.</p>
      <form className="card" style={{ padding: 18, maxWidth: 640 }} onSubmit={submit}>
        {['name', 'college', 'course', 'year', 'availability'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field[0].toUpperCase() + field.slice(1)}</label>
            <input name={field} value={form[field]} onChange={onChange} required />
          </div>
        ))}
        <div className="form-group">
          <label>About</label>
          <textarea name="about" rows={4} value={form.about} onChange={onChange} />
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
        {saved && <p className="muted">Profile updated.</p>}
      </form>
    </main>
  )
}
