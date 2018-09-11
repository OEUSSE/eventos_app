const { io } = require('../')

io.on('connection', (client) => {
    console.log('Cliente conectado')
    
    client.on('newEvent', (res) => {
        client.broadcast.emit('newEvent', res)
    })
})

io.on('disconnect', () => {
    console.log('Cliente desconectado')
})