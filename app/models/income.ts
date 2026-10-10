// app/models/income.ts
import { BaseModel, column } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"

export default class Income extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare fromUserId: number      // who triggered this income (new registrant)

  @column()
  declare amount: number

  @column()
  declare type: string            // 'referral_circle_1', 'referral_circle_2', etc.

  @column()
  declare circle: string          // 'Circle 1', 'Circle 2', 'Circle 3', 'Circle 4'

  @column()
  declare level: number           // 1, 2, 3, 4

  @column()
  declare status: string          // 'credited'

  @column()
  declare adminUuid: string | null  // inherited admin code across tree

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}