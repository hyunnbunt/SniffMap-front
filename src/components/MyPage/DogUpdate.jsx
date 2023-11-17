import React from 'react'

import ProfileUpload from './ProfileUpload'

const DogUpdate = (props) => {

    return (
        <>
            <h1>Upload dog profile.</h1>
            <ProfileUpload
                user={props.user}
                setUser={props.setUser}
                myPageMode={props.myPageMode}
                serverURL={props.serverURL}
                updateUserData={props.updateUserData}
                updateSelectedDogData={props.updateSelectedDogData}
                setMyPageMode={props.setMyPageMode}
                setCurrentMode={props.setCurrentMode}
            />
        </>
    )
}

export default DogUpdate