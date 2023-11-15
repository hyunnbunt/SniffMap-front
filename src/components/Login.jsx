import React, { useState } from 'react'
import LoginForm from './Login/LoginForm'
import DogsList from './Login/DogsList'

const Login = (props) => {

    const [loginInput, setLoginInput] = useState({email: '', pw:''})

    /* It runs when the login input changes. */
    const handleLoginInputChange = (e) => {
        console.log(e.target.value)
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }

    /* It runs when the user clicks the login button. */
    const handleLoginSubmit = (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        props.updateUser(loginInput)
    }

    if (props.user.userData === null) {
        return (
            <LoginForm
                loginInput={loginInput}
                handleLoginSubmit={handleLoginSubmit}
                handleLoginInputChange={handleLoginInputChange}
                setCurrentMode={props.setCurrentMode}
                loginMsg={props.loginMsg}
            />
        )
    }
    return (
        <DogsList
            user={props.user}
            setUser={props.setUser}
            setCurrentMode={props.setCurrentMode}
        />
    )

}

export default Login