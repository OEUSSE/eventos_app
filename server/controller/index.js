const { connection } = require('../model')

const getEvents = (req, res) => {
    connection.query(
        'SELECT * FROM evento', [ ], (err, eventos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            res.status(200).json({
                ok: true,
                eventos
            })
        }
    )
    //connection.end()
}

const createEvent = (req, res) => {
    const { title, start, end, url, color } = req.body
    
    connection.query(
        'INSERT INTO evento (title, start, end, url, color) VALUES (?, ?, ?, ?, ?)',
        [ title, start, end, url, color ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
        
            if (result.affectedRows) {
                res.status(200).json({
                    ok: true,
                    message: 'Evento creado'
                })
            }
        }
    )
    //connection.end()
}

const updateEvent = (req, res) => {
    const { id } = req.params
    const { start, end, url, color } = req.body

    connection.query(
        "UPDATE evento SET start=?, end=?, url=?, color=? WHERE _id=?", [ start, end, url, color, id ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            if (result.affectedRows) {
                res.status(200).json({
                    ok: true,
                    message: 'Evento actualizado'
                })
            }
        }
    )
}

const deleteEvent = (req, res) => {
    const { id } = req.params

    connection.query(
        'DELETE FROM evento WHERE _id=?', [ id ], (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            if (result.affectedRows) {
                res.status(200).json({
                    ok: true,
                    message: 'Evento eliminado'
                })
                console.log('Se elimino')
            }
        }
    )
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}