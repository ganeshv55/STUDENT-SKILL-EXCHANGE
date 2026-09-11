export function skillNames(list = []) {
  return list.map((s) => (typeof s === 'string' ? s : s.name))
}

export function computeMatch(user, student) {
  if (!user || !student) return 0
  const want = skillNames(user.learnSkills)
  const teach = skillNames(user.teachSkills)
  const theyTeach = skillNames(student.teachSkills)
  const theyWant = skillNames(student.learnSkills)

  const theyCanTeachMe = theyTeach.filter((s) => want.includes(s))
  const iCanTeachThem = teach.filter((s) => theyWant.includes(s))

  let score = 38
  score += theyCanTeachMe.length * 18
  score += iCanTeachThem.length * 12
  if (theyCanTeachMe.length && iCanTeachThem.length) score += 12
  if (user.college && student.college === user.college) score += 4

  return Math.max(42, Math.min(98, score))
}

export function matchReasons(user, student) {
  if (!user || !student) return []
  const want = skillNames(user.learnSkills)
  const teach = skillNames(user.teachSkills)
  const theyTeach = skillNames(student.teachSkills)
  const theyWant = skillNames(student.learnSkills)

  const reasons = []
  theyTeach.filter((s) => want.includes(s)).forEach((skill) => {
    reasons.push(`You want to learn ${skill} and ${student.name} can teach ${skill}.`)
  })
  theyWant.filter((s) => teach.includes(s)).forEach((skill) => {
    reasons.push(`${student.name} wants to learn ${skill} and you can teach it.`)
  })
  if (!reasons.length) {
    reasons.push(`${student.name} has overlapping campus interests and complementary skills.`)
  }
  return reasons
}
