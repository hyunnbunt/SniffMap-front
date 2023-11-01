import React from 'react'

const LoginForm = (props) => {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={props.handleLoginSubmit}>
                <input name='email' type='email' value={props.loginInput.email} onChange={props.handleLoginInputChange}  />
                <br />
                <input name='password' type='password' value={props.loginInput.password} onChange={props.handleInputChange}  />
                <br />
                <button type="submit">log in</button>
            </form>
            <h2>{props.msg}</h2>
        </>
    )
}

export default LoginForm

