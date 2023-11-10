
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DogRegistration from './DogRegistration'
import DogSelection from './DogSelection'
import 'bootstrap/dist/css/bootstrap.min.css';

const Success = (props) => {
    console.log(props.user)

    /* If the user doesn't have any dog registered, present a dog registration form. */
    if (props.user.dogs === null) {
        return (
            <DogRegistration />
        )
    }

    return (
        <>
            <h1>Hello, {props.user.name}!</h1>
            <h2>Select one of your dogs.</h2>
            <DogSelection dogs={props.user.dogs} setSelectedDogIndex={props.setSelectedDogIndex} setCurrentMode={props.setCurrentMode} />
        </>
    )
}

export default Success
