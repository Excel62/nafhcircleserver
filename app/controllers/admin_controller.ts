import mail from '@adonisjs/mail/services/main'
import Admin from '#models/admin'
import Deposit from '#models/deposit'
import Transaction from '#models/transaction'
import User from '#models/user'
import Withdrawal from '#models/withdrawal'

import type { HttpContext } from '@adonisjs/core/http'


export default class AdminController {

  // Get all referrals (direct + all descendants) for an admin
  async referralTree({ params, response }: HttpContext) {
    const admin = await Admin.findOrFail(params.id)

    // Get all users whose referralTree contains this admin
    const allDescendants = await User.query()
      .whereRaw(`FIND_IN_SET(?, REPLACE(referral_tree, 'admin:', ''))`, [admin.id])
      .orWhere('referred_by_admin', admin.id)
      .orderBy('created_at', 'asc')

    // Group by level
    const directReferrals = allDescendants.filter(
      (u) => u.referralTree === `admin:${admin.id}`
    )

    const indirectReferrals = allDescendants.filter(
      (u) => u.referralTree !== `admin:${admin.id}`
    )

    return response.ok({
      admin: {
        id: admin.id,
        adminId: admin.adminId,
        fullName: admin.fullName,
        referralCode: admin.referralCode,
        totalReferrals: allDescendants.length,
      },
      directReferrals: directReferrals.map((u) => ({
        id: u.id,
        uuid: u.uuid,
        fullName: u.fullName,
        email: u.email,
        referralCode: u.referralCode,
        totalReferrals: u.totalReferrals,
        joinedAt: u.createdAt,
      })),
      indirectReferrals: indirectReferrals.map((u) => ({
        id: u.id,
        uuid: u.uuid,
        fullName: u.fullName,
        email: u.email,
        referralCode: u.referralCode,
        referralTree: u.referralTree,
        totalReferrals: u.totalReferrals,
        joinedAt: u.createdAt,
      })),
      summary: {
        totalDirect: directReferrals.length,
        totalIndirect: indirectReferrals.length,
        totalAll: allDescendants.length,
      }
    })
  }

  // Get all admins with their stats
  async index({ response }: HttpContext) {
    const admins = await Admin.query().orderBy('id', 'asc')

    const result = await Promise.all(admins.map(async (admin) => {
      const totalDescendants = await User.query()
        .where('referred_by_admin', admin.id)
        .orWhereRaw(`referral_tree LIKE ?`, [`%admin:${admin.id}%`])
        .count('* as total')

      return {
        id: admin.id,
        adminId: admin.adminId,
        fullName: admin.fullName,
        email: admin.email,
        referralCode: admin.referralCode,
        referralUrl: `https://nafhcircle.com/register?ref=${admin.referralCode}`,
        totalReferrals: totalDescendants[0].$extras.total,
      }
    }))

    return response.ok({ admins: result })
  }

  // Get referral tree for a specific user (all their descendants)
  async userTree({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const descendants = await User.query()
      .whereRaw(`referral_tree LIKE ?`, [`%user:${user.id}%`])
      .orderBy('created_at', 'asc')

    return response.ok({
      user: {
        id: user.id,
        uuid: user.uuid,
        fullName: user.fullName,
        referralCode: user.referralCode,
        referralTree: user.referralTree,
        totalReferrals: user.totalReferrals,
      },
      descendants: descendants.map((u) => ({
        id: u.id,
        uuid: u.uuid,
        fullName: u.fullName,
        email: u.email,
        referralCode: u.referralCode,
        referralTree: u.referralTree,
        joinedAt: u.createdAt,
      })),
      total: descendants.length,
    })
  }

  // get all users
  async allUsers({ response }: HttpContext) {
    const users = await User.query().orderBy('created_at', 'asc')

    return response.ok({
      users: users.map((u) => ({
        id: u.id,
        uuid: u.uuid,
        fullName: u.fullName,
        email: u.email,
        country: u.country,
        referralCode: u.referralCode,
        referralTree: u.referralTree,
        totalReferrals: u.totalReferrals,
        referredByAdmin: u.referredByAdmin,
        memberLevel: u.memberLevel,
        isSubscribed: u.isSubscribed,
        phoneNumber: u.phoneNumber,
        referredBy: u.referredBy,
        referralEarnings: u.referralEarnings,
        referredByAdminCode: u.referredByAdminCode,
        joinedAt: u.createdAt,
        withdrawalAddress: u.withdrawalAddress,
      })),
    })
  }

  // get all users deposite
  async deposits({ response }: HttpContext) {
    const deposits = await Deposit.query()
      .preload('user', (query) => {
        query.select('id', 'full_name', 'email', 'uuid')
      })
      .orderBy('created_at', 'desc')

    return response.ok({
      deposits: deposits.map((deposit) => ({
        id: deposit.id,
        amount: deposit.amount,
        status: deposit.status,
        transactionId: deposit.transactionId,
        createdAt: deposit.createdAt,
        user: {
          id: deposit.user.id,
          uuid: deposit.user.uuid,
          fullName: deposit.user.fullName,
          email: deposit.user.email,
        }
      }))
    })
  }

  // approve a deposit
async approveDeposit({ params, response }: HttpContext) {
  const deposit = await Deposit.findOrFail(params.id)
  const user = await User.findOrFail(deposit.userId)

  // 👇 prevent double approving
  if (deposit.status === 'approved') {
    return response.badRequest({ message: 'Deposit already approved' })
  }

  deposit.status = 'approved'
  await deposit.save()

  // 👇 Use increment instead of += to avoid type issues
  await User.query()
    .where('id', deposit.userId)
    .increment('referral_earnings', Number(deposit.amount))

    // send email to user
   await mail.send((message) => {
  message
    .to(user.email)
    .subject('Your deposit is approved — NAFH Circle')
    .htmlView('deposit', {
      user: {
        name: user.fullName,
        email: user.email,
        dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
      },
      deposit: {
        amount: deposit.amount,           // e.g. "250.00"
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),                               // e.g. "April 14, 2026"
      }
    })
})

  return response.ok({ message: 'Deposit approved' })
}

  // reject a deposit
  async rejectDeposit({ params, response }: HttpContext) {
    const deposit = await Deposit.findOrFail(params.id)
    deposit.status = 'declined'
    await deposit.save()

    return response.ok({ message: 'Deposit rejected' })
  }

  // get all withdrawal 
  async getWithdrawals({ response}: HttpContext) {
    const withdrawals = await Withdrawal.query().preload('user', (query) => {
        query.select('id', 'full_name', 'email', 'uuid')
      })
      .orderBy('created_at', 'desc')
    return response.ok({
      withdrawals: withdrawals.map((withdrawal) => ({
        id: withdrawal.id,
        amount: withdrawal.amount,
        status: withdrawal.status,
        transactionId: withdrawal.transactionId,
        createdAt: withdrawal.createdAt,
        user :{
          id: withdrawal.userId,
          fullName: withdrawal.user.fullName,
          email: withdrawal.user.email,
          withdrawalAddress: withdrawal.user.withdrawalAddress,
        }
      }))
    })
  }

  // approve a withdrawal
  async approveWithdrawal({ params, response }: HttpContext) {
    const withdrawal = await Withdrawal.findOrFail(params.id)

    // 👇 prevent double approving
    if (withdrawal.status === 'approved') {
      return response.badRequest({ message: 'Withdrawal already approved' })
    }

    withdrawal.status = 'approved'
    await withdrawal.save()

    // 👇 Use increment instead of += to avoid type issues
    await User.query()
      .where('id', withdrawal.userId)
      .decrement('referral_earnings', Number(withdrawal.amount))

    return response.ok({ message: 'Withdrawal approved' })
  }

  // reject a withdrawal
  async rejectWithdrawal({ params, response }: HttpContext) {
    const withdrawal = await Withdrawal.findOrFail(params.id)
    withdrawal.status = 'declined'
    await withdrawal.save()

    return response.ok({ message: 'Withdrawal rejected' })
  }


  // fund user account (admin action)
  async fundAccount({ request, response }: HttpContext) {
    const { userId, amount, action  } = request.body()
    console.log(action)

    if (!userId || !amount || isNaN(amount) || Number(amount) <= 0) {
      return response.badRequest({ message: 'Valid userId and amount are required' })
    }

    const user = await User.findOrFail(userId)

    // 👇 Use increment to avoid type issues
    if (action === 'add') {
         await User.query()
      .where('id', user.id)
      .increment('referral_earnings', Number(amount))

    return response.ok({ message: `Funded ${user.fullName}'s account with ${amount}` })
    }
    if (action === 'deduct') {
      await User.query()
      .where('id', user.id)
      .decrement('referral_earnings', Number(amount))

    return response.ok({ message: `Deducted ${user.fullName}'s account with ${amount}` })
  }
  }
 
  // get user`s subscriptions from transactions where transaction type is subscription
async getSubscriptions({ response }: HttpContext) {
    const subscriptions = await Transaction.query().where('transaction_type', 'subscription').orderBy('created_at', 'desc').preload('user', (query) => {
        query.select('id', 'full_name', 'email', 'uuid')
    })
    return response.ok({
      subscriptions: subscriptions.map((subscription) => ({
        id: subscription.id,
        amount: subscription.amount,
        status: subscription.status,
        transactionId: subscription.transactionId,
        createdAt: subscription.createdAt,
        user: {
          id: subscription.user.id,
          uuid: subscription.user.uuid,
          fullName: subscription.user.fullName,
          email: subscription.user.email,
        }
      }))
    })
  }
  
  // approve a subscription
async approveSubscription({ params, response }: HttpContext) {
  const subscription = await Transaction.findOrFail(params.id)

  if (params.action === 'approve') {
     // 👇 prevent double approving
  if (subscription.status === 'approved') {
    return response.badRequest({ message: 'Subscription already approved' })
  }

  subscription.status = 'approved'
  await subscription.save()
  // update user isSubscribed to true
  const user = await User.findOrFail(subscription.userId) as User
  user.isSubscribed = true
  user.memberLevel = 'Level 1'
  await user.save()

  return response.ok({ message: 'Subscription approved' })
}else if (params.action === 'reject') {
  // 👇 prevent double rejecting
  if (subscription.status === 'rejected') {
    return response.badRequest({ message: 'Subscription already rejected' })
  }

  subscription.status = 'rejected'
  await subscription.save()

}
}

// delete a user
async deleteUser({ params, response }: HttpContext) {
  const user = await User.findOrFail(params.id)
  await user.delete()

  return response.ok({ message: 'User deleted successfully' })
  }
}