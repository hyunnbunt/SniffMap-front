import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const FriendsList = ({friends}) => {
    return friends.map(friend => <h2 key={friend.id}>{friend.name}({friend.age} years old)</h2>)
}

const Friends = (props) => {
    const [friends, setFriends] = useState(null)
    const [userDog, setUserDog] = useState(null)

    const getUserDog = async (dogId) => {
        const res = await axios.get(`http://localhost:8080/dogs/${dogId}`)
        setUserDog(res.data)
        return res.data
    }

    useEffect(() => {
        let dog = null
        getUserDog(props.userDogId).then(res => {
            dog = res
            console.log(dog)
            const friendsPromises = dog.friendIds.map(friendId => 
            axios.get(`http://localhost:8080/dogs/${friendId}`).then(res => res.data)
        )
        Promise
        .all(friendsPromises)
        .then(res => {
            console.log(res)
            setFriends(res)
        })
        })
       
    }, [props.currentMode])

    if (friends === null) {
        return (
            <>Loading...</>
        )
    }
    return (
    <>
        <h1>This is Friends Page.</h1>
        <h2>{userDog.name}'s friends :</h2>
        <FriendsList friends={friends} />
    </>
    )
}

export default Friends
