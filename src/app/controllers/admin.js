const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")

module.exports = {
    async index(req, res) {
        await Recipe.all(function (recipes) {
            return res.render("admin/recipes/index", { recipes })
        })

    },

    async create(req, res) {
        await Recipe.chefSelectOptions(function (options) {

            return res.render("admin/recipes/create", { chefOptions: options })
        })

    },

    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        await Recipe.create(req.body, function (recipes) {

            return res.redirect(`/admin/recipes/${recipes.id}`)

        })
    },

    show(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrado")

            recipe.ingredients = recipe.ingredients.split(',')
            recipe.preparation = recipe.preparation.split(',')

            Chef.find(recipe.chef_id, function (chef) {
                return res.render(`admin/recipes/show`, { recipe, chef })
            })

        })

    },

    edit(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrado")

            Recipe.chefSelectOptions(function (options) {
                return res.render(`admin/recipes/edit`, { recipe, chefOptions: options })
            })
        })

    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                console.log(req.body)
                return res.send("Por favor, preencha todos os campos")
            }
        }

        Recipe.update(req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })

    },

    delete(req, res) {
        Recipe.delete(req.body.id, function () {
            return res.redirect("/admin/recipes")
        })

    },
    chefIndex(req, res) {
        Chef.all(function (chefs) {
            return res.render("admin/chefs/index", { chefs })
        })

    },

    chefCreate(req, res) {
        return res.render("admin/chefs/create")
    },

    chefPost(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        Chef.create(req.body, function (chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)

        })

    },

    chefShow(req, res) {
        Chef.find(req.params.id, function (chef) {
            if (!chef) return res.send("Chef não encontrado")
            
            Recipe.allRecipes(req.params.id, function(recipes){
                return res.render(`admin/chefs/show`, { chef , recipes})

            })
        })
    },

    chefEdit(req, res) {
        Chef.find(req.params.id, function (chef) {
            if (!chef) return res.send("Chef não encontrado")

            return res.render(`admin/chefs/edit`, { chef })
        })
    },

    chefUpdate(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                console.log(req.body)
                return res.send("Por favor, preencha todos os campos")
            }
        }

        Chef.update(req.body, function () {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    chefDelete(req, res){
        Chef.delete(req.body.id, function () {
            return res.redirect("/admin/chefs")
        })
    }
}