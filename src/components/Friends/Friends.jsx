import React, { useState } from 'react'
import axios from 'axios'
import FriendDetail from './FriendDetail'

const Friends = (props) => {

    const [selectedFriend, setSelectedFriend] = useState(null)
    const [msg, setMsg] = useState('')

    const removeFromFriendsList = async (friend) => {
        const res =
            await axios.patch(
                `${props.serverURL}/dogs/${props.user.selectedDog.id}/cancel-friend`,
                { friendId: friend.id }
            )
        console.log(res)
        if (res.status === 200) {
            props.updateSelectedDogData()
        } else {
            setMsg('Can\'t update your friends list. Pleast try again.')
        }
        props.updateUserData(props.user.loginInfo)
    }

    return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>{props.user.selectedDog.name}'s friends :</h2>
            {props.user.selectedDog.friends.map(friend =>
                <div key={friend.id}>
                    <h3 >
                        {friend.name}
                    </h3>
                    <button onClick={() => setSelectedFriend(friend)}>detail</button>
                    <button onClick={() => removeFromFriendsList(friend)}>unfriend</button>
                </div>
            )}
            <FriendDetail selectedFriend={selectedFriend} />
            {msg}
        </>
    )
}

export default Friends
