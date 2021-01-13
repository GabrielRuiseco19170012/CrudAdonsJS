'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonasSchema extends Schema {
  up () {
    this.create('personas', (table) => {
      table.increments()
      table.string('nombre',30).notNullable
      table.string('apellido',30).notNullable
      table.integer('edad').notNullable
      table.timestamps()
    })
  }

  down () {
    this.drop('personas')
  }
}

module.exports = PersonasSchema
