
import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DogDropdownList = ({dogs}) => {
    return (
        dogs.map(dog => 
            <Dropdown.Item 
                key={dog.id} 
                href={`#/action-${dog.id}`} 
                eventKey={dog}>
            {dog.name}
            </Dropdown.Item>
        )
    )
}

const DogDropdownButton = ({dogs, setUserDog}) => {
    console.log(dogs)
    return (
        <DropdownButton 
            id="dog-dropdown-button" 
            title="click to start"
            onSelect={setUserDog}
        >
            <DogDropdownList dogs={dogs} />
        </DropdownButton>
    )
}


const Success = (props) => {

    /* If the user selects a dog, present 'Friends' tab. */
    const handleClick = () => {
        props.setCurrentMode("Friends")
    }

    /* If the user doesn't have any dog registered, present a dog register window. */
    if (props.user.dogIds === null) {
        return (
            <DogRegister />
        )
    } 
    /* Let the user choose from their dogs list. */

    let dogs = null
    console.log(`The number of ${props.user.userName}'s dog is: ${props.user.dogIds.length}`)

    const dogPromises = props.user.dogIds.map(async dogId => {
        const res = await axios
            .get(`http://localhost:8080/dogs/${dogId}`)
        return res.data
    })
    console.log(dogPromises)

    dogs = Promise.all(dogPromises).then(
        res => {
            setTimeout((res) => {
                console.log('hello', res)
                return res.data}
                , 3000)
    
        }
    )

    console.log(dogs)
    return (
        <>
            <h1>Hello, {props.user.userName}!</h1>
            <h2>Select one of your dogs.</h2>
            <DogDropdownButton dogs={dogs} setUserDog={props.setUserDog} />
            <button onClick={handleClick}>Start!</button>
        </>
    )


}


export default Success
