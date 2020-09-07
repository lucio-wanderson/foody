const db = require('../../config/db')
const fs = require ('fs')

module.exports = {
    create({filename, path}){
        const query = `
            INSERT INTO files(
                name_file, 
                path
            )VALUES($1, $2)
            RETURNING id_file
        `
        const values = [
            filename,
            path
        ]

        return db.query(query, values)
    },

    findFile(id){
        return db.query(`
            SELECT * FROM files WHERE files.id_file = $1
        `, [id])
    },

    async delete(id){
        try{
            const result = await db.query(`SELECT * FROM files WHERE id_file=$1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)

            return db.query(`
                DELETE FROM files WHERE id_file=$1
            `, [id])

        }catch(err){
            console.log(err)
        }
    }
}