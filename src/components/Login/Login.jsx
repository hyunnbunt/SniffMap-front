import React, { useState, useContext, useEffect } from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import DogsList from './DogsList'
import { AppContext } from '../../App'

const Login = (props) => {
    const values = useContext(AppContext)

    const [loginInput, setLoginInput] = useState({ 
        username: '', 
        password: '' 
    })

    const serverURL = 'http://localhost:8085'

    /* It runs when the login input changes. */
    const handleLoginInputChange = (e) => {
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }
    // const loginRequestToServer = async (loginInfo) => {
    //   const loginURL = `${serverURL}/auth/signin`
    //   try {
    //     const res = await axios.post(loginURL, loginInfo)
    //     return res.data
    //   } catch (error) {
    //     throw new Error(error.response)
    //   }

    // }

    /* It runs when the user clicks the login button. */
    const handleLoginSubmit = async (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        const token = await loginRequestAndGetToken()
        await values.updateUser(token) 
    }

    const loginRequestAndGetToken = async () => {
        const loginURL = `${serverURL}/auth/login`
        console.log(loginInput);
        try {
            const res = await axios.post(
                loginURL, 
                loginInput, 
                { headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
            values.setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            return res.data.token
        } catch (error) {
            console.log('login error')
            console.error('Error logging in', error)
            throw new Error(error.response)
        }
    }

    

    // useEffect(() => {
    //     values.updateUser()
    // }, [values.token])

    const handleSignupClick = () => {
        values.setCurrentMode('SignUp')
    }

    if (values.user.userData === null) {
        return (
        <>
        <LoginForm
                loginInput={loginInput}
                handleLoginSubmit={handleLoginSubmit}
                handleLoginInputChange={handleLoginInputChange}
                setCurrentMode={values.setCurrentMode}
                loginMsg={props.loginMsg}
            />
            <button onClick={handleSignupClick}>signup</button>
        </>
            
        )
    }
    return (
        <DogsList
            user={values.user}
            setUser={values.setUser}
            setCurrentMode={values.setCurrentMode}
        />
    )
}

export default Login