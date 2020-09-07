const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
    async home(req, res) {
        const results = await Recipe.all()
        const recipes = results.rows
        return res.render("index", { recipes })
    },

    index(req, res) {
        const { filter } = req.query

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return res.render("recipes", { recipes })
            })
        } else {
            Recipe.all(function (recipes) {
                return res.render("recipes", { recipes })
            })
        }
    },

    show(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrado")

            recipe.ingredients = recipe.ingredients.split(',')
            recipe.preparation = recipe.preparation.split(',')

            Chef.find(recipe.chef_id, function (chef) {
                return res.render(`show`, { recipe, chef })
            })

        })
        

    },

    about(req, res) {
        return res.render("about")
    },

    chef(req, res) {
        Chef.all(function (chefs) {
            return res.render("chefs", { chefs })
        })

    }
}
