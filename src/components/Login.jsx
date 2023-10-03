import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputId(e.target.value)
    }

    const onClickLogin = () => {
        console.log('click login')
    }

    return (
        <>
            <form>

                <input id='id' name='id' placeholder="type your id" />

            </form>
        </>
    )
}

export default Login