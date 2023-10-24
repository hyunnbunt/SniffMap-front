import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const FriendsList = ({friends}) => {
    return friends.map(friend => <h2 key={friend.id}>{friend.name}({friend.age} years old)</h2>)
}

const Friends = (props) => {
    const [friends, setFriends] = useState(null)

    useEffect(() => {
        const friendsPromises = props.userDog.friendIds.map(friendId => 
            axios.get(`http://localhost:8080/dogs/${friendId}`).then(res => res.data)
        )
        Promise
            .all(friendsPromises)
            .then(res => {
                console.log(res)
                setFriends(res)
            })
    }, [])

    if (friends === null) {
        return (
            <>Loading...</>
        )
    }
    return (
    <>
        <h1>This is Friends Page.</h1>
        <h2>{props.userDog.name}'s friends :</h2>
        <FriendsList friends={friends} />
    </>
    )
}

export default Friends
