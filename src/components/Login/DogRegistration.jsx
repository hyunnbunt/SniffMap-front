import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../App'

const DogRegistration = () => {

    const values = useContext(AppContext)

    const serverURL = 'http://localhost:8085'

    const [registrationInput, setRegistrationInput] = useState({ 
        name: '', 
        age: '',
        weight: '',
        sex: ''
    })
    const haneldRegistrationInputChange = (e) => {
        setRegistrationInput({
            ...registrationInput,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(registrationInput)
        const token = localStorage.getItem('token')
        const tokenHeader =             {headers: {
            "Authorization": "Bearer " + token
          }}
        const response = await axios.post(
            `${serverURL}/dogs`, 
            registrationInput, 
            tokenHeader
        )
        console.log(response)
        const res = await axios.get(`${serverURL}/my`, tokenHeader)
        if (res.status === 200) {
            console.log('status 200')
            values.setUser(res.data)
        }
        console.log(res)
    }
    return (
        <>
        <>Register your dog</>
            Insert your dog's information.
            <form onSubmit={handleSubmit}>
            name: <input name='name' type='text' value={registrationInput.name} onChange={haneldRegistrationInputChange}/><br/>
            age: <input name='age' type='text' value={registrationInput.age} onChange={haneldRegistrationInputChange}/><br/>
            weight: <input name='weight' type='text' value={registrationInput.weight} onChange={haneldRegistrationInputChange}/><br/>
            sex: <input name='sex' type='text' value={registrationInput.sex} onChange={haneldRegistrationInputChange}/><br/>
                <button type='submit'>Register</button>
            </form>
        </>
    )
}
export default DogRegistration