const User = require('../models/User')

module.exports = {
    registerForm(req, res){
        return res.render("users/register.njk")
    },

    async post(req, res){
        console.log(req.body)
        if(req.body.admin){
            req.body = {
                ...req.body,
                is_admin: true
            }
        }
        let results = await User.create(req.body) 
        const user = results.rows
        console.log(user)

        return res.send("ok")
    }
}