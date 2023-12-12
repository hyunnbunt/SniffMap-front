import React from 'react'

import ProfileUpload from './ProfileUpload'

const UpdateUserPage = (props) => {

    return (
        <>
            <h1>Upload user profile.</h1>
            <ProfileUpload
                myPageMode={props.myPageMode}
                setMyPageMode={props.setMyPageMode}
                setUserProfileImg={props.setUserProfileImg}
            />
        </>
    )
}

export default UpdateUserPage