import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CropModal from './CropModal'
import ProfileUpload from './ProfileUpload'

const UpdateUserPage = (props) => {

    return (
        <>
            <h1>Upload user profile.</h1>
            <ProfileUpload
                myPageMode={props.myPageMode}
            />
        </>
    )
}

export default UpdateUserPage