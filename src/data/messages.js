export const initialConversations = [
  {
    id: 'c1',
    studentId: 's1',
    unread: 1,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Hey Ganesh! I saw you want to learn React. I can walk you through components this weekend.',
        time: '10:12 AM',
      },
      {
        id: 'm2',
        from: 'me',
        text: 'That would be great. I can help you with a simple UI layout in return.',
        time: '10:18 AM',
      },
      {
        id: 'm3',
        from: 'them',
        text: 'Perfect. Let’s keep Saturday afternoon free.',
        time: '10:21 AM',
      },
    ],
  },
  {
    id: 'c2',
    studentId: 's2',
    unread: 0,
    messages: [
      {
        id: 'm4',
        from: 'them',
        text: 'I can review your profile layout if you help me with a Python loop example.',
        time: 'Yesterday',
      },
      {
        id: 'm5',
        from: 'me',
        text: 'Yes! I’ll send a short notes file tonight.',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'c3',
    studentId: 's6',
    unread: 0,
    messages: [
      {
        id: 'm6',
        from: 'them',
        text: 'If you want speaking practice, we can do a 20-minute mock intro.',
        time: 'Mon',
      },
    ],
  },
]

export const initialRequests = [
  {
    id: 'r1',
    fromId: 's2',
    toId: 'demo',
    offerSkill: 'UI/UX Design',
    wantSkill: 'Python',
    date: '11 Sep 2026',
    status: 'Received',
    note: 'I can help you design a cleaner dashboard if you teach me Python basics.',
  },
  {
    id: 'r2',
    fromId: 's6',
    toId: 'demo',
    offerSkill: 'Public Speaking',
    wantSkill: 'Communication',
    date: '10 Sep 2026',
    status: 'Received',
    note: 'Let’s practice short speeches together.',
  },
  {
    id: 'r3',
    fromId: 'demo',
    toId: 's1',
    offerSkill: 'Python',
    wantSkill: 'React.js',
    date: '09 Sep 2026',
    status: 'Sent',
    note: 'I would like to learn React.js from you.',
  },
  {
    id: 'r4',
    fromId: 'demo',
    toId: 's10',
    offerSkill: 'Python',
    wantSkill: 'Presentation Skills',
    date: '04 Sep 2026',
    status: 'Active',
    note: 'Weekly speaking + Python swap.',
  },
  {
    id: 'r5',
    fromId: 's7',
    toId: 'demo',
    offerSkill: 'Excel',
    wantSkill: 'Communication',
    date: '20 Aug 2026',
    status: 'Completed',
    note: 'Finished two Excel + communication sessions.',
  },
]

export const initialSessions = [
  {
    id: 'ses1',
    studentId: 's1',
    skill: 'React.js',
    date: '2026-09-13',
    time: '16:00',
    type: 'Online',
    status: 'Upcoming',
  },
  {
    id: 'ses2',
    studentId: 's10',
    skill: 'Presentation Skills',
    date: '2026-09-14',
    time: '18:30',
    type: 'Campus',
    status: 'Upcoming',
  },
]

export const initialRatings = [
  {
    id: 'rt1',
    studentId: 's7',
    rating: 5,
    feedback: 'Karthik explained Excel charts clearly and was patient throughout.',
    date: '21 Aug 2026',
  },
]
