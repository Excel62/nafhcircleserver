import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import Referral from '#models/referral'
import Transaction from './transaction.ts'
import Deposit from './deposit.ts'
import Withdrawal from './withdrawal.ts'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  // 👇 Access tokens provider
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  // 👇 Add uuid column
  @column()
  declare uuid: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare country: string

  @column()
  declare phoneNumber: string

  @column()
  declare isSubscribed: boolean

  @column()
  declare isPinSet: boolean

  @column()
  declare isAddressSet: boolean

  @column()
  declare withdrawalPin: number | null

  @column()
  declare withdrawalAddress: string | null

  @column()
  declare referredByAdmin: number | null

  @column()
  declare referredByAdminCode: string | null

  @column()
  declare referralTree: string | null

  @column()
  declare referralCode: string | null

  @column()
  declare referredBy: number | null

  @column()
  declare referralEarnings: number

  @column()
  declare totalReferrals: number

  @column()
  declare memberLevel: string | null

  @column.dateTime()
  declare verificationCodeExpiresAt: DateTime | null

  @column()
  declare isEmailVerified: boolean

  @column()
  declare verificationCode: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Referral, {
    foreignKey: 'referrerId',
  })
  declare referrals: HasMany<typeof Referral>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @hasMany(() => Deposit)
  declare deposits: HasMany<typeof Deposit>

  @hasMany(() => Withdrawal)
  declare withdrawals: HasMany<typeof Withdrawal>

  @beforeCreate()
  static async assignReferralCode(user: User) {
    if (!user.referralCode) {
      user.referralCode = await User.generateUniqueReferralCode()
    }
  }

  static async generateUniqueReferralCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    let isUnique = false

    while (!isUnique) {
      code = ''
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      const existing = await User.findBy('referralCode', code)
      isUnique = !existing
    }

    return code
  }

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}