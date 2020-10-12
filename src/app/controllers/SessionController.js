const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')
const {hash} = require('bcryptjs')

module.exports = {
    loginForm(req, res){
        return res.render('session/login.njk')
    },

    login(req, res){
        req.session.userId = req.user.userId

        return res.redirect("/users")
    },

    forgotForm(req, res){
        return res.render("session/forgot-password")
    },

    async forgot(req, res){
        try{
            const user = req.user

            //Criar token
            const token = crypto.randomBytes(20).toString("hex")

            //Criar expiração do token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            //enviar email com link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-replay@foodfy.com.br',
                subject: 'Recuperação de senha',
                html: `
                    <h2>Criar nova senha</h2>
                    <p>Clique no link abaixo para criar nova senha</p>
                    <p>
                        <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">NOVA SENHA</a>
                    </p>
                `
            })

            //avisar o usuário que enviamos o email
            return res.render("session/forgot-password", {
                success: "Um link de criação de nova senha foi enviado ao email"
            })

        }catch(err){
            console.error(err)
            return res.render("session/forgot-password", {
                error: "Erro inesperado, tentenovamente"
            })
        }
        
    },

    logout(req, res){
        req.session.destroy()

        return res.redirect("/")
    },

    resetForm(req, res){
        return res.render("session/password-reset", {token: req.query.token})
        
    },

    async reset(req, res){
        const user = req.user
        const {password, token} = req.body

        try{
            //create new password hash
            const newPassword = await hash(password, 8)

            //update user
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            //message to user
            return res.render("session/login", {
                user: req.body,
                success: "Senha atualizada, faça seu login"
            })

        }catch(err){
            console.error(err)

            return res.render("session/password-reset", {
                user: req.body,
                token,
                error: "Erro inesperado, tente novamente"
            })
        }
    }
}