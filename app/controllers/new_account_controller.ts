import User from '#models/user'
import Admin from '#models/admin'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { generateUserId } from '#helpers/generate_id'
import mail from '@adonisjs/mail/services/main'
import { processReferralTree } from '#helpers/referral_tree'
import VerifyEmailNotification from '#mails/verify_email_notification' 
import { DateTime } from 'luxon'


// export default class NewAccountController {
//   async store({ request, response, serialize }: HttpContext) {
//     const { fullName, email, password, phoneNumber, country } = await request.validateUsing(signupValidator)

//     // 👇 Get ref code from query string e.g ?ref=ABC12345
//     const refCode = request.input('ref')

//     let referredBy: number | null = null
//     let referredByAdmin: number | null = null
//     let referralTree: string = ''
//     let referredByAdminCode: string | null = null  // 👈 add this
//     // let foundAdmin: Admin | null = null   // 👈 add this


//     if (refCode) {
//       // 👇 First check if ref code belongs to an admin
//       const admin = await Admin.findBy('referral_code', refCode)

//       if (admin) {
//         // referred directly by an admin
//         // foundAdmin = admin  // 👈 save reference
//         referredByAdmin = admin.id
//         referredByAdminCode = admin.adminId  // 👈 e.g N1000N
//         referralTree = `admin:${admin.id}`

//         await Admin.query()
//           .where('id', admin.id)
//           .increment('total_referrals', 1)

//       } else {
//         // 👇 Check if ref code belongs to a user
//         const referrer = await User.findBy('referral_code', refCode)

//         if (!referrer) {
//           return response.badRequest({ message: 'Invalid referral code' })
//         }

//         referredBy = referrer.id
//         referredByAdmin = referrer.referredByAdmin
//         referredByAdminCode = referrer.referredByAdminCode  // 👈 inherit from referrer

//         // 👇 Build full ancestor chain
//         referralTree = referrer.referralTree
//           ? `${referrer.referralTree},user:${referrer.id}`
//           : `user:${referrer.id}`

//         // Log referral record
//         await referrer.related('referrals').create({
//           referredId: 0,
//           referralCode: refCode,
//           rewardAmount: 0,
//           status: 'pending',
//         })

//         await User.query()
//           .where('id', referrer.id)
//           .increment('total_referrals', 1)
//       }
//     }

//     // Create the new user
//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       phoneNumber: phoneNumber ?? undefined,
//       country: country ?? undefined,
//       uuid: await generateUserId(),
//       referredBy,
//       referredByAdmin,
//       referredByAdminCode,
//       referralTree,
//     })

//     // 👇 Send email to user
//     await mail.send((message) => {
//       message
//         .to(user.email)
//         .subject('Welcome to NAFH Circle')
//         .htmlView('welcome', { 
//           user: {
//             name: user.fullName,
//             uuid: user.uuid,
//             dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
//           }
//          })
//     })
//     // 👇 Update the referral record with the correct referredId
//     if (referredBy) {
//       await (await User.findOrFail(referredBy))
//         .related('referrals')
//         .query()
//         .where('referred_id', 0)
//         .update({ referredId: user.id })
//     }

//     const token = await User.accessTokens.create(user)

//     return serialize({
//       user: UserTransformer.transform(user),
//       token: token.value!.release(),
//     })
//   }
// }



const REFERRAL_BONUS = 5  // change to whatever amount you want





// export default class NewAccountController {
//   async store({ request, response, serialize }: HttpContext) {
//     const { fullName, email, password, phoneNumber, country } = await request.validateUsing(signupValidator)

//     const refCode = request.input('ref')

//     let referredBy: number | null = null
//     let referredByAdmin: number | null = null
//     let referralTree: string = ''
//     let referredByAdminCode: string | null = null

//     if (refCode) {
//       const admin = await Admin.findBy('referral_code', refCode)

//       if (admin) {
//         referredByAdmin = admin.id
//         referredByAdminCode = admin.adminId
//         referralTree = `admin:${admin.id}`

//         await Admin.query()
//           .where('id', admin.id)
//           .increment('total_referrals', 1)

//       } else {
//         const referrer = await User.findBy('referral_code', refCode)

//         if (!referrer) {
//           return response.badRequest({ message: 'Invalid referral code' })
//         }

//         referredBy = referrer.id
//         referredByAdmin = referrer.referredByAdmin
//         referredByAdminCode = referrer.referredByAdminCode

//         referralTree = referrer.referralTree
//           ? `${referrer.referralTree},user:${referrer.id}`
//           : `user:${referrer.id}`

//         await referrer.related('referrals').create({
//           referredId: 0,
//           referralCode: refCode,
//           rewardAmount: REFERRAL_BONUS,  // ✅ store the actual bonus amount
//           status: 'pending',
//         })

//         // ✅ Increment both total_referrals and referral_earnings in one query
//         await User.query()
//           .where('id', referrer.id)
//           .increment('total_referrals', 1)
//           .increment('referral_earnings', REFERRAL_BONUS)
//       }
//     }

//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       phoneNumber: phoneNumber ?? undefined,
//       country: country ?? undefined,
//       uuid: await generateUserId(),
//       referredBy,
//       referredByAdmin,
//       referredByAdminCode,
//       referralTree,
//     })

    

//     await processReferralTree(user)

//     await mail.send((message) => {
//       message
//         .to(user.email)
//         .subject('Welcome to NAFH Circle')
//         .htmlView('welcome', {
//           user: {
//             name: user.fullName,
//             uuid: user.uuid,
//             dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
//           }
//         })
//     })

//     if (referredBy) {
//       await (await User.findOrFail(referredBy))
//         .related('referrals')
//         .query()
//         .where('referred_id', 0)
//         .update({ referredId: user.id, status: 'completed' })  // ✅ mark as completed
//     }

//     const token = await User.accessTokens.create(user)

//     return serialize({
//       user: UserTransformer.transform(user),
//       token: token.value!.release(),
//     })
//   }
  
// }

// export default class NewAccountController {
//   async store({ request, response, serialize }: HttpContext) {
//     const { fullName, email, password, phoneNumber, country } = await request.validateUsing(signupValidator)

//     const refCode = request.input('ref')

//     let referredBy: number | null = null
//     let referredByAdmin: number | null = null
//     let referralTree: string = ''
//     let referredByAdminCode: string | null = null

//     if (refCode) {
//       const admin = await Admin.findBy('referral_code', refCode)

//       if (admin) {
//         referredByAdmin = admin.id
//         referredByAdminCode = admin.adminId
//         referralTree = `admin:${admin.id}`

//         await Admin.query()
//           .where('id', admin.id)
//           .increment('total_referrals', 1)

//       } else {
//         const referrer = await User.findBy('referral_code', refCode)

//         if (!referrer) {
//           return response.badRequest({ message: 'Invalid referral code' })
//         }

//         referredBy = referrer.id
//         referredByAdmin = referrer.referredByAdmin
//         referredByAdminCode = referrer.referredByAdminCode

//         referralTree = referrer.referralTree
//           ? `${referrer.referralTree},user:${referrer.id}`
//           : `user:${referrer.id}`

//         await referrer.related('referrals').create({
//           referredId: 0,
//           referralCode: refCode,
//           rewardAmount: REFERRAL_BONUS,
//           status: 'pending',
//         })

//         await User.query()
//           .where('id', referrer.id)
//           .increment('total_referrals', 1)
//           .increment('referral_earnings', REFERRAL_BONUS)
//       }
//     }

//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       phoneNumber: phoneNumber ?? undefined,
//       country: country ?? undefined,
//       uuid: await generateUserId(),
//       referredBy,
//       referredByAdmin,
//       referredByAdminCode,
//       referralTree,
//     })

//     // ✅ Send verification email
//     await this.sendVerificationCode(user)

//     await processReferralTree(user)

//     await mail.send((message) => {
//       message
//         .to(user.email)
//         .subject('Welcome to NAFH Circle')
//         .htmlView('welcome', {
//           user: {
//             name: user.fullName,
//             uuid: user.uuid,
//             dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
//           }
//         })
//     })

//     if (referredBy) {
//       await (await User.findOrFail(referredBy))
//         .related('referrals')
//         .query()
//         .where('referred_id', 0)
//         .update({ referredId: user.id, status: 'completed' })
//     }

//     const token = await User.accessTokens.create(user)

//     return serialize({
//       user: UserTransformer.transform(user),
//       token: token.value!.release(),
//     })
//   }

//   // ── Email verification helpers ─────────────────────────────────────────

//   private async sendVerificationCode(user: User) {
//     const code = Math.floor(100000 + Math.random() * 900000).toString()
//     const expiry = DateTime.fromJSDate(new Date(Date.now() + 10 * 60 * 1000))// 10 minutes

//     user.verificationCode = code
//     user.verificationCodeExpiresAt = expiry
//     await user.save()

//     await mail.send(new VerifyEmailNotification(
//       user.fullName ?? user.email,
//       user.email,
//       code
//     ))
//   }

//   // POST /api/v1/auth/verify-email
//   async verifyEmail({ request, response }: HttpContext) {
//     const { email, code } = request.only(['email', 'code'])

//     const user = await User.findBy('email', email)
//     if (!user) {
//       return response.notFound({ message: 'User not found' })
//     }

//     if (user.isEmailVerified) {
//       return response.ok({ message: 'Email already verified' })
//     }

//     if (user.verificationCode !== code) {
//       return response.badRequest({ message: 'Invalid verification code' })
//     }

//     if (user.verificationCodeExpiresAt && new Date() > new Date(user.verificationCodeExpiresAt.toString())) {
//       return response.badRequest({ message: 'Verification code has expired. Please request a new one.' })
//     }

//     user.isEmailVerified = true
//     user.verificationCode = null
//     user.verificationCodeExpiresAt = null
//     await user.save()

//     return response.ok({ message: 'Email verified successfully' })
//   }

//   // POST /api/v1/auth/resend-verification
//   async resendVerification({ request, response }: HttpContext) {
//     const { email } = request.only(['email'])

//     const user = await User.findBy('email', email)
//     if (!user) {
//       return response.notFound({ message: 'User not found' })
//     }

//     if (user.isEmailVerified) {
//       return response.badRequest({ message: 'Email is already verified' })
//     }

//     await this.sendVerificationCode(user)
//     return response.ok({ message: 'Verification code resent successfully' })
//   }
// }


export default class NewAccountController {
  async store({ request, response, serialize }: HttpContext) {
    const { fullName, email, password, phoneNumber, country } = await request.validateUsing(signupValidator)

    const refCode = request.input('ref')

    let referredBy: number | null = null
    let referredByAdmin: number | null = null
    let referralTree: string = ''
    let referredByAdminCode: string | null = null
    let referrerUser: InstanceType<typeof User> | null = null  // ✅ store referrer reference

    if (refCode) {
      const admin = await Admin.findBy('referral_code', refCode)

      if (admin) {
        referredByAdmin = admin.id
        referredByAdminCode = admin.adminId
        referralTree = `admin:${admin.id}`

        await Admin.query()
          .where('id', admin.id)
          .increment('total_referrals', 1)

      } else {
        const referrer = await User.findBy('referral_code', refCode)

        if (!referrer) {
          return response.badRequest({ message: 'Invalid referral code' })
        }

        referredBy = referrer.id
        referredByAdmin = referrer.referredByAdmin
        referredByAdminCode = referrer.referredByAdminCode
        referrerUser = referrer  // ✅ save for later use after user creation

        referralTree = referrer.referralTree
          ? `${referrer.referralTree},user:${referrer.id}`
          : `user:${referrer.id}`

        // ✅ Only increment counts here — NO referral record yet
        await User.query()
          .where('id', referrer.id)
          .increment('total_referrals', 1)
          .increment('referral_earnings', REFERRAL_BONUS)
      }
    }

    // ✅ Create user first
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber: phoneNumber ?? undefined,
      country: country ?? undefined,
      uuid: await generateUserId(),
      referredBy,
      referredByAdmin,
      referredByAdminCode,
      referralTree,
    })

    // ✅ Now create referral record with the real user.id
    if (referrerUser) {
      await referrerUser.related('referrals').create({
        referredId: user.id,        // ✅ real id — user exists now
        referralCode: refCode,
        rewardAmount: REFERRAL_BONUS,
        status: 'completed',        // ✅ completed immediately, no placeholder needed
      })
    }

    // Send verification email
    await this.sendVerificationCode(user)

    await processReferralTree(user)

    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Welcome to NAFH Circle')
        .htmlView('welcome', {
          user: {
            name: user.fullName,
            uuid: user.uuid,
            dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
          }
        })
    })

    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  // ── Email verification helpers ─────────────────────────────────────────

  private async sendVerificationCode(user: User) {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiry = DateTime.now().plus({ minutes: 10 })

    user.verificationCode = code
    user.verificationCodeExpiresAt = expiry
    await user.save()

    await mail.send(new VerifyEmailNotification(
      user.fullName ?? user.email,
      user.email,
      code
    ))
  }

  // POST /api/v1/auth/verify-email
  async verifyEmail({ request, response }: HttpContext) {
    const { email, code } = request.only(['email', 'code'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    if (user.isEmailVerified) {
      return response.ok({ message: 'Email already verified' })
    }

    if (user.verificationCode !== code) {
      return response.badRequest({ message: 'Invalid verification code' })
    }

    if (user.verificationCodeExpiresAt && DateTime.now() > user.verificationCodeExpiresAt) {
      return response.badRequest({ message: 'Verification code has expired. Please request a new one.' })
    }

    user.isEmailVerified = true
    user.verificationCode = null
    user.verificationCodeExpiresAt = null
    await user.save()

    return response.ok({ message: 'Email verified successfully' })
  }

  // POST /api/v1/auth/resend-verification
  async resendVerification({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    if (user.isEmailVerified) {
      return response.badRequest({ message: 'Email is already verified' })
    }

    await this.sendVerificationCode(user)
    return response.ok({ message: 'Verification code resent successfully' })
  }
}