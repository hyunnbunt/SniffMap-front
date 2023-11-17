import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import GetLocation from './GetLocation';

const EventDetail = ({ evnt }) => {
    /* When updates the data, better get data from server everytime, 
    or modify on frontend with the server response..? */
    return (
        <h2>{`${evnt.time} in ${evnt.latitude} + ${evnt.longitude}`}</h2>
    )
}

const Events = (props) => {

    const [date, setDate] = useState(null)
    const [location, setLocation] = useState({lat: null, lng: null})
    const today = new Date()
    const currentPosition = navigator.geolocation.getCurrentPosition((position) => {
        return {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    })
    console.log(currentPosition)
    const [eventCreateInfo, setEventCreateInfo] =
        useState({
            date: today.getDay,
            time: today.getTime,
            latitude: currentPosition.lat,
            longitude: currentPosition.lng,
            creatorDogId: props.user.selectedDog.id
        })
    const [eventsMode, setEventsMode] = useState('myEvents')


    const handleChangeDate = (e) => {
        setDate(e)
        console.log(e)
    }

    const handleSubmitDate = (e) => {
        e.preventDefault()
        setEventCreateInfo({
            ...eventCreateInfo,
            date: date,
            time: date
        })
        setEventsMode('pickLocation')
    }

    const handleSubmitLocation = (e) => {
        e.preventDefault()
        setEventCreateInfo({
            ...eventCreateInfo,
            latitude: location.lat,
            longitude: location.lng
        })
        postEvents().then(
            res => setEventsMode('myEvents')
        )

    }

    const postEvents = async () => {
        const res = await axios.post(`${props.serverURL}/events`, eventCreateInfo)
        if (res.status === 200) {
            console.log(res.data)
        }
        props.updateUserData(props.user.loginInfo)
    }

    const handleSubmitDate2 = async (e) => {
        e.preventDefault()

        const res = await axios.post(`${props.serverURL}/events`, eventCreateInfo)

        if (res.status === 200) {
            console.log(res)
            await props.updateSelectedDogData()
        }

    }

    if (eventsMode === 'myEvents') {
        return (
            <>
                <h1>Events</h1>
                {props.user.selectedDog.participatingEvents.map(eve =>
                    <EventDetail key={eve.id} e={eve} />
                )}
            </>
        )
    }

    if (eventsMode === 'pickDate') {
        return (
            <>
                <form onSubmit={(e) => { handleSubmitDate }}>
                    <Calendar onChange={handleChangeDate} />
                    <button type='submit'>select date</button>
                </form>
            </>
        )
    }

    if (eventsMode === 'pickLocation') {
        return (
            <GetLocation setLocation={setLocation} handleSubmitLocation={handleSubmitLocation} />
        )
    }
}

export default Events