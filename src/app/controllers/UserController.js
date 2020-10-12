const User = require('../models/User')

module.exports = {
    registerForm(req, res){
        return res.render("users/register.njk")
    },

    async index(req, res){
        const results = await User.all()
        const users = results.rows

        return res.render("users/show", users)
    },

    async show(req, res){
        return res.render("admin/layout.njk")
    },

    async post(req, res){
        let results = await User.create(req.body) 
        const user = results.rows

        return res.redirect("/users", user)
    },

    // async update(req, res){
    //     try{
    //         let {name, email} = req.body

    //         await User.update(user.id, {
    //             name, 
    //             email
    //         })

    //         return res.render("/users")
    //     }catch(err){
    //         console.error(err)
    //         return res.render("users/index", {
    //             error: "Algum erro ocorreu"
    //         })
    //     }
    // }
}