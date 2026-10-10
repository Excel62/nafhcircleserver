import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'incomes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('amount', 15, 2).notNullable()
      table.string('type').notNullable()
      table.integer('from_user_id').unsigned().nullable()
      table.string('circle').nullable()
      table.integer('level').unsigned().nullable()
      table.string('status').defaultTo('credited')
      table.string('admin_uuid').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}