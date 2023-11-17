import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DogRegistration from './DogRegistration'
import 'bootstrap/dist/css/bootstrap.min.css'

const DogsList = (props) => {

    const [title, setTitle] = useState('choose one of your dogs')
    console.log(props.user.userData)
    const dogs = props.user.userData.dogs
    console.log(dogs)

    const handleDogSelect = (eventKey) => {
        props.setUser({
            ...props.user,
            selectedDog: dogs[eventKey]
        })
        setTitle(dogs[eventKey].name)
    }

    /* If the user selects a dog, present 'Friends' tab. */
    const handleClickSelect = (e) => {
        e.preventDefault()
        props.setCurrentMode('Friends')
    }

    /* If the user doesn't have any dog registered, present a dog registration form. */
    if (props.user.userData.dogs === null) {
        return (
            <DogRegistration />
        )
    }

    return (
        <>
            <h1>Hello, {props.user.userData.name}!</h1>
            <h2>Select one of your dogs.</h2>
            <div>
                <form onSubmit={handleClickSelect}>
                    <DropdownButton
                        id="dog-dropdown-button"
                        title={title}
                        onSelect={handleDogSelect}
                    >
                        {
                            dogs.map((dog, index) =>
                                <Dropdown.Item
                                    key={dog.id}
                                    href={`#/action-${dog.id}`}
                                    eventKey={index}
                                >
                                {dog.name}
                                </Dropdown.Item>
                            )
                        }
                    </DropdownButton>
                    <button type="submit">select</button>
                </form>
            </div>
        </>
    )
}

export default DogsList
