import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.ts'


export default class Deposit extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare userId: number

    @column()
    declare amount: number

    @column()
    declare status: string  // pending, completed, failed

    @column()
    declare transactionId: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}