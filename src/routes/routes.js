const express = require("express")
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const navegation = require("../app/controllers/navegation")
const admin = require("../app/controllers/admin")
const users = require('./users')
// const adm = require('./admin')

//NAVEGATION routes
routes.get("/", navegation.home)
routes.get("/receitas", navegation.index)
routes.get("/receitas/:id", navegation.show)
routes.get("/sobre", navegation.about)
routes.get("/chefs", navegation.chef)

//ADMIN  recipes routes
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit) 
routes.post("/admin/recipes", multer.array("images", 5), admin.post) 
routes.put("/admin/recipes", multer.array("images", 5),admin.update)
routes.delete("/admin/recipes", admin.delete)

//user routes
routes.use('/users', users)
// routes.use('/adm',adm)

//ADMIN  chefs routes
routes.get("/admin/chefs", admin.chefIndex)
routes.get("/admin/chefs/create", admin.chefCreate)
routes.get("/admin/chefs/:id", admin.chefShow)
routes.get("/admin/chefs/:id/edit", admin.chefEdit)
routes.post("/admin/chefs", multer.array("image", 1),admin.chefPost) 
routes.put("/admin/chefs", multer.array("image", 1),admin.chefUpdate)
routes.delete("/admin/chefs", admin.chefDelete)

// Rotas de perfil de um usuário logado
//routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
//routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
//routes.post('/admin/users', UserController.post) //Cadastrar um usuário
//routes.put('/admin/users', UserController.put) // Editar um usuário
//routes.delete('/admin/users', UserController.delete) // Deletar um usuário


module.exports = routes