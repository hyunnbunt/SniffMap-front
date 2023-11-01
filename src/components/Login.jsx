import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Success from './Login/Success'
import LoginForm from './Login/LoginForm'

const Login = (props) => {

    const [loginInput, setLoginInput] = useState({ email: "", password: "" })
    const [msg, setMsg] = useState("")

    /* A function that runs when the login input changes. 
        The login input contains email and password. */
    const handleLoginInputChange = (e) => {
        console.log(e.target.value)
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }

    /* A function that runs when the user clicks the submit button. */
    const handleLoginSubmit = (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        const loginInputForm =
        {
            userEmail: loginInput.email,
            userPw: loginInput.password
        }
        requestLogin(loginInputForm)
    }

    /* A function that requests to the login API and sets the user. */
    const requestLogin = async (loginInputForm) => {
        const loginURL = props.baseURL + 'users/login'
        const res = await axios.post(loginURL, loginInputForm)
        if (res.status === 200) {
            props.setLoggedIn(true)
            props.setUser(res.data)
        }
        setMsg("Login failed.")
    }

    if (!props.loggedIn) {
        return (
            <LoginForm
                loginInput={loginInput}
                handleLoginSubmit={handleLoginSubmit}
                handleLoginInputChange={handleLoginInputChange}
                setCurrentMode={props.setCurrentMode}
                msg={msg}
            />
        )
    } else {
        return (
            <Success
                user={props.user}
                updateUserDog={props.updateUserDog}
                setCurrentMode={props.setCurrentMode}
            />
        )
    }
}

export default Login