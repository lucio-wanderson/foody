const User = require('../models/User')
const {compare} = require('bcryptjs')


async function login(req, res, next){
    //check if email exists
    const {email, password} = req.body
    const user = await User.findBy(email)

    if(!user){
    return res.render("users/register", {
    user: req.body,
    error: "Usuário não cadastrado"
    })}

    //check password
    const passed = await compare(password, user.password)

    if(!passed) return res.render('session/login', {
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user
     
    next()    
}

async function forgot(req, res, next){
    const {email} = req.body

    try{
        let user = await User.findBy(email)

        if(!user){
            return res.render("session/forgot-password",{
                user: req.body,
                error: "Email não cadastrado"
            })
        }

        req.user = user

        next()

    }catch(err){
        console.error(err)
    }
}

async function reset(req, res, next){
    const {email, password, passwordRepeat, token} = req.body

    try{
        //verify is user exists
        const user = await User.findBy(email)

        if(!user){
            return res.render("session/password-reset",{
                user: req.body,
                error: "Email não cadastrado"
            })
        }

        //verify token
        if(password != passwordRepeat){
            return res.render("session/password-reset", {
                user: req.body,
                token,
                error: "A senha e a confirmação de senha estão diferentes"
            })
        }

        //verify is token expires
        let now = new Date()
        now = now.setHours(now.getHours())

        if(now > user.reset_token_expires){
            return res.render(`session/password-reset`, {
                user: req.body,
                token,
                error: "Este token expirou, solicite uma nova recuperação de senha"
            })
        }

        //passed
        req.user = user
        next()
    }catch(err){
        console.error(err)
    }
}

module.exports = {
    login,
    forgot,
    reset
}