import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import User from '#models/user'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Admin extends compose(BaseModel, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(Admin, {
    expiresIn: '30 days',
    prefix: 'adm_',
    table: 'admin_access_tokens', // 👈 points to admin tokens table
  })
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare adminId: string

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare referralCode: string

  @column()
  declare totalReferrals: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'referredByAdmin',
  })
  declare referredUsers: HasMany<typeof User>

  @beforeCreate()
  static async generateReferralCode(admin: Admin) {
    if (!admin.referralCode) {
      admin.referralCode = await Admin.generateUniqueReferralCode()
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
      const existing = await Admin.findBy('referral_code', code)
      isUnique = !existing
    }

    return code
  }
}