import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ChatWindow({ student, conversation, onSend }) {
  const [text, setText] = useState('')
  if (!student || !conversation) {
    return <div className="empty">Select a conversation to start chatting.</div>
  }

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }

  return (
    <div className="chat-window">
      <div className="chat-head">
        <div className="person">
          <div className="avatar">{student.avatar}</div>
          <div>
            <strong>{student.name}</strong>
            <div className="muted" style={{ fontSize: 13 }}>
              <span className={student.online ? 'online' : 'offline'} />
              {student.online ? 'Online now' : 'Offline'}
            </div>
          </div>
        </div>
      </div>
      <div className="messages">
        {conversation.messages.map((m) => (
          <div key={m.id} className={`bubble ${m.from}`}>
            <div>{m.text}</div>
            <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>{m.time}</div>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={submit}>
        <input
          className="search-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
        />
        <button className="btn btn-primary" type="submit">
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  )
}
