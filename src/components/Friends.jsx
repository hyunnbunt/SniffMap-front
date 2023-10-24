import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const FriendsList = ({friendIds}) => {

    const [loading, setLoading] = useState(false)

    const friendsName =
    friendIds.map(friendId => {
        setLoading(true)
        axios
        .get(`http://localhost:8080/dogs/${friendId}`)
        .then(res => {
            <h2>{res.data.name}</h2>
            setLoading(false)
        })
    })
    console.log(friendsName)
    if (loading) {
        return <>loading...</>
    } else {
        return (
            <>friends</>
        )
    }

}

const Friends = ({userDog}) => {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(false)
   
    console.log(userDog)

    if (!loading) {
        return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>Your dog : {userDog.name} </h2>
            <h2>Your friend :</h2>
            <FriendsList friendIds={userDog.friendIds} />
        </>
        )
    } else {
        return (
            <>Loading...</>
        )
    }
}

export default Friends
