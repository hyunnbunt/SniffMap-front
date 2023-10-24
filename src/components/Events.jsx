import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const EventDetail = ({e}) => {
    return (
        <h2>{`${e.time} in ${e.latitude} + ${e.longitude}`}</h2>
    )
}

const Events = (props) => {
    const [participatingEvents, setParticipatingEvents] = useState([])
    console.log(props.userDog.participatingEventIds)

    useEffect(() => {
        const eventPromises = props.userDog.participatingEventIds.map(
            participatingEventId => 
            axios
                .get(`http://localhost:8080/events/${participatingEventId}`)
                .then(res => {
                    console.log(res.data)
                    return res.data
                })
        )
        Promise.all(eventPromises).then(res => setParticipatingEvents(res))
    }, [])

    return (
        <>
            <h1>Events</h1>
            {participatingEvents.map(eve => <EventDetail  key={eve.id} e={eve} />)}
        </>
    )
}

export default Events