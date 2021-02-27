const AuthController = require('../controllers/AuthController')
module.exports = function (app) {
    const controller = new AuthController()
    app.route("/auth/register")
        .post(controller.register)
    app.route("/auth/login")
        .post(controller.login)
}