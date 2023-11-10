import React,  {useState}  from 'react'
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
            <button onClick={handleClickUpdate}>update my info</button>
            <button onClick={handleClickLogOut}>Logout</button>
            <h2>Your email : {props.user.email}</h2>
            <h2>Your username : {props.user.name}</h2>
            <h2>Selected dog : {props.user.dogs[props.selectedDogIndex].name}</h2>
            <h2>Your dog's profile image :</h2>
            <img src={props.user.profileImageURL}  style={{ width: '500px'}}/>
        </>
    )
}

export default MyPage