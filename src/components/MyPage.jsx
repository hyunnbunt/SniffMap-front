import React from 'react'

const MyPage = (props) => {
    console.log(props.user)
    console.log(props.userDog)

    const handleClick = () => {
        console.log(event.target)
        props.setUser(null)
        props.setUserDog(null)
        props.setLoggedOut(true)
        props.setCurrentMode("Login")
    }
    return (
        <>
            <h1>This is My Page.</h1>
            <h2>Your email : {props.user.userEmail}</h2>
            <h2>Your username : {props.user.userName}</h2>
            <h2>Selected dog : {props.userDog.name}</h2>
            <button onClick={handleClick}>Logout</button>
        </>
    )
}

export default MyPage