module.exports = {
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}