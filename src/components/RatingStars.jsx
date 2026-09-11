import { Star } from 'lucide-react'

export default function RatingStars({ value, onChange, size = 22 }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="stars">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          aria-label={`${n} star`}
        >
          <Star
            size={size}
            fill={n <= value ? '#FFD166' : 'none'}
            color={n <= value ? '#E9B949' : '#CBD5E1'}
          />
        </button>
      ))}
    </div>
  )
}
