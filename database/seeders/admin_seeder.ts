import Admin from '#models/admin'
import { generateAdminId } from '#helpers/generate_id'
import hash from '@adonisjs/core/services/hash'

export default class AdminSeeder {
  async run() {
    const admins = [
      { prefix: 'N', fullName: 'NAFH Admin N', email: 'n@nafhcircle.com', password: 'secret123' },
      { prefix: 'A', fullName: 'NAFH Admin A', email: 'a@nafhcircle.com', password: 'secret123' },
      { prefix: 'F', fullName: 'NAFH Admin F', email: 'f@nafhcircle.com', password: 'secret123' },
      { prefix: 'H', fullName: 'NAFH Admin H', email: 'h@nafhcircle.com', password: 'secret123' },
    ]

    for (const admin of admins) {
      await Admin.create({
        adminId: await generateAdminId(admin.prefix as 'N' | 'A' | 'F' | 'H'),
        fullName: admin.fullName,
        email: admin.email,
        password: await hash.make(admin.password),
      })
    }
  }
}