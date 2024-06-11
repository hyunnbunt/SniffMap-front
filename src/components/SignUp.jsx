import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../App'
const SignUp = () => {

    const [signupInput, setSignupInput] = useState({email: '', password: '', username: ''})
    const values = useContext(AppContext)
    const serverURL = values.serverURL
    const handleSignupInputChange = (e) => {
        setSignupInput({
            ...signupInput,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSignUpSubmit = async (e) => {
        e.preventDefault()
        console.log(serverURL)
        const signupURL = `${serverURL}/auth/signup`
        console.log(signupInput);
        try {
            const res = await axios.post(
                signupURL, 
                signupInput, 
                { headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)
            values.setCurrentMode('Login')
            // setToken(res.data.token)
            // localStorage.setItem('token', res.data.token)
        } catch (error) {
            console.log('signup error')
            console.error('Error signing up', error)
            throw new Error(error.response)
        }
    }

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSignUpSubmit}>
                <input
                    name='email'
                    type='email'
                    value={signupInput.email}
                    onChange={handleSignupInputChange}
                /><br />
                <input
                    name='password'
                    type='password'
                    value={signupInput.password}
                    onChange={handleSignupInputChange}
                /><br />
                <input
                    name='username'
                    type='text'
                    value={signupInput.username}
                    onChange={handleSignupInputChange}
                /><br />
                <button type="submit">signup</button>
            </form>
        </>
    )
}
export default SignUp