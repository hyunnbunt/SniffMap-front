
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DogRegistration from './DogRegistration'
import DogSelection from './DogSelection'
import 'bootstrap/dist/css/bootstrap.min.css';

const Success = (props) => {
    console.log(props.user)
    // const [dogList, setDogList] = useState(null)

    // const getPromiseDogList = async () => {
    //     const res = await Promise.all(props.user.dogIds.map(dogId =>
    //         axios.get(`http://localhost:8080/dogs/${dogId}`)
    //     ))
    //     return res
    // }

    useEffect(() => {
        if (props.user.dogIds === null) {
            return
        }
        const promiseDogList = props.getPromiseDogList()
        promiseDogList.then(res => {
            props.setUser({...props.user, dogs:res.map(dog => dog.data)})
            props.setUserDogList(res.map(dog => dog.data))
        })
    }, [])

    /* If the user doesn't have any dog registered, present a dog registration form. */
    if (props.user.dogIds === null) {
        return (
            <DogRegistration />
        )
    }

    if (props.dogList == null) {
        return (
            <>Loading...</>
        )
    }

    return (
        <>
            <h1>Hello, {props.user.userName}!</h1>
            <h2>Select one of your dogs.</h2>
            <DogSelection dogsList={props.dogList} setUserDog={props.setUserDog} setCurrentMode={props.setCurrentMode} />
        </>
    )
}

export default Success
