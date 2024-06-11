import React from 'react'

const LoginForm = (props) => {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={props.handleLoginSubmit}>
                <input
                    name='username'
                    type='text'
                    value={props.loginInput.username}
                    onChange={props.handleLoginInputChange}
                /><br />
                <input
                    name='password'
                    type='password'
                    value={props.loginInput.password}
                    onChange={props.handleLoginInputChange}
                /><br />
                <button type="submit">log in</button>
            </form>
            <h2>{props.loginMsg}</h2>
        </>
    )
}

export default LoginForm

