const mysql = require('mysql2')

// Connection mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'eventos_app',
    port: 3306
})

connection.connect((err) => {
    if (err)
        throw new Error('No se pudo conectar a la DB', err)
    
    console.log('Conexión a la DB establecida')
})

module.exports = { connection }