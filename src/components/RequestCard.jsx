import SkillBadge from './SkillBadge'

export default function RequestCard({ request, peer, mine, onAccept, onReject }) {
  return (
    <article className="card request-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div className="person">
          <div className="avatar">{peer?.avatar || '?'}</div>
          <div>
            <strong>{peer?.name || 'Student'}</strong>
            <div className="muted" style={{ fontSize: 13 }}>
              {request.date} · {mine ? 'You sent this request' : 'Incoming request'}
            </div>
          </div>
        </div>
        <span className={`status ${request.status}`}>{request.status}</span>
      </div>
      <p style={{ margin: '12px 0 8px' }}>{request.note}</p>
      <div>
        <SkillBadge name={`Offers ${request.offerSkill}`} tone="blue" />
        <SkillBadge name={`Wants ${request.wantSkill}`} tone="yellow" />
      </div>
      {request.status === 'Received' && (
        <div className="card-actions" style={{ marginTop: 12 }}>
          <button className="btn btn-success btn-sm" onClick={onAccept}>
            Accept
          </button>
          <button className="btn btn-warn btn-sm" onClick={onReject}>
            Reject
          </button>
        </div>
      )}
    </article>
  )
}
