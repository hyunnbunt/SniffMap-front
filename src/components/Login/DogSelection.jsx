
import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DogSelection = (props) => {

    const [title, setTitle] = useState("click to start")
    const [selectedDog, setSelectedDog] = useState(null)
    let dog = null

    const handleDogSelect = (dogName, dog) => {
        console.log(dogName)
        console.log(dog.target.id)
        setTitle(dogName)

        axios.get(`http://localhost:8080/dogs/${dog.target.id}`)
            .then(
                res => {
                    dog = { updated: true, dog: res.data }
                    setSelectedDog(dog)
                    props.updateUserDog(dog)
                }
            )
    }

    /* If the user selects a dog, present 'Friends' tab. */
    const handleSelectionSubmit = (e) => {
        e.preventDefault()
        props.setCurrentMode("Friends")
    }

    return (
        <>
            <form onSubmit={handleSelectionSubmit}>
                <DropdownButton id="dog-dropdown-button" title={title} onSelect={() => handleDogSelect(dog.name, dog)} value={dog}>
                    {
                        props.dogsList.map(dog =>
                            <Dropdown.Item key={dog.id} id={dog.id} href={`#/action-${dog.id}`} eventKey={dog.name}>
                                {dog.name}
                            </Dropdown.Item>
                        )
                    }
                    <DogDropdownList dogsList={props.dogsList} />
                </DropdownButton>
                <button type="submit">Start!</button>
            </form>
        </>
    )
}

export default DogSelection