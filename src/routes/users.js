const express = require("express")
const routes = express.Router()

const SessionController = require("../app/controllers/SessionController")
const UserController = require('../app/controllers/UserController')

//user register UserController
routes.get('/register', UserController.registerForm)
routes.post('/register', UserController.post)

//login / logout
routes.get('/login',SessionController.loginForm)
//routes.post('/login', SessionValidator.login, SessionController.login)
//routes.post('/logout', SessionController.logout)

module.exports = routes