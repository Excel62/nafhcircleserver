import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('uuid', 36).notNullable().unique()
      table.string('full_name').nullable()
      table.string('country', 254).notNullable()
      table.string('phone_number', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.boolean('is_subscribed').defaultTo(false)
      table.boolean('is_pin_set').defaultTo(false)
      table.boolean('is_address_set').defaultTo(false)
      table.string('withdrawal_address').nullable()
      table.integer('withdrawal_pin').unsigned().nullable()
      table.integer('referred_by_admin').unsigned().nullable() // 👈 no foreign key reference
      table.string('referred_by_admin_code').nullable()
      table.string('referral_tree').nullable() // stores ancestor chain e.g "adminId:1,userId:5,userId:10"
      table.string('referral_code', 20).unique().nullable()
      table.integer('referred_by').unsigned().nullable()
      table.decimal('referral_earnings', 10, 2).defaultTo(0)
      table.integer('total_referrals').defaultTo(0)
      table.string('member_level').nullable()
      table.timestamp('verification_code_expires_at').nullable()
      table.boolean('is_email_verified').defaultTo(false)
      table.string('verification_code', 20).nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.db.rawQuery('CURRENT_TIMESTAMP').knexQuery)
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
