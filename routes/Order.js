module.exports = function (app) {
    app.route("/orders")
        .get((req, res) => res.send({message: "get order"}))
        .put((req, res) => res.send({message: "edit order, change status"}))
        .post((req, res) => res.send({message: "order dish"}))
        .delete((req, res) => res.send({message: "delete order"}))
}