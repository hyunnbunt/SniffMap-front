import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Success from './Login/Success'
import LoginForm from './Login/LoginForm'

const Login = (props) => {

    const [msg, setMsg] = useState("")

    /* A function that runs when the login input changes. 
        The login input contains email and password. */
    const handleLoginInputChange = (e) => {
        console.log(e.target.value)
        props.setLoginInput({
            ...props.loginInput,
            [e.target.name]: e.target.value
        })
    }

    /* A function that runs when the user clicks the submit button. */
    const handleLoginSubmit = (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        // const loginInputForm =
        // {
        //     email: props.loginInput.email,
        //     pw: props.loginInput.pw
        // }
        props.updateUser()
        // requestLogin(loginInputForm)
    }

    /* A function that requests to the login API and sets the user. */
    const requestLogin = async (loginInputForm) => {
        const loginURL = props.baseURL + 'users/login'
        const res = await axios.post(loginURL, loginInputForm)
        if (res.status === 200) {
            console.log(res.data)
            props.setUser(res.data)
        }
        setMsg("Login failed.")
    }

    if (props.user == null) {
        return (
            <LoginForm
                loginInput={props.loginInput}
                handleLoginSubmit={handleLoginSubmit}
                handleLoginInputChange={handleLoginInputChange}
                setCurrentMode={props.setCurrentMode}
                msg={msg}
            />
        )
    }
    return (
        <Success
            user={props.user}
            setUser={props.setUser}
            setSelectedDogIndex={props.setSelectedDogIndex}
            setCurrentMode={props.setCurrentMode}
        />
    )

}

export default Login