const db = require('../../config/db')
const {hash} = require('bcryptjs')

module.exports = {
    async findBy(email){
        let user = await db.query(`
            SELECT * FROM users 
            WHERE email = $1 
        `, [email])
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
    }
}