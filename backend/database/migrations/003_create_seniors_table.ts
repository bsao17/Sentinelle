import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'seniors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('prenom', 100).notNullable()
      table.string('gmail', 255).notNullable()
      table.boolean('actif').notNullable().defaultTo(true)
      table.integer('seuil_alerte').notNullable().defaultTo(60)
      table.text('oauth_token_encrypted').nullable()
      table.text('oauth_refresh_token_encrypted').nullable()
      table.timestamp('oauth_expires_at').nullable()
      table.string('oauth_status').defaultTo('pending')
      table.timestamp('last_sync_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
