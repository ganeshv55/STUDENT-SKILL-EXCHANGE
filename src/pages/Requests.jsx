import { useState } from 'react'
import { useApp } from '../context/AppContext'
import RequestCard from '../components/RequestCard'

const tabs = ['Received', 'Sent', 'Active', 'Completed']

export default function Requests() {
  const { currentUser, data, getStudent, updateRequestStatus } = useApp()
  const [tab, setTab] = useState('Received')

  const filtered = data.requests.filter((r) => {
    if (tab === 'Received') return r.toId === currentUser.id && (r.status === 'Received' || r.status === 'Rejected')
    if (tab === 'Sent') return r.fromId === currentUser.id && r.status === 'Sent'
    if (tab === 'Active') return r.status === 'Active'
    return r.status === 'Completed'
  })

  return (
    <main className="page">
      <h1>Exchange Requests</h1>
      <p className="muted">Accept incoming swaps, track sent requests, and keep active exchanges moving.</p>
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {filtered.map((request) => {
        const peerId = request.fromId === currentUser.id ? request.toId : request.fromId
        return (
          <RequestCard
            key={request.id}
            request={request}
            peer={getStudent(peerId)}
            mine={request.fromId === currentUser.id}
            onAccept={() => updateRequestStatus(request.id, 'Active')}
            onReject={() => updateRequestStatus(request.id, 'Rejected')}
          />
        )
      })}
      {!filtered.length && <div className="empty card">No requests in this tab yet.</div>}
    </main>
  )
}
