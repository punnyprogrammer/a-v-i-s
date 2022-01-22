import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').unique().notNullable()
      table.string('name').notNullable()
      table.dateTime('email_verified_at').nullable()
      table.string('password').nullable()
      table.string('reset_token').nullable().unique()
      table.dateTime('reset_token_expires', { useTz: true}).nullable()

      // MySQL >= 8.013
      table.string('password_salt').unique().notNullable().defaultTo('MD5(RAND())')
      // MySQL < 8.013
      // table.string('password_salt').unique()

      // MySQL >= 8.013
      table.string('uuid').unique().defaultTo('UUID()')
      // MySQL < 8.013
      // table.string('uuid').unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
