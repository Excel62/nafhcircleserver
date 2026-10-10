import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'referrals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('referrer_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('referred_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('referral_code', 20).notNullable()
      table.decimal('reward_amount', 10, 2).defaultTo(0)
      table.string('status').defaultTo('pending') // pending, completed, rewarded
      table.timestamp('completed_at').nullable()

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()

      table.index(['referrer_id'])
      table.index(['referred_id'])
      table.index(['referral_code'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}