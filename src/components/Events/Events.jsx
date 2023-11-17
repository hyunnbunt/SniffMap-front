import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const EventDetail = ({ e }) => {
    /* When updates the data, better get data from server everytime, 
    or modify on frontend with the server response..? */
    return (
        <h2>{`${e.time} in ${e.latitude} + ${e.longitude}`}</h2>
    )
}

const Events = (props) => {

    const [date, setDate] = useState(null)

    const handleChangeDate = (e) => {
        setDate(e)
        console.log(e)
    }

    const handleSubmitDate = async (e) => {
        e.preventDefault()
        const eventCreateInfo = {
            date: date,
            time: date,
            latitude: 11,
            longitude: 11,
            creatorDogId: props.user.selectedDog.id
        }
        const res = await axios.post(`${props.serverURL}/events`, eventCreateInfo)

        if (res.status === 200) {
            console.log(res)
            await props.updateSelectedDogData()
        }
    }

    console.log(props.user.selectedDog)

    return (
        <>
            <h1>Events</h1>
            {props.user.selectedDog.participatingEvents.map(eve =>
                <EventDetail key={eve.id} e={eve}/>
            )}
            <form onSubmit={(e) => {handleSubmitDate}}>
                <Calendar onChange={handleChangeDate} />
                <button type='submit'>select date</button>
            </form>
        </>
    )
}

export default Events