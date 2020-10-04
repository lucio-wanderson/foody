const db = require('../../config/db')

module.exports = {
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