import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FriendDetail from './Friends/FriendDetail'

const Friends = (props) => {
    const [friends, setFriends] = useState(null)
    const [friendDetail, setFriendDetail] = useState("-----friend detail-----")

    const promiseSetUserDog = async (dogId) => {
        const res = await axios.get(`http://localhost:8080/dogs/${dogId}`)
        props.setUserDog({ updated: false, dog: res.data })
        return res.data
    }

    useEffect(() => {
        let dog = null
        console.log(props)
        props.updateUserDog(props.userDog.dog.id).then(res => {
            dog = res
            console.log(dog)
            
            const friendsPromises = dog.dog.friendIds.map(friendId =>
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

    if (friends === null || props.userDog.updated) {
        return (
            <>Loading...</>
        )
    }
    return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>{props.userDog.dog.name}'s friends :</h2>
            {friends.map(friend =>
                <>
                    <h3 key={friend.id}>{friend.name}</h3>
                    <button key={friend.name} onClick={() => setFriendDetail(friend)}>detail</button>
                </>
            )}
            <h2>{JSON.stringify(friendDetail)}</h2>
        </>
    )
}

export default Friends
