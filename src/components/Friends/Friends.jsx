import React, { useState, useContext } from 'react'
import axios from 'axios'
import FriendDetail from './FriendDetail'
import { AppContext } from '../../App'

const Friends = () => {

    const [selectedFriend, setSelectedFriend] = useState(null)
    const [msg, setMsg] = useState('')

    const values = useContext(AppContext)
    const dog = values.getDog()
    console.log(dog.name)
    
    const removeFromFriendsList = async (friend) => {
        console.log(values.tokenHeader)
        const res =
            await axios.patch(
                `${values.serverURL}/dogs/${dog.id}/cancel-friend`,
                { friendId: friend.id },
                values.tokenHeader
            )
        console.log(res)
        if (res.status === 200) {
            values.updateUserData(res.data, values.user.loginInfo)
        } else {
            setMsg('Can\'t update your friends list. Pleast try again.')
        }
    }

    return (
        <>
            <h1>This is Friends Page.</h1>
            <h2>{dog.name}'s friends :</h2>
            {dog.friends.map(friend =>
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
