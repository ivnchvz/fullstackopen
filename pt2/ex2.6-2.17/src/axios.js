import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)   
}

const deleteName = personId => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const replace = (newObject, idPerson) => {
    return axios.put(`${baseUrl}/${idPerson}`, newObject)
}
export default {getAll, create, deleteName, replace}