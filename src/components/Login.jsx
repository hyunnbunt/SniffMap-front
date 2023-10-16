import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LoginForm = ({user, handleLoginSubmit, handleInputChange}) => {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <input name='email' type='email' value={user.email} onChange={handleInputChange}  />
                <br />
                <input name='password' type='password' value={user.password} onChange={handleInputChange}  />
                <br />
                <button type="submit">log in</button>
            </form>
        </>
    )
}

const Success = ({user}) => {
    return (
        <h1>Hello, {user.userName}!</h1>
    )
}

const Fail = () => {
    return <h1>Try again.</h1>
}

const Login = () => {


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios
            .post('http://localhost:8080/users/login', 
                {
                    userEmail : userInput.email,
                    userPw : userInput.password
                }
            )
            .then(res => {
                if (res.status === 200) {
                    setLoading(false)
                    setLoginInfo(res.data)
                    setFormOrGreeting(<Success user={res.data}/>)
                } else {
                    setFormOrGreeting(<Fail />)
                }
            })
    }

    const handleInputChange = (e) => {
        console.log(e.target.value)
        serUserInput({
            ...userInput,
            [e.target.name] : e.target.value
        })
    }

    const [userInput, serUserInput] = useState({ email : "", password : ""})
    const [loginInfo, setLoginInfo] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formOrGreeting, setFormOrGreeting] = 
        useState(
            <LoginForm 
                user={userInput} 
                handleLoginSubmit={handleLoginSubmit} 
                handleInputChange={handleInputChange} 
            />
        )


    return (
        <>
        { loading 
            ? <h1>Loading...</h1> 
            : formOrGreeting
        }

        </>
    )

}


export default Login