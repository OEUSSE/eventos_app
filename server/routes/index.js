const express = require('express')
const router = express.Router()

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controller')

router
    .route('/')
    .get(getEvents)
    .post(createEvent)

router
    .route('/:id')
    .put(updateEvent)
    .delete(deleteEvent)

module.exports = router