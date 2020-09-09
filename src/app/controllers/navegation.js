const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
    async home(req, res){
        const results = await Recipe.all()
        const recipes = results.rows
        return res.render("index", { recipes })
    },  

    async index(req, res) {
        const { filter } = req.query

        if (filter) {
            const results = await Recipe.findBy(filter)
            const recipes = results.rows

            return res.render("recipes", { recipes })

        } else {
            const results = await Recipe.all()
            const recipe = results.rows

            return res.render("recipes", { recipe })
        }
    },

    async show(req, res) {
        await Recipe.find(req.params.id, function (recipe) {
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

    async chef(req, res) {
        const results = await Chef.all()
        const chefs = results.rows

        return res.render("chefs", { chefs })
    }
}
