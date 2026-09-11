import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative' }}>
      <Search size={16} style={{ position: 'absolute', left: 12, top: 13, color: '#5d6b7a' }} />
      <input
        className="search-input"
        style={{ paddingLeft: 36 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
