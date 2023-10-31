import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FriendDetail from './Friends/FriendDetail'

const FriendsList = ({ friends, handleClick }) => {
    return friends.map(friend =>
        <>
            <h2 key={friend.id}>{friend.name}({friend.age} years old)</h2>
            <button key={friend.name} onClick={handleClick} friendDetail={friend}>detail</button>
        </>
    )
}

const Friends = (props) => {
    const [friends, setFriends] = useState(null)
    const [friendDetail, setFriendDetail] = useState("-----friend detail-----")

    const promiseSetUserDog = async (dogId) => {
        const res = await axios.get(`http://localhost:8080/dogs/${dogId}`)
        props.setUserDog({ updated: false, dog: res.data })
        return res.data
    }

    const friendDetailUpdaterCreator = (detail) => {
        return () => {
            setFriendDetail(detail)
        }
    }


    useEffect(() => {
        let dog = null
        promiseSetUserDog(props.userDog.dog.id).then(res => {
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
                    <h2 key={friend.id}>{friend.name}({friend.age} years old)</h2>
                    <button key={friend.name} onClick={friendDetailUpdaterCreator(friend)}>detail</button>
                </>
            )}
            <h2>{JSON.stringify(friendDetail)}</h2>
        </>
    )
}

export default Friends
