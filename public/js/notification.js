function crearNotificacion(data) {
    const container = document.querySelector('.notification')
    const title = document.createElement('h3')
    const msg = document.createElement('span')

    container.innerHTML = ''

    msg.innerText = 'Se ha creado una nueva tarea'
    title.innerHTML = 'Nombre de tarea: ' + data.title
    
    container.appendChild(msg)
    container.appendChild(title)

    container.classList.add('active')
    setTimeout(function() {
        container.classList.remove('active')
    }, 5000)
}