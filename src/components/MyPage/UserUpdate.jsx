import React from 'react'

import ProfileUpload from './ProfileUpload'

const UpdateUserPage = (props) => {

    return (
        <>
            <h1>Upload user profile.</h1>
            <ProfileUpload
                user={props.user}
                setUser={props.setUser}
                myPageMode={props.myPageMode}
                serverURL={props.serverURL}
                updateUserData={props.updateUserData}
                setMyPageMode={props.setMyPageMode}
                setCurrentMode={props.setCurrentMode}
            />
        </>
    )
}

export default UpdateUserPage