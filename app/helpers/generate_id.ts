import User from '#models/user'
import Admin from '#models/admin'

export async function generateUserId(): Promise<string> {
  // Get the last user by id
  const lastUser = await User.query().orderBy('id', 'desc').first()

  if (!lastUser) {
    return 'D1000D' // first user
  }

  // Extract the number from the last customId e.g "D1000D" → 1000
  const lastId = parseInt(lastUser.uuid.replace(/D/g, ''))
  const newId = lastId + 1

  return `D${newId}D`
}

// 👇 prefix = N, A, F, or H
export async function generateAdminId(prefix: 'N' | 'A' | 'F' | 'H'): Promise<string> {
  const lastAdmin = await Admin.query()
  .whereRaw(`admin_id LIKE ?`, [`${prefix}%`])
  .orderBy('id', 'desc')
  .first()

  if (!lastAdmin) return `${prefix}1000${prefix}`

  const lastId = parseInt(lastAdmin.adminId.replace(new RegExp(prefix, 'g'), ''))
  return `${prefix}${lastId + 1}${prefix}`
}