import React, { useState, useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DogRegistration from './DogRegistration'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContext } from '../../App'


const DogsList = () => {

    const appContext = useContext(AppContext)
    const [title, setTitle] = useState('choose one of your dogs')
    console.log("inside dogs list")
    console.log(appContext.user)
    const dogs = appContext.user.userData
    console.log(dogs)

    const handleDogSelect = (eventKey) => {
        const myDog = dogs[eventKey]
        appContext.setUser({
            ...appContext.user,
            selectedDogId: myDog.id
        })
        setTitle(myDog.name)
    }

    /* If the user selects a dog, present 'Friends' tab. */
    const handleClickSelect = (e) => {
        e.preventDefault()
        appContext.setCurrentMode('Friends')
    }

    /* If the user doesn't have any dog registered, present a dog registration form. */
    if (appContext.user.userData.dogs.length === 0) {
        console.log("dogs list: 0")
        return (
            <DogRegistration />
        )
    }

    return (
        <>
            <h1>Hello, {appContext.user.userData.name}!</h1>
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
