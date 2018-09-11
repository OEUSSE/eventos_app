require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const http = require('http')
const socketIO = require('socket.io')

const route = require('./routes')

const app = express()
const publicPath = path.resolve(__dirname, '../public')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/event', route)

app.get('/', (req, res) => {
    res.render('index')
})

module.exports.io = socketIO(server)

// Conexión con DB
require('./model')

require('./sockets/')

server.listen(PORT, (err) => {
    if (err)
        throw new Error(err)
    
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
