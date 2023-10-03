import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const EventDetail = ({e}) => {
    return (
        <h2>{`${e.time} in ${e.latitude} + ${e.longitude}`}</h2>
    )
}

const Events = () => {
    const [e, setE] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8080/events')
            .then(res => {
                setE(res.data)
            })
    }, [])

    return (
        <>
            <h1>Events</h1>
            {e.map(eve => <EventDetail  key={eve.id} e={eve} />)}
        </>
    )

}

export default Events