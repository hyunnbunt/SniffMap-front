
import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DogSelection = (props) => {

    const [title, setTitle] = useState("choose one of your dogs")

    const handleDogSelect = (eventKey) => {
        props.setSelectedDogIndex(eventKey)
        setTitle(props.dogs[eventKey].name)
    }

    /* If the user selects a dog, present 'Friends' tab. */
    const handleSelectionSubmit = (e) => {
        e.preventDefault()
        props.setCurrentMode("Friends")
    }

    return (
        <>
            <form onSubmit={handleSelectionSubmit}>
                <DropdownButton id="dog-dropdown-button" title={title} onSelect={handleDogSelect}>
                    {
                        props.dogs.map((dog, index) =>
                            <Dropdown.Item key={dog.id} href={`#/action-${dog.id}`} eventKey={index}>
                                {dog.name}
                            </Dropdown.Item>
                        )
                    }
                </DropdownButton>
                <button type="submit">confirm</button>
            </form>
        </>
    )
}

export default DogSelection