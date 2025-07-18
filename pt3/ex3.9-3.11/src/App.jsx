import { useState, useEffect } from 'react'
import axiosService from './axios';  //The axios functions are pulled from axios.js


const Filter = ({searchName, handleSearch}) => { 

return(
    <div>
      <form>
        <div>
            filter shown with <input value={searchName} onChange={handleSearch} /> 
        </div>
      </form>
    </div>
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='added'>
      {message}
    </div>
  )
}

const Form = ({newName, handleName, newNumber, handleNumber, addName}) => {
  return (
      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
           number: <input value={newNumber} onChange={handleNumber} /> 
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
  )
}

const Persons = ({searchName, persons, handleDelete}) => {
  return (
    <div>
        {searchName.length > 0 ? persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase())).map(person => <li key={person.id}> {person.name} {person.number} <button type="button" onClick={() => handleDelete(person.id)}>delete</button> </li>) : persons.map(person => <li key={person.id}> {person.name} {person.number} <button type="button" onClick={() => handleDelete(person.id)}>delete</button></li>)}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
      axiosService
        .getAll()
        .then(response => {
          console.log(response.data)
          setPersons(response.data)
    })
  }, [])

 
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.find((person) => person.name === newName )
  

    if (nameExists) {
       const replace = window.confirm(`${newName} already exists, would you like to replace the number? ` )
       if (replace) {
        const updatedPerson = { ...nameExists, number: newNumber }
        console.log(nameExists.id)
        axiosService
          .replace(updatedPerson, nameExists.id)
          .then(response => {
          console.log("Updated person:", response.data)
          setPersons(persons.map(person => person.id === nameExists.id ? response.data : person))
          handleMessage('Modified') 
          setNewName('') 
          setNewNumber('')
        })
       }
    } else {

      axiosService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          handleMessage('Added') 
          setNewName('') 
          setNewNumber('')
        })

    }

  }

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this person?")) {
    axiosService
      .deleteName(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }
}
   
  const handleMessage = (operation) => {
 
    setErrorMessage(`${operation} ${newName}`)
    setTimeout(() => {setErrorMessage(null)}, 5000 )

  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <Notification message={errorMessage}/>
      <h3>Add a new</h3>
      <Form newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} addName={addName} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} handleDelete={handleDelete}/>
    </div>
  )
}

export default App