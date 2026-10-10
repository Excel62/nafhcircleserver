import Admin from '#models/admin'
import { generateAdminId } from '#helpers/generate_id'
import { adminSignupValidator, adminLoginValidator } from '#validators/admins'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminAuthController {

  async signup({ request, response }: HttpContext) {
    // 👇 Only allow 4 admins total
    const adminCount = await Admin.query().count('* as total')
    const total = Number(adminCount[0].$extras.total)

    if (total >= 4) {
      return response.forbidden({
        message: 'Maximum number of admins (4) has been reached'
      })
    }

    const { fullName, email, password } = await request.validateUsing(adminSignupValidator)

    // 👇 Determine prefix based on signup order
    const prefixes: ('N' | 'A' | 'F' | 'H')[] = ['N', 'A', 'F', 'H']
    const prefix = prefixes[total] // 0=N, 1=A, 2=F, 3=H

    const admin = await Admin.create({
      adminId: await generateAdminId(prefix),
      fullName,
      email,
      password,
    })

    const token = await Admin.accessTokens.create(admin)

    return response.created({
      admin: {
        id: admin.id,
        adminId: admin.adminId,
        fullName: admin.fullName,
        email: admin.email,
        referralCode: admin.referralCode,
        referralUrl: `https://nafhcircle.com/register?ref=${admin.referralCode}`,
      },
      token: token.value!.release(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(adminLoginValidator)

    // 👇 Verify credentials
    const admin = await Admin.verifyCredentials(email, password)

    const token = await Admin.accessTokens.create(admin)

    return response.ok({
      admin: {
        id: admin.id,
        adminId: admin.adminId,
        fullName: admin.fullName,
        email: admin.email,
        referralCode: admin.referralCode,
        referralUrl: `https://nafhcircle.com/register?ref=${admin.referralCode}`,
      },
      token: token.value!.release(),
    })
  };


  async logout({ auth, response }: HttpContext) {
    // 👇 use admin guard explicitly
    const admin = auth.use('admin').user as Admin
    await Admin.accessTokens.delete(admin, admin.currentAccessToken!.identifier)

    return response.ok({ message: 'Logged out successfully' })
  }

  async me({ auth, response }: HttpContext) {
    // 👇 use admin guard explicitly
    const admin = auth.use('admin').user as Admin

    return response.ok({
      id: admin.id,
      adminId: admin.adminId,
      fullName: admin.fullName,
      email: admin.email,
      referralCode: admin.referralCode,
      referralUrl: `https://nafhcircle.com/register?ref=${admin.referralCode}`,
      totalReferrals: admin.totalReferrals,
      createdAt: admin.createdAt,
    })
  }
}