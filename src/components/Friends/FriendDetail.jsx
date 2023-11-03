import React from 'react'

const FriendDetail = ({friend}) => {

    if (friend === null) {
        return ("Click detail button to see your friend's data.")
    }
    
    return (
        <>
            <h1>Hello, I'm {friend.name}!</h1>
            <h2>I'm {friend.age} years old.</h2>
            <h3>Let's play together!</h3>
        </>
    )
}
export default FriendDetail