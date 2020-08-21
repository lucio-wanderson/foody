const express = require("express")
const routes = express.Router()
const navegation = require("./app/controllers/navegation")
const admin = require("./app/controllers/admin")

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
routes.post("/admin/recipes", admin.post) 
routes.put("/admin/recipes", admin.update)
routes.delete("/admin/recipes", admin.delete)

//ADMIN  chefs routes
routes.get("/admin/chefs", admin.chefIndex)
routes.get("/admin/chefs/create", admin.chefCreate)
routes.get("/admin/chefs/:id", admin.chefShow)
routes.get("/admin/chefs/:id/edit", admin.chefEdit)
routes.post("/admin/chefs", admin.chefPost) 
routes.put("/admin/chefs", admin.chefUpdate)
routes.delete("/admin/chefs", admin.chefDelete)



module.exports = routes