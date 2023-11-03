import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FriendDetail from './Friends/FriendDetail'

const Friends = (props) => {
    const [friendData, setFriendData] = useState(null)

    const promiseSetFriendsData = async (friendIds) => {
        const res = await Promise.all(friendIds.map(friendId =>
            axios.get(`http://localhost:8080/dogs/${friendId}`)
        ))
        props.setUserDogFriends(res.map(res => res.data))
    }

    useEffect(() => {
        props.updateUserDog()
            .then(res => {promiseSetFriendsData(res.dog.friendIds) })
    }, [])

    if (props.userDogFriends === null) {
        return (
            <>Loading...</>
        )
    }
    return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>{props.userDog.dog.name}'s friends :</h2>
            {props.userDogFriends.map(friend =>
                <h3 key={friend.id}>{friend.name}
                    <button key={friend.name} onClick={() => setFriendData(friend)}>detail</button>
                </h3>
            )}
            <FriendDetail friend={friendData} />
        </>
    )
}

export default Friends
