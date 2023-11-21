
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

const generateId = () => {
  let random = Math.floor(Math.random() * 1000);
  return random
}

const currentDate = new Date()
const weekday = currentDate.toLocaleString('en-US', { weekday: 'long' });
const month = currentDate.toLocaleString('en-US', { month: 'long' });
const dayOfMonth = currentDate.getDate();
const year = currentDate.getFullYear();
const time = currentDate.toLocaleTimeString();

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456",
    "favorite": false
      
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "favorite": false
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "favorite": false
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "favorite": false
  }
]

//FETCHES "HOME" PAGE
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//FETCHES INFO PAGE
app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${weekday} ${month} ${dayOfMonth} ${year} ${time}</p>
  `)
})

//FETCHES ALL RESOURCES
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//FETCHES IDENTIFIED RESOURCE
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }
  else{
    response.sendStatus(404)
  }
})

//CREATES NEW RESOURCE
app.post('/api/persons', (request, response) => {
  const body = request.body
  const nameExists = persons.some(person => person.name === body.name)
  const phoneExists = persons.some(person => person.number === body.number)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
    error: 'content missing' 
    })
  }
  else if (nameExists || phoneExists) {
    return response.status(400).json({
    error: 'name and phone must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    favorite: body.important || false
  }

  persons = persons.concat(person)

  response.json(person)
})
app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personIndex = persons.findIndex(p => p.id === id);

  if (personIndex !== -1) {
    persons[personIndex].favorite = !persons[personIndex].favorite;
    response.json(persons[personIndex]);
  } 
  else {
    response.status(404).json({ error: 'Person not found' });
  }
})

//DELETES IDENTIFIED RESOURCE
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.sendStatus(204)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
