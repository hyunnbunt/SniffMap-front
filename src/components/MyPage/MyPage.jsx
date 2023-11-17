import React, { useState, useEffect } from 'react'
import UserUpdate from './UserUpdate'
import DogUpdate from './DogUpdate'

const MyPage = (props) => {

    /* When user updates a dog's info, the app doesn't update the whole user data object, 
    it only updates selectedDog with the server's response(dog dto). */
    const [myPageMode, setMyPageMode] = useState('myPage')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        console.log('lll')
        setMyPageMode('myPage')
        setMsg('')
    }, [])

    const handleClickLogOut = () => {
        props.setUser(null)
        props.setCurrentMode('MyPage')
    }

    if (myPageMode === 'myPage') {
        if (props.user === null) {
            return (
                <>
                    <h1>Please login.</h1>
                    <button onClick={() => props.setCurrentMode('Login')}>
                        Go to login page
                    </button>
                </>
            )
        }
        return (
            <>
                <h1>This is My Page.</h1>
                <div>
                    <img src={props.user.userData.profileImageURL} style={{ width: '120px' }} />
                    <button onClick={() => setMyPageMode('user')}>update profile image</button>
                    <h2>{props.user.userData.email}</h2>
                    <h2>username : {props.user.userData.name}</h2>
                </div>
                <div>
                    <h2>{props.user.selectedDog.name}</h2>
                    <img src={props.user.selectedDog.dogProfileImageURL} style={{ width: '120px' }} />
                    <button onClick={() => setMyPageMode('dog')}>update your dog's profile image</button>
                </div>
                <button onClick={handleClickLogOut}>Logout</button>
            </>
        )
    }

    if (myPageMode === 'user') {
        return (
            <UserUpdate
                user={props.user}
                setUser={props.setUser}
                updateUserData={props.updateUserData}
                serverURL={props.serverURL}
                myPageMode={myPageMode}
                setMyPageMode={setMyPageMode}
                setCurrentMode={props.setCurrentMode}
                setMsg={setMsg}
            />
        )
    }
    if (myPageMode === 'dog') {
        return (
            <DogUpdate
                user={props.user}
                setUser={props.setUser}
                updateUserData={props.updateUserData}
                updateSelectedDogData={props.updateSelectedDogData}
                serverURL={props.serverURL}
                myPageMode={myPageMode}
                setMyPageMode={setMyPageMode}
                setCurrentMode={props.setCurrentMode}
                setMsg={setMsg}
            />
        )
    }
}

export default MyPage