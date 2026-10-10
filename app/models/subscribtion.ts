
import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class Subscribtion extends BaseModel {

    @column()
    declare userId: number

    @column()
    declare amount: number

    @column()
    declare status: string

    @column()
    declare transactionId: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}