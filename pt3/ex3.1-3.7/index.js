const express = require('express')
const morgan = require('morgan')


const app = express()



app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request,response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request,response) => {
  response.json(persons)
})

app.get('/info', (request,response) => {
 const totalPeople = persons.length
 const date1 = Date()
 response.send(`<p>Phonebook has info for ${totalPeople} people <br> ${date1} <p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person  = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)


  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

    if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

    if (persons.find((person) => person.name.toLowerCase() === body.name.toLowerCase() ) ) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
