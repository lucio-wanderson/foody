const db = require('../../config/db')

module.exports = {
    create(recipe_id, file_id){
        const query = `
            INSERT INTO recipe_files(
                recipe_id,
                file_id
            ) VALUES($1, $2)
            RETURNING id
        `
        const values = [
            recipe_id,
            file_id
        ]

        return db.query(query, values)
    },

    all(){
        return db.query(`
            SELECT files.*, recipes.*,
            FROM recipe_files
            LEFT JOIN files ON (files.id_file = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id_recipe = recipe_files.recipe_id)   
        `)
    },

    find(id){
        return db.query(`
            SELECT files.*, recipes.*, files.id_file AS id_file,
            (SELECT chefs.name_chef AS chef_name FROM chefs WHERE chefs.id_chef = recipes.chef_id)
            FROM recipe_files
            LEFT JOIN files ON (files.id_file = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id_recipe = recipe_files.recipe_id)   
            WHERE recipes.id_recipe = $1
        `, [id])
    },

    findChefRecipe(id){
        return db.query(`
            SELECT 
            id_file, path, id_recipe, title, file_id, recipe_id
            FROM 
            recipe_files
            LEFT JOIN files ON (recipe_files.file_id = files.id_file)
            LEFT JOIN recipes ON (recipe_files.recipe_id = recipes.id_recipe)
            WHERE recipes.chef_id = $1
        `)
    },

    findFile(id){
        return db.query(`
            SELECT files.* FROM recipe_files
            LEFT JOIN files ON files.id_file = recipe_files.file_id
            WHERE recipe_files.recipe_id = $1
            `, [id])
    },

    findFileId(id){
        return db.query(`
            SELECT id_file FROM recipe_files
            LEFT JOIN files ON files.id_file = recipe_files.file_id
            WHERE recipe_files.recipe_id = $1 
        `, [id])
    },

    async delete(id){
        let results = await db.query(`
            SELECT files.*, recipes.*
            FROM recipe_files
            LEFT JOIN files ON (files.id_file = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id_recipe = recipe_files.recipe_id)
            WHERE recipe_files.recipe_id = $1`, [id])
        results = results.rows
        console.log(results)
    }
}