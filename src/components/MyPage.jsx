import React from 'react'

const MyPage = (props) => {

    console.log(props)

    const handleClick = () => {
        props.setUser(null)
        props.setUserDog(null)
        props.setLoggedIn(false)
        props.setCurrentMode("Login")
    }
    return (
        <>
            <h1>This is My Page.</h1>
            <h2>Your email : {props.user.userEmail}</h2>
            <h2>Your username : {props.user.userName}</h2>
            <h2>Selected dog : {props.userDog.dog.name}</h2>
            <h2>You have {props.userDogList.length} dog(s).</h2>

            <button onClick={handleClick}>Logout</button>
        </>
    )
}

export default MyPage