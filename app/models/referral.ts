import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Referral extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare referrerId: number

  @column()
  declare referredId: number

  @column()
  declare referralCode: string

  @column()
  declare rewardAmount: number

  @column()
  declare status: string

  @column.dateTime()
  declare completedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'referrerId',
  })
  declare referrer: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'referredId',
  })
  declare referred: BelongsTo<typeof User>
}