import React, { useState, useContext } from 'react'
import LoginForm from './LoginForm'
import DogsList from './DogsList'
import { AppContext } from '../../App'

const Login = (props) => {
    const values = useContext(AppContext)
    const [loginInput, setLoginInput] = useState({ email: '', pw: '' })

    /* It runs when the login input changes. */
    const handleLoginInputChange = (e) => {
        console.log(e.target.value)
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }

    /* It runs when the user clicks the login button. */
    const handleLoginSubmit = async (e) => {
        // Block the page to get reloaded.
        e.preventDefault()
        values.login(loginInput)
        // const userData = await values.requestLogin(loginInput)
        // if (userData !== null) {

        //     values.updateUserData(userData)
        // }
    }

    if (values.user.userData === null) {
        return (
            <LoginForm
                loginInput={loginInput}
                handleLoginSubmit={handleLoginSubmit}
                handleLoginInputChange={handleLoginInputChange}
                setCurrentMode={values.setCurrentMode}
                loginMsg={props.loginMsg}
            />
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