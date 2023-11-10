import React from 'react'

const FriendDetail = ({selectedFriend}) => {
    console.log(selectedFriend)

    if (selectedFriend === null) {
        return (
            <>Click detail button to see the information of you friend!</>
        )
    }
    
    return (
        <>
            <h1>Hello, I'm {selectedFriend.name}!</h1>
            <h2>I'm {selectedFriend.age} years old.</h2>
            <h3>Let's play together!</h3>
        </>
    )
}
export default FriendDetail