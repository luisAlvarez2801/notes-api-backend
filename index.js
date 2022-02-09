const express = require('express')
const cors = require('cors')
 

const app = express()
app.use(express.json())
app.use(cors())

let notes = [
    {
        "id": 1,
        "content": "Ajuaaaa primo",
        "date": "hoy mero",
        "important": true
    },
    {
        "id": 2,
        "content": "Ajua primo 2",
        "date": "ayer mero",
        "important": false
    },
    {
        "id": 3,
        "content": "Ajua primo",
        "date": "mañana mero",
        "important": true
    },
    {
        "id": 4,
        "content": "echale",
        "date": "pasado mañana preeemo",
        "important": false
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: "note.content is missing"
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    
    const newNote = {
        id: maxId+1,
        content: note.content,
        important: typeof note.important !== 'undefined'? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})