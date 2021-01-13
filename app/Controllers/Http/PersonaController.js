'use strict'

const {validate} = use('Validator');
const Persona = use('App/Models/Persona')

class PersonaController {

  async index({response}) {
    const data = await Persona.all();
    try {
      return response.status(200).send({'Data':data});
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  async show({request, response, params: {id}}) {
    const persona = request.p
    console.log(persona)
    response.status(200).json({'Data': persona})
  }

  async create({request, response}) {

    const rules =
      {
        nombre: 'required|string',
        apellido: 'required|string',
        edad: 'required|integer'
      }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {nombre, apellido, edad} = request.only([
          'nombre',
          'apellido',
          'edad'
        ]);

        await Persona.create({
          nombre,
          apellido,
          edad
        });

        return response.status(200).send({message: 'User has been created'})
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  async update({params: {id}, request, response}) {
    try {
      const data = request.only(['nombre', 'apellido', 'edad']);
      const persona = request.p
      persona.nombre = data.nombre;
      persona.apellido = data.apellido;
      persona.edad = data.edad;
      await persona.save();
      return response.status(200).json(persona);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  async delete({request, params, response}) {
    try {
      const persona = request.p
      await persona.delete();
      return response.status(204).send('status Persona deleted');
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

}

module.exports = PersonaController
