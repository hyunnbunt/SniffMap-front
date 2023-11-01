
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DogRegistration from './DogRegistration'
import 'bootstrap/dist/css/bootstrap.min.css';

const Success = (props) => {
    const [dogList, setDogList] = useState(null)

    const getPromiseDogList = async () => {
        const res = await props.user.dogIds.map(dogId =>
            axios.get(`http://localhost:8080/dogs/${dogId}`)
        )
        return res.data
    }

    useEffect(() => {
        const promiseDogList = getPromiseDogList()
        Promise
            .all(promiseDogList)
            .then(res => setDogList(res))
    }, [])



    /* If the user doesn't have any dog registered, present a dog registration form. */
    if (props.user.dogIds === null) {
        return (
            <DogRegistration />
        )
    }
    if (dogList == null) {
        return (
            <>Loading...</>
        )
    }

    return (
        <>
            <h1>Hello, {props.user.userName}!</h1>
            <h2>Select one of your dogs.</h2>
            <DogSelection dogsList={dogList} updateUserDog={props.updateUserDog} setCurrentMode={props.setCurrentMode} />
        </>
    )
}

export default Success
