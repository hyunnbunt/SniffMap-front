
import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DogSelection = (props) => {

    const [title, setTitle] = useState("click to start")
    const [selectedDog, setSelectedDog] = useState(null)

    const handleDogSelect = (eventKey) => {
        setSelectedDog(props.userDogList[eventKey])
        setTitle(props.userDogList[eventKey].name)
    }

    /* If the user selects a dog, present 'Friends' tab. */
    const handleSelectionSubmit = (e) => {
        e.preventDefault()
        props.setUserDog({updated : true, dog: selectedDog})
        props.setCurrentMode("Friends")
    }

    return (
        <>
            <form onSubmit={handleSelectionSubmit}>
                <DropdownButton id="dog-dropdown-button" title={title} onSelect={handleDogSelect}>
                    {
                        props.dogsList.map((dog, index) =>
                            <Dropdown.Item key={dog.id} href={`#/action-${dog.id}`} eventKey={index}>
                                {dog.name}
                            </Dropdown.Item>
                        )
                    }
                </DropdownButton>
                <button type="submit">Start!</button>
            </form>
        </>
    )
}

export default DogSelection