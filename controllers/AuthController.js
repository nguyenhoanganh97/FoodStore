const validator = require('validator')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const saltRound = 10
const UsersModel = new Users()

class AuthController {
    constructor() {
        this.module = 'auth'
        this.register = this.register.bind(this)
    }
    async register(request, response) {
        try {
            const { email, password } = request.body
            const validateErrors = await this.validateRegister({ email, password })
            if (validateErrors.length) return response.send(JSON.stringify({ validateErrors }))

            let passwordHashed = await bcrypt.hash(password, saltRound)
            await UsersModel.create({
                email,
                password: passwordHashed
            })
            return response.send(JSON.stringify({ message: "You have signed up successfully" }))
        } catch (error) {
            console.log(error);
            return response.send(JSON.stringify({ message: "Faild to create account!" }))
        }
    }

    async login(request, response) {
        try {
            const { email, password } = request.body
            const validateErrors = this.validateRegister({ email, password })
            if (validateErrors.length) return response.send(JSON.stringify({ validateErrors }))
            const users = UsersModel.getUserByEmail(email)
            if (!users.length) return response.send(JSON.stringify({ message: "Invaild email or password" }))
            
        } catch (error) {
            console.log(error);
            return response.send(JSON.stringify({ message: "Faild to create account!" }))
        }
    }

    async validateRegister(credentials) {
        const errors = []
        const { email, password } = credentials
        if (validator.isEmpty(password, { ignore_whitespace: true })) errors.push("Please provide an password!")
        if (!validator.isEmail(email)) errors.push("Please provide an vailid email!")
        const score = validator.isStrongPassword(password, { returnScore: true })
        if (score < 35) errors.push("Your password is weak")
        if (errors.length) return errors
        const result = await UsersModel.getUserByEmail(email)
        if (result.length) errors.push("Email has already been existed!")
        return errors
    }
    async validateLogin(credentials) {
        const errors = []
        const { email, password } = credentials
        if (!validator.isEmail(email)) errors.push("Invailid email!")
        if (validator.isEmpty(password, { ignore_whitespace: true })) errors.push("Please provide an password!")
        return errors
    }
}
module.exports = AuthController