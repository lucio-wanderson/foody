const db = require('../../config/db')
const fs = require ('fs')

module.exports = {
    create({filename, path}){
        const query = `
            INSERT INTO files(
                name, 
                path
            ) VALUES($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path
        ]

        return db.query(query, values)
    },

    findFile(){
        return db.query(`
            SELECT *FROM recipe_files WHERE file_id = files.id
        `)
    },

    async delete(id){
        try{
            const result = await db.query(`SELECT *FROM files WHERE id=$1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)
            return db.query(`
                DELETE FROM files WHERE id=$1
            `, [id])
        }catch(err){
            console.log(err)
        }
    }
}