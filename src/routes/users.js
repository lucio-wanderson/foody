const express = require("express")
const routes = express.Router()

const SessionController = require("../app/controllers/SessionController")

//login / logout
routes.get('/login',SessionController.loginForm)
//routes.post('/login', SessionValidator.login, SessionController.login)
//routes.post('/logout', SessionController.logout)

module.exports = routes