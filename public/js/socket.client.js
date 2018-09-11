const socket = io()

socket.on('connect', function(res) {
    console.log('Conectado al servidor')
})

socket.on('newEvent', function(res) {
    console.log(res)
    crearNotificacion(res)
})

socket.on('disconnect', function(res) {
    console.error('Socket desconectado del servidor')
})