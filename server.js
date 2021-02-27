const path = require('path')
const dotenv = require('dotenv')
const env = dotenv.config({
    path: path.resolve(__dirname, '.env')
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const routes = require('./routes')
routes(app)

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

const port = env.port || 3000
app.listen(port, () => {

    console.log(`server is running on port ${port}`);
})