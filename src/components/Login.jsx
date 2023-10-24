import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Success from './Login/Success'


const LoginForm = (props) => {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={props.handleLoginSubmit}>
                <input name='email' type='email' value={props.loginInput.email} onChange={props.handleInputChange}  />
                <br />
                <input name='password' type='password' value={props.loginInput.password} onChange={props.handleInputChange}  />
                <br />
                <button type="submit">log in</button>
            </form>
            <h2>{props.msg}</h2>
        </>
    )
}

const DogRegister = () => {
    return (
        <h1>Register your dog.</h1>
    )
}

const Login = (props) => {

    const [loginInput, setLoginInput] = useState({ email : "", password : ""})
    const [loggedIn, setLoggedIn] = useState(false)

    let msg = ""
    if (props.loggedOut) {
        msg = "You're logged out"
    }

    /* A function that requests to the login API with axios and set the logged in user. */
    const requestLogin = async (loginInfo, setUser) => {
        const loginURL = 'http://localhost:8080/users/login'
        const res = await axios.post(loginURL, loginInfo)
        if (res.status === 200) {
            setLoggedIn(true)
            setUser(res.data)
        }
    }

    /* A function that runs when the user clicks the submit button. */
    const handleLoginSubmit = (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        const loginInfo =                 
            {
                userEmail : loginInput.email,
                userPw : loginInput.password
            }
        requestLogin(loginInfo, props.setUser)
    }

    /* A function that runs when the login input changes. 
        The login input contains email and password. */

    const handleLoginInputChange = (e) => {
        console.log(e.target.value)
        setLoginInput({
            ...loginInput,
            [e.target.name] : e.target.value
        })
    }

    /* Changes the login page following the result of the login request. */
    let window = null
    if (!loggedIn) {
        window = 
            <LoginForm 
                loginInput={loginInput} 
                handleLoginSubmit={handleLoginSubmit} 
                handleInputChange={handleLoginInputChange} 
                setCurrentMode={props.setCurrentMode}
                msg={msg}
            />
    } else {
        window = 
            <Success 
                user={props.user}
                setUser={props.setUser} 
                setUserDog={props.setUserDog} 
                setCurrentMode={props.setCurrentMode} 
            />
    }
    return (
        <>
            {window}
        </>
    )
}


export default Login