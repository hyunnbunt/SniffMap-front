import React, { useState } from 'react'
import DogSelection from './Login/DogSelection'

const MyPage = (props) => {


    const handleClickLogOut = () => {
        props.setUser(null)
        props.setCurrentMode("Login")
    }

    if (props.user === null) {
        return (
            <>
                <h1>Please login.</h1>
                <button onClick={() => props.setCurrentMode("Login")}>Go to login page</button>
            </>
        )
    }

    const handleClickUpdate = () => {
        props.setCurrentMode("Update")
    }

    return (
        <>
            <h1>This is My Page.</h1>
            <img src={props.user.profileImageURL} style={{ width: '120px' }} />
            <button onClick={handleClickUpdate}>update profile image</button>
            <h2>{props.user.email}</h2>
            <h2>username : {props.user.name}</h2>
            <h2>{props.user.dogs[props.selectedDogIndex].name}</h2>
            <button onClick={handleClickUpdate}>update your dog's profile image</button>
            <button onClick={handleClickLogOut}>Logout</button>
        </>
    )
}

export default MyPage