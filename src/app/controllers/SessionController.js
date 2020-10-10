const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

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
                        <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank"></a>
                    </p>
                `
            })

            //avisar o usuário que enviamos o email
            return res.render("session/forgot-password",{
                success: "Um link de criação de noca senha foi eniado ao email"
            })

        }catch(err){
            console.error(error)
            return res.render("session/forgot-password", {
                error: "Erro inesperado, tentenovamente"
            })
        }
        
    },

    logout(req, res){
        req.session.destroy()

        return res.redirect("/")
    }
}