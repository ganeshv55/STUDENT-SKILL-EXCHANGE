import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUser, students as seedStudents } from '../data/students'
import {
  initialConversations,
  initialRatings,
  initialRequests,
  initialSessions,
} from '../data/messages'
import {
  clearSession,
  formatDate,
  formatTime,
  getSession,
  loadAppState,
  saveAppState,
  setSession,
  uid,
} from '../utils/storage'

const AppContext = createContext(null)

function seedState() {
  return {
    users: [demoUser],
    students: seedStudents,
    requests: initialRequests,
    conversations: initialConversations,
    sessions: initialSessions,
    ratings: initialRatings,
  }
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => loadAppState() || seedState())
  const [currentUserId, setCurrentUserId] = useState(() => getSession()?.userId || null)

  useEffect(() => {
    saveAppState(data)
  }, [data])

  const currentUser = useMemo(() => {
    if (!currentUserId) return null
    return data.users.find((u) => u.id === currentUserId) || null
  }, [data.users, currentUserId])

  const peers = data.students

  const login = ({ email, password }) => {
    const user = data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    const next = user || data.users[0]
    setCurrentUserId(next.id)
    setSession(next.id)
    return { ok: true }
  }

  const loginDemo = () => {
    setCurrentUserId(demoUser.id)
    setSession(demoUser.id)
  }

  const register = (form) => {
    const user = {
      id: uid('u'),
      name: form.name,
      email: form.email,
      password: form.password,
      college: form.college,
      course: form.course,
      year: form.year,
      about: 'New student ready to share skills and learn from peers.',
      availability: 'Flexible',
      availabilityTag: 'Flexible',
      avatar: form.name.trim().charAt(0).toUpperCase(),
      rating: 0,
      online: true,
      teachSkills: [
        { name: 'Communication', category: 'Non-Technical', level: 'Beginner', description: 'Happy to practice together.' },
      ],
      learnSkills: [
        { name: 'Python', category: 'Technical', level: 'Beginner', description: 'Want to start with the basics.' },
      ],
    }
    setData((prev) => ({ ...prev, users: [...prev.users, user] }))
    setCurrentUserId(user.id)
    setSession(user.id)
  }

  const logout = () => {
    setCurrentUserId(null)
    clearSession()
  }

  const updateProfile = (patch) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === currentUserId ? { ...u, ...patch } : u)),
    }))
  }

  const addSkill = (kind, skill) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => {
        if (u.id !== currentUserId) return u
        const key = kind === 'teach' ? 'teachSkills' : 'learnSkills'
        return { ...u, [key]: [...u[key], skill] }
      }),
    }))
  }

  const updateSkill = (kind, index, skill) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => {
        if (u.id !== currentUserId) return u
        const key = kind === 'teach' ? 'teachSkills' : 'learnSkills'
        const next = u[key].map((item, i) => (i === index ? skill : item))
        return { ...u, [key]: next }
      }),
    }))
  }

  const removeSkill = (kind, index) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => {
        if (u.id !== currentUserId) return u
        const key = kind === 'teach' ? 'teachSkills' : 'learnSkills'
        return { ...u, [key]: u[key].filter((_, i) => i !== index) }
      }),
    }))
  }

  const sendRequest = ({ studentId, offerSkill, wantSkill, note }) => {
    const student = peers.find((s) => s.id === studentId)
    const request = {
      id: uid('r'),
      fromId: currentUserId,
      toId: studentId,
      offerSkill,
      wantSkill,
      date: formatDate(),
      status: 'Sent',
      note: note || `I would like to exchange skills with ${student?.name || 'this student'}.`,
    }
    setData((prev) => ({ ...prev, requests: [request, ...prev.requests] }))
    return request
  }

  const updateRequestStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      requests: prev.requests.map((r) => (r.id === id ? { ...r, status } : r)),
    }))
  }

  const sendMessage = (conversationId, text) => {
    setData((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              unread: 0,
              messages: [
                ...c.messages,
                { id: uid('m'), from: 'me', text, time: formatTime() },
              ],
            }
          : c,
      ),
    }))
  }

  const startConversation = (studentId) => {
    const existing = data.conversations.find((c) => c.studentId === studentId)
    if (existing) return existing.id
    const id = uid('c')
    setData((prev) => ({
      ...prev,
      conversations: [
        {
          id,
          studentId,
          unread: 0,
          messages: [
            {
              id: uid('m'),
              from: 'me',
              text: 'Hi! I would like to discuss a skill exchange.',
              time: formatTime(),
            },
          ],
        },
        ...prev.conversations,
      ],
    }))
    return id
  }

  const addSession = (session) => {
    setData((prev) => ({
      ...prev,
      sessions: [{ id: uid('ses'), status: 'Upcoming', ...session }, ...prev.sessions],
    }))
  }

  const addRating = (entry) => {
    setData((prev) => ({
      ...prev,
      ratings: [{ id: uid('rt'), date: formatDate(), ...entry }, ...prev.ratings],
    }))
  }

  const getStudent = (id) => peers.find((s) => s.id === id)

  const value = {
    data,
    currentUser,
    peers,
    login,
    loginDemo,
    register,
    logout,
    updateProfile,
    addSkill,
    updateSkill,
    removeSkill,
    sendRequest,
    updateRequestStatus,
    sendMessage,
    startConversation,
    addSession,
    addRating,
    getStudent,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
