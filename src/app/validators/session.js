const User = require('../models/User')


async function login(req, res, next){
     //check if email exists
     const {email, password} = req.body
     let user = await User.findBy(email)

     if(!user){
        return res.render("users/register", {
        user: req.body,
        error: "Usuário não cadastrado"
     })}

     if(password){
         if(password != passwordRepeat){
             return res.render("users/register",{
                 user: req.body,
                 error: "A senha e a repetição de senha não são iguais"
             })
         }
     }
     
     next()
     
}

module.exports = {
 login,
}