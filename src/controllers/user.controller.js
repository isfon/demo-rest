import bcrypt from 'bcrypt-nodejs'
import User from '../models/user.model'
import jwt from '../services/jwt'
import moment from 'moment'

class UserControllers {
  create (request, response) {
    let user = new User()
    let params = request.body
    user.name = params.name
    user.phone = params.phone
    user.age = params.age
    user.email = params.email
    user.gender = params.gender
    user.hobby = params.hobby
    if (params.password && user.name && user.phone && user.age && user.email) {
      bcrypt.hash(params.password, null, null, (err, hash) => {
        user.password = hash
        user.save((error, userStored) => {
          if (error) {
            response.status(500).send({mensaje: 'Error al guardar el usuario.', error})
          } else {
            response.status(200).send({mensaje: 'Usuario guardado correctamente', user: userStored})
          }
        })
      })
    } else {
      response.status(412).send({mensaje:'Todos los campos son obligatorios.'})
    }
  }

  async loginUser (request, response) {
    let email = request.body.email
    let password = request.body.password
    const user = await User.findOne({email: email.toLowerCase()})
    if (!user) {
      response.status(404).send({mensaje: 'El usuario no existe.'})
    } else {
      bcrypt.compare(password, user.password, (error, check) => {
        if (check) {
          response.status(200).send({
            token: jwt.createToken(user),
            user: user
          })
        } else {
          response.status(404).send({mensaje: 'Credenciales no validas.'})
        }
      })
    }
  }

  remove (request, response) {
    let idUser = request.params.id
    User.findByIdAndRemove(idUser, (error, user) => {
      if (error) {
        response.status(500).send({mensaje: 'Error al eliminar usuario.'})
      } else {
        if (!user) {
          response.status(404).send({mensaje: 'No se encontro usuario para eliminar.'})
        } else {
          response.status(200).send(user)
        }
      }
    })
  }
  
  async search (request, response) {
    let { search } = request.query
    const users = await User.find({ $or: [ {name: { $regex : new RegExp(search, "i") }}, {hobby: { $regex : new RegExp(search, "i")}}]})
    response.status(200).send(users)
  }
  
  async getUsers (request, response) {
    const date = moment().subtract(3, 'days').toISOString()
    const filter = {age: { $gte: 18}, gender: 'male', created: { $gte: new Date(date)}}
    const users = await User.aggregate([
      { $match: filter},
      {
        $group: {
          _id: "$hobby",
          obj: { $push: { name: "$name", phone: "$phone", hobby: "$hobby" } }
      }
   }
    ]);
    response.status(200).send(users)
  }
}

const userControllers = new UserControllers()
module.exports = userControllers
