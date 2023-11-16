import React, { useState } from 'react'
import UserUpdate from './UserUpdate'
import DogUpdate from './DogUpdate'

const MyPage = (props) => {
    /* Selected dog's data is in the state hook. 
    When user updates a dog's info, the app doesn't update the whole user data object, 
    it only updates selectedDog with the server's response to the dog update request. 
    (If user updates the user info, the app updates the whole user object.) */
    const [dogData, setDogData] = useState(props.user.selectedDog)
    const [myPageMode, setMyPageMode] = useState('myPage')
    const [msg, setMsg] = useState('')

    const handleClickLogOut = () => {
        props.setUser(null)
        props.setCurrentMode('Login')
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
                    <button onClick={() => setMyPageMode('userUpdate')}>update profile image</button>
                    <h2>{props.user.userData.email}</h2>
                    <h2>username : {props.user.userData.name}</h2>
                </div>
                <div>
                    <h2>{dogData.name}</h2>
                    <img src={dogData.dogProfileImageURL} style={{ width: '120px' }} />
                    <button onClick={() => setMyPageMode('dogUpdate')}>update your dog's profile image</button>
                </div>
                <button onClick={handleClickLogOut}>Logout</button>
            </>
        )
    }

    if (myPageMode === 'userUpdate') {
        return (
            <UserUpdate
                user={props.user}
                updateUser={props.updateUser}
                serverURL={props.serverURL}
                setMyPageMode={setMyPageMode}
                setMsg={setMsg}
            />
        )
    }
    if (myPageMode === 'dogUpdate') {
        return (
            <DogUpdate
                setDogData={setDogData}
                serverURL={props.serverURL}
                setMyPageMode={setMyPageMode}
            />
        )
    }
}

export default MyPage