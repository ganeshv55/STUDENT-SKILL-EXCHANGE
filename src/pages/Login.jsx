import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login, loginDemo } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    login(form)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <h1>Welcome back</h1>
        <p>Sign in to find classmates who can teach you something new today.</p>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-card" onSubmit={submit}>
          <h2>Login</h2>
          <p className="muted">Use your campus email or continue as a demo student.</p>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={onChange} required />
          </div>
          <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
            Login
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            style={{ width: '100%', marginTop: 10 }}
            onClick={() => {
              loginDemo()
              navigate('/dashboard')
            }}
          >
            Continue as Demo User
          </button>
          <p className="muted" style={{ marginTop: 16 }}>
            New here? <Link to="/register" style={{ color: '#118AB2', fontWeight: 700 }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
