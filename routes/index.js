const Order = require("./Order")
const Auth = require('./Auth');
module.exports = function (app) {
    Auth(app)
    Order(app)
}