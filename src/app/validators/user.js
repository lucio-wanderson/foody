const User = require('../models/User')


async function post(req, res, next){
     //checking fields
     const keys = Object.keys(req.body)

     for(key of keys) {
         if (req.body[key] == "") {
             return res.render("users/register", {
                 user: req.body,
                 error: "Por favor preenha todos os campos"
             })
         }
     }

     //check if email exists
     const {email, password, passwordRepeat} = req.body
     let user = await User.findBy(email)

     if(user){
        return res.render("users/register", {
        user: req.body,
        error: "Usuário já cadastrado"
     })}

     if(password){
         if(password != passwordRepeat){
             return res.render("users/register",{
                 user: req.body,
                 error: "A senha e a repetição de senha não são iguais"
             })
         }
     }

     //check if is admin
     if(req.body.admin){
         user = {
             ...req.body,
             is_admin: true
         }
     }

     next()
     
}

module.exports = {
 post,
}