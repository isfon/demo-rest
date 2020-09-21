const { Router} = require('express')
const userController = require('../controllers/user.controller')
import { ensureAuth } from '../middlewares/authenticated'

class IndexRoutes {
  constructor() {
    this.router = Router()
    this.config()
  }
  // estan despotegidas las rutas ya que en el front no se pedia una autenticacion previa, solo la ultima ruta esta protegida
  config() {
    this.router.route('/users/login')
      .post(userController.loginUser)
    this.router.route('/users')
      .post(userController.create)
    this.router.route('/users/:id')
      .delete(userController.remove)
    this.router.route('/users/search')
      .get(userController.search)
    this.router.route('/users')
      .get(ensureAuth, userController.getUsers)
  }
}

const indexRoutes = new IndexRoutes()
module.exports = indexRoutes.router
