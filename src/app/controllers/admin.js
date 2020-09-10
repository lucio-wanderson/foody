const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")
const File = require("../models/File")
const RecipeFile = require("../models/RecipeFile")

module.exports = {
    async index(req, res) {
        let results = await RecipeFile.all()
        
        let recipes = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))
        

        return res.render("admin/recipes/index", {recipes})
    },

    async create(req, res) {
        let results = await Recipe.chefSelectOptions()
        const options = results.rows

        return res.render("admin/recipes/create", { chefOptions: options })
    },

    async post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "" && key != "information") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        if(req.files.length == 0){
            return res.send("Por favor, envie pelo menos uma imagem")
        }

        let results = await Recipe.create(req.body)
        const recipe = results.rows
        
        const recipeId = recipe[0].id_recipe
        
        let filesPromise = req.files.map(async (file) => await File.create({...file }))
        let files = await Promise.all(filesPromise)
        files = await Promise.all(files.map(file => file.rows))

        let fileIds = []
        for(let size = 0; size < files.length; size ++){
            fileIds.push(files[size][0].id_file)
        }
        filesPromise = fileIds.map(async id_file=> await RecipeFile.create(recipeId, id_file))
        
        return res.redirect(`/admin/recipes/${recipeId}`)
    },

    async show(req, res) {
        console.log(req.params.id)
        let results = await RecipeFile.find(req.params.id)
        const recipe = results.rows[0]
        if(!recipe) return res.send("Sem receita")

        results = await RecipeFile.findFile(recipe.id_recipe)
        let files = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))
        
        file = files[0]
        
        return res.render(`admin/recipes/show`, {recipe, files, file})
    },

    async edit(req, res) {
        let results = await Recipe.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe) return res.send("Product not found")
            
        results = await Recipe.chefSelectOptions()
        let chefOptions = results.rows

        results = await RecipeFile.findFile(recipe.id_recipe)
        let files = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))

        return res.render(`admin/recipes/edit`, {recipe, chefOptions, files})

    },

    async update(req, res) {
        const keys = Object.keys(req.body)
        req.body.id = Number(req.body.id)
        req.body.chef = Number(req.body.chef)

        for (let key of keys) {
            if (req.body[key] == "" && key != "information" && key != "removed_files") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        let files = []
        let newfilesPromise = []
        if(req.files.length != 0){
            newFilesPormise = req.files.map(file =>{
                File.create({...file})
            })

            files = await Promise.all(newfilesPromise)
            files = await Promise.all(files.map(file => file.rows))
        }
        let fileIds = []
        for(let size = 0; size < files.length; size ++){
            fileIds.push(files[size][0].id_file)
        }
        filesPromise = fileIds.map(async id => await RecipeFile.create(recipeId, id))

        if(req.body.removed_files){
            console.log(req.body.removed_files)
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1 
            removedFiles.splice(lastIndex, 1)
            console.log(removedFiles)

            const removedRecipeFilesPromise = removedFiles.map(id => RecipeFile.delete(id))
            await Promise.all(removedRecipeFilesPromise)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)
        }

        await Recipe.update(req.body)
        
        return res.redirect(`/admin/recipes/${req.body.id}`)
        

    },

    async delete(req, res) {
        const recipeId = req.body.id_recipe
        
        let results = await RecipeFile.findFileId(recipeId)
        const resultIds = results.rows
        console.log(resultIds.length)
        let idFiles = []
        for(let size = 0; size < resultIds.length; size ++){
            idFiles.push(resultIds[size].id_file)
        }
        
        const deleteFiles = idFiles.map(id => File.delete(id))

        await Promise.all(deleteFiles)

        await Recipe.delete(recipeId)
        
        return res.redirect("/admin/recipes")
    },

    async chefIndex(req, res) {
        let results = await Chef.all()
        let chefs = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))

        return res.render("admin/chefs/index", { chefs })
    },

    chefCreate(req, res) {
        return res.render("admin/chefs/create")
    },

    async chefPost(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        if(req.files.length == 0){
            return res.send("Pos favor, selecione uma imagem")
        }

        let filesPromise = req.files.map(file => File.create({...file}))
        
        let resultPromise = await Promise.all(filesPromise) 

        const fileId = Number(resultPromise.map(file => file.rows[0].id_file))

        let resultChef = await Chef.create(req.body, fileId)

        const chefId = await resultChef.rows[0].id_chef

        return res.redirect(`/admin/recipes/${chefId}`)
    },

    async chefShow(req, res) {
        let results = await Chef.find(req.params.id)

        let chef = results.rows.map(result => ({
            ...result,
            src: `${req.protocol}://${req.headers.host}${result.path.replace("public", "")}`
        }))
        chef = chef[0]

        results = await Recipe.findChefRecipe(chef.id_chef)
        const recipes = results.rows

        return res.render(`admin/chefs/show`, {chef, recipes})
    },

    async chefEdit(req, res) {
        const results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        return res.render("admin/chefs/edit", {chef})
    },

    async chefUpdate(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos")
            }
        }

        let fileId = req.body.file_id
        if(req.files.length != 0){
            let filesPromise = req.files.map(file => File.create({...file}))
        
            let resultPromise = await Promise.all(filesPromise) 

            fileId = Number(resultPromise.map(file => file.rows[0].id_file))
        }else{
            let filesPromise = await File.findFile(fileId)
            fileId = filesPromise.rows[0].id_file
        }
        let data = {
            name: req.body.name,
            id: Number(req.body.id_chef)
        }
        
        const chef = await Chef.update(data.name, data.id, fileId)
        const chefId = chef.rows[0].id_chef
        return res.redirect(`/admin/chefs/${chefId}`)
},

    async chefDelete(req, res){
        await File.delete(req.body.file_id)

        return res.render("admin/chefs")
    }
}