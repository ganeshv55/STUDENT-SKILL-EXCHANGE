import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ChatWindow from '../components/ChatWindow'

export default function Messages() {
  const { data, getStudent, sendMessage } = useApp()
  const location = useLocation()
  const [activeId, setActiveId] = useState(
    location.state?.conversationId || data.conversations[0]?.id,
  )
  const active = data.conversations.find((c) => c.id === activeId)

  return (
    <main className="page">
      <h1>Messages</h1>
      <p className="muted">Coordinate skill swaps in a simple campus chat.</p>
      <div className="chat-layout">
        <div className="conv-list">
          {data.conversations.map((c) => {
            const student = getStudent(c.studentId)
            return (
              <button
                key={c.id}
                className={`conv-item ${c.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(c.id)}
                style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none' }}
              >
                <div className="person">
                  <div className="avatar">{student?.avatar}</div>
                  <div>
                    <strong>{student?.name}</strong>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {c.messages[c.messages.length - 1]?.text}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <ChatWindow
          student={getStudent(active?.studentId)}
          conversation={active}
          onSend={(text) => sendMessage(active.id, text)}
        />
      </div>
    </main>
  )
}
