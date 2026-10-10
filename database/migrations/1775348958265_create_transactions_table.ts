import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.decimal('amount', 15, 2).notNullable() 
      table.string('transaction_type').notNullable()  // deposit, withdrawal, income, expenditure
      table.string('status').notNullable().defaultTo('pending') 
      table.string('transaction_id').notNullable().unique()
      table.timestamp('created_at').nullable() 
      table.timestamp('updated_at').nullable() 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}