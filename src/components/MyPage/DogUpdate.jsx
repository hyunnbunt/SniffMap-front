import React from 'react'

import ProfileUpload from './ProfileUpload'

const DogUpdate = (props) => {

    return (
        <>
            <h1>Upload dog profile.</h1>
            <ProfileUpload
                myPageMode={props.myPageMode}
                setMyPageMode={props.setMyPageMode}
                setDogProfileImg={props.setDogProfileImg}
            />
        </>
    )
}

export default DogUpdate