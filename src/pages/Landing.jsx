import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Users } from 'lucide-react'

const sampleSkills = [
  ['Web Development', 'Build pages together'],
  ['UI/UX Design', 'Improve layouts'],
  ['Python', 'Learn with examples'],
  ['Graphic Design', 'Posters and branding'],
  ['Public Speaking', 'Practice with peers'],
  ['Photography', 'Campus photo walks'],
  ['Video Editing', 'Make project reels'],
  ['Communication', 'Clearer presentations'],
]

export default function Landing() {
  return (
    <div className="app-shell">
      <nav className="public-nav">
        <Link to="/" className="brand">
          <div className="brand-mark">S</div>
          Student Skill Exchange
        </Link>
        <div className="nav-links">
          <Link className="btn btn-ghost" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/register">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <div>
          <span className="kicker">
            <Sparkles size={14} /> Students helping students
          </span>
          <h1>Share Your Skills. Learn Something New.</h1>
          <p className="lead">
            Connect with classmates to exchange technical and non-technical skills.
            Teach what you know, learn what you need, and grow together without any payment.
          </p>
          <div className="cta-row">
            <Link className="btn btn-coral" to="/register">
              Find a Skill <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-primary" to="/register">
              Share Your Skill
            </Link>
          </div>
        </div>
        <div className="hero-art">
          {sampleSkills.map(([title, note], i) => (
            <article className="skill-tile" key={title}>
              <strong>{title}</strong>
              <span>{note}</span>
              <div style={{ marginTop: 10 }}>
                <span className={i % 2 ? 'badge badge-yellow' : 'badge badge-green'}>
                  Peer exchange
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>How It Works</h2>
        <p className="muted">Four simple steps to start exchanging skills on campus.</p>
        <div className="steps">
          {[
            ['Create your profile', 'Add your college, course, and a short intro.'],
            ['Add skills you can teach', 'Python, design, speaking — anything useful.'],
            ['Find skills you want to learn', 'Search students by skill and availability.'],
            ['Connect and exchange', 'Send a request, chat, schedule, and rate.'],
          ].map(([title, text], i) => (
            <article className="step-card" key={title}>
              <div className="step-num">{i + 1}</div>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2>Ready to swap skills?</h2>
            <p className="muted">Join as a demo user and explore matching, chat, and scheduling in minutes.</p>
          </div>
          <Link className="btn btn-primary" to="/login">
            <Users size={16} /> Continue as Demo User
          </Link>
        </div>
      </section>

      <footer className="footer">
        <span>Student Skill Exchange · BCA Mini Project</span>
        <span>Peer learning without payment</span>
      </footer>
    </div>
  )
}
