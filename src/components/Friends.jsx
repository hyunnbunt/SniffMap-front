import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FriendDetail from './Friends/FriendDetail'

const Friends = (props) => {

    const [selectedFriend, setSelectedFriend] = useState(null)
    const dog = props.user.dogs[props.selectedDogIndex]

    console.log(dog)

    return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>{dog.name}'s friends :</h2>
            {dog.friends.map(friend =>
                <h3 key={friend.id}>{friend.name}
                    <button key={friend.name} onClick={() => setSelectedFriend(friend)}>detail</button>
                </h3>
            )}
            <FriendDetail selectedFriend={selectedFriend} />
        </>
    )
}

export default Friends
