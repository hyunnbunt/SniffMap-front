import React, { useState, useEffect, useContext } from 'react'
import UserUpdate from './UserUpdate'
import DogUpdate from './DogUpdate'
import './img.css'
import { AppContext } from '../../App'
import DogRegistration from '../Login/DogRegistration'

const MyPage = () => {

    /* When user updates a dog's info, the app doesn't update the whole user data object, 
    it only updates selectedDog with the server's response(dog dto). */
    const [myPageMode, setMyPageMode] = useState('myPage')
    const [msg, setMsg] = useState('')

    const values = useContext(AppContext)

    const user = values.user.userData
    const dog = values.getDog()
    console.log(user)
    console.log(dog)
    const [userProfileImg, setUserProfileImg] = useState(null)
    const [dogProfileImg, setDogProfileImg] = useState(null)

    useEffect(() => {
        setMsg('')
        if (userProfileImg === null || userProfileImg === "") {
            setUserProfileImg("https://storage.googleapis.com/bunt-project-404405.appspot.com/default-user-profile.jpg")
        }
        if (dogProfileImg === null || dogProfileImg === "") {
            setDogProfileImg("https://storage.googleapis.com/bunt-project-404405.appspot.com/default-dog-profile.jpg")
        }
    }, [userProfileImg, dogProfileImg])

    const handleClickLogOut = () => {
        values.setUser(null)
        values.setCurrentMode('MyPage')
    }

    if (myPageMode === 'myPage') {
        if (values.user === null) {
            return (
                <>
                    <h1>Please login.</h1>
                    <button onClick={() => values.setCurrentMode('Login')}>
                        Go to login page
                    </button>
                </>
            )
        }
        return (
            <>
                <h1>This is My Page.</h1>
                <div>
                    <img className='radius' src={userProfileImg} />
                    <button onClick={() => setMyPageMode('user')}>update profile image</button>
                    <h2>{user.email}</h2>
                    <h2>username : {user.username}</h2>
                </div>
                <div>
                    <h2>{dog.name}</h2>
                    <img className='radius' src={dogProfileImg} />
                    <button onClick={() => setMyPageMode('dog')}>update your dog's profile image</button>
                </div>
                <div>
                    Do you have another dog? register:
                    <button onClick={() => setMyPageMode('dogRegistration')}>Register dogs</button>
                </div>
                <button onClick={handleClickLogOut}>Logout</button>
            </>
        )
    }

    if (myPageMode === 'user') {
        return (
            <UserUpdate
                user={values.user}
                setUser={values.setUser}
                updateUserData={values.updateUserData}
                setUserProfileImg={setUserProfileImg}
                serverURL={values.serverURL}
                myPageMode={myPageMode}
                setMyPageMode={setMyPageMode}
                setCurrentMode={values.setCurrentMode}
                setMsg={setMsg}
            />
        )
    }
    if (myPageMode === 'dog') {
        return (
            <>
                       <DogUpdate
                user={values.user}
                setUser={values.setUser}
                updateUserData={values.updateUserData}
                updateSelectedDogData={values.updateSelectedDogData}
                setDogProfileImg={setDogProfileImg}
                serverURL={values.serverURL}
                myPageMode={myPageMode}
                setMyPageMode={setMyPageMode}
                setCurrentMode={values.setCurrentMode}
                setMsg={setMsg}
            />
            </>
 
        )
    }
    if (myPageMode === 'dogRegistration') {
        return (
            <DogRegistration />
        )
    }
}

export default MyPage