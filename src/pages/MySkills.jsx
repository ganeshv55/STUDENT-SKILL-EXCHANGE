import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import SkillBadge from '../components/SkillBadge'
import { skillCategories, skillLevels } from '../data/skills'

const emptySkill = { name: '', category: 'Technical', level: 'Beginner', description: '' }

export default function MySkills() {
  const { currentUser, addSkill, updateSkill, removeSkill } = useApp()
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState('teach')
  const [editIndex, setEditIndex] = useState(null)
  const [form, setForm] = useState(emptySkill)

  const startAdd = (nextKind) => {
    setKind(nextKind)
    setEditIndex(null)
    setForm(emptySkill)
    setOpen(true)
  }

  const startEdit = (nextKind, index, skill) => {
    setKind(nextKind)
    setEditIndex(index)
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description || '',
    })
    setOpen(true)
  }

  const save = (e) => {
    e.preventDefault()
    if (editIndex !== null) updateSkill(kind, editIndex, form)
    else addSkill(kind, form)
    setOpen(false)
  }

  const renderList = (title, list, nextKind) => (
    <section className="card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        <button className="btn btn-primary btn-sm" onClick={() => startAdd(nextKind)}>
          Add Skill
        </button>
      </div>
      <div className="skill-list" style={{ marginTop: 12 }}>
        {list.map((skill, index) => (
          <div className="skill-row" key={`${skill.name}-${index}`}>
            <div>
              <strong>{skill.name}</strong>
              <div>
                <SkillBadge name={skill.category} />
                <SkillBadge name={skill.level} tone="yellow" />
              </div>
              {skill.description && <p className="muted">{skill.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => startEdit(nextKind, index, skill)}>
                Edit
              </button>
              <button className="btn btn-warn btn-sm" onClick={() => removeSkill(nextKind, index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        {!list.length && <div className="empty">No skills yet. Add one to get better matches.</div>}
      </div>
    </section>
  )

  return (
    <main className="page">
      <h1>My Skills</h1>
      <p className="muted">Manage what you can teach and what you want to learn.</p>
      <div className="split">
        {renderList('Skills I Can Teach', currentUser.teachSkills, 'teach')}
        {renderList('Skills I Want to Learn', currentUser.learnSkills, 'learn')}
      </div>

      <Modal open={open} title={editIndex !== null ? 'Edit Skill' : 'Add Skill'} onClose={() => setOpen(false)}>
        <form onSubmit={save}>
          <div className="form-group">
            <label>Skill name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {skillCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Level</label>
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              {skillLevels.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button className="btn btn-coral" type="submit">
            Save Skill
          </button>
        </form>
      </Modal>
    </main>
  )
}
