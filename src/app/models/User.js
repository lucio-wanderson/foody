const db = require('../../config/db')
const {hash} = require('bcryptjs')

module.exports = {
    async findBy(email){
        let query = `SELECT * FROM users WHERE email = '${email}' `

        const results = await db.query(query)

        return results.rows[0]
    },

    all(){
        return db.query(`
            SELECT * FROM users
        `)
    },

    create(data){
        const query = `INSERT INTO users(
            name,
            email,
            is_admin) VALUES ($1, $2, $3)
            RETURNING id`
        
        const values = [
            data.name,
            data.email,
            data.is_admin || false,
        ]

        return db.query(query, values)
    },

    async update(id, fields){
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) =>{
            if((index + 1) < array.length){
                query = `
                    ${query}
                    ${key} = '${fields[key]}', 
                `
            }else{
                //last iteration
                query = `
                    ${query}
                    ${key} = '${fields[key]}' 
                    WHERE id = ${id}
                `
            }
        })

        await db.query(query)
    }
}