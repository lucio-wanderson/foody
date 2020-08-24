const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(callbackk){
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `, function(err, results){
            if(err) throw `DATABASE ERROR ${err}`
            callbackk(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO recipes (
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.chef
        ]

        db.query(query, values, function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`
            SELECT * FROM recipes
            WHERE id = $1 `, [id], function(err, results){
                if(err) throw `DATABASE ERROR ${err}`

                callback(results.rows[0])
            }
        )
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

    findBy(filter, callback){
        db.query(`SELECT recipes.*, count(recipes) AS total_recipes
            FROM recipes
            WHERE recipes.title ILIKE '%${filter}%'
            GROUP BY recipes.id
            ORDER BY total_recipes DESC`, function(err, results){
                if (err) throw `DATABASE ERROR! ${err}`

                callback(results.rows)
        })
    },

    update(data, callback){
        const query = `
            UPDATE recipes SET
                title = ($1),
                ingredients = ($2),
                preparation = ($3),
                information = ($4)
            WHERE id = $5
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id 
        ]

        db.query(query, values, function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            callback()
        })
    },

    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id=$1`,[id], function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            return callback()
        })
    },

    chefSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `DATABASE ERROR ${err}`

            callback(results.rows)
        })
    }
}