const KEY = 'sse_app_v1'
const SESSION_KEY = 'sse_session'

export function loadAppState() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveAppState(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(userId) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function formatTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function formatDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
