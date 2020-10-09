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

    forgot(req, res){
        //Criar token

        //Criar expiração do token

        //enviar email com link de recuperação de senha

        //avisar o usuário que enviamos o email
    },

    logout(req, res){
        req.session.destroy()

        return res.redirect("/")
    }
}