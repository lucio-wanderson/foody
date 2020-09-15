const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")
const RecipeFile = require("../models/RecipeFile")
const {date} = require("../../lib/utils")

module.exports = {
    async home(req, res){
        let results = await RecipeFile.all()
        
        let recipes = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))

        let filteredRecipes = []
        let recipeIds = []

        for(recipe of recipes){
            recipeIds.push(recipe.id_recipe)
        }
        recipeIds = [...new Set(recipeIds)]

        for(let counter = 0; counter < recipeIds.length; counter ++){
            if(recipeIds.includes(recipes[counter].id_recipe)){
                filteredRecipes.push(recipes[counter])
            }
        }
        
        return res.render("index", { recipes: filteredRecipes })
    },  

    async index(req, res) {
        const { filter } = req.query

        if (filter) {
            const results = await RecipeFile.findBy(filter)

            if(!results) return res.send('Registro não encontrado')

            let recipes = results.rows.map(result => ({
                ...result,
                src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
            }))

            let filteredRecipes = []
            let recipeIds = []

            for(recipe of recipes){
                recipeIds.push(recipe.id_recipe)
            }
            recipeIds = [...new Set(recipeIds)]

            for(let counter = 0; counter < recipeIds.length; counter ++){
                if(recipeIds.includes(recipes[counter].id_recipe)){
                    filteredRecipes.push(recipes[counter])
                }
            }

            console.log(date(filteredRecipes[3].created_at))

            let recipeDatePromise = filteredRecipes.map(recipe => {
                date(recipe.created_at).format
            })

            let recipeDateResult = await Promise.all(recipeDatePromise)

            return res.render("recipes", { recipes: filteredRecipes })

        } else {
            let results = await RecipeFile.all()
            
            let recipes = results.rows.map(result => ({
                ...result,
                src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
            }))

            let filteredRecipes = []
            let recipeIds = []

            for(recipe of recipes){
                recipeIds.push(recipe.id_recipe)
            }
            recipeIds = [...new Set(recipeIds)]

            for(let counter = 0; counter < recipeIds.length; counter ++){
                if(recipeIds.includes(recipes[counter].id_recipe)){
                    filteredRecipes.push(recipes[counter])
                }
            }

            return res.render("recipes", { recipes: filteredRecipes })
        }
    },

    async show(req, res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]
        if(!recipe) return res.send("Sem receita")

        results = await RecipeFile.findFile(recipe.id_recipe)
        let files = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))
        
        file = files[0]
            return res.render(`show`, { recipe, files, file })
    },

    about(req, res) {
        return res.render("about")
    },

    async chef(req, res) {
        let results = await Chef.all()
        let chefs = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))
        
        return res.render("chefs", { chefs })
    }
}
