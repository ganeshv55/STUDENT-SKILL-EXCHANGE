export default function StatCard({ label, value, icon, color = '#118AB2' }) {
  return (
    <article className="stat-card">
      <div className="icon-pill" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </article>
  )
}
