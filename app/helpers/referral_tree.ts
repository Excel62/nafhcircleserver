// app/helpers/referral_tree.ts
import User from '#models/user'
import Income from '#models/income'

const LEVEL_CONFIG: Record<number, { amount: number; circle: string; type: string }> = {
  1: { amount: 20,  circle: 'Circle 1', type: 'referral_circle_1' },
  2: { amount: 2.5, circle: 'Circle 2', type: 'referral_circle_2' },
  3: { amount: 2,   circle: 'Circle 3', type: 'referral_circle_3' },
  4: { amount: 1,   circle: 'Circle 4', type: 'referral_circle_4' },
}

export async function processReferralTree(newUser: User) {
  if (!newUser.referralTree) return

  // "admin:3,user:10,user:25" → reverse → closest ancestor first
  const entries = newUser.referralTree.split(',').reverse()

  let level = 1

  for (const entry of entries) {
    if (level > 4) break

    const [type, idStr] = entry.split(':')

    if (type !== 'user') {
      level++
      continue
    }

    const ancestorId = parseInt(idStr)
    const ancestor = await User.find(ancestorId)

    if (!ancestor) {
      level++
      continue
    }

    const config = LEVEL_CONFIG[level]
    if (!config) break

    // ✅ 1. Credit referral_earnings on users table
    await User.query()
      .where('id', ancestor.id)
      .increment('referral_earnings', config.amount)

    // ✅ 2. Record in income table
    await Income.create({
      userId: ancestor.id,
      fromUserId: newUser.id,
      amount: config.amount,
      type: config.type,
      circle: config.circle,
      level: level,
      status: 'credited',
      adminUuid: newUser.referredByAdminCode ?? null,
    })

    // ✅ 3. Update member level if threshold reached
    await updateMemberLevel(ancestor)

    level++
  }
}

async function updateMemberLevel(user: User) {
  // Level 1 — direct referrals
  const level1Users = await User.query()
    .where('referred_by', user.id)
    .select('id')

  const level1Count = level1Users.length
  const level1Ids = level1Users.map(u => u.id)

  // Level 2
  let level2Count = 0
  let level2Ids: number[] = []
  if (level1Ids.length > 0) {
    const level2Users = await User.query()
      .whereIn('referred_by', level1Ids)
      .select('id')
    level2Count = level2Users.length
    level2Ids = level2Users.map(u => u.id)
  }

  // Level 3
  let level3Count = 0
  let level3Ids: number[] = []
  if (level2Ids.length > 0) {
    const level3Users = await User.query()
      .whereIn('referred_by', level2Ids)
      .select('id')
    level3Count = level3Users.length
    level3Ids = level3Users.map(u => u.id)
  }

  // Level 4
  let level4Count = 0
  if (level3Ids.length > 0) {
    const level4Result = await User.query()
      .whereIn('referred_by', level3Ids)
      .count('* as total')
      .first()
    level4Count = Number((level4Result as any).$extras.total)
  }

  // Determine new circle
  let newLevel: string | null = null

  if (level1Count >= 2)                                                             newLevel = 'Circle 1'
  if (level1Count >= 2 && level2Count >= 4)                                         newLevel = 'Circle 2'
  if (level1Count >= 2 && level2Count >= 4 && level3Count >= 8)                     newLevel = 'Circle 3'
  if (level1Count >= 2 && level2Count >= 4 && level3Count >= 8 && level4Count >= 16) newLevel = 'Circle 4'

  if (newLevel && newLevel !== user.memberLevel) {
    await User.query()
      .where('id', user.id)
      .update({ memberLevel: newLevel })

    console.log(`✅ ${user.fullName} upgraded to ${newLevel}`)
  }
}