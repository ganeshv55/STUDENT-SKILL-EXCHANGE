export default function SkillBadge({ name, tone = 'blue' }) {
  return <span className={`badge badge-${tone}`}>{name}</span>
}
