import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'email_analyses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('senior_id').notNullable().references('id').inTable('seniors').onDelete('CASCADE')
      table.string('from_email', 255).notNullable()
      table.string('subject', 500).notNullable()
      table.string('gmail_message_id', 255).nullable()
      table.timestamp('date_received').notNullable()
      table.integer('score').notNullable().defaultTo(0)
      table.string('categorie', 100).nullable()
      table.string('niveau', 50).nullable()
      table.text('explication').nullable()
      table.text('conseil_enfant').nullable()
      table.jsonb('indicateurs').defaultTo('[]')
      table.boolean('alerte_envoyee').notNullable().defaultTo(false)
      table.timestamp('alerte_envoyee_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
