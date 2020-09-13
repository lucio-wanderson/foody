const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(){
        return db.query(`SELECT recipes.*, chefs.name_chef AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id_chef)
        `)
    },

    create(data){
        const query = `
            INSERT INTO recipes (
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_recipe
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.chef
        ]

        return db.query(query, values)
    },

    find(id){
        return db.query(`
        SELECT recipes.*,
        (SELECT chefs.name_chef FROM chefs WHERE chefs.id_chef = recipes.chef_id) As chef_name
        FROM recipes
        LEFT JOIN chefs ON chefs.id_chef = recipes.chef_id
        WHERE id_recipe = $1`, [id])
    },

    findChefRecipe(chef_id){
        return db.query(`
            SELECT * FROM recipes WHERE recipes.chef_id = $1
        `, [chef_id])
    },

    allRecipes(id, callback){
        db.query(`
            SELECT * FROM recipes
            WHERE recipes.chef_id = $1`, [id], function(err, results){
                if(err) throw `DATABASE ERROR ${err}`

                callback(results.rows)
            }
            )
    },

    findBy(filter){
        return db.query(`
            SELECT files.*, recipes.*,
            (SELECT chefs.name_chef AS chef_name FROM chefs WHERE chefs.id_chef = recipes.chef_id)
            FROM recipe_files
            LEFT JOIN files ON (files.id_file = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id_recipe = recipe_files.recipe_id)
            WHERE recipes.title ILIKE '%${filter}$%' `)
    },

    update(data){
        const query = `
            UPDATE recipes SET
                title = ($1),
                ingredients = ($2),
                preparation = ($3),
                information = ($4),
                chef_id = ($5)
            WHERE id_recipe = $6
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id_recipe
        ]

        return db.query(query, values)
    },

    delete(id){
        db.query(`DELETE FROM recipes WHERE id_recipe=$1`,[id])
    },

    chefSelectOptions(){
        return db.query(`SELECT name_chef, id_chef FROM chefs`)
    }
}