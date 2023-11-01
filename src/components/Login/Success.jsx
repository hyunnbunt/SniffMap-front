
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DogDropdownList = ({dogs}) => {
    console.log(dogs)
    return (
        dogs.map(dog => 
            <Dropdown.Item 
                key={dog.id} 
                id={dog.id}
                href={`#/action-${dog.id}`} 
                eventKey={dog.name}>
            {dog.name}
            </Dropdown.Item>
        )
    )
}

const DogDropdownButton = ({dogs, updateUserDog}) => {
    const [title, setTitle] = useState("click to start")
    let dog = null
   
    const handleSelect = (dogName, dog) => {
        console.log(dogName)
        console.log(dog.target.id)
        setTitle(dogName)
        axios.get(`http://localhost:8080/dogs/${dog.target.id}`)
        .then(
            res => {
                dog = {updated: true, dog : res.data}
                updateUserDog(dog)}
        )
    }
    return (
        <DropdownButton 
            id="dog-dropdown-button" 
            title={title}
            onSelect={handleSelect}
            value={dog}
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
    const [dogs, setDogs] = useState(null)

    useEffect(() => {
        const dogPromises = props.user.dogIds.map(async dogId => {
            const res = await axios
                .get(`http://localhost:8080/dogs/${dogId}`)
            return res.data
        })
        console.log(dogPromises)
        Promise.all(dogPromises).then(
            res => {
                console.log(res)
                setDogs(res)
            }
        )
    }, []
    )
    
    return (
        <>
            <h1>Hello, {props.user.userName}!</h1>
            <h2>Select one of your dogs.</h2>
            <DogDropdownButton dogs={dogs} updateUserDog={props.updateUserDog} setUserDog={props.setUserDog} />
            <button onClick={() => handleClick()}>Start!</button>
        </>
    )


}


export default Success
