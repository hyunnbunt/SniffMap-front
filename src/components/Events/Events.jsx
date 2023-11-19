import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import GetLocation from './GetLocation'
import EventDetail from './EventDetail'

const Events = (props) => {

    const today = new Date()
    const [eventsMode, setEventsMode] = useState('myEvents')
    const [updated, setUpdated] = useState(false)
    const [eventCreateInfo, setEventCreateInfo] = useState({
            date: today.getDate(),
               time: today.getTime(),
               latitude: null,
               longitude:  null,
               creatorDogId: props.user.selectedDog.id
           })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setEventCreateInfo({
                    ...eventCreateInfo,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
        }
    }, [])

    const handleChangeDate = (e) => {
        console.log(e)
        setEventCreateInfo({
            ...eventCreateInfo,
            date: e,
            time: e
        })
    }

    const handleSubmitDate = (e) => {
        e.preventDefault()
        console.log(eventCreateInfo)
        setEventsMode('pickLocation')
    }

    const handleSubmitLocation = (e) => {
        e.preventDefault()
        postEvents().then(
            () => {
                setEventsMode('myEvents')
            }
        )
    }

    const postEvents = async () => {
        const res = await axios.post(`${props.serverURL}/events`, eventCreateInfo)
        if (res.status === 200) {
            console.log(res.data)        
            props.updateUserData(props.user.loginInfo)
        }
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
        console.log(props.user.selectedDog.participatingEvents)
        return (
            <>
                <h1>Events</h1>
                {props.user.selectedDog.participatingEvents.map(eve =>
                    <EventDetail key={eve.id} e={eve} />
                )}
                <form onSubmit={() => setEventsMode('pickDate')}>  
                    <button type='submit'>Add event</button>
                </form>
            </>
        )
    }

    if (eventsMode === 'pickDate') {
        return (
            <>
                <form onSubmit={handleSubmitDate}>
                    <Calendar onChange={handleChangeDate} />
                    <button type='submit'>select date</button>
                </form>
            </>
        )
    }

    if (eventsMode === 'pickLocation') {
        return (
            <form onSubmit={(e) => { handleSubmitLocation }}>
                <GetLocation eventCreateInfo={eventCreateInfo} setEventCreateInfo={setEventCreateInfo} />
                <button type='submit'>select location</button>
            </form>
           
        )
    }
}

export default Events