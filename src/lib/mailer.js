const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a9694ef556f937",
      pass: "05fd122d85dee5"
    }
  })