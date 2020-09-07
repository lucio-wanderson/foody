const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(){
        return db.query(`
            SELECT chefs.*, files.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN files ON (files.id_file = chefs.file_id)
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id_chef)
            GROUP BY chefs.id_chef,
            files.id_file`)
    },

    create(data, file_id){
        const query = `
            INSERT INTO chefs (
                name_chef,
                file_id,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id_chef
        `

        const values = [
            data.name,
            file_id,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },

    find(id){
        return db.query(`
            SELECT chefs.*, files.*, count (recipes) AS total_recipes
            FROM chefs
            LEFT JOIN files ON (files.id_file = chefs.file_id)
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id_chef)   
            WHERE chefs.id_chef = $1
            GROUP BY 
                chefs.id_chef,
                files.id_file
            `, [id])
    },

    findName(chef_id){
        return db.query(`SELECT chefs.name FROM chefs WHERE chefs.id = $1`, [chef_id])
    },

    countRecipes(callback){
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC`, function(err, results){
                if (err) throw `DATABASE ERROR! ${err}`

                callback(results.rows)
        })
    },

    update(name, id, fileId){
        const query = `
            UPDATE chefs SET
            name_chef = ($1),
            file_id = ($2)
            WHERE id_chef = $3
            RETURNING id_chef
        `

        const values = [
            name,
            fileId,
            id
        ]

        return db.query(query, values)
    },

    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id=$1`,[id], function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            return callback()
        })
    }
}