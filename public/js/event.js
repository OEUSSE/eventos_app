var eventRender = function(event, element) {
    element.append( "<span class='closeon'>X</span>" )
    element.find(".closeon").click(function() {
        $('#calendar').fullCalendar('removeEvents', {
            id: event._id
       })

       $.ajax({
            url: '/event/' + event._id,
            type: 'DELETE',
            success: function(res) {
                console.log('Eliminado', res)
            }
        })


        element[0].parentNode.innerHTML = ''
    })
}

var createEvent = function(date) {
    var title = prompt('Evento del titulo')
    if (title) {
        var data = {
            event: {
                title: title,
                start: date.format(),
                end: '',
                color: 'blue'
            }
        }
        $('#calendar').fullCalendar('renderEvent', data.event)

        $.ajax({
            url: '/event',
            data: data.event,
            type: 'POST',
            success: function(res) {
                console.log('Evento creado', res)
            }
        })
        socket.emit('newEvent', data.event)
        crearNotificacion(data.event)
        location.reload()
    }
}

var dropEvent = function(event) {
    var data = {
        event: {
            id: event._id,
            start: event.start.format(),
            end: event.end.format()
        }
    }
    $.ajax({
        url: '/event/' + event._id,
        data: data.event,
        type: 'PUT',
        success: function(res) {
            console.log('Actualizado', res)
        }
    })
}

var resizeEvent = function(event) {
    var data = {
        event: {
            id: event._id,
            start: event.start.format(),
            end: event.end.format()
        }
    }
    $.ajax({
        url: '/event/' + event._id,
        data: data.event,
        type: 'PUT',
        success: function(res) {
            console.log('Actualizado', res)
        }
    })
}

var calendarConfig = {
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    selectable: true,
    selectHelper: true,
    dayClick: createEvent,
    eventDrop: dropEvent,
    eventResize: resizeEvent,
    eventRender: eventRender
}



$(function() {
    loadEvents()
        .then(function() {
            $('#calendar').fullCalendar(calendarConfig)
        })
    
})

function loadEvents() {
    return fetch('/event')
        .then(function (res) { return res.json() })
        .then(function (data) {
            var eventsFormatter = data.eventos.map(function (event) {
                event.start = event.start.split('T')[0]
                event.end = event.end.split('T')[0]
                return event
            })
            calendarConfig.events = eventsFormatter
        })
        .catch(function (err) { console.error(err) })
}
