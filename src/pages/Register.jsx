import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Register() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    course: 'BCA',
    year: '1st Year',
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    register(form)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <h1>Join the exchange</h1>
        <p>Create a student profile and start matching skills with peers on campus.</p>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-card" onSubmit={submit}>
          <h2>Register</h2>
          {[
            ['name', 'Full Name', 'text'],
            ['email', 'Email', 'email'],
            ['password', 'Password', 'password'],
            ['college', 'College', 'text'],
          ].map(([name, label, type]) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input name={name} type={type} value={form[name]} onChange={onChange} required />
            </div>
          ))}
          <div className="form-group">
            <label>Course</label>
            <input name="course" value={form.course} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <select name="year" value={form.year} onChange={onChange}>
              {['1st Year', '2nd Year', '3rd Year'].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-coral" type="submit" style={{ width: '100%' }}>
            Create Profile
          </button>
          <p className="muted" style={{ marginTop: 16 }}>
            Already registered? <Link to="/login" style={{ color: '#118AB2', fontWeight: 700 }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
