'use strict'

/*
|--------------------------------------------------------------------------
| PersonaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PersonaSeeder {
  async run () {
    const persona = await Database.table('personas')
    const usersArray = await Factory
      .model('App/Models/Persona')
      .createMany(100)
  }
}

module.exports = PersonaSeeder
